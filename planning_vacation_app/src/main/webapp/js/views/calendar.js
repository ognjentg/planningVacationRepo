var chosenCategory=null; //here will be setted chosen category  - but there must be value from database...
var schedulerEvents = [];
var selectedButton=null;

var calendarView = {
    freeDays: 0,
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
                        template: "<span class='fa fa-briefcase'></span> Kalendar"
                    },
                    {
                        css: "admin-counter",
                        rows: [
                            {
                                view: "template",
                                id: "t2",
                                css: "companies-counter",
                            },
                            {
                                view: "label",
                                label: "Ukupan godišnji",
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
                            },
                            {
                                view: "label",
                                label: "Preostali godišnji",
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
                            },
                            {
                                view: "label",
                                label: "Preostalo plaćeno odsustvo",
                                type: "header",
                                css: "companies-counter"
                            },

                        ]
                    }
                ]
            },
            {
                cols: [{
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
                    },{
                    width: 10
                    },
                    {
                        rows: [{
                            cols:[
                                {
                                    id: "vacationBtn",
                                    view: "button",
                                    label: "Godišnji odmor",
                                    css: "vacationButton",
                                    click: "calendarView.vacation",
                                    autowidth: true
                                },{},
                                {
                                    id: "leaveBtn",
                                    view: "button",
                                    label: "Odsustvo",
                                    css: "leaveButton",
                                    click:"calendarView.leave",
                                    autowidth: true
                                },{},
                                {
                                    id: "sickLeaveBtn",
                                    view: "button",
                                    label: "Bolovanje",
                                    css: "sickLeaveButton",
                                    click:"calendarView.sickLeave",
                                    autowidth: true
                                }
                            ]
                        },{
                                view: "label",
                                label: "Zahtjev za godisnjim odmorom",
                                  css:{"font-style": "bold", "font-size": "150%"},
                                type: "header",
                                width: 400,
                                height: 70
                            },{
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
                                        },{
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
                                            $$("periodsDT").remove(id);
                                            scheduler.deleteEvent(eventId);
                                         }
                                     },
                                         rules: {
                                               startDate:notEmpty, //todo-maybe this doesn't work,because method notEmpty work for String...
                                               endDate:notEmpty
                                                                                                           },
                                 },{
                                 height:10
                                 },{
                                 view: "label",
                                  label: "Komentar:"},
                                 {
                                 //2.element-comment section
                                           view:"textarea",
                                           id: "comment",
                                           labelAlign:"left",
                                          // height:200,  //without setted height, we can do resizeing
                                           width: 400,
                                           tooltip:"U komentaru možete objasniti detalje Vašeg zahtjeva.",
                                           placeholder:"Ovdje unesite komentar ako imate"
                                 },{
                                 height:10
                                 },{
                                     id:"sendRequestButton",
                                    view:"button",
                                     type: "iconButton",
                                     hotkey: "enter",
                                    //icon: "", //todo
                                    label:"Posalji zahtjev",
                                    height:40,
                                    css: "companyButton",
                                    click:'calendarView.showSendDialog'
                                 }]
                             },{view: "label", //this is making a line from bottom
                                 width: 5,
                                 height:10
                               }]
                    },{
                       width:10 //this is making right line
                    }]
                    }]
    },
    selectPanel: function() {
        $$("main").removeView(rightPanel);
        rightPanel = "calendarPanel";
        var panelCopy = webix.copy(this.panel);
        $$("main").addView(webix.copy(panelCopy));



        var nonWorkingDays = [];
        var nonWorkingDaysInWeek = [];

        //Dohvatanje neradnih dana
        webix.ajax("hub/nonWorkingDay/getNonWorkingDayByCompany/" + userData.companyId, {
            error: function (text, data, xhr) {
                if (xhr.status != 200) {
                    alert("No data to load! Check your internet connection and try again.");
                }
            },
            success: function (text, data, xhr) {
                if (xhr.status === 200) {
                    if (data.json() != null) {
                        var dates = data.json();
                        for(var i = 0; i < dates.length; i++){
                            var tempDate = new Date(dates[i].day);
                            tempDate.setHours(00, 00, 00);
                            nonWorkingDays[i] = tempDate.getTime();
                            scheduler.blockTime(tempDate, "fullday");
                        }
                        scheduler.setCurrentView();
                    }
                }
            }
        });
        //Dohvatanje neradnih dana u sedmici
        webix.ajax("hub/nonWorkingDayInWeek/getNonWorkingDayInWeekByCompanyJavaValue/" + userData.companyId, {
            error: function (text, data, xhr) {
                if (xhr.status != 200) {
                    alert("No data to load! Check your internet connection and try again.");
                }
            },
            success: function (text, data, xhr) {
                if (xhr.status === 200) {
                    if (data.json() != null) {
                        nonWorkingDaysInWeek = data.json();
                        for(var i = 0; i < nonWorkingDaysInWeek.length; i++){
                            if(nonWorkingDaysInWeek[i] == 7)
                                nonWorkingDaysInWeek[i] = 0;
                        }
                        scheduler.blockTime({
                            days: nonWorkingDaysInWeek,
                            zones: "fullday"
                        });
                        scheduler.setCurrentView();
                    }
                }
            }
        });

        scheduler.config.multi_day = true;
        scheduler.config.full_day = true;

        //Mogućnost promjene vec izabranih intervala
        scheduler.config.resize_month_events = true;

        scheduler.config.xml_date="%Y-%m-%d %H:%i";

        //Boja neradnih dana i današnjeg dana
        scheduler.templates.month_date_class=function(date,today){
            //Današnji dan
            if(date.getTime() == today.getTime())
                return  "today";
            //Neradni dani
            if (nonWorkingDaysInWeek.includes(date.getDay()) || nonWorkingDays.includes(date.getTime()))
                return "good_day";
            return "";
        }
        //skrivanje lightboxa
        scheduler.attachEvent("onBeforeLightbox", function (id){
            return false;
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

        scheduler.attachEvent("onBeforeEventChanged", function(ev, e, is_new, original){
            if($$("periodsDT").count() >= calendarView.freeDays){
                util.messages.showErrorMessage("Nemate pravo na više dana");
                return false;
            }
            var dates = getDates(ev.start_date, ev.end_date);
            var tableData = [];
            dates.forEach(function (value) { tableData.push({eventId: ev.id, date: value.toDateString()}) });
            $$("periodsDT").parse(tableData);
            return true;
        });
        scheduler.attachEvent("onLimitViolation", function  (id, obj){
            dhtmlx.message('Neradni dan ili praznik.');
        });
        calendarView.refreshCounter();
    },
    refreshCounter: function () {
        //Dohvatanje dana godišnjeg odmora
        webix.ajax("hub/vacation_days/byUserId/" + userData.id, {
            error: function (text, data, xhr) {
                if (xhr.status != 200) {
                    alert("No data to load! Check your internet connection and try again.");
                }
            },
            success: function (text, data, xhr) {
                if (xhr.status === 200) {
                    if (data.json() != null) {
                        var vacationDays = data.json();
                        calendarView.freeDays = vacationDays.totalDays - vacationDays.usedDays;
                        animateValue($$("t1"), 0, vacationDays.totalDays - vacationDays.usedDays, 700);
                        animateValue($$("t2"), 0, vacationDays.totalDays, 700);
                    }
                }
            }
        });
        //Dohvatanje slobodnih dana za religijske praznike
        webix.ajax("hub/religion_leave/byUserId/" + userData.id, {
            error: function (text, data, xhr) {
                if (xhr.status != 200) {
                    alert("No data to load! Check your internet connection and try again.");
                }
            },
            success: function (text, data, xhr) {
                if (xhr.status === 200) {
                    if (data.json() != null) {
                        var religionLeave = data.json();
                        animateValue($$("t3"), 0, 2 - religionLeave.numberOfDaysUsed, 200);
                    }
                }
            }
        });
    },
    showSendDialog: function () {
        if($$("periodsDT").count() == 0){
            util.messages.showErrorMessage("Nisu odabrani dani za odsustvo");
            return;
        }
        var form = $$("createRequestForm");
        var leaveRequest = {
            senderUserId: userData.id,
            leaveTypeId: 1,
            leaveRequestStatusId: 1,
            companyId: userData.companyId,
            senderComment: $$("comment").getValue(),
            category: "Godisnji",
        }
        connection.sendAjax("POST", "hub/leave_request/",
            function (text, data, xhr) {
                if (text) {
                    util.messages.showMessage("Zahtjev uspjesno poslan");
                } else
                    util.messages.showErrorMessage("Neuspješno slanje.");
            }, function (text, data, xhr) {
                alert(text);
            }, leaveRequest);


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
},
    vacation: function(){
        selectedButton=1;
    },
    leave: function(){
        selectedButton=2;
    },
    sickLeave: function () {
        selectedButton=3;
    }
}

function notEmpty(value){
  return value != "";
};

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate < stopDate) {
        dateArray.push(new Date (currentDate));
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}