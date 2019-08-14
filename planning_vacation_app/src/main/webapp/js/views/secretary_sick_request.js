var URLAllSickLeave = "/hub/sickLeave/sickLeaveInfo";
var URLBySickLeaveStatus = "/hub/sickLeave/sickLeaveFilteredBySickLeaveStatus/";
var sickRequestsView = {

    selectPanel: function () {
        $$("main").removeView(rightPanel);
        rightPanel = "requestPanel";

        var panelCopy = webix.copy(this.getPanel()); // webix.copy -> duboka kopija
        $$("main").addView(panelCopy);
    },
    getPanel: function () {
        return {
            id: "requestPanel",

            rows: [
                {
                    padding: 8,
                    view: "toolbar",
                    css: {"background": "#ffffff !important"},
                    cols: [{
                        template: "<span class='webix_icon far fa-envelope'><\/span> Zahtjevi za bolovanje",
                        view: "label",
                        css: {"color": "black !important"},
                        width: 400
                    }, {},
                        {
                            view: "combo",
                            width: 250,
                            id: "filterRequestsComboBox",
                            label: "Vrsta zahtjeva",
                            labelWidth: 100,
                            value: "1",
                            editable: false,
                            on: {
                                onChange(name) {
                                    $$("secretary_requestDT").clearAll();


                                    if (name === 4) {
                                        $$("secretary_requestDT").showColumn("accept");
                                        $$("secretary_requestDT").showColumn("reject");
                                        connection.attachAjaxEvents("secretary_requestDT", "/hub/sickLeave/sickLeaveInfo");
                                        $$("secretary_requestDT").define("url", "/hub/sickLeave/sickLeaveInfo");
                                        $$("secretary_requestDT").detachEvent("onBeforeDelete");
                                    } else if (name === 3) {
                                        $$("secretary_requestDT").hideColumn("accept");
                                        $$("secretary_requestDT").hideColumn("reject");
                                        connection.attachAjaxEvents("secretary_requestDT", "/hub/sickLeave/sickLeaveFilteredBySickLeaveStatus/" + name);
                                        $$("secretary_requestDT").define("url", "/hub/sickLeave/sickLeaveFilteredBySickLeaveStatus/" + name);
                                        $$("secretary_requestDT").detachEvent("onBeforeDelete");
                                    } else if (name === 2) {
                                        $$("secretary_requestDT").hideColumn("accept");
                                        $$("secretary_requestDT").hideColumn("reject");
                                        connection.attachAjaxEvents("secretary_requestDT", "/hub/sickLeave/sickLeaveFilteredBySickLeaveStatus/" + name);
                                        $$("secretary_requestDT").define("url", "/hub/sickLeave/sickLeaveFilteredBySickLeaveStatus/" + name);
                                        $$("secretary_requestDT").detachEvent("onBeforeDelete");
                                    } else {
                                        $$("secretary_requestDT").showColumn("accept");
                                        $$("secretary_requestDT").showColumn("reject");
                                        connection.attachAjaxEvents("secretary_requestDT", "/hub/sickLeave/sickLeaveFilteredBySickLeaveStatus/" + name);
                                        $$("secretary_requestDT").define("url", "/hub/sickLeave/sickLeaveFilteredBySickLeaveStatus/" + name);
                                        $$("secretary_requestDT").detachEvent("onBeforeDelete");
                                    }
                                }
                            },
                            options: {
                                body: {
                                    template: '#name#',
                                    url: "hub/sick_leave_status",
                                }
                            },
                            required: true,
                        },]
                }, {
                    view: "datatable",
                    id: "secretary_requestDT",
                    css: "secretary_requestDatatable",
                    margin: 10,
                    tooltip: {
                        dx: -35,
                        dy: 20
                    },
                    multiselect: false,
                    navigation: true,
                    select: "row", // cell
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
                    columns: [{
                        id: "id",
                        header: "#",
                        width: 50,
                        hidden: "true",
                    }, {
                        id: "statusName",
                        sort: "string",
                        header: "Status",
                        sort: "string"
                    }, {
                        id: "firstName",
                        fillspace: true,
                        editor: "text",
                        sort: "string",
                        header: [
                            "Ime", {
                                content: "textFilter", value: ""
                            }
                        ]
                    }, {
                        id: "lastName",
                        fillspace: true,
                        editor: "text",
                        sort: "string",
                        header: [
                            "Prezime", {
                                content: "textFilter", value: ""
                            }
                        ]
                    }, {
                        id: "dateFrom",
                        fillspace: true,
                        sort: "date",
                        header: [
                            "Datum od", {
                                content: "dateFilter"
                            }
                        ],
                        format: webix.Date.dateToStr("%d.%m.%Y.")
                    }, {
                        id: "dateTo",
                        fillspace: true,
                        sort: "date",
                        header: [
                            "Datum do", {
                                content: "dateFilter"
                            }
                        ],
                        format: webix.Date.dateToStr("%d.%m.%Y.")
                    }, {
                        id: "accept",
                        header: "&nbsp;",
                        width: 35,
                        tooltip: "Prihvati",
                        template: function (obj) {
                            var pom = obj.statusName;
                            if ((pom != "Opravdano") && (pom != "Neopravdano")) {
                                return "<span  style='color:#777777; 0; cursor:pointer;' class='webix_icon fa-check'></span>";
                            } else return "";
                        },

                    }, {
                        id: "reject",
                        header: "&nbsp;",
                        tooltip: "Odbij",
                        width: 35,
                        template: function (obj) {
                            var pom = obj.statusName;
                            if ((pom != "Opravdano") && (pom != "Neopravdano"))
                                return "<span  style='color:#777777; 0; cursor:pointer;' class='webix_icon fa-times'></span>";
                            else return "";
                        }

                    },
                    ],
                    select: "row",
                    navigation: true,
                    url: "/hub/sickLeave/sickLeaveInfoWait",
                    on: {

                        onAfterContextMenu: function (item) {
                            this.select(item.row);
                        }

                    },
                    onClick: {
                        webix_icon: function (e, id) {

                            console.log(id["column"]);
                            var action = id["column"];

                            if (action === "reject" && userData.userGroupKey == "sekretar") {
                                var rejectLeaveBox = (webix.copy(sickRequestsView.rejectLeaveConfirm("zahtjev za bolovannje: ")));
                                rejectLeaveBox.callback = function (result) {
                                    if (result == 1) {
                                        var item = $$("secretary_requestDT").getItem(id);
                                        $$("secretary_requestDT").detachEvent("onBeforeDelete");
                                        connection.sendAjax("PUT", "/hub/sickLeave/updateSickLeaveStatusUnjustified/" + id, function (text, data, xhr) {
                                            util.messages.showMessage("Zahtjev neopravdan");
                                            refreshOnThisData();
                                        }, function (text, data, xhr) {
                                            util.messages.showErrorMessage(text);
                                        }, item);
                                    }

                                };
                                webix.confirm(rejectLeaveBox);
                            } else if (action === "accept" && userData.userGroupKey == "sekretar") {
                                var acceptLeaveBox = (webix.copy(sickRequestsView.acceptLeaveConfirm("zahtjev za bolovannje: ")));
                                acceptLeaveBox.callback = function (result) {
                                    if (result == 1) {
                                        var item = $$("secretary_requestDT").getItem(id);
                                        $$("secretary_requestDT").detachEvent("onBeforeDelete");
                                        connection.sendAjax("PUT", "/hub/sickLeave/updateSickLeaveStatusJustified/" + id, function (text, data, xhr) {
                                            util.messages.showMessage("Zahtjev opravdan");
                                            refreshOnThisData();
                                        }, function (text, data, xhr) {
                                            util.messages.showErrorMessage(text);
                                        }, item);
                                    }
                                };
                                webix.confirm(acceptLeaveBox);
                            }
                        }
                    }

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
            ],

        }
    },


    rejectLeaveConfirm: function (titleEntity, textEntity) {
        var text = titleEntity;
        if (textEntity) text = textEntity;
        return {
            title: "Odbijanje " + titleEntity,
            ok: "Da",
            cancel: "Ne",
            width: 500,
            text: "Da li ste sigurni da želite odbiti " + text + "?"
        };
    },

    acceptLeaveConfirm: function (titleEntity, textEntity) {
        var text = titleEntity;
        if (textEntity) text = textEntity;
        return {
            title: "Prihvatanje " + titleEntity,
            ok: "Da",
            cancel: "Ne",
            width: 500,
            text: "Da li ste sigurni da želite prihvatiti " + text + "?"
        };
    },

};

function refreshOnThisData() {
    console.log("refresh data");


    webix.extend($$("secretary_requestDT"), webix.ProgressBar);

    var table = webix.$$("secretary_requestDT");
    var comboItemId = $$("filterRequestsComboBox").getValue();
    var URLCurrentUrl = null;


    if (comboItemId == 4) {
        URLCurrentUrl = URLAllSickLeave;
    } else {
        URLCurrentUrl = URLBySickLeaveStatus;
    }

    if (comboItemId == 4) {
        webix.ajax(URLCurrentUrl, {

            error: function (text, data, xhr) {
                if (xhr.status != 200) {
                    util.messages.showMessage("No data to load! Check your internet connection and try again.");
                    table.hideProgress();
                }
            },
            success: function (text, data, xhr) {
                if (xhr.status === 200) {
                    if (data.json() != null) {
                        console.log("loaded data with success");

                        table.clearAll();
                        table.load(URLCurrentUrl);
                        table.refresh();
                    }
                }
            }
        });
    } else {
        webix.ajax(URLCurrentUrl + comboItemId, {

            error: function (text, data, xhr) {
                if (xhr.status != 200) {
                    util.messages.showMessage("No data to load! Check your internet connection and try again.");
                    table.hideProgress();
                }
            },
            success: function (text, data, xhr) {
                if (xhr.status === 200) {
                    if (data.json() != null) {
                        console.log("loaded data with success");

                        table.clearAll();
                        table.load(URLCurrentUrl + comboItemId);
                        table.refresh();
                    }
                }
            }
        });
    }
}

