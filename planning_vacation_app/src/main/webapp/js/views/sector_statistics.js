var sectorStatisticsView;

var first = {
    cols: [{
        id: "firstID",
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
            template: "'#month#'",
            title: "Broj odsutnih zaposlenih po mjesecu u izabranom sektoru",
            lines: false
        },
        padding: {
            left: 10,
            right: 10,
            top: 50,
            bottom: 70
        }
    }]


};
var second = {
    id: "secondID",
    view: "chart",
    type: "spline",
    value: "#number#",
    item: {
        borderColor: "#ffffff",
        color: "#000000"
    },
    line: {
        color: "#ff9900",
        width: 3
    },
    xAxis: {
        template: "'#month#",
        title: "Broj odsutnih zaposlenih po mjesecu u izabranom sektoru"
    },
    offset: 0,
    yAxis: {
        start: 0,
        end: 10,
        step: 1,
        template: function (obj) {
            return (obj % 20 ? "" : obj)
        }
    },
    padding: {
        bottom: 70
    }
};

var pieChart = {
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
};

var CHART = {
    view: "chart",
    id: "chartChatID",
    type: "bar",
    value: "#procentage#",
    gradient: function (gradient) {
        gradient.addColorStop(1.0, "#FF0000");
        gradient.addColorStop(0.2, "#FFFF00");
        gradient.addColorStop(0.0, "#00FF22");
    },
    alpha: 0.8,
    radius: 2,
    border: false,
    xAxis: {
        template: "'#category#"
    },
    yAxis: {
        start: 0,
        end: 100,
        step: 10,
        template: function (obj) {
            return (obj % 20 ? "" : obj)
        }
    },
    padding: {
        bottom: 70
    }
};

var aChart = {
    id: "aChartId",
    view: "chart",
    type: "line",
    value: "#procentage#",
    item: {
        borderColor: "#ffffff",
        color: "#2b7100"

    },
    tooltip: {
        template: "#procentage#"
    },
    line: {
        color: "#8ecf03",
        width: 2,
        shadow: true
    },

    xAxis: {
        template: "'#category#",
        title: "Procentualna reprezentacija tipa odsustva zaposlenih u sektoru"
    },
    yAxis: {
        title: "Procenat",
        start: 0,
        step: 10,
        end: 100,
        template: function (value) {
            return value % 20 ? "" : value
        }
    },
    padding: {
        bottom: 60
    }
};

var bChart = {
    id: "bChartId",
    view: "chart",
    type: "line",
    value: "#procentage#",
    tooltip: {
        template: "#procentage#"
    },
    item: {
        borderColor: "#ff9000",
        color: "#ff9000",
        shadow: true
    },
    line: {
        color: "#ff9409",
        width: 2,
        shadow: false
    },
    xAxis: {
        template: "'#category#",
        title: "Procentualna reprezentacija tipa odsustva zaposlenih u sektoru"
    },
    yAxis: {
        title: "Procenat",
        start: 0,
        step: 10,
        end: 100,
        template: function (value) {
            return value % 20 ? "" : value
        }
    },
    padding: {
        bottom: 60
    }
};

var cChart = {
    id: "cChartId",
    view: "chart",
    type: "line",
    value: "#procentage#",
    item: {
        radius: 0
    },
    line: {
        color: "#b25151",
        width: 3
    },
    xAxis: {
        template: "'#category#",
        title: "Procentualna reprezentacija tipa odsustva zaposlenih u sektoru"
    },
    yAxis: {
        title: "Procenat",
        start: 0,
        step: 10,
        end: 100,
        template: function (value) {
            return value % 20 ? "" : value
        }
    },
    padding: {
        bottom: 60
    }
};

var dChart = {
    id: "dChartId",
    view: "chart",
    type: "line",
    value: "#procentage#",
    tooltip: {
        template: "#procentage#"
    },
    xAxis: {
        template: "'#category#",
        title: "Procentualna reprezentacija tipa odsustva zaposlenih u sektoru"
    },
    yAxis: {
        title: "Procenat",
        start: 0,
        step: 10,
        end: 100,
        template: function (value) {
            return value % 20 ? "" : value
        }
    },
    item: {
        borderColor: "#b64040",
        color: "#b64040",
        type: "d",
        radius: 3,
        borderWidth: 1,
        shadow: true
    },
    line: {
        color: "#ff9000",
        width: 2
    },
    padding: {
        bottom: 60
    }
};

