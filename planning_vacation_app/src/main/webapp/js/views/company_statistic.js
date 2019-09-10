var companyStatisticView;
var byMonthCart = {
    type: "clean",
    rows: [
        {
            template: "<div style='width:100%;text-align:center'>Odsustva po mjesecu</div>",
            height: 30
        },
        {
            id: "byMonthCart",
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
                bottom: 40
            },
            url: "/hub/company/statistics/all"
        }
    ]
};
var byMonthAndTypeChart = {
    type: "clean",
    rows: [
        {
            template: "<div style='width:100%;text-align:center'>Odsustva po mjesecu i tipu</div>",
            height: 30
        },
        {
            id: "byMonthAndTypeChart",
            view: "chart",
            type: "bar",
            barWidth: 20,
            radius: 2,
            alpha: 0.7,
            gradient: "rising",
            xAxis: {
                template: "#month#",
            },
            yAxis: {
                start: 0,
                step: 1,
                end: 10
            },
            legend: {
                values: [{text: "Godišnji", color: "#4aa397"}, {
                    text: "Praznik",
                    color: "#69ba00"
                }, {text: "Odsustvo", color: "#de619c", markerType: "item"}],
                valign: "middle",
                align: "right",
                width: 90,
                layout: "y"
            },
            series: [
                {
                    value: "#vacation#",
                    color: "#4aa397",
                    tooltip: {
                        template: "#vacation#"
                    }
                },
                {
                    value: "#religion#",
                    color: "#69ba00",
                    tooltip: {
                        template: "#religion#"
                    }
                },
                {
                    type: "line",
                    value: "#leave#",
                    color: "#36abee",
                    item: {
                        borderColor: "#b7286c",
                        color: "#de619c",
                        type: "s"
                    },
                    line: {
                        color: "#de619c",
                        width: 2
                    },
                    tooltip: {
                        template: "#leave#"
                    }
                }
            ],
            padding: {
                bottom: 40
            },
            url: "/hub/company/statistics/all"
        },
    ]
};


companyStatisticView = {

    selectPanel: function () {
        $$("main").removeView(rightPanel);
        rightPanel = "companyStatisticPanel";


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
            id: "companyStatisticPanel",
            rows: [
                {
                    padding: 8,
                    view: "toolbar",
                    css: {"background": "#fff !important"},
                    cols: [
                        {
                            template: "<span class='webix_icon fas fa-line-chart'></span> Statistika kompanije",
                            view: "label",
                            css: {"color": "#000 !important"},

                        },
                        {},
                        {
                            view: "button",
                            id: "archiveBtn",
                            name: "archiveBtn",
                            type: "iconButton",
                            icon: "external-link",
                            label: "Export podataka u tabele",
                            css: {"background": "#268fd5 !important"},
                            width: 200,

                            on: {
                                onItemClick: function () {
                                    $$("archiveBtn").disable();
                                    webix.toPDF($$("byMonthCart"), {
                                        docHeader: {
                                            text: "Pregled statistike kompanije - broj odsutnih po mjesecu",
                                            textAlign: "center",
                                        },
                                        columns:{
                                            "month":{ header:"Mjesec", width:250 },
                                            "number" : {header:"Broj odsutnih"},
                                        }
                                    });
                                    webix.toPDF($$("byMonthAndTypeChart"), {
                                        docHeader: {
                                            text: "Pregled statistike kompanije - broj odsutnih po mjesecu i tipu odsustva",
                                            textAlign: "center",
                                        },
                                        columns:{
                                            "month":{ header:"Mjesec", width:100 },
                                            "number" : {header:"Broj odsutnih", width:100},
                                            "vacation": {header: "Godišnji odmor", width:100},
                                            "religion":{header:"Religijski praznik", width:100},
                                            "leave": {header:"Odsustvo", width:100}
                                        }
                                    });
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
                            css: {"background": "#268fd5 !important"},
                            width: 200,

                            on: {
                                onItemClick: function () {
                                    $$("archiveBtn2").disable();
                                    webix.toPNG("byMonthCart").then(function (value) {
                                        webix.toPNG("byMonthAndTypeChart");
                                        $$("archiveBtn2").enable();

                                    });
                                }
                            }
                        }
                    ]
                },
                byMonthCart,
                byMonthAndTypeChart
            ]
        }
    }

}