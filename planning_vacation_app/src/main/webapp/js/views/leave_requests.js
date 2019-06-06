var URLAllLeaveRequests = "/hub/leave_request/leaveRequestInfo";
var URLByLeaveRequestStatus =  "/hub/leave_request/leaveRequestFilteredByLeaveRequestStatus/";
var leaveRequestsView;
leaveRequestsView = {
    selectPanel: function () {
        $$("main").removeView(rightPanel); // brisanje trenutno prikazanog view-a na stranici kako bi se prikazao facultyView
        rightPanel = "requestPanel";

        var panelCopy = webix.copy(this.getPanel()); // webix.copy -> duboka kopija
        $$("main").addView(panelCopy);
    },
    getPanel: function () {
        return {
            id: "leaveRequestsPanel",
            rows: [
                {
                    padding: 8,
                    view: "toolbar",
                    cols: [{
                        template: "<span class='webix_icon fa-book-medical'><\/span> Zahtjevi za odmor",
                        view: "label",
                        width: 400
                    }, {}, {
                        view: "combo",
                        width: 250,
                        id: "filterLeaveRequestsComboBox",
                        label: "Vrsta zahtjeva",
                        labelWidth: 100,
                        value: "1",
                        on: {
                            onChange(name) {
                                $$("leave_requestDT").clearAll();


                                if (name === 4) {
                                    $$("leave_requestDT").hideColumn("accept");
                                    $$("leave_requestDT").hideColumn("reject");
                                    connection.attachAjaxEvents("leave_requestDT", "/hub/leave_request/leaveRequestInfo");
                                    $$("leave_requestDT").define("url", "/hub/leave_request/leaveRequestInfo");
                                    $$("leave_requestDT").detachEvent("onBeforeDelete")
                                } else if (name === 3) {
                                    $$("leave_requestDT").hideColumn("accept");
                                    $$("leave_requestDT").hideColumn("reject");
                                    connection.attachAjaxEvents("leave_requestDT", "/hub/leave_request/leaveRequestFilteredByLeaveRequestStatus/" + name);
                                    $$("leave_requestDT").define("url", "/hub/leave_request/leaveRequestFilteredByLeaveRequestStatus/" + name);
                                    $$("leave_requestDT").detachEvent("onBeforeDelete");
                                } else if (name === 2) {
                                    $$("leave_requestDT").hideColumn("accept");
                                    $$("leave_requestDT").hideColumn("reject");
                                    connection.attachAjaxEvents("leave_requestDT", "/hub/leave_request/leaveRequestFilteredByLeaveRequestStatus/" + name);
                                    $$("leave_requestDT").define("url", "/hub/leave_request/leaveRequestFilteredByLeaveRequestStatus/" + name);
                                    $$("leave_requestDT").detachEvent("onBeforeDelete");
                                }
                                else {
                                    $$("leave_requestDT").showColumn("accept");
                                    $$("leave_requestDT").showColumn("reject");
                                    connection.attachAjaxEvents("leave_requestDT", "/hub/leave_request/leaveRequestFilteredByLeaveRequestStatus/" + name);
                                    $$("leave_requestDT").define("url", "/hub/leave_request/leaveRequestFilteredByLeaveRequestStatus/" + name);
                                    $$("leave_requestDT").detachEvent("onBeforeDelete");
                                }
                            }
                        },
                        options: {
                            body: {
                                template: '#name#',
                                url: "/hub/leave_request_status",
                            }
                        }
                        ,
                        required: true,
                    }]
                }, {

                    view: "datatable",
                    id: "leave_requestDT",
                    margin: 10,
                    multiselect: false,
                    navigation: true, // omoguceno selektovanje redova navigacijskim tasterima na tastaturi
                    select: "row", // cell
                    resizeColumn: true, // omogucen resize kolona korisniku
                    resizeRow: true, // omogucen resize redova korisniku
                    onContext: {},
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
                        }
                    },
                    columns: [{
                        id: "id",
                        header: "#",
                        width: 50,
                        hidden: "true",
                    }, {
                        id: "statusName",
                        sort: "string",
                        header: "Status",
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
                        id: "accept",
                        header: "&nbsp;",
                        width: 35,
                        template: "<span  style='color:#777777; 0; cursor:pointer;' class='webix_icon fa-check'></span>"

                    }, {
                        id: "reject",
                        header: "&nbsp;",
                        width: 35,
                        template: "<span  style='color:#777777; 0; cursor:pointer;' class='webix_icon fa-times'></span>"

                    }, {
                        id: "view",
                        header: "&nbsp;",
                        width: 35,
                        template: "<span  style='color:#777777; 0; cursor:pointer;' class='webix_icon fa-eye'></span>"
                    }
                    ],
                    select: "row",
                    navigation: true,
                    url: "/hub/leave_request/leaveRequestInfo",
                    on: {

                        onAfterContextMenu: function (item) {
                            this.select(item.row);
                        }

                    },
                    onClick: {
                        webix_icon: function (e, id) {

                            console.log(id["column"]);
                            var action = id["column"];

                            if (action === "reject") {
                                var rejectLeaveBox = (webix.copy(leaveRequestsView.showRejectRequest(id)));

                            } else if (action === "accept") {
                                var acceptLeaveBox = (webix.copy(leaveRequestsView.acceptLeaveConfirm("zahtjev za odmor: ")));
                                acceptLeaveBox.callback = function (result) {
                                    if (result == 1) {
                                        var item = $$("leave_requestDT").getItem(id);
                                        $$("leave_requestDT").detachEvent("onBeforeDelete");
                                        connection.sendAjax("PUT", "/hub/leave_request/updateLeaveRequestStatusApproved/" + id, function (text, data, xhr) {
                                            $$("leave_requestDT").remove($$("leave_requestDT").getSelectedItem().id);
                                            util.messages.showMessage("Zahtjev odobren");
                                        }, function (text, data, xhr) {
                                            util.messages.showErrorMessage(text);
                                        }, item);
                                    }
                                };
                                webix.confirm(acceptLeaveBox);
                            } else if (action === "view") {
                                var viewLeaveBox = (webix.copy(leaveRequestsView.showLeaveRequestInfo(id)));
                            }
                        }
                    }
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
    acceptLeaveConfirm: function (titleEntity, textEntity) {
        var text = titleEntity;
        if (textEntity) text = textEntity;
        return {
            title: "Prihvatanje " + titleEntity,
            ok: "Da",
            cancel: "Ne",
            width: 500,
            text: "Da li ste sigurni da želite prihvatiti " + text + "?"
        };
    },
    rejectRequest: {
        view: "window",
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
                    cols: [{
                        view: "label",
                        label: "Komentar:",
                    }, {
                        view: "textarea",
                        id: "rejectComment"
                    }]
                }, {}, {}, {
                    cols: [{
                        view: "button",
                        label: "Odbij",
                        id:"rejectButton",
                        click:'leaveRequestsView.saveRejectedLeaveRequest'
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
        view: "window",
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
                        label: "Komentar:"
                    }, {}, {
                        view: "label",
                        id: "comment"
                    }]
                }
            ]
        }

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
                $$("comment").setValue(user.senderComment);
                setTimeout(function () {
                    $$("leaveRequestInfoId").show();
                }, 0);
            }, function (text, data, xhr) {
                util.messages.showErrorMessage(text);
            });


    },
    saveRejectedLeaveRequest: function () {
        id=$$("leave_requestDT").getSelectedId();

        comment=$$("rejectComment").getValue();

       connection.sendAjax("PUT",
            "/hub/leave_request/updateLeaveRequestStatusRejected/" + id+ "/comment/" + comment,function (text, data, xhr) {
               $$("leave_requestDT").remove($$("leave_requestDT").getSelectedItem().id);
               util.messages.showMessage("Zahtjev odbijen");}
            , function (text, data, xhr) {
                util.messages.showErrorMessage(text);
            });
        util.dismissDialog("rejectRequestInfoId");
    }
};