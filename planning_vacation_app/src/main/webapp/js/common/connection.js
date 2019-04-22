/**
 *
 */
// common connection methods
var connection = {

        showSEM: true,


        reload: function () {
            setTimeout(function () {
                window.location.reload();
            }, 1500);

            throw "Session expired exception";
        },

        sendProxyAjax: function (callbackOk, callbackErr, params) {
            var promise = webix.promise.defer();

            var p = JSON.stringify(params);

            var c = {
                error: function (text, data, xhr) {
                    if (xhr.status == 401) {
                        if (connection.showSEM) {
                            util.messages.showSessionExpiredError();
                            connection.showSEM = false;
                        }
                        connection.reload();
                    }
                    try {
                        callbackErr(text, data, xhr);
                    } catch (ex) {
                    }
                    util.preloader.dec();
                    promise.reject(false);
                },
                success: function (text, data, xhr) {
                    try {
                        callbackOk(text, data, xhr);
                    } catch (ex) {
                    }
                    util.preloader.dec();
                    promise.resolve(true);
                }
            };

            var url = "/hub/proxy";
            util.preloader.inc();
            webix.ajax().headers({
                "Content-type": "application/json"
            }).post(url, p, c);

            return promise;
        },

        sendAjax: function (method, url, callbackOk, callbackErr, item) {
            var promise = webix.promise.defer();

            var p = JSON.stringify(item);

            var c = {
                error: function (text, data, xhr) {
                    if (xhr.status == 401) {
                        if (connection.showSEM) {
                            util.messages.showSessionExpiredError();
                            connection.showSEM = false;
                        }
                        connection.reload();
                    }
                    try {
                        callbackErr(text, data, xhr);
                    } catch (ex) {
                    }
                    util.preloader.dec();
                    promise.reject(false);
                },
                success: function (text, data, xhr) {
                    try {
                        callbackOk(text, data, xhr);
                    } catch (ex) {
                    }
                    util.preloader.dec();
                    promise.resolve(true);
                }

            };

            util.preloader.inc();
            switch (method) {
                case "GET":
                    webix.ajax().headers({
                        "Content-type": "application/json"
                    }).get(url, c);
                    break;
                case "DELETE":
                    webix.ajax().headers({
                        "Content-type": "application/json"
                    }).del(url, p, c);
                    break;
                case "POST":
                    webix.ajax().headers({
                        "Content-type": "application/json"
                    }).post(url, p, c);
                    break;
                case "PUT":
                    webix.ajax().headers({
                        "Content-type": "application/json"
                    }).put(url, p, c);
                    break;
            }
            return promise;
        },

        //attach triggers to datatables
        attachAjaxEvents: function (dtId, link, preserveId, editValidationRules) {

            var forDelete = webix.storage.local.put("for_delete", []);

            $$(dtId).attachEvent("onBeforeAdd", function (index, obj) {
                if (obj.isNew) {
                    return true;
                }
                if (typeof preserveId === 'undefined' || preserveId !== true) {
                    delete obj["id"];
                }
                util.preloader.inc();
                webix.ajax().headers({
                    "Content-type": "application/json"
                }).post(link, JSON.stringify(obj), {
                    error: function (text, data, xhr) {
                        if (xhr.status == 401) {
                            if (connection.showSEM) {
                                util.messages.showSessionExpiredError();
                                connection.showSEM = false;
                            }
                            connection.reload();
                        } else {
                            util.messages.showErrorMessage("Greška prilikom dodavanja podataka.");
                        }
                        util.preloader.dec();
                    },
                    success: function (text, data, xhr) {
                        var retVal = data.json();
                        retVal.isNew = true;
                        try {
                            $$(dtId).add(retVal);
                        } catch (ex) {
                        }
                        util.preloader.dec();
                    }
                });

                return false;
            });

            window.updateEvent = $$(dtId).attachEvent("onBeforeEditStop", function (state, editor, ignore) {
                if (ignore) {
                    this.editCancel();
                    return;
                }

                var column = editor.column;
                var id = editor.row;

                var newValue = state.value;
                var oldValue = state.old;

                var shouldCancelEdit = util.validation.onBeforeEditStopCancelEdit(newValue, oldValue);
                if (shouldCancelEdit) return;

                var editLink = link + "/" + id;

                var data = $$(dtId).getItem(id);
                data[column] = newValue;

                var commitEdit = function () {
                    util.preloader.inc();
                    webix.ajax().headers({
                        "Content-type": "application/json"
                    }).put(editLink, JSON.stringify(data), {
                        error: function (text, data, xhr) {
                            if (xhr.status == 401) {
                                if (connection.showSEM) {
                                    util.messages.showSessionExpiredError();
                                    connection.showSEM = false;
                                }
                                connection.reload();
                            } else {
                                util.messages.showErrorMessage("Greška prlikom izmjene podataka.");
                                data[column] = oldValue;
                                try {
                                    $$(dtId).updateItem(id, data);
                                } catch (ex) {
                                }
                            }
                            util.preloader.dec();
                        }, success: function () {
                            util.preloader.dec();
                        }
                    });
                };

                if (typeof editValidationRules !== 'undefined') {
                    for (var i = 0; i < editValidationRules.length; i++) {
                        if (editValidationRules[i].column == editor.column) {
                            if (editValidationRules[i].rule == "canChange") {

                                var url = editValidationRules[i].validateUrl.replace("{id}", id).replace("{value}", newValue);

                                var editError = function () {
                                    util.messages.showErrorMessage("Unesena vrijednost već postoji.");
                                    data[column] = oldValue;
                                    $$(dtId).updateItem(id, data);
                                };


                                connection.sendAjax("GET", url,
                                    function (text, data, xhr) {
                                        if (text != "true") editError();
                                        else {
                                            console.log("connection commit edit")
                                            commitEdit();
                                        }
                                    }, function () {
                                        editError();
                                    });

                                return true;

                            } else if (util.validation.validateUponEdit(editor, editValidationRules[i].rule, editValidationRules[i].boundaries)) ;// break;
                            else {
                                setTimeout(function () {
                                    data[column] = oldValue;
                                    $$(dtId).updateItem(id, data);
                                }, 0);
                                return true;
                            }
                        }
                    }
                }


                util.preloader.inc();
                webix.ajax().headers({
                    "Content-type": "application/json"
                }).put(editLink, JSON.stringify(data), {
                    error: function (text, data, xhr) {
                        if (xhr.status == 401) {
                            if (connection.showSEM) {
                                util.messages.showSessionExpiredError();
                                connection.showSEM = false;
                            }
                            connection.reload();
                        } else {
                            util.messages.showErrorMessage("Greška prlikom izmjene podataka.");
                            data[column] = oldValue;
                            try {
                                $$(dtId).updateItem(id, data);
                            } catch (ex) {
                            }
                        }
                        util.preloader.dec();
                    }, success: function () {
                        util.preloader.dec();
                    }
                });

                return true;
            });

            $$(dtId).attachEvent("onBeforeDelete", function (id) {

                var forDelete = webix.storage.local.get("for_delete");

                if (forDelete.indexOf(id) > -1) {

                    var index = forDelete.indexOf(id);
                    if (index > -1) {
                        forDelete.splice(index, 1);
                    }
                    webix.storage.local.put("for_delete", forDelete);

                    return true;
                }

                forDelete.push(id);
                webix.storage.local.put("for_delete", forDelete);

                var deleteLink = link + "/" + id;

                util.preloader.inc();
                webix.ajax().headers({
                    "Content-type": "application/json"
                }).del(deleteLink, {
                    error: function (text, data, xhr) {
                        if (xhr.status == 401) {
                            if (connection.showSEM) {
                                util.messages.showSessionExpiredError();
                                connection.showSEM = false;
                            }
                            connection.reload();
                        } else {
                            util.messages.showErrorMessage("Greška prlikom brisanja podataka.");
                            var forDelete = webix.storage.local.get("for_delete");
                            var index = forDelete.indexOf(id);
                            if (index > -1) {
                                forDelete.splice(index, 1);
                            }
                            webix.storage.local.put("for_delete", forDelete);
                        }
                        util.preloader.dec();
                    },
                    success: function (text, data, xhr) {
                        try {
                            $$(dtId).remove(id);
                        } catch (ex) {
                        }
                        util.preloader.dec();
                    }
                });

                return false;

            });
        },
    };

//webix connection methods
webix.proxy.hub = {
    $proxy: true,
    load: function (view, callback, url) {
        util.preloader.inc();
        webix.ajax(this.source, callback, view).then(function () {
            util.preloader.dec();
        }).fail(function (err) {
            util.messages.showErrorMessage("Nije moguće prikupiti podatke sa servera.");
            util.preloader.dec();
        });

    }
};