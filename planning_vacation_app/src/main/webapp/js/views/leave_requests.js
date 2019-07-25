var URLAllLeaveRequests = "/hub/leave_request/leaveRequestInfo";
var URLByLeaveRequestStatus = "/hub/leave_request/leaveRequestFilteredByLeaveRequestStatus/";
var leaveRequestsView;
leaveRequestsView = {
    selectPanel: function () {
        $$("main").removeView(rightPanel); // brisanje trenutno prikazanog view-a na stranici kako bi se prikazao facultyView
        rightPanel = "leaveRequestsPanel";


        var panelCopy = webix.copy(this.getPanel()); // webix.copy -> duboka kopija
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
                        editable: false,
                        on: {
                            onChange(name) {
                                $$("leave_requestDT").clearAll();


                                if (name === 4) {
                                    $$("leave_requestDT").hideColumn("typeId");
                                    $$("leave_requestDT").showColumn("accept");
                                    $$("leave_requestDT").showColumn("reject");
                                    connection.attachAjaxEvents("leave_requestDT", "/hub/leave_request/leaveRequestInfo");
                                    $$("leave_requestDT").define("url", "/hub/leave_request/leaveRequestInfo");
                                    $$("leave_requestDT").detachEvent("onBeforeDelete")
                                } else if (name === 3) {
                                    $$("leave_requestDT").hideColumn("typeId");
                                    $$("leave_requestDT").hideColumn("accept");
                                    $$("leave_requestDT").hideColumn("reject");
                                    connection.attachAjaxEvents("leave_requestDT", "/hub/leave_request/leaveRequestFilteredByLeaveRequestStatus/" + name);
                                    $$("leave_requestDT").define("url", "/hub/leave_request/leaveRequestFilteredByLeaveRequestStatus/" + name);
                                    $$("leave_requestDT").detachEvent("onBeforeDelete");
                                } else if (name === 2) {
                                    $$("leave_requestDT").showColumn("typeId");
                                    $$("leave_requestDT").hideColumn("accept");
                                    $$("leave_requestDT").hideColumn("reject");
                                    connection.attachAjaxEvents("leave_requestDT", "/hub/leave_request/leaveRequestFilteredByLeaveRequestStatus/" + name);
                                    $$("leave_requestDT").define("url", "/hub/leave_request/leaveRequestFilteredByLeaveRequestStatus/" + name);
                                    $$("leave_requestDT").detachEvent("onBeforeDelete");
                                } else if (name === 1) {
                                    $$("leave_requestDT").hideColumn("typeId");
                                    $$("leave_requestDT").showColumn("accept");
                                    $$("leave_requestDT").showColumn("reject");
                                    connection.attachAjaxEvents("leave_requestDT", "/hub/leave_request/leaveRequestFilteredByLeaveRequestStatus/" + name);
                                    $$("leave_requestDT").define("url", "/hub/leave_request/leaveRequestFilteredByLeaveRequestStatus/" + name);
                                    $$("leave_requestDT").detachEvent("onBeforeDelete");
                                }
                                if(userData.userGroupKey == "sekretar"){
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
                        dx: -35, //20 by default
                        dy: 20
                    },
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
                        id: "accept",
                        header: "&nbsp;",
                        width: 35,
                        tooltip: "Prihvati zahtjev",
                        template: function (obj) {
                            var pom = obj.statusName;
                            if ((pom != "Odobreno") && (pom != "Odbijeno") && (pom != "Otkazano")) {
                                return "<span  style='color:#777777; 0; cursor:pointer;' class='webix_icon fa-check'></span>";
                            } else return "";
                        }
                    }, {
                        id: "reject",
                        header: "&nbsp;",
                        tooltip: "Odbij zahtjev",
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

                        onAfterContextMenu: function (item) {
                            this.select(item.row);
                        }

                    },
                    onClick: {
                        webix_icon: function (e, id) {

                            console.log(id["column"]);

                            var action = id["column"];
                            $$("leave_requestDT").select(id);
                            if (action === "reject" && (userData.userGroupKey == "admin" || userData.userGroupKey == "direktor" || userData.userGroupKey == "menadzer")) {
                                var rejectLeaveBox = (webix.copy(leaveRequestsView.showRejectRequest(id)));

                            } else if (action === "accept" && (userData.userGroupKey == "admin" || userData.userGroupKey == "direktor" || userData.userGroupKey == "menadzer")) {
                                var kategorija = $$("leave_requestDT").getSelectedItem().category;
                                webix.ui(webix.copy(leaveRequestsView.acceptDialog)).show();
                                if ("Godišnji" == kategorija || "Godisnji" == kategorija) {
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
        if (requestStatusName == "Otkazivanje") {
            connection.sendAjax("GET", "/hub/leave_request/updateLeaveRequestStatusCancellation/" + id + "/" + type + "/" + paid, function (text, data, xhr) {
                // $$("leave_requestDT").remove($$("leave_requestDT").getSelectedItem().id);
                util.messages.showMessage("Zahtjev otkazan");
                console.log("ZAHTJEV JE OTKAZAN " + id + type + paid);
            }, function (text, data, xhr) {
                util.messages.showErrorMessage(text);
            }, item);
            //calendarView.deleteCurrentRequest(); // TO DO
            util.dismissDialog('acceptDialogId');
        } else {
            connection.sendAjax("GET", "/hub/leave_request/updateLeaveRequestStatusApproved/" + id + "/" + type + "/" + paid, function (text, data, xhr) {
                // $$("leave_requestDT").remove($$("leave_requestDT").getSelectedItem().id);
                util.messages.showMessage("Zahtjev odobren");
                console.log("ZAHTJEV JE ODOBREN " + id + type + paid);
            }, function (text, data, xhr) {
                util.messages.showErrorMessage(text);
            }, item);
            util.dismissDialog('acceptDialogId');
        }
        refreshOnData();
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

                    view: "text",
                    id: "rejectComment",
                    required: true,
                    label: "Komentar:"


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
                        view: "label",
                        id: "comment"
                    }]
                }, {
                    cols: [{
                        view: "label",
                        id: "commentApproverLabel",
                        label: "Komentar odbijanja:",
                        hidden: true
                    }, {}, {
                        view: "label",
                        id: "approverComment",
                        hidden: true

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
                if (user.statusName == "Na čekanju") {
                    $$("approverUserName").setValue("-");
                } else
                    $$("approverUserName").setValue(user.approverUserFirstName + " " + user.approverUserLastName);
                if (user.approverComment != null) {
                    $$("approverComment").setValue(user.approverComment);
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
        var komentar = $$("rejectComment").getValue();

        if (komentar == "") {
            util.messages.showErrorMessage("Komentar je obavezan");
        } else {
            id = $$("leave_requestDT").getSelectedId();

            comment = $$("rejectComment").getValue() ? $$("rejectComment").getValue() : "";

            connection.sendAjax("GET",
                "/hub/leave_request/updateLeaveRequestStatusRejected/" + id + "/comment/" + comment, function (text, data, xhr) {
                    //$$("leave_requestDT").remove($$("leave_requestDT").getSelectedItem().id);
                    util.messages.showMessage("Zahtjev odbijen");
                }
                , function (text, data, xhr) {
                    util.messages.showErrorMessage(text);
                });
            util.dismissDialog("rejectRequestInfoId");
        }
        refreshOnData();
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
    }


};

function refreshOnData() {
    console.log("refresh data");


    webix.extend($$("leave_requestDT"), webix.ProgressBar);

    var table = webix.$$("leave_requestDT");
    var comboItemId = $$("filterLeaveRequestsComboBox").getValue();
    var URLCurrentUrl = null;

    if (comboItemId == 4) {
        URLCurrentUrl = URLAllLeaveRequests;
    } else {
        URLCurrentUrl = URLByLeaveRequestStatus
    } /*else if(comboItemId == 3){
        URLCurrentUrl = URLByLeaveRequestStatus+3;
    }else if(comboItemId == 2){
        URLCurrentUrl = URLByLeaveRequestStatus+2;
    }else if(comboItemId == 1){
        URLCurrentUrl = URLByLeaveRequestStatus+1;
    }*/

    if (comboItemId == 4) {
        webix.ajax(URLCurrentUrl, {

            error: function (text, data, xhr) {
                if (xhr.status != 200) {
                    util.messages.showMessage("No data to load! Check your internet connection and try again.");
                    //alert("No data to load! Check your internet connection and try again.");
                    table.hideProgress();
                }
            },
            success: function (text, data, xhr) {
                if (xhr.status === 200) {
                    if (data.json() != null) {
                        console.log("loaded data with success");

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
                    //alert("No data to load! Check your internet connection and try again.");
                    table.hideProgress();
                }
            },
            success: function (text, data, xhr) {
                if (xhr.status === 200) {
                    if (data.json() != null) {
                        console.log("loaded data with success");

                        table.clearAll();
                        table.load(URLCurrentUrl + comboItemId);
                        table.refresh();
                    }
                }
            }
        });
    }
}