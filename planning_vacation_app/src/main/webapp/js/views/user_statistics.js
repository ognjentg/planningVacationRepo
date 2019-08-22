var userStatisticsView;
var URL = "/hub/user/allUsersName";
var sectors;
userStatisticsView = {
    selectPanel: function () {
        $$("main").removeView(rightPanel);
        rightPanel = "userStatisticsPanel";


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
    },
    selectPanelWithSector: function (id) {
        $$("main").removeView(rightPanel);
        rightPanel = "userStatisticsPanel";

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

        $$("user_statisticsDT").clearAll();
        $$("user_statisticsDT").define("url", "/hub/user/getUsers/sector/" + id);
        $$("user_statisticsDT").detachEvent("onBeforeDelete");
    },
    getPanel: function () {
        return {
            id: "userStatisticsPanel",
            rows: [
                {
                    view: "toolbar",
                    padding: 8,
                    css: {"background": "#ffffff !important"},
                    cols: [
                        {
                            template: "<span class='webix_icon fas fa-line-chart'><\/span> Statistika zaposlenih u kompaniji",
                            view: "label",
                            css: {"color": "black !important"}
                        },
                        {},
                        {
                            view: "button",
                            id: "archiveBtn",
                            name: "archiveBtn",
                            type: "iconButton",
                            icon: "external-link",
                            css: {"background": "#268fd5 !important"},

                            label: "Export podataka u tabele",
                            width: 200,
                            on: {
                                onItemClick: function () {
                                    $$("archiveBtn").disable();
                                    webix.toPDF("byMonthChartID", {
                                            docHeader: {
                                                text: "Statistika korisnika" + " - " + $$("user_statisticsDT").getSelectedItem().byMonthChartName + " " + $$("user_statisticsDT").getSelectedItem().lastName,
                                                textAlign: "center"

                                            },
                                            columns: {
                                                "number": {header: "Broj odsutnih"},
                                                "month": {header: "Mjesec"},
                                                "vacation": {header: "Kategorija - godišnji odmor"},
                                                "leave": {header: "Kategorija - odsustvo"},
                                                "religion": {header: "Kategorija - praznik"}

                                            },
                                            autowidth: true
                                        }
                                    );
                                    $$("archiveBtn").enable();

                                }
                            }
                        },
                        {
                            view: "button",
                            id: "archiveBtn2",
                            name: "archiveBtn2",
                            type: "iconButton",
                            icon: "external-link",
                            label: "Export podataka u slike",
                            width: 200,
                            css: {"background": "#268fd5 !important"},

                            on: {
                                onItemClick: function () {
                                    $$("archiveBtn2").disable();

                                    webix.toPNG("byMonthChartID").then(function (value) {
                                        return webix.toPNG("radarChart");
                                    }).then(function (value) {
                                        webix.toPNG("chartDonutId");
                                        $$("archiveBtn2").enable();
                                    });


                                }
                            }
                        }
                    ]

                },
                {
                    cols: [{
                        view: "datatable",
                        id: "user_statisticsDT",
                        width: 300,
                        scrollAlignY: true,
                        navigation: true,
                        select: "row",
                        multiselect: false,
                        columns: [{
                            id: "value",
                            header: [
                                "Zaposleni", {
                                    content: "textFilter", value: "", icon: "wxi-search"
                                }
                            ],
                            width: 300,
                            fillspace: true,
                            sort: "string"
                        }],

                        on: {
                            onBeforeLoad: function () {
                                this.showOverlay("Učitavanje...");
                                $$("archiveBtn").disable();
                                $$("archiveBtn2").disable();
                            },
                            onAfterLoad: function () {
                                $$("archiveBtn").enable();
                                $$("archiveBtn2").enable();
                                this.hideOverlay();
                                if (!this.count())
                                    this.showOverlay("Izvinite, nema podataka.");
                                var id = this.getbyMonthChartId();
                                $$("user_statisticsDT").select(id);


                            },
                            onSelectChange: function () {
                                var pom = $$("user_statisticsDT").getSelectedId();
                                connection.sendAjax("GET",
                                    "/hub/company/statistics/user/" + pom.id,
                                    function (text, data, xhr) {
                                        pie = data.json();

                                        $$("chartDonutId").clearAll();
                                        $$("chartDonutId").parse(pie);

                                        if (!$$("chartDonutId").count()) { //if no data is available
                                            webix.extend($$("chartDonutId"), webix.OverlayBox);
                                            $$("chartDonutId").showOverlay("<div><img src='https://loading.io/spinners/coffee/index.coffee-cup-drink-loader.svg'></img></div><div style='margin:75px; font-size:20px;'>Nema podataka</div>");

                                        } else {
                                            $$("chartDonutId").hideOverlay();
                                        }


                                        $$("radarChart").clearAll();
                                        $$("radarChart").parse(pie);

                                        if (!$$("radarChart").count()) { //if no data is available
                                            webix.extend($$("radarChart"), webix.OverlayBox);
                                            $$("radarChart").showOverlay("</div><div style='...'>Nema podataka</div>");
                                        } else {
                                            $$("radarChart").hideOverlay();
                                        }


                                    }, function (text, data, xhr) {
                                        util.messages.showErrorMessage(text);
                                    });
                                connection.sendAjax("GET",
                                    "/hub/company/statistics/user/new/" + pom.id,
                                    function (text, data, xhr) {
                                        var temp = data.json();

                                        $$("byMonthChartID").clearAll();
                                        $$("byMonthChartID").parse(temp);
                                        $$("radarChart").clearAll();
                                        $$("radarChart").parse(temp);
                                        if (!$$("byMonthChartID").count()) { //if no data is available
                                            webix.extend($$("byMonthChartID"), webix.OverlayBox);
                                            $$("byMonthChartID").showOverlay("<div style='...'>Nema podataka</div>");
                                        } else {
                                            $$("byMonthChartID").hideOverlay();
                                        }
                                    });

                            }
                        },
                        url: URL
                    }, {
                        rows: [
                            byMonthChart,
                            {
                                cols: [
                                    pieChart,
                                    radarChart
                                ]
                            }
                        ]
                    }]

                }
            ]
        }

    }
}