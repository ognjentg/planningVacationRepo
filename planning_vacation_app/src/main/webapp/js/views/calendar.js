var chosenCategory = null; //here will be setted chosen category  - but there must be value from database...
var schedulerEvents = [];
var selectedDays = [];
var updatedDays = [];

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
    freeDays: 20,
    nonWorkingDays: null,
    nonWorkingdDaysInWeek: null,
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
                                template: "<p>Učitavanje</p>"
                            },
                            {
                                view: "label",
                                label: "Stari godišnji",
                                type: "header",
                                css: "companies-counter"
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
                                template: "<p>Učitavanje</p>"
                            },
                            {
                                view: "label",
                                label: "Novi godišnji",
                                type: "header",
                                css: "companies-counter"
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
                                template: "<p>Učitavanje</p>"
                            },
                            {
                                view: "label",
                                label: "Preostalo dana za praznike",
                                type: "header",
                                css: "companies-counter"
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
                                    label: "Godišnji",
                                    align: "center"
                                },
                                {
                                    view: "label",
                                    label: "Plaćeno",
                                    align: "center"
                                },
                                {
                                    view: "label",
                                    label: "Neplaćeno",
                                    align: "center"
                                },
                                {
                                    view: "label",
                                    label: "Bolovanje",
                                    align: "center"
                                },
                                {
                                    view: "label",
                                    label: "Religijsko",
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
                                        console.log("analaketa");
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
                            label: "Zahtjev za godišnjim odmorom",
                            css: {"font-style": "bold", "font-size": "150%"},
                            type: "header",
                            width: 400,
                            height: 70
                        }, {
                            view: "form",
                            id: "createRequestForm",
                            elements: [{
                                //Tabela
                                view: "datatable",
                                id: "periodsDT",
                                invalidMessage: "Niste odabrali period.",

                                margin: 10,
                                tooltip: true,
                                columns: [{
                                    id: "eventId",
                                    hidden: true,
                                    //fillspace: true
                                    //editable: false,
                                    //sort: "date",
                                    //width:210,
                                    // header: ["<span class='webix_icon fa fa-calendar'/>Od"]
                                }, {
                                    id: "date",
                                    fillspace: true,
                                    editable: false,
                                    sort: "date",
                                    //width:"100%",
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
                                        var date = format(new Date(value + "T22:00:00.000Z"));
                                        var index = selectedDays.indexOf(date.getTime());
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
                                    //2.element-comment section
                                    view: "textarea",
                                    id: "comment",
                                    labelAlign: "left",
                                    // height:200,  //without setted height, we can do resizeing
                                    autoWidth: true,
                                    tooltip: "U komentaru možete objasniti detalje Vašeg zahtjeva.",
                                    placeholder: "Ovdje unesite komentar ako imate"
                                }, {
                                    height: 10
                                }, {
                                    id: "sendRequestButton",
                                    view: "button",
                                    type: "iconButton",
                                    hotkey: "enter",
                                    //icon: "", //todo
                                    label: "Pošalji zahtjev",
                                    height: 40,
                                    css: "companyButton",
                                    click: 'calendarView.showSendDialog'
                                }]
                        }, {
                            view: "label", //this is making a line from bottom
                            width: 5,
                            height: 10
                        }]
                    }, {
                        width: 10 //this is making right line
                    }]
            }]
    },
    selectPanel: function () {
        $$("main").removeView(rightPanel);
        rightPanel = "calendarPanel";
        var panelCopy = webix.copy(this.panel);
        $$("main").addView(webix.copy(panelCopy));

        var nonWorkingDays = [];
        var nonWorkingDaysInWeek = [];


        //var sickLeaveDaysApproved = [];
        //var sickLeaveDaysWaiting = [];
        calendarView.getVacationDays();
        calendarView.getSickDays();
        //Dohvatanje neradnih dana
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
                            tempDate.setHours(00, 00, 00);
                            nonWorkingDays[i] = tempDate.getTime();
                            scheduler.blockTime(tempDate, "fullday");
                        }
                        calendarView.nonWorkingDays = nonWorkingDays;
                        scheduler.setCurrentView();
                    }
                }
            }
        });
        //Dohvatanje neradnih dana u sedmici
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
        //Dohvatanje ograničenja kompanije /hub/constraints
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
        //Da li može ići na godišnji
        webix.ajax("hub/user/canGoOnVacation/" + userData.id, {
            error: function (text, data, xhr) {
                if (xhr.status != 200) {
                    util.messages.showErrorMessage("No data to load! Check your internet connection and try again.");
                }
            },
            success: function (text, data, xhr) {
                if (xhr.status === 200) {
                    calendarView.canGoOnVacation = text;
                }
            }
        });

        scheduler.config.multi_day = true;
        scheduler.config.full_day = true;

        //Mogućnost promjene vec izabranih intervala
        scheduler.config.resize_month_events = true;

        scheduler.config.xml_date = "%Y-%m-%d %H:%i";

        //Boja neradnih dana i današnjeg dana
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
        //skrivanje lightboxa
        scheduler.attachEvent("onBeforeLightbox", function (id) {
            return false;
        });
        scheduler.attachEvent("onDoubleClick", function (id, e) {
            return false;
        });
        scheduler.config.dblclick_create = false;
        scheduler.config.drag_create = false;
        scheduler.attachEvent("onEmptyClick", function (selectedDate, e) {
            if (
                // leaveRequestWaiting.includes(selectedDate.getTime()) ||
            // sickLeaveDaysWaiting.includes(selectedDate.getTime()) ||
            // sickLeaveDaysApproved.includes(selectedDate.getTime())  ||
            // vacationRequestWaiting.includes(selectedDate.getTime()) ||
            // vacationRequestApproved.includes(selectedDate.getTime()) ||
                calendarView.sickLeaveDaysApproved.includes(selectedDate.getTime()) ||
                calendarView.sickLeaveDaysWaiting.includes(selectedDate.getTime()) ||
                leaveRequestWaiting.includes(selectedDate.getTime()) ||
                calendarView.vacationRequestWaiting.includes(selectedDate.getTime()) ||
                calendarView.vacationRequestApproved.includes(selectedDate.getTime()) ||
                calendarView.leaveRequestApprovedPaid.includes(selectedDate.getTime()) ||
                calendarView.leaveRequestApprovedUnpaid.includes(selectedDate.getTime())
            ) {

                console.log("sick approved" + calendarView.sickLeaveDaysApproved);
                console.log("sick waiting" + calendarView.sickLeaveDaysWaiting);
                console.log("leave waiting" + calendarView.leaveRequestWaiting);
                console.log("vacation approved" + calendarView.vacationRequestApproved);
                console.log("vacation waiting" + calendarView.vacationRequestWaiting);

                return false;

            }

            if (selectedDays.includes(selectedDate.getTime())) {
                var index = selectedDays.indexOf(selectedDate.getTime());
                if (selectedButton === buttons.SICK)           // Since sick leave must be continuous, erase all after this point.
                    selectedDays.splice(index);
                else
                    selectedDays.splice(index, 1);
            } else if ([buttons.SICK].includes(selectedButton) &&
                calendarView.ruleset.doesNotStartInFuture(selectedDate.getTime())) {
                util.messages.showErrorMessage("Dan ne smije biti u budućnosti");
            } else if ([buttons.SICK].includes(selectedButton) && (new Date()).getTime() > selectedDate.getTime() &&
                days_between(selectedDate, new Date()) > calendarView.sickLeaveJustificationPeriodLength
            ) {
                util.messages.showErrorMessage("Istekao je period za validaciju");
            } else if ([buttons.VACATION, buttons.PAID, buttons.RELIGIOUS].includes(selectedButton) &&
                !calendarView.ruleset.isNotInPast(selectedDate.getTime())) { // Apply not in past rule to vacation and paid leave
                util.messages.showErrorMessage("Dan ne smije biti u prošlosti")
            }else if ([buttons.VACATION].includes(selectedButton) &&
                !calendarView.canGoOnVacation) { // Apply not in past rule to vacation and paid leave
                util.messages.showErrorMessage("Nemate još pravo na godišnji!")
            } else if (selectedButton === buttons.SICK &&
                nonWorkingDaysInWeek.indexOf(selectedDate.getDay()) === -1 &&
                nonWorkingDays.indexOf(selectedDate.getTime()) === -1) {
                if (selectedDays.length === 0) {
                    selectedDays.push(selectedDate.getTime());
                } else {
                    var day = 60 * 60 * 24 * 1000;
                    var dayDifference = (selectedDate.getTime() - selectedDays[selectedDays.length - 1]) / day;
                    var newDay = selectedDays[selectedDays.length - 1];
                    if (dayDifference < 0) // if the user selects in the opposite direction, just quickly correct the range.
                    {
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
        });
        // 1. custom
        /* scheduler.config.lightbox.sections=[
             {name:"time", height:50, type:"time", map_to:"auto", time_format:[ "%d", "%m", "%Y"]}
         ]*/
        //Provjera da li ima godišnjeg
        /* scheduler.attachEvent("onBeforeEventCreated", function (e){
             if($$("periodsDT").count() < calendarView.freeDays)
                 return true;
             util.messages.showErrorMessage("Nemate pravo na više dana");
             return false;
         });*/
        /* scheduler.attachEvent("onEventCreated", function(id,e){
             var event = scheduler.getEvent(id);
             var dates = getDates(event.start_date, event.end_date);
             //console.log("dates " + event.start_date.toDateString() + " | " + event.end_date.toDateString());
             //dates.forEach(function (value) { console.log("date " + value.toDateString()); });
             var tableData = {
                 id: id,
                 date: event.start_date.toDateString()
             }
             $$("periodsDT").parse(tableData);
         });*/
        //2. started working...
        schedulerEvents.push(scheduler.attachEvent("onClick", function (id, e) {
            //dhtmlx.message("proba");
            // calendarView.showEventInfo(id);
            console.log(schedulerEvents);
        }));

        //Inicijalizacija i postavljanje na trenutni datum
        var date = new Date();
        scheduler.locale = locale_sr_latin; // Change the locale to Serbian Latin.
        scheduler.init('scheduler_here', new Date(date.getFullYear(), date.getMonth(), date.getDate()), "month");

        scheduler.attachEvent("onBeforeEventChanged", function (ev, e, is_new, original) {
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
        });
        scheduler.attachEvent("onLimitViolation", function (id, obj) {
            dhtmlx.message('Neradni dan ili praznik.');
        });
        scheduler.templates.event_bar_text = function (start, end, event) {
            return "";
        }
        scheduler.templates.event_class = function (start, end, ev) {
            return "today";
        }
        calendarView.refreshCounter();
    },
    refreshCounter: function () {
        //Dohvatanje dana godišnjeg odmora
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
                        calendarView.freeDays = vacationDays.totalDays - vacationDays.usedDays;
                        if (vacationDays.totalDays - vacationDays.usedDays > 0) {
                            animateValue($$("t2"), 0, calendarView.freeDays, 700);
                        } else {
                            animateValue($$("t2"), 0, 0, 700);
                        }
                    } else {
                        animateValue($$("t2"), 0, 0, 700);
                    }
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
                }
            }
        });

        //Dohvatanje slobodnih dana za religijske praznike
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
                        religionLeave.numberOfDaysUsed = 0;
                    if (2 - religionLeave.numberOfDaysUsed > 0) {
                        animateValue($$("t3"), 0, 2 - religionLeave.numberOfDaysUsed, 200);
                    } else {
                        animateValue($$("t3"), 0, 0, 200);
                    }
                }
            }
        });
        //Dohvatanje kolektivnog godišnjeg
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
        //else if(selectedButton == buttons.PAID)
        //Leave
        else if (selectedButton == buttons.SICK) {
            calendarView.sendSickLeaveRequest();
        } else if (selectedButton == buttons.PAID) {
            calendarView.sendPaidLeaveRequest();
        } else if (selectedButton == buttons.RELIGIOUS) {
            calendarView.sendReligionLeaveRequest();
        }

        /*
                if (form.validate()) {
                    var newRequest = {
                        category: chosenCategory,
                         sender_comment: form.getValues().comment,
                         sender_user_id:userData.id,
                        //approver_user_id: //todo: find out id from sector managager if this user has sector - or id from director from his company
                        //
                        //
                        companyId: companyData.id,
                    };
                    console.log(newUser);
                    //TODO: POST...
            }

         */
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
                    });
                    util.messages.showMessage("Zahtjev uspjesno poslan");
                    calendarView.deleteCurrentRequest();
                } else
                    util.messages.showErrorMessage("Neuspješno slanje zahtjeva.");
                $$("sendRequestButton").enable();
            }, function (text, data, xhr) {
                util.messages.showErrorMessage(text);
                $$("sendRequestButton").enable();
            }, leaveRequest);
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
                $$("sendRequestButton").enable();
            }, function (text, data, xhr) {
                util.messages.showErrorMessage(text);
                $$("sendRequestButton").enable();
            }, leaveRequest);
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
                $$("sendRequestButton").enable();
            }, function (text, data, xhr) {
                util.messages.showErrorMessage(text);
                $$("sendRequestButton").enable();
            }, leaveRequest);
    },

    sendSickLeaveRequest: function () {
        var datesArr = []; //saljem samo dane koji nisu bili cekirani ili dane u sedmici koji su otcekirani pri pokretanju aplikacije
        var dates = $$("periodsDT").serialize();
        var format = webix.Date.strToDate("%d.%m.%Y");

        for (var i = 0; i < dates.length; i++) {
            var date = format(dates[i].date);
            console.log(date);
            datesArr.push(date);
        }

        connection.sendAjax("POST", "/hub/sickLeave/addSickLeaveRequest/",
            function (text, data, xhr) {
                util.messages.showMessage("Zahtjev za bolovanje uspješno polsan.")
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
            // Check if all of the selected dates are neighboring each other (ignoring non working days)
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
                var temp = $$("periodsDT").serialize()[0];
                if (temp == null)
                    return calendarView.ruleset.isNotInPast(date);
                var format = webix.Date.strToDate("%d.%m.%Y");
                if (format(temp.date).getTime() < getToday().getTime())
                    return false;
                return true;
            }
        },
    vacation: function () {

        selectedButton = buttons.VACATION;
        $$("leaveTypeLabel").setValue("Zahtjev za godišnjim odmorom");
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
        $$("leaveTypeLabel").setValue("Zahtjev za religijsko odsustvo");
        $$("comment").show();
        $$("commentLabel").show();

    },
    //Dohvatanje godišnjeg
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
                                if ((leaves[i].category == "Godišnji" || leaves[i].category == "Godisnji") && leaves[i].statusName == "Odobreno") { //TODO: ne prepoznaje ovaj atribut!
                                    getDates(new Date(leaves[i].dateFrom), new Date(leaves[i].dateTo)).forEach(function (day) {
                                        vacationRequestApproved.push(day.getTime());
                                        // console.log(vacationRequestApproved);
                                    })
                                } else if ((leaves[i].category == "Godišnji" || leaves[i].category == "Godisnji") && leaves[i].statusName != "Odobreno" && leaves[i].statusName != "Odbijeno") {
                                    getDates(new Date(leaves[i].dateFrom), new Date(leaves[i].dateTo)).forEach(function (day) {
                                        vacationRequestWaiting.push(day.getTime());
                                        console.log(vacationRequestWaiting);
                                    })
                                } else if (leaves[i].category == "Odsustvo" && leaves[i].statusName != "Odobreno" && leaves[i].statusName != "Odbijeno") {
                                    getDates(new Date(leaves[i].dateFrom), new Date(leaves[i].dateTo)).forEach(function (day) {
                                        leaveRequestWaiting.push(day.getTime());
                                        console.log(vacationRequestWaiting);
                                    })
                                } else if (leaves[i].category == "Odsustvo" && leaves[i].statusName == "Odobreno" && leaves[i].typeName == "Plaćeno") { //
                                    getDates(new Date(leaves[i].dateFrom), new Date(leaves[i].dateTo)).forEach(function (day) {
                                        leaveRequestApprovedPaid.push(day.getTime());
                                        console.log(leaveRequestApprovedPaid);
                                    })
                                } else if (leaves[i].category == "Odsustvo" && leaves[i].statusName == "Odobreno" && leaves[i].typeName == "Neplaćeno") { //
                                    getDates(new Date(leaves[i].dateFrom), new Date(leaves[i].dateTo)).forEach(function (day) {
                                        leaveRequestApprovedUnpaid.push(day.getTime());
                                        console.log(leaveRequestApprovedUnpaid);
                                    })
                                } else if (leaves[i].category == "Praznik" && leaves[i].statusName == "Odobreno") {
                                    getDates(new Date(leaves[i].dateFrom), new Date(leaves[i].dateTo)).forEach(function (day) {
                                        religionLeaveDaysApproved.push(day.getTime());
                                    })
                                } else if (leaves[i].category == "Praznik" && leaves[i].statusName != "Odobreno") {
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
    //Dohvatanje bolovanja
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
                        //Dodavanje dana na čekanju
                        if (value.statusName == "Na čekanju") {
                            console.log("FROM " + value.dateFrom + " TO " + value.dateTo);
                            getDates(new Date(value.dateFrom), new Date(value.dateTo)).forEach(function (day) {
                                calendarView.sickLeaveDaysWaiting.push(day.getTime());
                            })
                        }
                        //Dodavanje odobrenih dana
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

function roundToDayStart(timeStamp) { // Rounds timestamp to midnight of that day
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