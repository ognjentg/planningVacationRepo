var companyStatisticView;

companyStatisticView = {

    selectPanel: function () {
        $$("main").removeView(rightPanel); // brisanje trenutno prikazanog view-a na stranici kako bi se prikazao facultyView
        rightPanel = "companyStatisticPanel";


        var panelCopy = webix.copy(this.getPanel()); // webix.copy -> duboka kopija
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
            cols: [{
                rows: [{
                    cols:[{
                        view: "chart",
                        type: "bar",
                        value: "#number#",
                        label: "#number#",
                        color: "#color#",
                        height: 300,
                        radius: 0,
                        barWidth: 80,
                        yAxis: {
                            template: "",
                            start: 0, end: 10, step: 1
                        },
                        xAxis: {
                            title: "Odsutni po mjesecu",
                            template: "'#month#'",
                            lines: false
                        },
                        padding: {
                            left: 10,
                            right: 10,
                            top: 50
                        },
                        url: "/hub/company/statistics/all"
                    }]


                },
                    {
                        cols: [{
                            view: "datatable",
                            id: "company_statisticDT",
                            width: 180,
                            navigation: true, // omoguceno selektovanje redova navigacijskim tasterima na tastaturi
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
                                    var pom = $$("company_statisticDT").getSelectedId();
                                    console.log(pom.id);
                                    connection.sendAjax("GET",
                                        "/hub/company/statistics/user/" + pom.id,
                                        function (text, data, xhr) {
                                            pie = data.json();
                                            $$("chartDonutId").clearAll();
                                            $$("chartDonutId").parse(pie);


                                        }, function (text, data, xhr) {
                                            util.messages.showErrorMessage(text);
                                        });

                                }

                            }
                            ,
                            url: "/hub/user"
                        }, {
                            view: "chart",
                            type: "donut",
                            id: "chartDonutId",
                            value: "#procentage#",
                            color: "#color#",


                            legend: {
                                width: 75,
                                align: "right",
                                valign: "middle",
                                template: "#category#"
                            },
                            shadow: 0,
                            gradient: true,
                            pieInnerText: "#procentage#"

                        }, {
                            view: "chart",
                            type: "pie",
                            value: "#number#",
                            color: "#color#",
                            legend: {
                                width: 75,
                                align: "right",
                                valign: "middle",
                                template: "#month#"
                            },
                            shadow: 0,
                            gradient: true,
                            pieInnerText: "#number#",

                            url: "/hub/company/statistics/all"
                        }]
                    }]
            }]
        }
    }

}