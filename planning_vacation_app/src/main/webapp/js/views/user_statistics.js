var userStatisticsView;

var first = {
    cols: [{
        id:"firstID",
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
            title:"Broj odsutnih zaposlenih po mjesecu",
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
    id:"secondID",
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
        title:"Broj odsutnih zaposlenih po mjesecu"
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
    padding:{
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
        template: "'#category#"
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
        template: "'#category#"
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
        template: "'#category#"
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
        template: "'#category#"
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
    getPanel: function () {
        return {
            id: "userStatisticsPanel",

            rows: [{
                padding: 8,
                view: "toolbar",
                css: {"background": "#ffffff !important"},
                cols: [
                    {
                        template: "<span class='webix_icon fas fa-line-chart'><\/span> Statistika zaposlenih u kompaniji",
                        view: "label",
                        css: {"color": "black !important"},
                        width: 400
                    }
                ]
            }, {
                cols: [{
                    view: "datatable",
                    id: "user_statisticsDT",
                    width: 180,
                    navigation: true,
                    select: "row",
                    multiselect: false,
                    columns: [{
                        id: "id",
                        hidden: true
                    }, {
                        id: "firstName",
                        hidden: true
                    }, {
                        id: "lastName",
                        hidden: true
                    }, {
                        id: "lfName",
                        header: "Zaposleni",
                        width: 180,
                        sort: "string",
                        template: function (obj) {
                            var pom = obj.firstName + " " + obj.lastName;
                            return pom;
                        }
                    }],

                    on: {
                        onSelectChange: function () {
                            var pom = $$("user_statisticsDT").getSelectedId();
                            console.log(pom.id);
                            connection.sendAjax("GET",
                                "/hub/company/statistics/user/" + pom.id,
                                function (text, data, xhr) {
                                    pie = data.json();

                                    $$("chartDonutId").clearAll();
                                    $$("chartDonutId").parse(pie);

                                    $$("aChartId").clearAll();
                                    $$("aChartId").parse(pie);

                                    $$("bChartId").clearAll();
                                    $$("bChartId").parse(pie);

                                    $$("cChartId").clearAll();
                                    $$("cChartId").parse(pie);

                                    $$("dChartId").clearAll();
                                    $$("dChartId").parse(pie);

                                    $$("chartChatID").clearAll();
                                    $$("chartChatID").parse(pie);

                                }, function (text, data, xhr) {
                                    util.messages.showErrorMessage(text);
                                });
                            connection.sendAjax("GET",
                                "/hub/company/statistics/user/new/"+pom.id,
                                function (text, data, xhr) {
                                    var temp = data.json();

                                    $$("firstID").clearAll();
                                    $$("firstID").parse(temp);

                                    $$("secondID").clearAll();
                                    $$("secondID").parse(temp);
                                });

                        }
                    }
                    ,
                    url: "/hub/user"
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
                                cols: [
                                    aChart, bChart, cChart, dChart
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
                                }, {
                                    view: "carousel",
                                    css: "webix_dark",
                                    id: "parts",
                                    cols: [
                                        first, second
                                    ]
                                }
                            ]
                        }]
                }]

            }]
        }

    }
}