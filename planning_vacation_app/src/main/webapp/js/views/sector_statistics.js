var sectorStatisticsView;

var byMonthChart = {
    type: "clean",
    rows: [
        {
            template: "<div style='width:100%;text-align:center'>Odsustva po mjesecu</div>",
            height: 30
        },
        {
            id: "byMonthChartID",
            view: "chart",
            type: "bar",
            value: "#number#",
            label: "#number#",
            color: "#color#",
            gradient: "rising",
            radius: 0,
            barWidth: 80,
            yAxis: {
                template: "",
                start: 0, end: 10, step: 1
            },
            xAxis: {
                template: "#month#",
                lines: false
            },
            padding: {
                left: 10,
                right: 10,
                top: 50,
                bottom: 40
            }
        }
    ]
};

var pieChart = {
    type: "clean",
    rows: [
        {
            template: "<div style='width:100%;text-align:center'>Procenat odsustva po tipu</div>",
            height: 30
        },
        {
            view: "chart",
            type: "donut",
            id: "chartDonutId",
            value: "#procentage#",
            color: "#color#",


            legend: {
                align: "right",
                valign: "middle",
                template: "#category#"
            },
            shadow: 0,
            gradient: true,
            pieInnerText: "#procentage#"
        }
    ]
};

var radarChart = {
    type: "clean",
    rows: [
        {
            template: "<div style='width:100%;text-align:center'>Raspodjela po tipu odsustva</div>",
            height: 30
        }, {
            view: "chart",
            id: "radarChart",
            type: "radar",
            xAxis: {
                template: "#month#"
            },
            yAxis:{
                lineShape:"arc"
            },
            legend: {
                layout: "y",
                width: 110,
                align: "right",
                valign: "middle",
                marker: {
                    type:"item"
                },
                values: [
                    {text: "Godišnji", color: "#58dccd"},
                    {text: "Praznik", color: "#914ad8"},
                    {text: "Odsustvo", color: "#36abee"}
                ]
            },
            series: [
                {
                    value: "#vacation#",
                    tooltip: {
                        template: "#vacation#"
                    },
                    line: {
                        color: "#3590D0",
                        width: 2
                    },
                    item: {
                        color: "#ffffff",
                        borderColor: "#3399ff",
                        radius: 2,
                        borderWidth: 2,
                        type: "d"
                    }
                },
                {
                    value: "#religion#",
                    tooltip: {
                        template: "#religion#"
                    },
                    line: {
                        color: "#66cc00",
                        width: 2
                    },
                    item: {
                        color: "#ffffff",
                        borderColor: "#66cc00",
                        radius: 2,
                        borderWidth: 2,
                        type: "s"
                    }
                },
                {
                    value: "#leave#",
                    tooltip: {
                        template: "#leave#"
                    },
                    line: {
                        color: "#914ad8",
                        width: 2
                    },
                    item: {
                        color: "#ffffff",
                        borderColor: "#914ad8",
                        radius: 2,
                        borderWidth: 2,
                        type: "k"
                    }
                }
            ],
        }]
};


sectorStatisticsView = {

    selectPanel: function () {
        $$("main").removeView(rightPanel);
        rightPanel = "sectorStatisticsPanel";
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
    getPanel: function () {
        return {
            id: "sectorStatisticsPanel",

            rows: [
                {
                    view: "toolbar",
                    padding: 8,
                    css: {"background": "#ffffff !important"},
                    cols: [
                        {
                            template: "<span class='webix_icon fas fa-line-chart'><\/span> Statistika zaposlenih u kompaniji na nivou sektora",
                            view: "label",
                            css: {"color": "black !important"},
                            width: 550
                        },
                        {},
                        {
                            view: "button",
                            id: "archiveBtn",
                            name: "archiveBtn",
                            type: "iconButton",
                            icon: "external-link",
                            label: "Export podataka u tabele",
                            width: 200,
                            css: {"background": "#268fd5 !important"},

                            on: {
                                onItemClick: function () {
                                    $$("archiveBtn").disable();
                                    webix.toPDF("chartDonutId", {
                                            docHeader: {
                                                text: "Statistika sektora - " + $$("sector_statisticsDT").getSelectedItem().name,
                                                textAlign: "center"

                                            },
                                            columns: {
                                                "procentage": {header: "Procenat"},
                                                "category": {header: "Kategorija"}

                                            },
                                            autowidth: true
                                        }
                                    );
                                    webix.toPDF("byMonthChartID", {
                                            docHeader: {
                                                text: "Statistika sektora - " + $$("sector_statisticsDT").getSelectedItem().name,
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
                                        return webix.toPNG("chartDonutId");

                                    }).then(function (value) {
                                        webix.toPNG("radarChart");
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
                        id: "sector_statisticsDT",
                        width: 200,
                        navigation: true,
                        select: "row",
                        multiselect: false,
                        columns: [{
                            id: "id",
                            hidden: true
                        }, {
                            id: "name",
                            hidden: true
                        }, {
                            id: "name",
                            header: [
                                "Sektori", {
                                    content: "textFilter", value: "", icon: "wxi-search"
                                }
                            ],
                            width: 300,
                            fillspace: true,
                            sort: "string",
                            width: 200,
                            name: "name",
                        }, {

                            id: "view",
                            header: "&nbsp;",
                            tooltip: "Pregled",
                            width: 35,
                            template: "<span  style='color:#777777; cursor:pointer;' class='webix_icon fa fa-eye'></span>"

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
                                var id = this.getFirstId();
                                this.select(id);
                            },
                            onSelectChange: function () {
                                var pom = $$("sector_statisticsDT").getSelectedId();
                                connection.sendAjax("GET",
                                    "/hub/sector/statistics/sector/" + pom.id,
                                    function (text, data, xhr) {
                                        pie = data.json();

                                        $$("chartDonutId").clearAll();
                                        $$("chartDonutId").parse(pie);
                                        if (!$$("chartDonutId").count()) { //if no data is available
                                            webix.extend($$("chartDonutId"), webix.OverlayBox);
                                            $$("chartDonutId").showOverlay("<div style='...'>Nema podataka</div>");
                                        } else {
                                            $$("chartDonutId").hideOverlay();
                                        }

                                    }, function (text, data, xhr) {
                                        util.messages.showErrorMessage(text);
                                    });
                                connection.sendAjax("GET",
                                    "/hub/sector/statistics/sector/new/" + pom.id,
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
                        }
                        ,
                        onClick: {
                            webix_icon: function (e, id) {
                                $$("sector_statisticsDT").select(id);
                                var action = id["column"];
                                if (action === "view") {
                                    userStatisticsView.selectPanelWithSector($$("sector_statisticsDT").getItem(id.row));
                                }
                            }
                        },
                        url: "/hub/sector"
                    }, {
                        rows: [
                            byMonthChart,
                            {
                                cols: [
                                    pieChart, radarChart
                                ]
                            }
                        ]
                    }]

                }]
        }

    }
}