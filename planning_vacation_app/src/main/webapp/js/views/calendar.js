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
                    }, {}, {}, {},
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
                                label: "preostali godišnji",
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
                    },
                    {
                        view: "template",
                        rows: [
                            {
                                view: "label",
                                label: "TODO",
                                width: 140,
                                height: 70
                            }
                        ]
                    }]
            }


        ]
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
            dhtmlx.message('Praznik!');
        });

        animateValue($$("t1"), 0, 20, 300);

    }
}

