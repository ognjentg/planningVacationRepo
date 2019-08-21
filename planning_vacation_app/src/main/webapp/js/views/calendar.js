var schedulerEvents = [];
var selectedDays = [];
var vacationRequestApproved = [];
var vacationRequestWaiting = [];

var leaveRequestWaiting = [];
var leaveRequestApprovedPaid = [];
var leaveRequestApprovedUnpaid = [];

var religionLeaveDaysApproved = [];
var religionLeaveDaysWaiting = [];

var buttons = {
    VACATION: 1,
    PAID: 2,
    SICK: 3,
    RELIGIOUS: 4
};
var selectedButton = buttons.VACATION;

var calendarView = {
    leftReligionLeaveDays: 0,
    freeDays: 0,
    nonWorkingDays: null,
    nonWorkingdDaysInWeek: null,
    collectiveVacationDays: [],
    vacationRequestWaiting: [],
    vacationRequestApproved: [],
    leaveRequestWaiting: [],
    sickLeaveDaysWaiting: [],
    sickLeaveDaysApproved: [],
    leaveRequestApprovedPaid: [],
    leaveRequestApprovedUnpaid: [],
    maxPeriodLength: 0,
    sickLeaveJustificationPeriodLength: 0,
    canGoOnVacation: false,

    panel: {
        id: "calendarPanel",
        adjust: true,
        rows: [
            {
                view: "toolbar",
                padding: 10,
                css: "companyPanelToolbarTop",
                cols: [
                    {
                        view: "label",
                        width: 140,
                        height: 70,
                        css: "companyPanelToolbar",
                        template: "<span class='fa fa-calendar'></span> Kalendar"
                    },
                    {
                        css: "companies-counter",
                        rows: [
                            {
                                view: "template",
                                id: "t2",
                                css: "companies-counter",
                                template: "<p>-</p>",
                            },
                            {
                                view: "label",
                                label: "Stari godišnji",
                                type: "header",
                                css: "companies-counter",
                            }
                        ]
                    },
                    {
                        css: "companies-counter",
                        rows: [
                            {
                                view: "template",
                                id: "t1",
                                css: "companies-counter",
                                template: "<p>-</p>",
                            },
                            {
                                view: "label",
                                label: "Novi godišnji",
                                type: "header",
                                css: "companies-counter",
                            },
                        ]
                    },
                    {
                        css: "companies-counter",
                        rows: [
                            {
                                view: "template",
                                id: "t3",
                                css: "companies-counter",
                                template: "<p>-</p>",
                            },
                            {
                                view: "label",
                                label: "Preostalo dana za religijske praznike",
                                type: "header",
                                css: "companies-counter",
                            },

                        ]
                    }
                ]
            },
            {
                cols: [{
                    rows: [{
                        view: "template",
                        gravity: 2.5,
                        template: "<div id=\"scheduler_here\" class=\"dhx_cal_container\" style='width:100%; height:100%;'>\n" +
                            "\t<div class=\"dhx_cal_navline\">\n" +
                            "\t\t<div class=\"dhx_cal_prev_button\">&nbsp;</div>\n" +
                            "\t\t<div class=\"dhx_cal_next_button\">&nbsp;</div>\n" +
                            "\t\t<div class=\"dhx_cal_today_button\"></div>\n" +
                            "\t\t<div class=\"dhx_cal_date\"></div>\n" +
                            "\t</div>\n" +
                            "\t<div class=\"dhx_cal_header\">\n" +
                            "\t</div>\n" +
                            "\t<div class=\"dhx_cal_data\">\n" +
                            "\t</div>\n" +
                            "</div>"
                    },
                        {
                            cols: [
                                {},
                                {
                                    view: "label",
                                    label: "Godišnji odmor",
                                    align: "center"
                                },
                                {
                                    view: "label",
                                    label: "Plaćeno odsustvo",
                                    align: "center"
                                },
                                {
                                    view: "label",
                                    label: "Neplaćeno odsustvo",
                                    align: "center"
                                },
                                {
                                    view: "label",
                                    label: "Bolovanje",
                                    align: "center"
                                },
                                {
                                    view: "label",
                                    label: "Religijski praznici",
                                    align: "center"
                                }
                            ]
                        },
                        {
                            cols: [
                                {
                                    view: "label",
                                    label: "Na čekanju",
                                    align: "center"
                                },
                                {
                                    view: "label",
                                    css: "vacation_day_waiting_label"

                                },
                                {
                                    view: "label",
                                    css: "day_off_waiting_label"
                                },
                                {
                                    view: "label",
                                    css: "day_off_waiting_label"
                                },
                                {
                                    view: "label",
                                    css: "sick_day_waiting_label"
                                },
                                {
                                    view: "label",
                                    css: "religion_day_off_waiting_label"
                                }
                            ]
                        },
                        {
                            cols: [
                                {
                                    view: "label",
                                    label: "Odobreno",
                                    align: "center"
                                },
                                {
                                    view: "label",
                                    css: "vacation_day_approved_label"

                                },
                                {
                                    view: "label",
                                    css: "day_off_approved_label"
                                },
                                {
                                    view: "label",
                                    css: "unpaid_day_off_approved_label"
                                },
                                {
                                    view: "label",
                                    css: "sick_day_approved_label"
                                },
                                {
                                    view: "label",
                                    css: "religion_day_off_approved_label"
                                }
                            ]
                        }, {height: 10}
                    ]
                }, {
                    width: 10
                },
                    {
                        rows: [{
                            view: "combo",
                            id: "comboId",
                            value: "1",
                            editable: false,
                            options: [
                                {id: 1, value: "Godišnji odmor"},
                                {id: 2, value: "Odsustvo"},
                                {id: 3, value: "Bolovanje"},
                                {id: 4, value: "Religijski praznici"}
                            ],
                            on: {
                                onChange(name) {
                                    calendarView.deleteCurrentRequest();
                                    if (name === 4) {
                                        calendarView.religionLeave();
                                    } else if (name === 3) {
                                        calendarView.sickLeave();
                                    } else if (name === 2) {
                                        calendarView.leave();
                                    } else if (name === 1) {
                                        calendarView.vacation();
                                    }
                                }
                            }

                        }, {
                            view: "label",
                            id: "leaveTypeLabel",
                            label: "Zahtjev za godišnji odmor",
                            css: {"font-style": "bold", "font-size": "150%"},
                            type: "header",
                            width: 400,
                            height: 70
                        }, {
                            view: "form",
                            id: "createRequestForm",
                            elements: [{
                                view: "datatable",
                                id: "periodsDT",
                                invalidMessage: "Niste odabrali period.",

                                margin: 10,
                                tooltip: true,
                                columns: [{
                                    id: "eventId",
                                    hidden: true
                                }, {
                                    id: "date",
                                    fillspace: true,
                                    editable: false,
                                    sort: "date",
                                    header: ["<span class='webix_icon fa fa-calendar'/>&nbsp;Datum"]
                                },
                                    {
                                        id: "deleteDate",
                                        header: "&nbsp;",
                                        width: 35,
                                        template: "<span  style='color:#777777; 0; cursor:pointer;' class='webix_icon fa-trash-o'></span>"
                                    }],
                                onClick: {
                                    webix_icon: function (e, id) {
                                        var eventId = $$("periodsDT").getItem(id).eventId;
                                        var value = $$("periodsDT").getItem(id).date;
                                        var index = selectedDays.indexOf(value);
                                        selectedDays.splice(index, 1);
                                        scheduler.setCurrentView();
                                        $$("periodsDT").remove(id);
                                        scheduler.deleteEvent(eventId);
                                    }
                                },
                                rules: {
                                    startDate: notEmpty, //todo-maybe this doesn't work,because method notEmpty work for String...
                                    endDate: notEmpty
                                },
                            }, {
                                height: 10
                            }, {
                                view: "label",
                                id: "commentLabel",
                                label: "Komentar:"
                            },
                                {
                                    view: "textarea",
                                    id: "comment",
                                    labelAlign: "left",
                                    autoWidth: true,
                                    tooltip: "U komentaru možete objasniti detalje Vašeg zahtjeva.",
                                    placeholder: "Unesite komentar "
                                }, {
                                    height: 10
                                }, {
                                    id: "sendRequestButton",
                                    view: "button",
                                    type: "iconButton",
                                    hotkey: "enter",
                                    label: "Pošalji zahtjev",
                                    height: 40,
                                    css: "companyButton",
                                    click: 'calendarView.showSendDialog'
                                }]
                        }, {
                            view: "label",
                            width: 5,
                            height: 10
                        }]
                    }, {
                        width: 10
                    }]
            }]
    },
    selectPanel: function () {
        $$("main").removeView(rightPanel);
        rightPanel = "calendarPanel";
        var panelCopy = webix.copy(this.panel);
        $$("main").addView(webix.copy(panelCopy));
        scheduler.clearAll();
        selectedDays = [];
        schedulerEvents.forEach(function (value) {
            scheduler.detachEvent(value);
        });
        var nonWorkingDays = [];
        var nonWorkingDaysInWeek = [];

        calendarView.getVacationDays();
        calendarView.getSickDays();
        webix.ajax("hub/nonWorkingDay/getNonWorkingDayByCompany/" + userData.companyId, {
            error: function (text, data, xhr) {
                if (xhr.status != 200) {
                    util.messages.showErrorMessage("No data to load! Check your internet connection and try again.");
                }
            },
            success: function (text, data, xhr) {
                if (xhr.status === 200) {
                    if (data.json() != null) {
                        var dates = data.json();
                        for (var i = 0; i < dates.length; i++) {
                            var tempDate = new Date(dates[i].day);
                            tempDate.setHours(0, 0, 0, 0);
                            nonWorkingDays[i] = tempDate.getTime();
                            scheduler.blockTime(tempDate, "fullday");
                        }
                        calendarView.nonWorkingDays = nonWorkingDays;
                        scheduler.setCurrentView();
                    }
                }
            }
        });
        webix.ajax("hub/nonWorkingDayInWeek/getNonWorkingDayInWeekByCompanyJavaValue/" + userData.companyId, {
            error: function (text, data, xhr) {
                if (xhr.status != 200) {
                    util.messages.showErrorMessage("No data to load! Check your internet connection and try again.");
                }
            },
            success: function (text, data, xhr) {
                if (xhr.status === 200) {
                    if (data.json() != null) {
                        nonWorkingDaysInWeek = data.json();
                        for (var i = 0; i < nonWorkingDaysInWeek.length; i++) {
                            if (nonWorkingDaysInWeek[i] == 7)
                                nonWorkingDaysInWeek[i] = 0;
                        }
                        scheduler.blockTime({
                            days: nonWorkingDaysInWeek,
                            zones: "fullday"
                        });
                        scheduler.setCurrentView();
                        calendarView.nonWorkingdDaysInWeek = nonWorkingDaysInWeek;
                    }
                }
            }
        });

        collectiveVacationDays = [];
        webix.ajax("/hub/colectiveVacation/getColectiveVacationByCompany/" + userData.companyId, {
            error: function (text, data, xhr) {
                if (xhr.status != 200) {
                    util.messages.showErrorMessage("No data to load! Check your internet connection and try again.");
                }
            },
            success: function (text, data, xhr) {
                if (xhr.status === 200) {
                    if (data.json() != null) {
                        var dates = data.json();
                        for (var i = 0; i < dates.length; i++) {
                            var tempDate = new Date(dates[i].day);
                            tempDate.setHours(0, 0, 0, 0);
                            collectiveVacationDays[i] = tempDate.getTime();
                            scheduler.blockTime(tempDate, "fullday");
                        }
                        calendarView.nonWorkingDays = nonWorkingDays;
                        scheduler.setCurrentView();
                    }
                }
            }
        });


        webix.ajax("hub/constraints/" + userData.companyId, {
            error: function (text, data, xhr) {
                if (xhr.status != 200) {
                    util.messages.showErrorMessage("No data to load! Check your internet connection and try again.");
                }
            },
            success: function (text, data, xhr) {
                if (xhr.status === 200) {
                    var constraints = data.json();
                    calendarView.maxPeriodLength = constraints.vacationPeriodLength;
                    calendarView.sickLeaveJustificationPeriodLength = constraints.sickLeaveJustificationPeriodLength;
                }
            }
        });
        webix.ajax("hub/user/canGoOnVacation/" + userData.id, {
            error: function (text, data, xhr) {
                if (xhr.status != 200) {
                    util.messages.showErrorMessage("No data to load! Check your internet connection and try again.");
                }
            },
            success: function (text, data, xhr) {
                if (xhr.status === 200) {
                    if (text == "false")
                        calendarView.canGoOnVacation = false;
                    else
                        calendarView.canGoOnVacation = true;
                }
            }
        });

        scheduler.config.multi_day = true;
        scheduler.config.full_day = true;
        scheduler.config.resize_month_events = true;
        scheduler.config.xml_date = "%Y-%m-%d %H:%i";
        scheduler.templates.month_date_class = function (date, today) {
            //Današnji dan
            if (date.getTime() == today.getTime())
                return "today";
            //Neradni dani
            if (nonWorkingDaysInWeek.includes(date.getDay()) || nonWorkingDays.includes(date.getTime()))
                return "good_day"
            //Odabrani dan
            if (selectedDays.includes(date.getTime())) {
                return "selected_day";
            }
            if (vacationRequestWaiting.includes(date.getTime())) {
                return "vacation_day_waiting";
            }
            if (leaveRequestWaiting.includes(date.getTime())) {
                return "day_off_waiting";
            }
            if (calendarView.sickLeaveDaysApproved.includes(date.getTime()))
                return "sick_day";
            if (calendarView.sickLeaveDaysWaiting.includes(date.getTime()))
                return "sick_day_waiting";
            if (vacationRequestApproved.includes(date.getTime()))
                return "vacation_day";
            if (leaveRequestApprovedPaid.includes(date.getTime()))
                return "day_off";
            if (leaveRequestApprovedUnpaid.includes(date.getTime()))
                return "unpaid_day_off";
            if (religionLeaveDaysWaiting.includes(date.getTime()))
                return "religion_day_off_waiting";
            if (religionLeaveDaysApproved.includes(date.getTime()))
                return "religion_day_off";
            return "";
        }
        schedulerEvents.push(scheduler.attachEvent("onBeforeLightbox", function (id) {
            return false;
        }));
        schedulerEvents.push(scheduler.attachEvent("onDoubleClick", function (id, e) {
            return false;
        }));
        scheduler.config.dblclick_create = false;
        scheduler.config.drag_create = false;
        schedulerEvents.push(scheduler.attachEvent("onEmptyClick", function (selectedDate, e) {
            if (
                calendarView.sickLeaveDaysApproved.includes(selectedDate.getTime()) ||
                calendarView.sickLeaveDaysWaiting.includes(selectedDate.getTime()) ||
                leaveRequestWaiting.includes(selectedDate.getTime()) ||
                calendarView.vacationRequestWaiting.includes(selectedDate.getTime()) ||
                calendarView.vacationRequestApproved.includes(selectedDate.getTime()) ||
                calendarView.leaveRequestApprovedPaid.includes(selectedDate.getTime()) ||
                calendarView.leaveRequestApprovedUnpaid.includes(selectedDate.getTime()) ||
                religionLeaveDaysApproved.includes(selectedDate.getTime()) ||
                religionLeaveDaysWaiting.includes(selectedDate.getTime())
            ) {
                return false;

            }

            if (selectedDays.includes(selectedDate.getTime())) {
                var index = selectedDays.indexOf(selectedDate.getTime());
                if (selectedButton === buttons.SICK)
                    selectedDays.splice(index);
                else
                    selectedDays.splice(index, 1);
            } else if ([buttons.SICK].includes(selectedButton) &&
                calendarView.ruleset.doesNotStartInFuture(selectedDate)) {
                util.messages.showErrorMessage("Dan ne smije biti u budućnosti");
            } else if ([buttons.VACATION, buttons.PAID, buttons.RELIGIOUS].includes(selectedButton) &&
                !calendarView.ruleset.isNotInPast(selectedDate.getTime())) {
                util.messages.showErrorMessage("Dan ne smije biti u prošlosti")
            } else if ([buttons.VACATION].includes(selectedButton) &&
                !calendarView.canGoOnVacation) {
                util.messages.showErrorMessage("Nemate još pravo na godišnji!")
            } else if (([buttons.VACATION].includes(selectedButton) || [buttons.PAID].includes(selectedButton) || [buttons.RELIGIOUS].includes(selectedButton)) && !calendarView.ruleset.isNextYear(selectedDate)) {
                util.messages.showErrorMessage("Možete tražiti odsustvo samo za ovu godinu!");
            } else if ([buttons.SICK].includes(selectedButton) && (new Date()).getTime() > selectedDate.getTime() &&
                days_between(selectedDate, new Date()) > calendarView.sickLeaveJustificationPeriodLength
            ) {
                util.messages.showErrorMessage("Istekao je period za validaciju");
            } else if (selectedButton === buttons.SICK &&
                nonWorkingDaysInWeek.indexOf(selectedDate.getDay()) === -1 &&
                nonWorkingDays.indexOf(selectedDate.getTime()) === -1) {
                if (selectedDays.length === 0) {
                    selectedDays.push(selectedDate.getTime());
                } else {
                    var day = 60 * 60 * 24 * 1000;
                    var dayDifference = (selectedDate.getTime() - selectedDays[selectedDays.length - 1]) / day;
                    var newDay = selectedDays[selectedDays.length - 1];
                    if (dayDifference < 0) {
                        dayDifference = (selectedDays[0] - selectedDate.getTime()) / day;
                        newDay = selectedDate.getTime();
                    }
                    for (var i = 1; i < dayDifference; i++) {
                        newDay += day;
                        var newDayInWeek = (new Date(newDay)).getDay();
                        if (nonWorkingDaysInWeek.indexOf(newDayInWeek) == -1 &&
                            nonWorkingDays.indexOf(newDay) == -1)
                            selectedDays.push(newDay);
                    }
                    selectedDays.push(selectedDate.getTime());
                    selectedDays.sort(function (a, b) {
                        return a - b;
                    })
                }

            } else if ((selectedButton == buttons.VACATION && $$("periodsDT").count() >= calendarView.freeDays) ||
                (selectedButton == buttons.RELIGIOUS && $$("periodsDT").count() >= calendarView.leftReligionLeaveDays)) {
                util.messages.showErrorMessage("Nemate pravo na više dana");
                return;
            } else if ((selectedButton == buttons.VACATION && $$("periodsDT").count() >= calendarView.maxPeriodLength) ||
                (selectedButton == buttons.RELIGIOUS && $$("periodsDT").count() >= calendarView.leftReligionLeaveDays)) {
                util.messages.showErrorMessage("Izabrali ste maksimalni period za godišnji");
                return;
            } else if (!selectedDays.includes(selectedDate.getTime()) &&
                !nonWorkingDaysInWeek.includes(selectedDate.getDay()) &&
                !nonWorkingDays.includes(selectedDate.getTime())) {
                selectedDays.push(selectedDate.getTime());
                selectedDays.sort(function (a, b) {
                    return a - b;
                });
            }

            scheduler.setCurrentView();
            $$("periodsDT").clearAll();
            var tableData = [];
            var format = webix.Date.dateToStr("%d.%m.%Y.");
            selectedDays.forEach(function (value) {
                tableData.push({eventId: e.id, date: format(new Date(value))})
            });
            $$("periodsDT").parse(tableData);
        }));
        var date = new Date();
        scheduler.locale = locale_sr_latin;

        scheduler.init('scheduler_here', new Date(date.getFullYear(), date.getMonth(), date.getDate()), "month");

        schedulerEvents.push(scheduler.attachEvent("onBeforeEventChanged", function (ev, e, is_new, original) {
            if ($$("periodsDT").count() >= calendarView.freeDays) {
                util.messages.showErrorMessage("Nemate pravo na više dana");
                return false;
            }
            var dates = getDates(ev.start_date, ev.end_date);
            var tableData = [];
            dates.forEach(function (value) {
                tableData.push({eventId: ev.id, date: value.toISOString().split("T")[0]})
            });
            $$("periodsDT").parse(tableData);
            return true;
        }));
        schedulerEvents.push(scheduler.attachEvent("onLimitViolation", function (id, obj) {
            dhtmlx.message('Neradni dan ili praznik.');
        }));
        scheduler.templates.event_bar_text = function (start, end, event) {
            return "";
        }
        scheduler.templates.event_class = function (start, end, ev) {
            return "today";
        }
        calendarView.refreshCounter();
    },
    refreshCounter: function () {
        webix.ajax("hub/vacation_days/byUserIdOld/" + userData.id, {
            error: function (text, data, xhr) {
                if (xhr.status != 200) {
                    util.messages.showErrorMessage("No data to load! Check your internet connection and try again.");
                }
            },
            success: function (text, data, xhr) {
                if (xhr.status === 200) {
                    if (data.json() != null) {
                        var vacationDays = data.json();
                        calendarView.freeDays += vacationDays.totalDays - vacationDays.usedDays;
                        if (vacationDays.totalDays - vacationDays.usedDays > 0) {
                            animateValue($$("t2"), 0, calendarView.freeDays, 700);
                        } else {
                            animateValue($$("t2"), 0, 0, 700);
                        }
                    } else {
                        animateValue($$("t2"), 0, 0, 700);
                    }

                }
            }
        });
        webix.ajax("hub/vacation_days/byUserId/" + userData.id, {
            error: function (text, data, xhr) {
                if (xhr.status != 200) {
                    util.messages.showErrorMessage("No data to load! Check your internet connection and try again.");
                }
            },
            success: function (text, data, xhr) {
                if (xhr.status === 200) {
                    if (data.json() != null) {
                        var vacationDays = data.json();
                        calendarView.freeDays += vacationDays.totalDays - vacationDays.usedDays;
                        if (vacationDays.totalDays - vacationDays.usedDays > 0) {
                            animateValue($$("t1"), 0, vacationDays.totalDays - vacationDays.usedDays, 700);
                        } else {
                            animateValue($$("t1"), 0, 0, 700);
                        }


                    } else {
                        animateValue($$("t1"), 0, 0, 700);
                    }
                }
            }
        });
        webix.ajax("hub/religion_leave/byUserId/" + userData.id, {
            error: function (text, data, xhr) {
                if (xhr.status != 200) {
                    util.messages.showErrorMessage("No data to load! Check your internet connection and try again.");
                }
            },
            success: function (text, data, xhr) {
                if (xhr.status === 200) {
                    var religionLeave;
                    if (data.json() != null) {
                        religionLeave = data.json();
                        calendarView.leftReligionLeaveDays = 2 - religionLeave.numberOfDaysUsed;
                    } else
                        calendarView.leftReligionLeaveDays = 2;
                    if (calendarView.leftReligionLeaveDays > 0) {
                        animateValue($$("t3"), 0, calendarView.leftReligionLeaveDays, 200);
                    } else {
                        animateValue($$("t3"), 0, 0, 200);
                    }
                }
            }
        });
        webix.ajax("hub/colectiveVacation/getByCompanyId/" + userData.companyId, {
            error: function (text, data, xhr) {
                if (xhr.status != 200) {
                    util.messages.showErrorMessage("No data to load! Check your internet connection and try again.");
                }
            },
            success: function (text, data, xhr) {
                if (xhr.status === 200) {
                    var colectiveVacationDays = data.json();
                    colectiveVacationDays.forEach(function (element) {
                        getDates(new Date(element.dateFrom), new Date(element.dateTo)).forEach(function (value) {
                            value.setHours(0);
                            vacationRequestApproved.push(value.getTime());
                        });
                    });
                    scheduler.setCurrentView();
                }
            }
        });
    },
    showSendDialog: function () {
        if ($$("periodsDT").count() == 0) {
            util.messages.showErrorMessage("Nisu odabrani dani za odsustvo");
            return;
        }
        $$("sendRequestButton").disable();
        if (selectedButton == buttons.VACATION)
            calendarView.sendVacationLeaveRequest();
        else if (selectedButton == buttons.SICK) {
            calendarView.sendSickLeaveRequest();
        } else if (selectedButton == buttons.PAID) {
            calendarView.sendPaidLeaveRequest();
        } else if (selectedButton == buttons.RELIGIOUS) {
            calendarView.sendReligionLeaveRequest();
        }
    },

    deleteCurrentRequest: function () {
        $$("periodsDT").serialize().forEach(function (value) {
            var id = value.id;
            var value = $$("periodsDT").getItem(id).date;
            var date = new Date(value + "T22:00:00.000Z");
            var index = selectedDays.indexOf(date.getTime());
            selectedDays.splice(index, 1);
        })
        $$("periodsDT").clearAll();
        scheduler.setCurrentView();
        $$("comment").setValue("");
    },
    sendVacationLeaveRequest: function () {
        var form = $$("createRequestForm");
        var format = webix.Date.strToDate("%d.%m.%Y");
        var leaveRequest = {
            senderUserId: userData.id,
            leaveTypeId: 1,
            leaveRequestStatusId: 1,
            companyId: userData.companyId,
            senderComment: $$("comment").getValue(),
            category: "Godišnji"
        }
        var leaveRequestsExtended = [];
        var temp = $$("periodsDT").serialize();
        var dates = [];
        var datesGetTime = [];
        temp.forEach(function (value) {
            dates.push(format(value.date));
        });
        dates.forEach(function (value) {
            datesGetTime.push(value.getTime())
        });
        webix.ajax("hub/leave_request/canGoOnVacationByDates/" + dates.toString(), {
            error: function (text, data, xhr) {
                util.messages.showErrorMessage(text);
                $$("sendRequestButton").enable();
            },
            success: function (text, data, xhr) {
                if (xhr.status === 200) {

                    var datesForWrite = [];
                    var datesForWriteCopy = [];
                    var datesGetTimeCopy = JSON.parse(JSON.stringify(datesGetTime));
                    var day = 1000 * 60 * 60 * 24;

                    var m = 0;
                    var br = 0;
                    var i = 0;

                    for (; i < datesGetTimeCopy.length - 1; i++) {
                        if (datesGetTimeCopy[i + 1] - datesGetTimeCopy[i] > day) {
                            var daysDifference = (datesGetTimeCopy[i + 1] - datesGetTimeCopy[i]) / (day);
                            for (var j = 1; j < daysDifference; j++) {
                                var nextDay = datesGetTimeCopy[i] + day * j;
                                var nextDayInWeek = (new Date(nextDay).getDay());
                                if (calendarView.nonWorkingdDaysInWeek.indexOf(nextDayInWeek) == -1 && calendarView.nonWorkingDays.indexOf(nextDay) == -1 && calendarView.collectiveVacationDays.indexOf(nextDay) == -1) {

                                    datesForWrite = [];
                                    datesForWriteCopy = [];
                                    for (var k = m; k < (i + 1); k++) {
                                        datesForWrite.push(temp[k]);
                                    }

                                    datesForWrite.forEach(function (value) {
                                        var date = {
                                            date: format(value.date),
                                            canceled: 0,
                                            paid: 1
                                        }
                                        datesForWriteCopy.push(date);
                                    });
                                    var leaveRequestExtended = {
                                        leaveRequest: leaveRequest,
                                        dates: datesForWriteCopy
                                    }

                                    leaveRequestsExtended.push(leaveRequestExtended);

                                    m = i + 1;
                                    j = daysDifference;
                                }

                            }

                        }
                    }

                    if (i == (datesGetTimeCopy.length - 1)) {

                        datesForWrite = [];
                        datesForWriteCopy = [];
                        for (var k = m; k < datesGetTimeCopy.length; k++) {
                            datesForWrite.push(temp[k]);
                        }

                        datesForWrite.forEach(function (value) {
                            var date = {
                                date: format(value.date),
                                canceled: 0,
                                paid: 1
                            }
                            datesForWriteCopy.push(date);
                        });

                        var leaveRequestExtended = {
                            leaveRequest: leaveRequest,
                            dates: datesForWriteCopy,
                        }

                        leaveRequestsExtended.push(leaveRequestExtended);

                    }


                    connection.sendAjax("POST", "hub/leave_request/insertExtended",
                        function (text, data, xhr) {
                            if (text) {
                                util.messages.showMessage("Zahtjev uspješno poslan.");
                                calendarView.getVacationDays();
                                scheduler.setCurrentView();
                                calendarView.deleteCurrentRequest();
                            } else
                                util.messages.showErrorMessage("Neuspješno slanje zahtjeva.");
                            $$("sendRequestButton").enable();
                        }, function (text, data, xhr) {
                            util.messages.showErrorMessage(text);
                            $$("sendRequestButton").enable();
                        }, leaveRequestsExtended);


                }
                else {
                    util.messages.showErrorMessage("Dani odabrani u godišnjem su prezauzeti.");
                    $$("sendRequestButton").enable();
                }
            }
        })

    },
    sendReligionLeaveRequest: function () {
        var form = $$("createRequestForm");
        var format = webix.Date.strToDate("%d.%m.%Y");
        var leaveRequest = {
            senderUserId: userData.id,
            leaveTypeId: 1,
            leaveRequestStatusId: 1,
            companyId: userData.companyId,
            senderComment: $$("comment").getValue(),
            category: "Praznik"
        }
        var leaveRequestsExtended = [];
        var temp = $$("periodsDT").serialize();

        var dates = [];
        var datesGetTime = [];
        temp.forEach(function (value) {
            dates.push(format(value.date));
        });
        dates.forEach(function (value) {
            datesGetTime.push(value.getTime())
        });


        var datesForWrite = [];
        var datesForWriteCopy = [];
        var datesGetTimeCopy = JSON.parse(JSON.stringify(datesGetTime));
        var day = 1000 * 60 * 60 * 24;

        var m = 0;
        var br = 0;
        var i = 0;

        for (; i < datesGetTimeCopy.length - 1; i++) {
            if (datesGetTimeCopy[i + 1] - datesGetTimeCopy[i] > day) {
                var daysDifference = (datesGetTimeCopy[i + 1] - datesGetTimeCopy[i]) / (day);
                for (var j = 1; j < daysDifference; j++) {
                    var nextDay = datesGetTimeCopy[i] + day * j;
                    var nextDayInWeek = (new Date(nextDay).getDay());
                    if (calendarView.nonWorkingdDaysInWeek.indexOf(nextDayInWeek) == -1 && calendarView.nonWorkingDays.indexOf(nextDay) == -1 && calendarView.collectiveVacationDays.indexOf(nextDay) == -1) {

                        datesForWrite = [];
                        datesForWriteCopy = [];
                        for (var k = m; k < (i + 1); k++) {
                            datesForWrite.push(temp[k]);
                        }

                        datesForWrite.forEach(function (value) {
                            var date = {
                                date: format(value.date),
                                canceled: 0,
                                paid: 1
                            }
                            datesForWriteCopy.push(date);
                        });
                        var leaveRequestExtended = {
                            leaveRequest: leaveRequest,
                            dates: datesForWriteCopy
                        }

                        leaveRequestsExtended.push(leaveRequestExtended);

                        m = i + 1;
                        j = daysDifference;
                    }

                }

            }
        }

        if (i == (datesGetTimeCopy.length - 1)) {

            datesForWrite = [];
            datesForWriteCopy = [];
            for (var k = m; k < datesGetTimeCopy.length; k++) {
                datesForWrite.push(temp[k]);
            }

            datesForWrite.forEach(function (value) {
                var date = {
                    date: format(value.date),
                    canceled: 0,
                    paid: 1
                }
                datesForWriteCopy.push(date);
            });

            var leaveRequestExtended = {
                leaveRequest: leaveRequest,
                dates: datesForWriteCopy,
            }

            leaveRequestsExtended.push(leaveRequestExtended);

        }


        connection.sendAjax("POST", "hub/leave_request/insertExtended",
            function (text, data, xhr) {
                if (text) {
                    util.messages.showMessage("Zahtjev uspješno poslan.");
                    calendarView.getVacationDays();
                    scheduler.setCurrentView();
                    calendarView.deleteCurrentRequest();
                } else
                    util.messages.showErrorMessage("Neuspješno slanje zahtjeva.");
                $$("sendRequestButton").enable();
            }, function (text, data, xhr) {
                util.messages.showErrorMessage(text);
                $$("sendRequestButton").enable();
            }, leaveRequestsExtended);

    },
    sendPaidLeaveRequest: function () {
        var form = $$("createRequestForm");
        var format = webix.Date.strToDate("%d.%m.%Y");
        var leaveRequest = {
            senderUserId: userData.id,
            leaveTypeId: 1,
            leaveRequestStatusId: 1,
            companyId: userData.companyId,
            senderComment: $$("comment").getValue(),
            category: "Odsustvo"
        }
        var leaveRequestsExtended = [];
        var temp = $$("periodsDT").serialize();
        var dates = [];
        var datesGetTime = [];
        temp.forEach(function (value) {
            dates.push(format(value.date));
        });
        dates.forEach(function (value) {
            datesGetTime.push(value.getTime())
        });


        var datesForWrite = [];
        var datesForWriteCopy = [];
        var datesGetTimeCopy = JSON.parse(JSON.stringify(datesGetTime));
        var day = 1000 * 60 * 60 * 24;

        var m = 0;
        var br = 0;
        var i = 0;

        for (; i < datesGetTimeCopy.length - 1; i++) {
            if (datesGetTimeCopy[i + 1] - datesGetTimeCopy[i] > day) {
                var daysDifference = (datesGetTimeCopy[i + 1] - datesGetTimeCopy[i]) / (day);
                for (var j = 1; j < daysDifference; j++) {
                    var nextDay = datesGetTimeCopy[i] + day * j;
                    var nextDayInWeek = (new Date(nextDay).getDay());
                    if (calendarView.nonWorkingdDaysInWeek.indexOf(nextDayInWeek) == -1 && calendarView.nonWorkingDays.indexOf(nextDay) == -1 && calendarView.collectiveVacationDays.indexOf(nextDay) == -1) {

                        datesForWrite = [];
                        datesForWriteCopy = [];
                        for (var k = m; k < (i + 1); k++) {
                            datesForWrite.push(temp[k]);
                        }

                        datesForWrite.forEach(function (value) {
                            var date = {
                                date: format(value.date),
                                canceled: 0,
                                paid: 1
                            }
                            datesForWriteCopy.push(date);
                        });
                        var leaveRequestExtended = {
                            leaveRequest: leaveRequest,
                            dates: datesForWriteCopy
                        }

                        leaveRequestsExtended.push(leaveRequestExtended);

                        m = i + 1;
                        j = daysDifference;
                    }

                }

            }
        }

        if (i == (datesGetTimeCopy.length - 1)) {

            datesForWrite = [];
            datesForWriteCopy = [];
            for (var k = m; k < datesGetTimeCopy.length; k++) {
                datesForWrite.push(temp[k]);
            }

            datesForWrite.forEach(function (value) {
                var date = {
                    date: format(value.date),
                    canceled: 0,
                    paid: 1
                }
                datesForWriteCopy.push(date);
            });

            var leaveRequestExtended = {
                leaveRequest: leaveRequest,
                dates: datesForWriteCopy,
            }

            leaveRequestsExtended.push(leaveRequestExtended);

        }


        connection.sendAjax("POST", "hub/leave_request/insertExtended",
            function (text, data, xhr) {
                if (text) {
                    util.messages.showMessage("Zahtjev uspješno poslan.");
                    calendarView.getVacationDays();
                    scheduler.setCurrentView();
                    calendarView.deleteCurrentRequest();
                } else
                    util.messages.showErrorMessage("Neuspješno slanje zahtjeva.");
                $$("sendRequestButton").enable();
            }, function (text, data, xhr) {
                util.messages.showErrorMessage(text);
                $$("sendRequestButton").enable();
            }, leaveRequestsExtended);

    },

    sendSickLeaveRequest: function () {
        var datesArr = [];
        var dates = $$("periodsDT").serialize();
        var format = webix.Date.strToDate("%d.%m.%Y");

        for (var i = 0; i < dates.length; i++) {
            var date = format(dates[i].date);
            datesArr.push(date);
        }

        connection.sendAjax("POST", "/hub/sickLeave/addSickLeaveRequest/",
            function (text, data, xhr) {
                util.messages.showMessage("Zahtjev za bolovanje uspješno poslan.")
                calendarView.deleteCurrentRequest();
                calendarView.getSickDays();
                $$("sendRequestButton").enable();
            }, function (text, data, xhr) {
                util.messages.showErrorMessage(text);
                $$("sendRequestButton").enable();
            }, datesArr);
    },
    ruleset:
        {
            isContinuous: function (dateToAdd) {
                var selectedDaysCopy = JSON.parse(JSON.stringify(selectedDays));
                var day = 1000 * 60 * 60 * 24;
                if (dateToAdd !== undefined && dateToAdd != null) {
                    selectedDaysCopy.push(dateToAdd);
                    selectedDaysCopy.sort(function (a, b) {
                        return a - b;
                    });
                }
                for (var i = 0; i < selectedDaysCopy.length - 1; i++) {
                    if (selectedDaysCopy[i + 1] - selectedDaysCopy[i] > day) {
                        var daysDifference = (selectedDaysCopy[i + 1] - selectedDaysCopy[i]) / (day);
                        for (var j = 1; j < daysDifference; j++) {
                            var nextDay = selectedDaysCopy[i] + day * j;
                            var nextDayInWeek = (new Date(nextDay).getDay());
                            if (calendarView.nonWorkingdDaysInWeek.indexOf(nextDayInWeek) == -1 &&
                                calendarView.nonWorkingDays.indexOf(nextDay) == -1)
                                return false;

                        }

                    }
                }
                return true;
            },
            isNotInPast: function (date) {
                if (getToday().getTime() > date)
                    return false;
                return true;
            },
            doesNotStartInFuture: function (date) {
                if (date.getTime() == getToday().getTime())
                    return false;
                var temp = $$("periodsDT").serialize()[0];
                if (temp == null)
                    return calendarView.ruleset.isNotInPast(date);
                var format = webix.Date.strToDate("%d.%m.%Y");
                if (format(temp.date).getTime() <= getToday().getTime())
                    return false;
                return true;
            },
            isNextYear: function (date) {
                if (date.getFullYear() > getToday().getFullYear())
                    return false;
                return true;
            }
        },
    vacation: function () {

        selectedButton = buttons.VACATION;
        $$("leaveTypeLabel").setValue("Zahtjev za godišnji odmor");
        $$("comment").show();
        $$("commentLabel").show();


    },
    leave: function () {

        selectedButton = buttons.PAID;
        $$("leaveTypeLabel").setValue("Zahtjev za odsustvo");
        $$("comment").show();
        $$("commentLabel").show();

    },
    sickLeave: function () {

        selectedButton = buttons.SICK;
        $$("leaveTypeLabel").setValue("Zahtjev za bolovanje");
        $$("comment").hide();
        $$("commentLabel").hide();

    },

    religionLeave: function () {

        selectedButton = buttons.RELIGIOUS;
        $$("leaveTypeLabel").setValue("Zahtjev za religijske praznike");
        $$("comment").show();
        $$("commentLabel").show();

    },
    getVacationDays: function () {
        webix.ajax("hub/leave_request/leaveRequestByUserId/" + userData.id, {
                error: function (text, data, xhr) {
                    if (xhr.status != 200) {
                        util.messages.showErrorMessage("No data to load! Check your internet connection and try again.");
                    }
                },
                success: function (text, data, xhr) {
                    if (xhr.status === 200) {
                        if (data.json() != null) {
                            var leaves = data.json(); //ALL seaves!!!!  ALL
                            for (var i = 0; i < leaves.length; i++) {
                                if ((leaves[i].category == "Godišnji" || leaves[i].category == "Godisnji") && (leaves[i].statusName == "Odobreno" || leaves[i].statusName == "Otkazivanje")) { //TODO: ne prepoznaje ovaj atribut!
                                    getDates(new Date(leaves[i].dateFrom), new Date(leaves[i].dateTo)).forEach(function (day) {
                                        vacationRequestApproved.push(day.getTime());
                                    })
                                } else if ((leaves[i].category == "Godišnji" || leaves[i].category == "Godisnji") && leaves[i].statusName == "Na čekanju") {
                                    getDates(new Date(leaves[i].dateFrom), new Date(leaves[i].dateTo)).forEach(function (day) {
                                        vacationRequestWaiting.push(day.getTime());
                                    })
                                } else if (leaves[i].category == "Odsustvo" && leaves[i].statusName == "Na čekanju") {
                                    getDates(new Date(leaves[i].dateFrom), new Date(leaves[i].dateTo)).forEach(function (day) {
                                        leaveRequestWaiting.push(day.getTime());
                                    })
                                } else if (leaves[i].category == "Odsustvo" && (leaves[i].statusName == "Odobreno" || leaves[i].statusName == "Otkazivanje") && leaves[i].typeName == "Plaćeno") { //
                                    getDates(new Date(leaves[i].dateFrom), new Date(leaves[i].dateTo)).forEach(function (day) {
                                        leaveRequestApprovedPaid.push(day.getTime());
                                    })
                                } else if (leaves[i].category == "Odsustvo" && (leaves[i].statusName == "Odobreno" || leaves[i].statusName == "Otkazivanje") && leaves[i].typeName == "Neplaćeno") { //
                                    getDates(new Date(leaves[i].dateFrom), new Date(leaves[i].dateTo)).forEach(function (day) {
                                        leaveRequestApprovedUnpaid.push(day.getTime());
                                    })
                                } else if (leaves[i].category == "Praznik" && leaves[i].statusName == "Odobreno") {
                                    getDates(new Date(leaves[i].dateFrom), new Date(leaves[i].dateTo)).forEach(function (day) {
                                        religionLeaveDaysApproved.push(day.getTime());
                                    })
                                } else if (leaves[i].category == "Praznik" && leaves[i].statusName == "Na čekanju") {
                                    getDates(new Date(leaves[i].dateFrom), new Date(leaves[i].dateTo)).forEach(function (day) {
                                        religionLeaveDaysWaiting.push(day.getTime());
                                    })
                                }

                            }
                            calendarView.vacationRequestWaiting = vacationRequestWaiting;
                            calendarView.vacationRequestApproved = vacationRequestApproved;

                            calendarView.leaveRequestWaiting = leaveRequestWaiting;
                            calendarView.leaveRequestApprovedPaid = leaveRequestApprovedPaid;
                            calendarView.leaveRequestApprovedUnpaid = leaveRequestApprovedUnpaid;

                            scheduler.setCurrentView();
                        }
                    }
                }
            }
        );
    },
    getSickDays: function () {
        webix.ajax("hub/sickLeave/getSickLeaveFilteredByUserId/" + userData.id, {
            error: function (text, data, xhr) {
                if (xhr.status != 200) {
                    util.messages.showErrorMessage("No data to load! Check your internet connection and try again.");
                }
            },
            success: function (text, data, xhr) {
                if (xhr.status === 200 && data.json() != null) {
                    var sickLeave = data.json();
                    sickLeave.forEach(function (value) {
                        if (value.statusName == "Na čekanju") {
                            getDates(new Date(value.dateFrom), new Date(value.dateTo)).forEach(function (day) {
                                calendarView.sickLeaveDaysWaiting.push(day.getTime());
                            })
                        }
                        else if (value.statusName == "Opravdano") {
                            getDates(new Date(value.dateFrom), new Date(value.dateTo)).forEach(function (day) {
                                calendarView.sickLeaveDaysApproved.push(day.getTime());
                            })
                        }
                    })
                    scheduler.setCurrentView();
                }
            }
        })
    }
}

function notEmpty(value) {
    return value != "";
};

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function roundToDayStart(timeStamp) {
    var d = new Date(timeStamp);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0)
}

function getToday() {
    return roundToDayStart(Date.now());
}

function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date(currentDate));
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}

function days_between(date1, date2) {

    // The number of milliseconds in one day
    var ONE_DAY = 1000 * 60 * 60 * 24

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime()
    var date2_ms = date2.getTime()

    // Calculate the difference in milliseconds
    var difference_ms = Math.abs(date1_ms - date2_ms)

    // Convert back to days and return
    return Math.round(difference_ms / ONE_DAY)

}