
var  absenceHistoryView = {

    selectPanel: function () {
        $$("main").removeView(rightPanel); // brisanje trenutno prikazanog view-a na stranici kako bi se prikazao facultyView
        rightPanel = "absenceHistoryPanel"; // novi rightPanel će biti facultyPanel

        var panelCopy = webix.copy(this.getPanel()); // webix.copy -> duboka kopija
        $$("main").addView(panelCopy);
    },

    getPanel: function () {
        return {
            id: "absenceHistoryPanel",

            rows: [
                {
                    padding: 8,
                    view: "toolbar",
                    cols:[{
                        template: "<span class='webix_icon fa-book-medical'><\/span> Istorija odsustva",
                        view: "label",
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
                        ],
                    url: "/hub/leave_request/getAbsenceHistoryUserInfo/" + userData.id.toString(),
                    on: {

                        onAfterContextMenu: function (item) {
                            this.select(item.row);
                        }

                    },
                    onClick: {
                        ////////////////////////////////////////////////////////////////////
                        webix_icon: function (e, id) {

                            webix.message("ASASASASASA");
                            console.log(id["column"]);
                            var action = id["column"];

                            if (action === "reject" && (userData.userGroupKey == "sekretar" || userData.userGroupKey == "zaposleni")) {
                                var paidLeaveBox = (webix.copy(absenceHistoryView.paidLeaveConfirm(" odsustva")));
                                paidLeaveBox.callback = function (result) {
                                    if (result == 1) {

                                        webix.message("USAAAAA OOOO");

                                        var form = $$("createRequestForm");
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
                                                    var tempData = JSON.parse(text);
                                                   // var dates = calendarView.$$("periodsDT").serialize();
                                                    webix.message("proso 1");
                                                    webix.message("pauza");
                                                        var date1 = {
                                                           // date: format("2019-10-10"),//format($$("absence_historyDT").dateFrom),//format($$("absence_historyDT").dateFrom.date), //format(value.date),
                                                            date: format($$("absence_historyDT").getSelectedItem().dateFrom),
                                                            leaveRequestId: tempData.id,
                                                            canceled: 0,
                                                            paid: 1
                                                        };

                                                    var date2 = {
                                                        // date: format("2019-10-10"),//format($$("absence_historyDT").dateFrom),//format($$("absence_historyDT").dateFrom.date), //format(value.date),
                                                        date: format($$("absence_historyDT").getSelectedItem().dateTo),
                                                        leaveRequestId: tempData.id,
                                                        canceled: 0,
                                                        paid: 1
                                                    }

                                                        webix.message("proso 2");
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

                                                    //})
                                                    util.messages.showMessage("Zahtjev uspjesno poslan");
                                                    //calendarView.deleteCurrentRequest();
                                                } else
                                                    util.messages.showErrorMessage("Neuspješno slanje zahtjeva.");
                                            }, function (text, data, xhr) {
                                                util.messages.showErrorMessage(text);
                                            }, leaveRequest);



                                       /* var item = $$("absence_historyDT").getItem(id);
                                        $$("absence_historyDT").detachEvent("onBeforeDelete");
                                        connection.sendAjax("PUT", "/hub/sickLeave/updateSickLeaveStatusUnjustified/" + id, function (text, data, xhr) {
                                            // $$("secretary_requestDT").remove($$("secretary_requestDT").getSelectedItem().id);
                                            util.messages.showMessage("Poslan zahtjev za otkazivanje");
                                        }, function (text, data, xhr) {
                                            util.messages.showErrorMessage(text);
                                        }, item);*/
                                    }

                                };
                                //refreshOnThisData();
                                webix.confirm(paidLeaveBox);
                            }
                        }
                        //////////////////////////////////////////////////////////
                    }, //asa
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

    /*sendCancellationPaidLeaveRequest: function () {
        webix.message("USAAAAA OOOO");
        var form = $$("createRequestForm");
        var format = webix.Date.strToDate("%d.%m.%Y");
        var leaveRequest = {
            senderUserId: userData.id,
            leaveTypeId: 1,
            leaveRequestStatusId: 5,
            companyId: userData.companyId,
            senderComment: $$("comment").getValue(),
            category: "Odsustvo"
        }
        connection.sendAjax("POST", "hub/leave_request/",
            function (text, data, xhr) {
                if (text) {
                    var tempData = JSON.parse(text);
                    var dates = $$("periodsDT").serialize();
                    dates.forEach(function (value) {
                        var date = {
                            date: format(value.date),
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
                            }, date);
                    })
                    util.messages.showMessage("Zahtjev uspjesno poslan");
                    calendarView.deleteCurrentRequest();
                } else
                    util.messages.showErrorMessage("Neuspješno slanje zahtjeva.");
            }, function (text, data, xhr) {
                util.messages.showErrorMessage(text);
            }, leaveRequest);
    },*/

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

};