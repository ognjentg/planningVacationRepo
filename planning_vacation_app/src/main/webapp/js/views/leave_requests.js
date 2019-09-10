var URLAllLeaveRequests = "/hub/leave_request/leaveRequestInfo";
var URLByLeaveRequestStatus = "/hub/leave_request/leaveRequestFilteredByLeaveRequestStatus/";
var URLByLeaveRequestStatusBySector = "/hub/leave_request/leaveRequestFilteredBySectorIdAndLeaveRequestStatus/";
var leaveRequestsView;
var tempComment, rejComment;
leaveRequestsView = {
    selectPanel: function () {
        $$("main").removeView(rightPanel);
        rightPanel = "leaveRequestsPanel";
        var panelCopy = webix.copy(this.getPanel());
        $$("main").addView(panelCopy);
        webix.protoUI({
            name: "fadeInWindow",
            $init: function () {
                this.$ready.push(function () {
                    this.attachEvent("onShow", function () {
                        this.$view.className = this.$view.className.split("animated")[0] + " animated fadeInDownBig";
                    })
                    this.attachEvent("onHide", function () {
                        this.$view.style.display = "block";
                        this.$view.className += " animated fadeOutUpBig";
                    })
                });
            }
        }, webix.ui.window);
        if (userData.userGroupKey == "sekretar") {
            $$("leave_requestDT").hideColumn("accept");
            $$("leave_requestDT").hideColumn("reject");
        }
    },
    getPanel: function () {
        return {
            id: "leaveRequestsPanel",
            rows: [
                {
                    padding: 8,
                    view: "toolbar",
                    css: {"background": "#ffffff !important"},
                    cols: [{
                        template: "<span class='webix_icon fa-list'><\/span> Zahtjevi za odmor",
                        view: "label",
                        css: {"color": "black !important"},
                        width: 400
                    }, {}, {
                        view: "combo",
                        width: 250,
                        id: "filterLeaveRequestsComboBox",
                        label: "Vrsta zahtjeva",
                        labelWidth: 100,
                        value: "4",
                        placeholder: "Svi",
                        align: "left",
                        on: {
                            onChange(name) {
                                $$("leave_requestDT").clearAll();


                                if (userData.userGroupKey == "menadzer") {
                                    if (name === 4) {
                                        $$("leave_requestDT").hideColumn("typeId");
                                        $$("leave_requestDT").showColumn("accept");
                                        $$("leave_requestDT").showColumn("reject");
                                        $$("leave_requestDT").define("url", "/hub/leave_request/leaveRequestInfo");
                                        $$("leave_requestDT").detachEvent("onBeforeDelete")
                                    } else if (name === 3) {
                                        $$("leave_requestDT").hideColumn("typeId");
                                        $$("leave_requestDT").hideColumn("accept");
                                        $$("leave_requestDT").hideColumn("reject");
                                        $$("leave_requestDT").define("url", "/hub/leave_request/leaveRequestFilteredBySectorIdAndLeaveRequestStatus/" + name + "/" + userData.sectorId);
                                        $$("leave_requestDT").detachEvent("onBeforeDelete");
                                    } else if (name === 2) {
                                        $$("leave_requestDT").showColumn("typeId");
                                        $$("leave_requestDT").hideColumn("accept");
                                        $$("leave_requestDT").hideColumn("reject");
                                        $$("leave_requestDT").define("url", "/hub/leave_request/leaveRequestFilteredBySectorIdAndLeaveRequestStatus/" + name + "/" + userData.sectorId);
                                        $$("leave_requestDT").detachEvent("onBeforeDelete");
                                    } else if (name === 1) {
                                        $$("leave_requestDT").hideColumn("typeId");
                                        $$("leave_requestDT").showColumn("accept");
                                        $$("leave_requestDT").showColumn("reject");
                                        $$("leave_requestDT").define("url", "/hub/leave_request/leaveRequestFilteredBySectorIdAndLeaveRequestStatus/" + name + "/" + userData.sectorId);
                                        $$("leave_requestDT").detachEvent("onBeforeDelete");
                                    } else if (name === 5) {
                                        $$("leave_requestDT").hideColumn("typeId");
                                        $$("leave_requestDT").showColumn("accept");
                                        $$("leave_requestDT").showColumn("reject");
                                        $$("leave_requestDT").define("url", "/hub/leave_request/leaveRequestFilteredBySectorIdAndLeaveRequestStatus/" + name + "/" + userData.sectorId);
                                        $$("leave_requestDT").detachEvent("onBeforeDelete");
                                    } else if (name === 6) {
                                        $$("leave_requestDT").hideColumn("typeId");
                                        $$("leave_requestDT").hideColumn("accept");
                                        $$("leave_requestDT").hideColumn("reject");
                                        $$("leave_requestDT").define("url", "/hub/leave_request/leaveRequestFilteredBySectorIdAndLeaveRequestStatus/" + name + "/" + userData.sectorId);
                                        $$("leave_requestDT").detachEvent("onBeforeDelete");
                                    }
                                } else {
                                    if (name === 4) {
                                        $$("leave_requestDT").hideColumn("typeId");
                                        $$("leave_requestDT").showColumn("accept");
                                        $$("leave_requestDT").showColumn("reject");
                                        $$("leave_requestDT").define("url", "/hub/leave_request/leaveRequestInfo");
                                        $$("leave_requestDT").detachEvent("onBeforeDelete")
                                    } else if (name === 3) {
                                        $$("leave_requestDT").hideColumn("typeId");
                                        $$("leave_requestDT").hideColumn("accept");
                                        $$("leave_requestDT").hideColumn("reject");
                                        $$("leave_requestDT").define("url", "/hub/leave_request/leaveRequestFilteredByLeaveRequestStatus/" + name);
                                        $$("leave_requestDT").detachEvent("onBeforeDelete");
                                    } else if (name === 2) {
                                        $$("leave_requestDT").showColumn("typeId");
                                        $$("leave_requestDT").hideColumn("accept");
                                        $$("leave_requestDT").hideColumn("reject");
                                        $$("leave_requestDT").define("url", "/hub/leave_request/leaveRequestFilteredByLeaveRequestStatus/" + name);
                                        $$("leave_requestDT").detachEvent("onBeforeDelete");
                                    } else if (name === 1) {
                                        $$("leave_requestDT").hideColumn("typeId");
                                        $$("leave_requestDT").showColumn("accept");
                                        $$("leave_requestDT").showColumn("reject");
                                        $$("leave_requestDT").define("url", "/hub/leave_request/leaveRequestFilteredByLeaveRequestStatus/" + name);
                                        $$("leave_requestDT").detachEvent("onBeforeDelete");
                                    } else if (name === 5) {
                                        $$("leave_requestDT").hideColumn("typeId");
                                        $$("leave_requestDT").showColumn("accept");
                                        $$("leave_requestDT").showColumn("reject");
                                        $$("leave_requestDT").define("url", "/hub/leave_request/leaveRequestFilteredByLeaveRequestStatus/" + name);
                                        $$("leave_requestDT").detachEvent("onBeforeDelete");
                                    } else if (name === 6) {
                                        $$("leave_requestDT").hideColumn("typeId");
                                        $$("leave_requestDT").hideColumn("accept");
                                        $$("leave_requestDT").hideColumn("reject");
                                        $$("leave_requestDT").define("url", "/hub/leave_request/leaveRequestFilteredByLeaveRequestStatus/" + name);
                                        $$("leave_requestDT").detachEvent("onBeforeDelete");
                                    }
                                }


                                if (userData.userGroupKey == "sekretar") {
                                    $$("leave_requestDT").hideColumn("accept");
                                    $$("leave_requestDT").hideColumn("reject");
                                }
                            }
                        },
                        options: {
                            body: {
                                template: '#name#',
                                url: "/hub/leave_request_status"
                            }
                        },
                        required: true,
                    }]
                }, {
                    view: "datatable",
                    id: "leave_requestDT",
                    margin: 10,
                    multiselect: false,
                    tooltip: {
                        dx: -35,
                        dy: 20
                    },
                    navigation: true,
                    select: "row",
                    resizeColumn: true,
                    resizeRow: true,
                    onContext: {},
                    pager: "pagerA",
                    scheme: {
                        $init: function (obj) {
                            if (obj.dateFrom)
                                obj.dateFrom = new Date(obj.dateFrom);
                            if (obj.dateTo)
                                obj.dateTo = new Date(obj.dateTo);
                        },
                        $change: function (obj) {
                            if (obj.dateFrom)
                                obj.dateFrom = new Date(obj.dateFrom);
                            if (obj.dateTo)
                                obj.dateTo = new Date(obj.dateTo);
                        },
                    },
                    columns: [{
                        id: "id",
                        header: "#",
                        sort: "int",
                        width: 50,
                        hidden: "true",
                    }, {
                        id: "statusName",
                        sort: "string",
                        header: "Status",
                    }, {
                        id: "category",
                        sort: "string",
                        header: "Kategorija"
                    }, {
                        id: "typeId",
                        sort: "string",
                        header: "Tip",
                        hidden: "true"
                    }, {
                        id: "firstName",
                        fillspace: true,
                        editor: "text",
                        sort: "string",
                        header: [
                            "Ime", {
                                content: "textFilter", value: ""
                            }
                        ]
                    }, {
                        id: "lastName",
                        fillspace: true,
                        editor: "text",
                        sort: "string",
                        header: [
                            "Prezime", {
                                content: "textFilter", value: ""
                            }
                        ]
                    }, {
                        id: "dateFrom",
                        fillspace: true,
                        sort: "date",
                        header: [
                            "Datum od", {
                                content: "dateFilter"
                            }
                        ],
                        format: webix.Date.dateToStr("%d.%m.%Y.")
                    }, {
                        id: "dateTo",
                        fillspace: true,
                        sort: "date",
                        header: [
                            "Datum do", {
                                content: "dateFilter"
                            }
                        ],
                        format: webix.Date.dateToStr("%d.%m.%Y.")

                    }, {
                        id: "numberOfDays",
                        header: "Broj dana",
                        sort: "int"
                    }, {
                        id: "accept",
                        header: "&nbsp;",
                        width: 35,
                        tooltip: "Prihvati",
                        template: function (obj) {
                            var pom = obj.statusName;
                            if ((pom != "Odobreno") && (pom != "Odbijeno") && (pom != "Otkazano")) {
                                return "<span  style='color:#777777; 0; cursor:pointer;' class='webix_icon fa-check'></span>";
                            } else return "";
                        }
                    }, {
                        id: "reject",
                        header: "&nbsp;",
                        tooltip: "Odbij",
                        width: 35,
                        template: function (obj) {
                            var pom = obj.statusName;
                            if ((pom != "Odobreno") && (pom != "Odbijeno") && (pom != "Otkazano"))
                                return "<span  style='color:#777777; 0; cursor:pointer;' class='webix_icon fa-times'></span>";
                            else return "";
                        }

                    }, {
                        id: "view",
                        header: "&nbsp;",
                        tooltip: "Pregled",
                        width: 35,
                        template: "<span  style='color:#777777; 0; cursor:pointer;' class='webix_icon fa-eye'></span>"
                    }
                    ],
                    url: "/hub/leave_request/leaveRequestInfo",
                    on: {
                        onAfterLoad: function () {
                            this.sort("id", "desc");
                            this.markSorting("id", "desc");
                        },

                        onAfterContextMenu: function (item) {
                            this.select(item.row);
                        }

                    },
                    onClick: {
                        webix_icon: function (e, id) {
                            var action = id["column"];
                            $$("leave_requestDT").select(id);
                            if (action === "reject" && (userData.userGroupKey == "admin" || userData.userGroupKey == "direktor" || userData.userGroupKey == "menadzer")) {
                                var rejectLeaveBox = (webix.copy(leaveRequestsView.showRejectRequest(id)));

                            } else if (action === "accept" && (userData.userGroupKey == "admin" || userData.userGroupKey == "direktor" || userData.userGroupKey == "menadzer")) {
                                var kategorija = $$("leave_requestDT").getSelectedItem().category;
                                var status = $$("leave_requestDT").getSelectedItem().statusName
                                if (status == "Otkazivanje") {
                                    webix.ui(webix.copy(leaveRequestsView.cancellationDialog)).show();
                                } else {
                                    webix.ui(webix.copy(leaveRequestsView.acceptDialog)).show();
                                }
                                if ("Godišnji" == kategorija || "Godisnji" == kategorija || "Praznik" == kategorija) {
                                    $$("radioId").hide();
                                }

                                connection.sendAjax("GET",
                                    "/hub/leave_request/leaveRequestInfo/" + id,
                                    function (text, data, xhr) {
                                        user = data.json();
                                        $$("acceptFname").setValue(user.firstName);
                                        $$("acceptLname").setValue(user.lastName);
                                        $$("acceptCategory").setValue(user.category);
                                    }, function (text, data, xhr) {
                                        util.messages.showErrorMessage(text);
                                    });

                            } else if (action === "view") {
                                var viewLeaveBox = (webix.copy(leaveRequestsView.showLeaveRequestInfo(id)));
                            }
                        }
                    }
                },
                {
                    view: "toolbar",
                    css: "highlighted_header header6",
                    paddingX: 5,
                    paddingY: 5,
                    height: 40,
                    cols: [{
                        view: "pager", id: "pagerA",
                        template: "{common.first()}{common.prev()}&nbsp; {common.pages()}&nbsp; {common.next()}{common.last()}",
                        size: 20,
                        height: 35,
                        group: 5,
                        animate: {
                            direction: "top"
                        },
                    }
                    ]
                }
            ]
        }
    },
    showRejectRequest: function (id) {
        webix.ui(webix.copy(leaveRequestsView.rejectRequest));
        connection.sendAjax("GET",
            "/hub/leave_request/leaveRequestInfo/" + id,
            function (text, data, xhr) {
                user = data.json();
                $$("rejectFname").setValue(user.firstName);
                $$("rejectLname").setValue(user.lastName);
                $$("rejectStatus").setValue(user.statusName);
                setTimeout(function () {
                    $$("rejectRequestInfoId").show();
                }, 0);
            }, function (text, data, xhr) {
                util.messages.showErrorMessage(text);
            });

    },
    acceptRequestFunction: function () {
        var type;//vraca tip odsustva(placeno(1),neplaceno(2))
        var paid;//setovanje boolean-a(placeno(1),neplaceno(0))
        var pom = $$("radioId").getValue();
        if (pom == "Plaćeno") {
            type = 1;
            paid = 1;
        } else {
            type = 2;
            paid = 0;
        }

        var item = $$("leave_requestDT").getItem(id);
        var id = $$("leave_requestDT").getSelectedId();
        $$("leave_requestDT").detachEvent("onBeforeDelete");
        var requestStatusName = $$("leave_requestDT").getSelectedItem().statusName;
        var requestType = $$("filterLeaveRequestsComboBox").getValue();
        if (requestStatusName == "Otkazivanje") {
            var item = $$("leave_requestDT").getItem(id);
            $$("leave_requestDT").detachEvent("onBeforeDelete");
            connection.sendAjax("PUT", "/hub/leave_request/updateLeaveRequestStatusToCancel/" + id, function (text, data, xhr) {
                util.messages.showMessage("Zahtjev postavljen na otkazivanje");
                $$("leave_requestDT").define("url", "/hub/leave_request/leaveRequestInfo");
                if (requestType == 1) {
                    $$("leave_requestDT").remove(id);
                    $$("leave_requestDT").refresh();
                }
                if (requestType == 5) {
                    $$("leave_requestDT").remove(id);
                    $$("leave_requestDT").refresh();
                }

            }, function (text, data, xhr) {
                util.messages.showErrorMessage(text);
            }, item);
            util.dismissDialog('cancellationDialogId');
        } else {
            connection.sendAjax("GET", "/hub/leave_request/updateLeaveRequestStatusApproved/" + id + "/" + type + "/" + paid, function (text, data, xhr) {
                util.messages.showMessage("Zahtjev odobren");
                $$("leave_requestDT").define("url", "/hub/leave_request/leaveRequestInfo");

                if (requestType == 1) {
                    $$("leave_requestDT").remove(id);
                    $$("leave_requestDT").refresh();
                }
                if (requestType == 5) {
                    $$("leave_requestDT").remove(id);
                    $$("leave_requestDT").refresh();
                }

            }, function (text, data, xhr) {
                util.messages.showErrorMessage(text);
            }, item);
            util.dismissDialog('acceptDialogId');
        }
    },

    rejectRequest: {
        view: "fadeInWindow",
        id: "rejectRequestInfoId",
        position: "center",
        modal: true,
        move: true,
        body: {
            padding: 15,
            rows: [
                {
                    view: "toolbar",
                    cols: [{
                        view: "label",
                        label: "<span class='webix_icon fa-user'></span> Odbijanje zahtjeva:",
                        width: 400,
                    }, {}, {
                        hotkey: 'esc',
                        view: "icon",
                        icon: "close",
                        align: "right",
                        click: 'util.dismissDialog(\'rejectRequestInfoId\');'
                    }]
                }, {
                    cols: [{
                        view: "label",
                        label: "Ime:"
                    }, {}, {
                        view: "label",
                        id: "rejectFname"
                    }]
                }, {
                    cols: [{
                        view: "label",
                        label: "Prezime:"
                    }, {}, {
                        view: "label",
                        id: "rejectLname"
                    }]
                }, {
                    cols: [{
                        view: "label",
                        label: "Status:"
                    }, {}, {
                        view: "label",
                        id: "rejectStatus"
                    }]
                },
                {

                    view: "textarea",
                    id: "rejectComment",
                    required: true,
                    label: "Komentar:",
                    height: 150,
                    attributes: {
                        maxlength: 128
                    }

                }, {}, {}, {
                    cols: [{
                        view: "button",
                        label: "Odbij",
                        id: "rejectButton",
                        click: 'leaveRequestsView.saveRejectedLeaveRequest',
                        hotkey: "enter"
                    }, {}, {
                        view: "button",
                        label: "Otkaži",
                        click: 'util.dismissDialog(\'rejectRequestInfoId\');'

                    }]
                }
            ]
        }

    },
    leaveRequestInfo: {
        view: "fadeInWindow",
        id: "leaveRequestInfoId",
        position: "center",
        modal: true,
        move: true,
        body: {

            padding: 15,
            rows: [
                {
                    view: "toolbar",
                    cols: [{
                        view: "label",
                        label: "<span class='webix_icon fa-user'></span> Informacije o zahtjevu:",
                        width: 400,
                    }, {}, {
                        hotkey: 'esc',
                        view: "icon",
                        icon: "close",
                        align: "right",
                        click: 'util.dismissDialog(\'leaveRequestInfoId\');'
                    }]
                }, {
                    cols: [{
                        view: "label",
                        label: "Ime:"
                    }, {}, {
                        view: "label",
                        id: "fname"
                    }]
                }, {
                    cols: [{
                        view: "label",
                        label: "Prezime:"
                    }, {}, {
                        view: "label",
                        id: "lname"

                    }]
                }, {
                    cols: [{
                        view: "label",
                        label: "Status:"
                    }, {}, {
                        view: "label",
                        id: "status"
                    }]
                },
                {
                    cols: [{
                        view: "label",
                        label: "Komentar pošiljaoca:"
                    }, {}, {
                        view: "button",
                        template: "<span style = 'cursor:pointer;' class='webix_icon fa-eye'></span>",
                        id: "comment",
                        click: 'leaveRequestsView.showSenderComment'
                    }]
                }, {
                    cols: [{
                        view: "label",
                        id: "commentApproverLabel",
                        label: "Komentar odbijanja:",
                        hidden: true
                    }, {}, {
                        view: "button",
                        template: "<span style = 'cursor:pointer;' class='webix_icon fa-eye'></span>",
                        id: "approverComment",
                        hidden: true,
                        click: 'leaveRequestsView.showRejectComment'

                    }]

                }, {
                    cols: [{
                        view: "label",
                        label: "Datum od:"
                    }, {}, {
                        view: "label",
                        id: "dateFromId"

                    }]

                }, {

                    cols: [{
                        view: "label",
                        label: "Datum do:"

                    }, {}, {
                        view: "label",
                        id: "dateToId"
                    }]
                }, {

                    cols: [{
                        view: "label",
                        label: "Obradio:"

                    }, {}, {
                        view: "label",
                        id: "approverUserName"
                    }]
                }
            ]
        }

    },
    senderCommentDialog: {
        view: "popup",
        id: "senderCommentDialog",
        position: "center",
        modal: true,
        move: true,
        body: {
            rows: [
                {
                    view: "toolbar",
                    cols: [
                        {
                            view: "label",
                            width: 400,
                            label: "Komentar pošiljaoca"
                        },
                        {},
                        {
                            view: "icon",
                            icon: "close",
                            align: "right",
                            hotkey: "esc",
                            click: "util.dismissDialog('senderCommentDialog')"
                        }
                    ]
                },
                {
                    view: "form",
                    height: 200,
                    elements: [
                        {
                            view: "textarea",
                            readonly: true,
                            id: "senderCommentLabel"
                        }
                    ]
                }
            ]
        }
    },
    rejectCommentDialog: {
        view: "popup",
        id: "rejectCommentDialog",
        position: "center",
        modal: true,
        move: true,
        body: {
            rows: [
                {
                    view: "toolbar",
                    cols: [
                        {
                            view: "label",
                            width: 400,
                            label: "Komentar odbijanja"
                        },
                        {},
                        {
                            view: "icon",
                            icon: "close",
                            align: "right",
                            hotkey: "esc",
                            click: "util.dismissDialog('rejectCommentDialog')"
                        }
                    ]
                },
                {
                    view: "form",
                    height: 200,
                    elements: [
                        {
                            view: "textarea",
                            id: "rejectCommentLabel"
                        }
                    ]
                }
            ]
        }
    },

    showSenderComment: function () {
        if(tempComment==""){
            webix.ui(webix.copy(leaveRequestsView.senderCommentDialog));
            $$("senderCommentDialog").show();
            $$("senderCommentLabel").setValue("Nema komentara.");
        }else{
            webix.ui(webix.copy(leaveRequestsView.senderCommentDialog));
            $$("senderCommentDialog").show();
            $$("senderCommentLabel").setValue(tempComment);
        }


    },
    showRejectComment: function () {
        webix.ui(webix.copy(leaveRequestsView.rejectCommentDialog));
        $$("rejectCommentDialog").show();
        $$("rejectCommentLabel").setValue(rejComment);

    },
    showLeaveRequestInfo: function (id) {
        webix.ui(webix.copy(leaveRequestsView.leaveRequestInfo));

        connection.sendAjax("GET",
            "/hub/leave_request/leaveRequestInfo/" + id,
            function (text, data, xhr) {
                user = data.json();
                $$("fname").setValue(user.firstName);
                $$("lname").setValue(user.lastName);
                $$("status").setValue(user.statusName);
                tempComment = user.senderComment;
                if (user.statusName == "Na čekanju") {
                    $$("approverUserName").setValue("-");
                } else
                    $$("approverUserName").setValue(user.approverUserFirstName + " " + user.approverUserLastName);
                if (user.approverComment != null) {
                    rejComment = user.approverComment;
                    $$("approverComment").show();
                    $$("commentApproverLabel").show();
                }
                var format = webix.Date.dateToStr("%d.%m.%Y.");
                var dF = format(new Date(user.dateFrom));
                var dT = format(new Date(user.dateTo));
                $$("dateFromId").setValue(dF);
                $$("dateToId").setValue(dT);
                setTimeout(function () {
                    $$("leaveRequestInfoId").show();
                }, 0);
            }, function (text, data, xhr) {
                util.messages.showErrorMessage(text);
            });


    },
    saveRejectedLeaveRequest: function () {

        var id = $$("leave_requestDT").getSelectedId();
        $$("leave_requestDT").detachEvent("onBeforeDelete");
        var requestStatusName = $$("leave_requestDT").getSelectedItem().statusName;
        if (requestStatusName == "Otkazivanje") {
            var item = $$("leave_requestDT").getItem(id);

            var komentar = $$("rejectComment").getValue();

            if (komentar == "") {
                util.messages.showErrorMessage("Komentar je obavezan");
            } else {
                comment = $$("rejectComment").getValue() ? $$("rejectComment").getValue() : "";
                $$("leave_requestDT").detachEvent("onBeforeDelete");
                connection.sendAjax("PUT", "/hub/leave_request/updateLeaveRequestStatusToApproved/" + id + "/comment/" + comment, function (text, data, xhr) {

                    var requestType = $$("filterLeaveRequestsComboBox").getValue();

                    if (requestType != 4) {
                        $$("leave_requestDT").remove(id);
                        $$("leave_requestDT").refresh();
                    }
                    util.messages.showMessage("Zahtjev otkazan");
                    $$("leave_requestDT").define("url", "/hub/leave_request/leaveRequestInfo");
                }, function (text, data, xhr) {
                    util.messages.showErrorMessage(text);
                }, item);
                util.dismissDialog("rejectRequestInfoId");
            }
        } else {

            var komentar = $$("rejectComment").getValue();

            if (komentar == "") {
                util.messages.showErrorMessage("Komentar je obavezan");
            } else {
                id = $$("leave_requestDT").getSelectedId();
                comment = $$("rejectComment").getValue() ? $$("rejectComment").getValue() : "";
                connection.sendAjax("GET",
                    "/hub/leave_request/updateLeaveRequestStatusRejected/" + id + "/comment/" + comment, function (text, data, xhr) {
                        util.messages.showMessage("Zahtjev odbijen");
                        $$("leave_requestDT").remove(id);
                        $$("leave_requestDT").refresh();
                    }
                    , function (text, data, xhr) {
                        util.messages.showErrorMessage(text);
                    });
                util.dismissDialog("rejectRequestInfoId");
            }
        }
    },
    acceptDialog: {
        view: "fadeInWindow",
        id: "acceptDialogId",
        position: "center",
        modal: true,
        move: true,
        body: {
            rows: [
                {
                    view: "toolbar",
                    cols: [{
                        view: "label",
                        label: "<span class='webix_icon fa-user'></span> Odobravanje zahtjeva za odmor:",
                        width: 400,
                    }, {}, {
                        hotkey: 'esc',
                        view: "icon",
                        icon: "close",
                        align: "right",
                        click: 'util.dismissDialog(\'acceptDialogId\');'
                    }]
                }, {
                    cols: [{
                        view: "label",
                        label: "Ime:"
                    }, {}, {
                        view: "label",
                        id: "acceptFname"
                    }]
                }, {
                    cols: [{
                        view: "label",
                        label: "Prezime:"
                    }, {}, {
                        view: "label",
                        id: "acceptLname"
                    }]
                }, {
                    cols: [{
                        view: "label",
                        label: "Kategorija:"
                    }, {}, {
                        view: "label",
                        id: "acceptCategory"
                    }]
                },
                {
                    view: "radio",
                    id: "radioId",
                    options: ["Plaćeno", "Neplaćeno"],
                    value: "Plaćeno"
                },
                {
                    cols: [{
                        view: "button",
                        id: "acceptButtonId",
                        value: "Odobri",
                        click: "leaveRequestsView.acceptRequestFunction"

                    },
                        {
                            view: "button",
                            id: "ignoreButtonId",
                            value: "Zatvori",
                            click: "util.dismissDialog('acceptDialogId')"
                        }
                    ]
                }
            ]
        }
    },

    cancellationDialog: {
        view: "fadeInWindow",
        id: "cancellationDialogId",
        position: "center",
        modal: true,
        move: true,
        body: {
            rows: [
                {
                    view: "toolbar",
                    cols: [{
                        view: "label",
                        label: "<span class='webix_icon fa-user'></span> Otkazivanje zahtjeva :",
                        width: 400,
                    }, {}, {
                        hotkey: 'esc',
                        view: "icon",
                        icon: "close",
                        align: "right",
                        click: 'util.dismissDialog(\'cancellationDialogId\');'
                    }]
                }, {
                    cols: [{
                        view: "label",
                        label: "Ime:"
                    }, {}, {
                        view: "label",
                        id: "acceptFname"
                    }]
                }, {
                    cols: [{
                        view: "label",
                        label: "Prezime:"
                    }, {}, {
                        view: "label",
                        id: "acceptLname"
                    }]
                }, {
                    cols: [{
                        view: "label",
                        label: "Kategorija:"
                    }, {}, {
                        view: "label",
                        id: "acceptCategory"
                    }]
                },
                {
                    view: "radio",
                    id: "radioId",
                    options: ["Plaćeno", "Neplaćeno"],
                    value: "Plaćeno",
                    hidden: true,
                },
                {
                    cols: [{
                        view: "button",
                        id: "acceptButtonId",
                        value: "Otkaži",
                        click: "leaveRequestsView.acceptRequestFunction"

                    },
                        {
                            view: "button",
                            id: "ignoreButtonId",
                            value: "Zatvori",
                            click: "util.dismissDialog('cancellationDialogId')"
                        }
                    ]
                }
            ]
        }
    },


};

