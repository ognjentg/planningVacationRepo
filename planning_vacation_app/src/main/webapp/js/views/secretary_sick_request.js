var sickRequestsView = {

    sickLeaveURL: "/sick_leave",
    selectPanel: function () {
        $$("main").removeView(rightPanel); // brisanje trenutno prikazanog view-a na stranici kako bi se prikazao facultyView
        rightPanel = "requestPanel"; // novi rightPanel će biti facultyPanel

        var panelCopy = webix.copy(this.getPanel()); // webix.copy -> duboka kopija
        $$("main").addView(panelCopy);

        sickRequestsView.createDatatableContextMenu(); // dodavanje izmjene i brisanja na kontekstni meni

       // connection.attachAjaxEvents('secretary_requestDT', sickRequestsView.sickLeaveURL);


        //$$("secretary_requestDT").define("url", sickRequestsView.sickLeaveURL);

        refreshData();
    },
    getPanel: function () {
        return {
            id: "requestPanel",

            rows : [
                {
                    padding: 8,
                    view: "toolbar",
                    css: "secretaryRequestToolbar",
                    cols: [{
                        template: "<span class='webix_icon fa-book-medical'><\/span> Zahtjevi za bolovanje",
                        view: "label",
                        width: 400
                    }, {},
                        {
                            view: "combo",
                            width: 250,
                            id: "filterRequestsComboBox",
                            label: "Vrsta zahtjeva",
                            labelWidth: 100,
                            value: "4",
                            options: typeRequest
                        },]
                }, {
                    view: "datatable",
                    id: "secretary_requestDT",
                    css: "secretary_requestDatatable",
                    margin: 10,
                    multiselect: false,
                    navigation: true, // omoguceno selektovanje redova navigacijskim tasterima na tastaturi
                    //editable: true,
                    //editaction: "dblclick", // dvostrukim klikom se moze izmijeniti polje u tabeli
                    select: "row", // cell
                    resizeColumn: true, // omogucen resize kolona korisniku
                    resizeRow: true, // omogucen resize redova korisniku
                    onContext: {},
                   data: requests,
                    //url: "/sick_leave",
                    columns: [{
                        id: "id",
                        header: "#",
                        width: 50,
                    }, /*{
                        id: "senderName",
                        fillspace: true,
                        editor: "text",
                        sort: "string",
                        //cssFormat: checkBoxStatus,
                        header: [
                            "Ime posiljaoca", {
                                content: "textFilter", value: ""
                            }
                        ]
                    }, {
                        id: "senderSurname",
                        fillspace: true,
                        editor: "text",
                        sort: "string",
                        //cssFormat: checkBoxStatus,
                        header: [
                            "Prezime posiljaoca", {
                                content: "textFilter", value: ""
                            }
                        ]
                    }, */{
                        id: "date_from",
                        fillspace: true,
                        editor: "text",
                        sort: "date",
                        //cssFormat: checkBoxStatus,
                        header: [
                            "Datum od", {
                                content: "textFilter", value: ""
                            }
                        ]
                    },{
                        id: "date_to",
                        fillspace: true,
                        editor: "text",
                        sort: "date",
                        //cssFormat: checkBoxStatus,
                        header: [
                            "Datum do", {
                                content: "textFilter", value: ""
                            }
                        ]
                    },{
                        id: "accept",
                        header: "&nbsp;",
                        width: 35,
                        template: "<span  style='color:#777777; 0; cursor:pointer;' class='webix_icon fa-check'></span>",

                    }, {
                        id: "reject",
                        header: "&nbsp;",
                        width: 35,
                        template: "<span  style='color:#777777; 0; cursor:pointer;' class='webix_icon fa-times'></span>",

                    }, {
                        id: "view",
                        header: "&nbsp;",
                        width: 35,
                        template: "<span  style='color:#777777; cursor:pointer;' class='webix_icon  fa fa-eye'></span>"
                    }
                    ],
                    select: "row",
                    navigation: true,
                    url: "secretary_sick_request",
                    on: {

                        onAfterContextMenu: function (item) {
                            this.select(item.row);
                        }

                    },
                    onClick: {
                        webix_icon: function (e, id) {

                            console.log(id["column"]);
                            var action = id["column"];

                            if (action === "reject" /*&& userData.userGroupId === 4*/) {
                                var delBox = (webix.copy(commonViews.deleteConfirm("zahtjeva za bolovannje: ")));
                                delBox.callback = function (result) {
                                    if (result == 1) {
                                        var item = $$("secretary_requestDT").getItem(id);
                                        $$("secretary_requestDT").detachEvent("onBeforeDelete");
                                        connection.sendAjax("DELETE", "/sick_leave/" + id, function (text, data, xhr) {
                                            if (text) {
                                                $$("companyDT").remove(id);
                                                util.messages.showMessage("Uspjesno uklanjanje");
                                                animateValue($$("t1"), 0, companies.length, 1000);
                                            }
                                        }, function (text, data, xhr) {
                                            util.messages.showErrorMessage(text);
                                        }, item);
                                    }
                                };
                                webix.confirm(delBox);
                            }

                            /*if (action === "edit") {
                                companyView.showChangeCompanyDialog($$("companyDT").getItem(id.row));

                            }*/
                            if (action === "view") {
                                sickRequestsView.showShowEmployeDialog($$("secretary_requestDT").getItem(id.row));

                            }

                        }
                    }
                }
            ],

        }
    },
    showEmployeeInformation: {


        view: "popup",
        id: "showEmployeeInformationDialog",
        modal: true,
        position: "center",

        body: {
            id: "showEmployeeInformationInside",
            rows: [{
                view: "toolbar",
                cols: [{
                    view: "label",
                    label: "<span class='webix_icon fa fa-eye'></span> Pregled zaposlenog",
                    width: 400
                }, {}, {
                    hotkey: 'esc',
                    view: "icon",
                    icon: "close",
                    align: "right",
                    click: "util.dismissDialog('showEmployeeInformationDialog');"
                }]
            }, {
                view: "form",
                id: "showEmployeeInformationForm",
                width: 600,
                elementsConfig: {
                    labelWidth: 200,
                    bottomPadding: 18
                },
                elements: [
                    /*{
                        view: "text",
                        name: "id",
                        hidden: false
                    },*/ {
                        view: "text",
                        id: "first_name",
                        name: "first_name",
                        label: "Ime:",
                        editable: false,
                        readonly: true
                    }, {
                        view: "text",
                        id: "last_name",
                        name: "last_name",
                        label: "Prezime:",
                        editable: false,
                        readonly: true
                    }, {
                        view: "text",
                        id: "email",
                        name: "email",
                        label: "e-mail:",
                        editable: false,
                        readonly: true
                    }, {
                        view: "text",
                        id: "date_from",
                        name: "date_from",
                        label: "Pocetak bolovanja:",
                        editable: false,
                        readonly: true
                    }, {
                        view: "text",
                        id: "date_to",
                        name: "date_to",
                        label: "Kraj bolovanja:",
                        editable: false,
                        readonly: true
                    },

                    {
                        margin: 5,
                        cols: [{}, {
                            id: "showEmployeeInformationCloseBtn",
                            view: "button",
                            value: "Zatvorite",
                            type: "form",
                            click: "util.dismissDialog('showEmployeeInformationDialog');",
                            hotkey: "enter",
                            width: 150
                        }]
                    }],

            }]
        }
    },

    showShowEmployeDialog: function (sick_request) {

        webix.ui(webix.copy(sickRequestsView.showEmployeeInformation));
        var form = $$("showEmployeeInformationForm");

        /* form.elements.first_name.setValue(secretary_sick_request.first_name);

        // form.elements.name.setValue(secretary_sick_request.first_name);
        // form.elements.pin.setValue(secretary_sick_request.last_name);
 */
        setTimeout(function () {
            $$("showEmployeeInformationDialog").show();
            webix.UIManager.setFocus("first_name");
            var newDocument = {
              //  name: company.name,
               // pin: company.pin
            };

        }, 0);
    },



};
function refreshData() {
    $$("t1").setHTML(`<p>${0}</p>`);
    $$("t2").setHTML(`<p>${0}</p>`);
    $$("t3").setHTML(`<p>${0}</p>`);
    console.log("refresh data");


    webix.extend($$("secretary_requestDT"), webix.ProgressBar);

    var table = webix.$$("secretary_requestDT");
    table.clearAll();
    table.showProgress();


    webix.ajax("sick_leave", {

        error: function (text, data, xhr) {

            if (xhr.status != 200) {
                alert("No data to load! Check your internet connection and try again.");
                table.hideProgress();
            }

        },

        success: function (text, data, xhr) {

            if (xhr.status === 200) {
                if (data.json() != null) {
                    console.log("loaded data with success");
                    requests = data.json();
                   // numberOfCompanies = companies.length;
                    table.hideProgress();
                    // counterAnimation(1130, 1130, 2230);

                   /* if (userData.userGroupId === 2) {

                        $$("addCompanyBtn").hide();
*/

                         var table = webix.$$("secretary_requestDT");

                         table.clearAll();

                    requests = requests.slice(0, 1);

                        table.parse(requests);
/*
                        animateValue($$("t1"), 0, numberOfCompanies, 100);
                        animateValue($$("t2"), 0, 100, 100);
                        animateValue($$("t3"), 0, 100, 100);

                    } else {
                        table.parse(companies);
                        animateValue($$("t1"), 0, numberOfCompanies, 1000);
                        animateValue($$("t2"), 0, 100, 900);
                        animateValue($$("t3"), 0, 100, 900);

                    }*/
                }
            }


        }

    });


}




var typeRequest = [
    {id: 1, value: "Na čekanju"},
    {id: 2, value: "Opravdano"},
    {id: 3, value: "Neopravdano"},
    {id: 4, value: "Svi"},
];

var format = webix.Date.dateToStr("%d.%m.%Y");
var stringDate = format(new Date());

var requests = [
    {id:1,  date_from: stringDate, date_to: stringDate},
    {id:2,  date_from: stringDate, date_to: stringDate},
    {id:4,  date_from: stringDate, date_to: stringDate},

];

