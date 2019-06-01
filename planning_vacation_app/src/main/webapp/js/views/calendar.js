var chosenCategory=null; //here will be setted chosen category  - but there must be value from database...

var calendarView = {
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
                            },

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
                       // view: "template",
                        rows: [{
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
                                                id: "startDate",
                                                fillspace: true,
                                                editable: false,
                                                sort: "date",
                                                //width:210,
                                                header: ["<span class='webix_icon fa fa-calendar'/>Od"]
                                        },{
                                                 id: "endDate",
                                                 fillspace: true,
                                                 editable: false,
                                                 sort: "date",
                                                 //width:210,
                                                 header: ["<span class='webix_icon fa fa-calendar'/>Do"]
                                         }],
                                         rules: {
                                               startDate:notEmpty,
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
                                          // label:"Komentar",
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
                                    //icon: "",
                                    label:"Posalji zahtjev",
                                    height:40,
                                    css: "companyButton",
                                    click:'calendarView.showSendDialog'
                                 }]/*,
                                 rules: {

                                 }*/
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

        scheduler.config.multi_day = true;
        scheduler.config.full_day = true;

        //Mogućnost promjene vec izabranih intervala
        scheduler.config.resize_month_events = true;

        //Da neradni dani budu sive boje (samo za vikende)
        scheduler.config.xml_date="%Y-%m-%d %H:%i";
        scheduler.templates.month_date_class=function(date,today){
            if (date.getDay() == 0|| date.getDay() == 6)
                return "good_day";
            return "";
        }

        //Inicijalizacija i postavljanje na trenutni datum
        scheduler.init('scheduler_here', new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()), "month");

        //Limitovanje
        scheduler.blockTime({
            days: [0, 6],
            zones: "fullday"
        });
        scheduler.attachEvent("onLimitViolation", function  (id, obj){
            dhtmlx.message('Neradni dan ili praznik.');
        });
        calendarView.refreshCounter();

//<<<<<<< HEAD
    },
    refreshCounter: function () {
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
                        console.log("DAYS: " + vacationDays.totalDays);
                        animateValue($$("t1"), 0, vacationDays.totalDays - vacationDays.usedDays, 700);
                        animateValue($$("t2"), 0, vacationDays.totalDays, 700);
                    }
                }
            }
        });
//=======
        animateValue($$("t1"), 0, 20, 300);

    },
    showSendDialog: function () {
     webix.message("TODO.");
var form = $$("createRequestForm");
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

//>>>>>>> Added form for sending requests in calendar.js
    }
}

}

function notEmpty(value){
  return value != "";
};