function refreshOnData() {

    webix.extend($$("leave_requestDT"), webix.ProgressBar);

    var table = webix.$$("leave_requestDT");
    var comboItemId = $$("filterLeaveRequestsComboBox").getValue();
    var sectorId = userData.sectorId;
    var URLCurrentUrl = null;


    if (userData.userGroupKey == "menadzer") {
        if (comboItemId == 4) {
            URLCurrentUrl = URLAllLeaveRequests;
        } else {
            URLCurrentUrl = URLByLeaveRequestStatusBySector;
        }
    } else {
        if (comboItemId == 4) {
            URLCurrentUrl = URLAllLeaveRequests;
        } else {
            URLCurrentUrl = URLByLeaveRequestStatus;
        }
    }

    if (userData.userGroupKey == "menadzer") {
        if (comboItemId == 4) {
            webix.ajax(URLCurrentUrl, {

                error: function (text, data, xhr) {
                    if (xhr.status != 200) {
                        util.messages.showMessage("No data to load! Check your internet connection and try again.");
                        table.hideProgress();
                    }
                },
                success: function (text, data, xhr) {
                    if (xhr.status === 200) {
                        if (data.json() != null) {
                            table.clearAll();
                            table.load(URLCurrentUrl);
                            table.refresh();
                        }
                    }
                }
            });
        } else {
            webix.ajax(URLCurrentUrl + comboItemId + "/" + sectorId, {

                error: function (text, data, xhr) {
                    if (xhr.status != 200) {
                        util.messages.showMessage("No data to load! Check your internet connection and try again.");
                        table.hideProgress();
                    }
                },
                success: function (text, data, xhr) {
                    if (xhr.status === 200) {
                        if (data.json() != null) {
                            table.clearAll();
                            table.load(URLCurrentUrl + comboItemId + "/" + sectorId);
                            table.refresh();
                        }
                    }
                }
            });
        }

    } else {

        if (comboItemId == 4) {
            webix.ajax(URLCurrentUrl, {
                error: function (text, data, xhr) {
                    if (xhr.status != 200) {
                        util.messages.showMessage("No data to load! Check your internet connection and try again.");
                        table.hideProgress();
                    }
                },
                success: function (text, data, xhr) {
                    if (xhr.status === 200) {
                        if (data.json() != null) {
                            table.clearAll();
                            table.load(URLCurrentUrl);
                            table.refresh();
                        }
                    }
                }
            });
        } else {
            webix.ajax(URLCurrentUrl + comboItemId, {


                error: function (text, data, xhr) {
                    if (xhr.status != 200) {
                        util.messages.showMessage("No data to load! Check your internet connection and try again.");
                        table.hideProgress();
                    }
                },
                success: function (text, data, xhr) {
                    if (xhr.status === 200) {
                        if (data.json() != null) {
                            table.clearAll();
                            table.load(URLCurrentUrl + comboItemId);
                            table.refresh();
                        }
                    }
                }
            });
        }
    }
}