
var  absenceHistoryView = {

    selectPanel: function () {
        $$("main").removeView(rightPanel); // brisanje trenutno prikazanog view-a na stranici kako bi se prikazao facultyView
        rightPanel = "absenceHistoryPanel"; // novi rightPanel će biti facultyPanel

        var panelCopy = webix.copy(this.getPanel()); // webix.copy -> duboka kopija
        $$("main").addView(panelCopy);
    },

    getPanel: function () {
        return {
            id: "absenceHistoryPanel",

            rows: [
                {
                    padding: 8,
                    view: "toolbar",
                    cols:[{
                        template: "<span class='webix_icon fa-book-medical'><\/span> Istorija odsustva",
                        view: "label",
                        width: 400
                    },{}
                    ]
                },
                {
                    view: "datatable",
                    id: "absence_historyDT",
                    margin: 10,
                    multiselect: false,
                    tooltip: {
                        dx:-35, //20 by default
                        dy:20
                    },
                    navigation: true, // omoguceno selektovanje redova navigacijskim tasterima na tastaturi
                    select: "row", // cell
                    resizeColumn: true, // omogucen resize kolona korisniku
                    resizeRow: true, // omogucen resize redova korisniku
                    onContext: {},
                    pager: "pagerA",
                    scheme: {
                        $init: function (obj) {
                            if (obj.dateFrom)
                                obj.dateFrom = new Date(obj.dateFrom);
                            if (obj.dateTo)
                                obj.dateTo = new Date(obj.dateTo);
                        },
                        $change: function (obj) {
                            if (obj.dateFrom)
                                obj.dateFrom = new Date(obj.dateFrom);
                            if (obj.dateTo)
                                obj.dateTo = new Date(obj.dateTo);
                        }
                    },
                    columns: [
                        {
                            id: "id",
                            header: "#",
                            width: 50,
                            hidden: "true",
                        },
                        {
                            id: "dateFrom",
                            fillspace: true,
                            sort: "date",
                            header: [
                                "Datum od", {
                                    content: "dateFilter"
                                }
                            ],
                            format: webix.Date.dateToStr("%d.%m.%Y.")
                        },
                        {
                            id: "dateTo",
                            fillspace: true,
                            sort: "date",
                            header: [
                                "Datum do", {
                                    content: "dateFilter"
                                }
                            ],
                            format: webix.Date.dateToStr("%d.%m.%Y.")
                        },
                        {
                            id: "reject",
                            header: "&nbsp;",
                            tooltip: "Otkazi odsustvo",
                            width: 35,
                            template: "<span  style='color:#777777; 0; cursor:pointer;' class='webix_icon fa-times'></span>"
                        },
                        ],
                    url: "/hub/leave_request/getAbsenceHistoryUserInfo/" + userData.id.toString(),
                    on: {

                        onAfterContextMenu: function (item) {
                            this.select(item.row);
                        }

                    },


                },

                {
                    view: "toolbar",
                    css: "highlighted_header header6",
                    paddingX: 5,
                    paddingY: 5,
                    height: 40,
                    cols: [{
                        view: "pager", id: "pagerA",
                        template: "{common.first()}{common.prev()}&nbsp; {common.pages()}&nbsp; {common.next()}{common.last()}",
                        size: 20,
                        height: 35,
                        group: 5,
                        animate: {
                            direction: "top"
                        },
                    }
                    ]
                }

            ]
        }
        },
};