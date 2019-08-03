
var  absenceHistoryView;
absenceHistoryView = {

    selectPanel: function () {
        $$("main").removeView(rightPanel); // brisanje trenutno prikazanog view-a na stranici kako bi se prikazao facultyView
        rightPanel = "absenceHistoryPanel"; // novi rightPanel će biti facultyPanel

        var panelCopy = webix.copy(this.getPanel()); // webix.copy -> duboka kopija
        $$("main").addView(panelCopy);
    },
   /* selectPanel: function () {
        $$("main").removeView(rightPanel); // brisanje trenutno prikazanog view-a na stranici kako bi se prikazao facultyView
        rightPanel = "absenceHistoryPanel";


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
        //refreshOnData();
    },*/

    getPanel: function () {
        return {
            id: "absenceHistoryPanel",

            rows: [
                {
                    padding: 8,
                    view: "toolbar",
                    css: {"background": "#ffffff !important"},
                    cols:[{
                        template: "<span class='webix_icon fas fa-history'><\/span> Istorija odsustva",
                        view: "label",
                        css: {"color": "black !important"},
                        width: 400
                    },{}
                    ]
                },
                {
                    view: "datatable",
                    id: "absence_historyDT",
                    margin: 10,
                    multiselect: false,
                    tooltip: {
                        dx:-35, //20 by default
                        dy:20
                    },
                    navigation: true, // omoguceno selektovanje redova navigacijskim tasterima na tastaturi
                    select: "row", // cell
                    resizeColumn: true, // omogucen resize kolona korisniku
                    resizeRow: true, // omogucen resize redova korisniku
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
                        }
                    },
                    columns: [
                        {
                            id: "id",
                            header: "#",
                            width: 50,
                            hidden: "true",
                        },
                        {
                            id: "statusName",
                            sort: "string",
                            header: "Status",
                        },
                        {
                            id: "category",
                            sort: "string",
                            header: "Kategorija"
                        },
                        {
                            id: "dateFrom",
                            fillspace: true,
                            sort: "date",
                            header: [
                                "Datum od", {
                                    content: "dateFilter"
                                }
                            ],
                            format: webix.Date.dateToStr("%d.%m.%Y.")
                        },
                        {
                            id: "dateTo",
                            fillspace: true,
                            sort: "date",
                            header: [
                                "Datum do", {
                                    content: "dateFilter"
                                }
                            ],
                            format: webix.Date.dateToStr("%d.%m.%Y.")
                        },
                        {
                            id: "reject",
                            header: "&nbsp;",
                            tooltip: "Otkazi odsustvo",
                            width: 35,
                            //template: "<span  style='color:#777777; 0; cursor:pointer;' class='webix_icon fa-times'></span>",
                           // click: 'absenceHistoryView.sendCancellationPaidLeaveRequest',
                            template: function(obj) {
                                var pom=obj.dateFrom;
                                var secondPom = obj.statusName;
                                if((pom > new Date()) && (secondPom == "Odobreno")) {
                                    return "<span  style='color:#777777; 0; cursor:pointer;' class='webix_icon fa-times'></span>";
                                }
                                else return "";
                            }
                        },
                        {
                            id: "view",
                            header: "&nbsp;",
                            tooltip: "Pregled",
                            width: 35,
                            template: "<span  style='color:#777777; 0; cursor:pointer;' class='webix_icon fa-eye'></span>"
                        }
                        ],
                    url: "/hub/leave_request/getAbsenceHistoryUserInfo/" + userData.id.toString(),
                    on: {

                        onAfterContextMenu: function (item) {
                            this.select(item.row);
                        }

                    },
                    onClick: {
                        webix_icon: function (e, id) {

                            console.log(id["column"]);
                            var action = id["column"];

                            if (action === "reject" && (userData.userGroupKey == "sekretar" || userData.userGroupKey == "zaposleni")) {
                                var paidLeaveBox = (webix.copy(absenceHistoryView.paidLeaveConfirm(" odsustva")));
                                paidLeaveBox.callback = function (result) {
                                    if (result == 1) {

                                        var format = webix.Date.strToDate("%d.%m.%Y");
                                        var leaveRequest = {
                                            senderUserId: userData.id,
                                            leaveTypeId: 1,
                                            leaveRequestStatusId: 5,
                                            companyId: userData.companyId,
                                            senderComment: "",//$$("comment").getValue(),
                                            category: $$("absence_historyDT").getSelectedItem().category,
                                        }
                                        connection.sendAjax("POST", "hub/leave_request/",
                                            function (text, data, xhr) {
                                                if (text) {

                                                    var item = $$("absence_historyDT").getItem(id);
                                                    $$("absence_historyDT").detachEvent("onBeforeDelete");
                                                    connection.sendAjax("PUT", "/hub/leave_request/updateLeaveRequestStatusToCancellation/" + id, function (text, data, xhr) {
                                                        // $$("secretary_requestDT").remove($$("secretary_requestDT").getSelectedItem().id);
                                                        util.messages.showMessage("Zahtjev postavljen na otkazivanje");
                                                        refreshOnThisData();
                                                    }, function (text, data, xhr) {
                                                        util.messages.showErrorMessage(text);
                                                    }, item);

                                                    /*
                                                    var tempData = JSON.parse(text);

                                                        var date1 = {
                                                            date: format($$("absence_historyDT").getSelectedItem().dateFrom),
                                                            leaveRequestId: tempData.id,
                                                            canceled: 0,
                                                            paid: 1
                                                        };

                                                    var date2 = {
                                                        date: format($$("absence_historyDT").getSelectedItem().dateTo),
                                                        leaveRequestId: tempData.id,
                                                        canceled: 0,
                                                        paid: 1
                                                    }

                                                        connection.sendAjax("POST", "hub/leave_request_date/",
                                                            function (text, data, xhr) {
                                                                if (text) {
                                                                    calendarView.getVacationDays();
                                                                    scheduler.setCurrentView();
                                                                } else
                                                                    util.messages.showErrorMessage("Neuspješno slanje zahtjeva.");
                                                            }, function (text, data, xhr) {
                                                                util.messages.showErrorMessage(text);
                                                            }, date1);

                                                    connection.sendAjax("POST", "hub/leave_request_date/",
                                                        function (text, data, xhr) {
                                                            if (text) {
                                                                calendarView.getVacationDays();
                                                                scheduler.setCurrentView();
                                                            } else
                                                                util.messages.showErrorMessage("Neuspješno slanje zahtjeva.");
                                                        }, function (text, data, xhr) {
                                                            util.messages.showErrorMessage(text);
                                                        }, date2);


                                                    var item = $$("absence_historyDT").getItem(id);
                                                    $$("absence_historyDT").detachEvent("onBeforeDelete");
                                                    connection.sendAjax("PUT", "/hub/leave_request/updateLeaveRequestStatusToCancellation/" + id, function (text, data, xhr) {
                                                        util.messages.showMessage("Zahtjev postavljen na otkazivanje");
                                                        refreshOnThisData();
                                                    }, function (text, data, xhr) {
                                                        util.messages.showErrorMessage(text);
                                                    }, item);



                                                    util.messages.showMessage("Zahtjev uspjesno poslan");
                                               */ } else
                                                    util.messages.showErrorMessage("Neuspješno slanje zahtjeva.");
                                            }, function (text, data, xhr) {
                                                util.messages.showErrorMessage(text);
                                            }, leaveRequest);
                                    }
                                    refreshOnAbsenceData();
                                };
                                //refreshOnThisData();
                                webix.confirm(paidLeaveBox);
                            } else if (action === "view" && (userData.userGroupKey == "sekretar" || userData.userGroupKey == "zaposleni")) {
                                //var viewLeaveBox = (webix.copy(absenceHistoryView.showApproverSenderCommentInfo(id)));
                                webix.message("TO DO");
                            }
                        }
                    },
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

    paidLeaveConfirm: function (titleEntity, textEntity) {
        var text = titleEntity;
        if (textEntity) text = textEntity;
        return {
            title: "Otkazivanje " + titleEntity,
            ok: "Da",
            cancel: "Ne",
            width: 500,
            text: "Da li ste sigurni da želite otkazati odsustvo ?"
        };
    },

    showApproverSenderCommentInfo: function (id) {
        webix.ui(webix.copy(absenceHistoryView.approverSenderCommentInfo));

        /*connection.sendAjax("GET",
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
            });*/


    },

    approverSenderCommentInfo: {

       // view: "fadeInWindow",
        view: "popup",
        id: "approverSenderCommentInfoId",
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
                        click: 'util.dismissDialog(\'approverSenderCommentInfoId\');'
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

};

function refreshOnAbsenceData() {
    console.log("refresh data");


    webix.extend($$("absence_historyDT"), webix.ProgressBar);

    var table = webix.$$("absence_historyDT");
   // var comboItemId = $$("filterLeaveRequestsComboBox").getValue();
    var URLCurrentUrl = "/hub/leave_request/getAbsenceHistoryUserInfo/" + userData.id.toString();

   // if (comboItemId == 4) {
    //    URLCurrentUrl = URLAllLeaveRequests;
   // } else {
    //    URLCurrentUrl = URLByLeaveRequestStatus
   // }
    /*else if(comboItemId == 3){
        URLCurrentUrl = URLByLeaveRequestStatus+3;
    }else if(comboItemId == 2){
        URLCurrentUrl = URLByLeaveRequestStatus+2;
    }else if(comboItemId == 1){
        URLCurrentUrl = URLByLeaveRequestStatus+1;
    }*/

   // if (comboItemId == 4) {
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
   // }
    /*else {
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
    }*/
}