var chart1 = {
    view: "chart",
    id:"chart1",
    type: "radar",
    preset: "area",
    xAxis: {
        template: "#month#"
    },
    yAxis: {
        lineShape: "arc",
        start: 0,
        step: 1,
        end: 5,
    },
    legend: {
        layout: "y",
        width: 110,
        align: "right",
        valign: "middle",
        marker: {
            type: "item"
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
    url: "/hub/company/statistics/all"
};

var chart2 = {
    view: "chart",
    type: "radar",
    preset: "point",
    xAxis: {
        template: "#month#"
    },
    yAxis: {
        lineShape: "arc",
        start: 0,
        step: 1,
        end: 5,
    },
    legend: {
        layout: "y",
        width: 110,
        align: "right",
        valign: "middle",
        marker: {
            type: "item"
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
    url: "/hub/company/statistics/all"
};

var chart3 = {
    view: "chart",
    type: "radar",
    preset: "line",
    xAxis: {
        template: "#month#"
    },
    yAxis: {
        lineShape: "arc",
        start: 0,
        step: 1,
        end: 5,
    },
    legend: {
        layout: "y",
        width: 110,
        align: "right",
        valign: "middle",
        marker: {
            type: "item"
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
    url: "/hub/company/statistics/all"
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

            rows: [{
                cols: [{
                    padding: 8,
                    height: 70,
                    view: "toolbar",
                    css: {"background": "#ffffff !important"},
                    cols: [
                        {
                            template: "<span class='webix_icon fas fa-line-chart'><\/span> Statistika zaposlenih u kompaniji na nivou sektora",
                            view: "label",
                            css: {"color": "black !important"},
                            width: 400
                        }
                    ]
                }, {},
                    {
                        view: "button",
                        id: "archiveBtn",
                        name: "archiveBtn",
                        type: "iconButton",
                        icon: "external-link",
                        label: "Export podataka u tabele",
                        width: 100,
                        height: 70,
                        padding: {
                            right: 15,
                            bottom: 5,
                            top: 5
                        },
                        on: {
                            onItemClick: function () {
                                $$("archiveBtn").disable();
                                webix.toPDF("chartDonutId", {
                                        docHeader: {
                                            text: "Statistika sektora - " + $$("sector_statisticsDT").getSelectedItem().name,
                                            textAlign: "center"

                                        },
                                        columns: {
                                            // "sectorName" : {header: "Ime setora"},
                                           // "number": {header: "Broj odsutnih"},
                                           // "month": {header: "Mjesec"},
                                            //  "vacation": {header: "Kategorija - godišnji odmor"},
                                            // "leave": {header: "Kategorija - odsustvo"},
                                            // "religion": {header: "Kategorija - praznik"}
                                            "procentage": {header: "Procenat"},
                                            "category": {header: "Kategorija"}

                                        },
                                        autowidth: true
                                    }
                                );
                                webix.toPDF("firstID", {
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
                        width: 100,
                        height: 70,
                        padding: {
                            right: 15,
                            bottom: 5,
                            top: 5
                        },
                        on: {
                            onItemClick: function () {
                                $$("archiveBtn2").disable();
                                webix.toPNG("firstID").then(function (value) {
                                    return webix.toPNG("chartDonutId");

                                }).then(function (value) {
                                    webix.toPNG("chart1");
                                    $$("archiveBtn2").enable();

                                });


                            }
                        }
                    }

                ]

            }, {
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
                        name:"name",
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
                            // console.log(pom.id);
                            connection.sendAjax("GET",
                                "/hub/sector/statistics/sector/" + pom.id,
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


                                    $$("aChartId").clearAll();
                                    $$("aChartId").parse(pie);

                                    if (!$$("aChartId").count()) { //if no data is available
                                        webix.extend($$("aChartId"), webix.OverlayBox);
                                        $$("aChartId").showOverlay("</div><div style='...'>Nema podataka</div>");
                                    } else {
                                        $$("aChartId").hideOverlay();
                                    }

                                    $$("bChartId").clearAll();
                                    $$("bChartId").parse(pie);

                                    if (!$$("bChartId").count()) { //if no data is available
                                        webix.extend($$("bChartId"), webix.OverlayBox);
                                        $$("bChartId").showOverlay("</div><div style='...'>Nema podataka</div>");
                                    } else {
                                        $$("bChartId").hideOverlay();
                                    }

                                    $$("cChartId").clearAll();
                                    $$("cChartId").parse(pie);

                                    if (!$$("cChartId").count()) { //if no data is available
                                        webix.extend($$("cChartId"), webix.OverlayBox);
                                        $$("cChartId").showOverlay("</div><div style='...'>Nema podataka</div>");
                                    } else {
                                        $$("cChartId").hideOverlay();
                                    }

                                    $$("dChartId").clearAll();
                                    $$("dChartId").parse(pie);

                                    if (!$$("dChartId").count()) { //if no data is available
                                        webix.extend($$("dChartId"), webix.OverlayBox);
                                        $$("dChartId").showOverlay("</div><div style='...'>Nema podataka</div>");
                                    } else {
                                        $$("dChartId").hideOverlay();
                                    }

                                    $$("chartChatID").clearAll();
                                    $$("chartChatID").parse(pie);

                                    if (!$$("chartChatID").count()) { //if no data is available
                                        webix.extend($$("chartChatID"), webix.OverlayBox);
                                        $$("chartChatID").showOverlay("<div style='margin:75px; font-size:20px;'>Nema podataka</div>");
                                    } else {
                                        $$("chartChatID").hideOverlay();
                                    }

                                }, function (text, data, xhr) {
                                    util.messages.showErrorMessage(text);
                                });
                            connection.sendAjax("GET",
                                "/hub/sector/statistics/sector/new/" + pom.id,
                                function (text, data, xhr) {
                                    var temp = data.json();

                                    $$("firstID").clearAll();
                                    $$("firstID").parse(temp);

                                    if (!$$("firstID").count()) { //if no data is available
                                        webix.extend($$("firstID"), webix.OverlayBox);
                                        $$("firstID").showOverlay("<div style='...'>Nema podataka</div>");
                                    } else {
                                        $$("firstID").hideOverlay();
                                    }

                                    $$("secondID").clearAll();
                                    $$("secondID").parse(temp);

                                    if (!$$("secondID").count()) { //if no data is available
                                        webix.extend($$("secondID"), webix.OverlayBox);
                                        $$("secondID").showOverlay("<div style='...'>Nema podataka</div>");
                                    } else {
                                        $$("secondID").hideOverlay();
                                    }

                                });

                        }
                    }
                    ,
                    onClick: {
                        webix_icon: function (e, id) {
                            $$("sector_statisticsDT").select(id);
                            console.log(id["column"]);
                            var action = id["column"];
                            if (action === "view") {
                                userStatisticsView.selectPanelWithSector($$("sector_statisticsDT").getItem(id.row));
                            }
                        }
                    },
                    url: "/hub/sector"
                }, {
                    rows: [
                        {
                            cols: [{

                                view: "carousel",
                                css: "webix_dark",
                                id: "parts",
                                cols: [
                                    pieChart, CHART
                                ]
                            }, {
                                view: "carousel",
                                css: "webix_dark",
                                id: "parts",
                                width: 800,
                                cols: [
                                    first, second
                                ]
                            }]
                        }, {
                            //OVDJE CE BITI DRUGI RED
                            cols: [
                                {
                                    view: "carousel",
                                    css: "webix_dark",
                                    id: "parts",
                                    cols: [
                                        chart1, chart2, chart3
                                    ]
                                },
                                {
                                    view: "carousel",
                                    css: "webix_dark",
                                    id: "parts",
                                    cols: [
                                        aChart, bChart, cChart, dChart
                                    ]
                                }
                            ]
                        }]
                }]

            }]
        }

    }
}