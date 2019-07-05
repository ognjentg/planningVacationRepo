// var users = ["admin", "superadmin"];

var user = true ? "superadmin" : "admin";
var selectedItemsCheckBox = [];

// dummy data
var companies = [
    {id: 1, companyLogo: "Mtel", name: "Mtel", pin: "1111"},
    {id: 2, companyLogo: "Telenor", name: "Telenor", pin: "1141"},
    {id: 3, companyLogo: "Vip", name: "Vip", pin: "1211"},
    {id: 4, companyLogo: "Telecom", name: "Telecom", pin: "1112"},
    {id: 5, companyLogo: "AT&T", name: "AT&T", pin: "1741"},
    {id: 6, companyLogo: "AOL", name: "AOL", pin: "1161"},
    {id: 7, companyLogo: "T Com", name: "T Com", pin: "1171"},
    {id: 8, companyLogo: "Plus", name: "Verizon", pin: "1771"},
    {id: 9, companyLogo: "France telecom", name: "France telecom", pin: "1551"},
    {id: 10, companyLogo: "Plus", name: "Telefónica S.A.", pin: "1771"},
    {id: 11, companyLogo: "Plus", name: "Vodafone Group plc", pin: "1771"},
    {id: 12, companyLogo: "Plus", name: "China Mobile", pin: "1771"},
    {id: 13, companyLogo: "Plus", name: "Orange S.A.", pin: "1771"},
    {id: 14, companyLogo: "Plus", name: "Verizon Wireless", pin: "1771"},
    {id: 15, companyLogo: "Plus", name: "TIM S.p.A", pin: "1771"},
    {id: 16, companyLogo: "Plus", name: "Mobile TeleSystems", pin: "1771"},
    {id: 17, companyLogo: "Plus", name: "Deutsche Telekom AG", pin: "1771"},
    {id: 18, companyLogo: "Plus", name: "Manx Telecom", pin: "1771"},
    {id: 19, companyLogo: "Plus", name: "Sure Mobile", pin: "1771"},
    {id: 20, companyLogo: "Swisscom", name: "Swisscom", pin: "1341"},
    {id: 21, companyLogo: "Plus", name: "Andorra Telecom", pin: "1771"},
    {id: 22, companyLogo: "Plus", name: "Magenta Telekom", pin: "1771"},
    {id: 23, companyLogo: "Plus", name: "Proximus", pin: "1771"},
    {id: 24, companyLogo: "Plus", name: "T-Mobile", pin: "1771"},
    {id: 25, companyLogo: "Plus", name: "Monaco Telecom", pin: "1771"},
    {id: 26, companyLogo: "Plus", name: "O2", pin: "1771"},
    {id: 27, companyLogo: "Plus", name: "Movistar", pin: "1771"},
    {id: 28, companyLogo: "Plus", name: "San Marino Telecom ", pin: "1771"},
    {id: 29, companyLogo: "Plus", name: "MegaFon", pin: "1771"},
    {id: 30, companyLogo: "Swisscom", name: "Play", pin: "1341"},
    {id: 31, companyLogo: "Plus", name: "S Telecom ", pin: "1771"},
    {id: 32, companyLogo: "Plus", name: "Telecom ", pin: "1771"},
    {id: 33, companyLogo: "Plus", name: " Telecom ", pin: "1771"},
];

var companyView = {
    panel: {
        type: "space",
        id: "companyPanel",
        css: "companyPanelToolbar",
        adjust: true,
        rows: [{
            view: "toolbar",
            padding: 10,
            css: "companyPanelToolbarTop",
            cols: [
                {
                    view: "label",
                    width: 140,
                    height: 70,
                    css: "companyPanelToolbar",
                    template: "<span class='fa fa-briefcase fa-anim'></span> Kompanije"
                },

                {
                    css: "admin-counter",
                    rows: [
                        {
                            view: "template",
                            id: "t2",
                            css: "admin-counter",
                        },
                        {
                            view: "label",
                            label: "Broj administratora",
                            type: "header",
                            css: "admin-counter"
                        },

                    ]


                },
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
                            label: "Broj kompanija",
                            type: "header",
                            css: "companies-counter"
                        },

                    ]


                },

                {
                    id: "employee-counter",
                    css: "employee-counter",
                    rows: [
                        {view: "template", id: "t3", css: "employee-counter",},
                        {view: "label", label: "broj zaposlenih", type: "header", css: "employee-counter"},

                    ]


                },


                // {
                //     view: "template",
                //     id: "t1",
                //     width: 200,
                //     text: "broj kompanija",
                //     css: "companies-counter",
                //
                // },

                {
                    id: "statisticsBtn",
                    view: "button",
                    type: "iconButton",
                    label: " Statistika  ",
                    icon: "fas fa-line-chart",
                    css: "companyButton floatMeRight",
                    autowidth: true
                }
            ]
        }, {
            view: "toolbar",
            css: "companyPanelToolbar",
            paddingX: 5,
            paddingY: 5,
            height: 60,


            cols: [
                {
                    id: "addCompanyBtn",
                    view: "button",
                    type: "iconButton",
                    label: "Dodajte kompaniju",
                    icon: "plus-circle",
                    click: 'companyView.showAddDialog',
                    css: "companyButton",
                    autowidth: true
                },
                {
                    view: "button",
                    id: "archiveBtn",
                    name: "archiveBtn",
                    type: "iconButton",
                    icon: "external-link",
                    label: "Export",
                    width: 100, css: "companyButton",
                    on: {
                        onItemClick: function () {
                            $$("archiveBtn").disable();
                            // webix.toPDF(webix.$$("companyDT"));
                            webix.toPDF($$("companyDT"), {
                                    docHeader: {
                                        text: "Pregled kompanija",
                                        textAlign: "center",

                                    },

                                    columns: {
                                        "id": {header: "id", width: 60},
                                        "name": {header: "Naziv", width: 400},
                                        "pin": {header: "PIN", width: 50}
                                    }
                                }
                            );
                            $$("archiveBtn").enable();

                        }
                    }
                },
                // {
                //     view: "button",
                //     type: "iconButton",
                //     icon: "fas fa-print",
                //     label: "Štampajte",
                //     width: 100,
                //     css: "companyButton",
                //     click: function (id) {
                //         console.log("print data");
                //         webix.print($$("companyDT"), {fit: "page"});
                //     }
                // },
                {
                    view: "button",
                    id: "delete-selected",
                    type: "iconButton",
                    icon: "fa fa-trash",
                    label: "Brišite označene",
                    width: 150,
                    disabled: true,
                    css: "companyButton",
                    click: deleteSelected

                },

                {
                    view: "button",
                    type: "iconButton",
                    icon: "fa fa-refresh",
                    label: "Osvježite",
                    width: 100,
                    css: "companyButton",
                    // click: function () {
                    //     webix.extend($$("companyDT"), webix.ProgressBar);
                    //     console.log("refresh data");
                    //     var table = webix.$$("companyDT");
                    //     table.clearAll();
                    //     table.showProgress();
                    //     webix.delay(function () {
                    //         table.parse(companies);
                    //         table.hideProgress();
                    //     }, null, null, 300);
                    //
                    // }
                    click: refreshData
                }

            ]
        }, {
            id: "companyDT",
            view: "datatable",
            css: "companyDatatable",
            margin: 10,
            editable: false,
            editaction: "dblclick",
            multiselect: false,
            resizeColumn: true,
            resizeRow: true,
            tooltip: {
                dx:-35, //20 by default
                dy:20
            },
            checkboxRefresh: true,
            onContext: {},
            pager: "pagerA",
            data: companies,

            columns: [{
                id: "status", header: [{content: "masterCheckbox", contentId: "mc1"}],
                checkValue: 'on',
                uncheckValue: 'off',
                template: "{common.checkbox()}",
                width: 35,
                cssFormat: "checkBoxStatus"
            },

                {
                    id: "id",
                    hidden: true,
                    fillspace: true,
                    height: 35,

                },

                {
                    id: "id",
                    hidden: true,
                    header: "#",
                    width: 50,
                    cssFormat: "checkBoxStatus"
                },

                {
                    id: "logo",
                    header: "Logo",
                    css: {
                        "text-align": "center",
                        "font-size": "20px",
                        "font-weight": "bold",
                        "color": "#000000"
                    },

                    cssFormat: "checkBoxStatus",
                    fillspace: true, template: function (obj) {
                        if (obj.logo == null) {
                            return "Nema slike"
                        } else {
                            return "<img style='display:block; ' src='data:image/jpeg;base64, " + obj.logo + "'/>"
                        }
                    },
                },

                {
                    id: "name",
                    fillspace: true,
                    editor: "text",
                    sort: "string",
                    cssFormat: "checkBoxStatus",
                    header: [
                        "Naziv kompanije", {
                            content: "textFilter", value: ""
                        }
                    ],
                },
                {
                    id: "pin",
                    fillspace: true,
                    editor: "text",
                    sort: "string",
                    cssFormat: "checkBoxStatus",
                    header: [
                        "PIN kompanije", {
                            content: "textFilter", value: ""
                        }
                    ]
                },

                {
                    id: "delete",
                    header: "&nbsp;",
                    width: 35,
                    tooltip: "Brisanje",
                    cssFormat: "checkBoxStatus",
                    template: "<span  style='color:#777777; 0; cursor:pointer;' class='webix_icon fa-trash-o'></span>",

                },
                {
                    id: "edit",
                    header: "&nbsp;",
                    tooltip: "Azuriranje",
                    width: 35,
                    cssFormat: "checkBoxStatus",
                    template: "<span  style='color:#777777; cursor:pointer;' class='webix_icon fa fa-pencil'></span>"
                },

                {
                    id: "admins",
                    header: "&nbsp;",
                    tooltip: "Pregled admina",
                    width: 35,
                    cssFormat: "checkBoxStatus",
                    template: "<span  style='color:#777777; cursor:pointer;' class='webix_icon  fa-user'></span>",
                }
                // {
                //     id: "status",
                //     header: "",
                //     checkValue: 'on',
                //     uncheckValue: 'off',
                //     template: "{common.checkbox()}",
                //     width: 35,
                //     cssFormat: checkBoxStatus
                //
                //
                // },

                // {
                //     id: "delete-selected",
                //     header: "<span  style='color:#777777; cursor:pointer;' class='webix_icon fa fa-trash delete-selected'></span>",
                //     width: 35,
                //
                // }

            ],
            select: "row",
            navigation: true,
            url: "company",
            on: {

                onAfterContextMenu: function (item) {
                    this.select(item.row);
                },

                onCheck: function (rowId, colId, state) {

                    console.log(state);
                    if (state === "on") {
                        selectedItemsCheckBox.push(rowId);
                        $$("delete-selected").enable();
                    } else {
                        var index = selectedItemsCheckBox.indexOf(rowId);
                        if (index > -1) {
                            selectedItemsCheckBox.splice(index, 1);
                        }
                    }

                    if (selectedItemsCheckBox.length > 0) {
                        $$("delete-selected").enable();
                    } else {
                        $$("delete-selected").disable();
                    }


                }
            },

            onClick: {
                webix_icon: function (e, id) {

                    console.log(id["column"]);
                    var action = id["column"];

                    if (action === "delete" && userData.userGroupKey == "admin") {
                        // alert("Niste autorizovani da izbrišete kompaniju!");
                        util.messages.showMessage("Niste autorizovani da izbrišete kompaniju!");
                    }
                        if (action === "delete" && userData.userGroupKey == "admin") {
                            //alert("Niste autorizovani da izbrišete kompaniju!");
                            util.messages.showMessage("Niste autorizovani da izbrišete kompaniju!");
                        }
                        if (action === "delete" && userData.userGroupKey == "superadmin") {
                            var delBox = (webix.copy(commonViews.deleteConfirm("company")));
                            delBox.callback = function (result) {
                                if (result == 1) {
                                    var item = $$("companyDT").getItem(id);
                                    $$("companyDT").detachEvent("onBeforeDelete");
                                    connection.sendAjax("DELETE", "hub/company/" + id, function (text, data, xhr) {
                                        if (text) {
                                            $$("companyDT").remove(id);
                                            util.messages.showMessage("Uspjesno uklanjanje");
                                            tmpCompaniesLength = tmpCompaniesLength - 1;
                                            if(numberOfCompanies>0){
                                                animateValue($$("t1"), 0, tmpCompaniesLength, 100);
                                            }else{
                                                animateValue($$("t1"), 0, 0, 100);
                                            }
                                        }
                                    }, function (text, data, xhr) {
                                        util.messages.showErrorMessage(text);
                                    }, item);
                                }
                            };
                            webix.confirm(delBox);
                        }


                        if (action === "edit") {
                            companyView.showChangeCompanyDialog($$("companyDT").getItem(id.row));

                        }
                        if (action === "view") {
                            companyView.showShowCompanyDialog($$("companyDT").getItem(id.row));

                        }

                        if (action === "admins") {
                            console.log($$("companyDT").getItem(id.row).id);
                            webix.ui(webix.copy(adminsView.showAdminsDialogForSuperadmin($$("companyDT").getItem(id.row).id)));
                        }

                        // if (action === "delete-selected" && selectedItemsCheckBox.length) {
                        //     console.log("delete selected");
                        //
                        //     var delBox = (webix.copy(commonViews.deleteConfirm("company")));
                        //     delBox.callback = function (result) {
                        //         if (result == 1) {
                        //
                        //             $$("companyDT").detachEvent("onBeforeDelete");
                        //
                        //             selectedItemsCheckBox.forEach(function (item) {
                        //
                        //                 connection.sendAjax("DELETE", "hub/company/" + item, function (text, data, xhr) {
                        //                     if (text) {
                        //                         $$("companyDT").remove(item);
                        //
                        //
                        //                     }
                        //                 }, function (text, data, xhr) {
                        //                     util.messages.showErrorMessage(text);
                        //                 }, item);
                        //
                        //
                        //             });
                        //
                        //             $$("companyDT").refresh();
                        //             selectedItemsCheckBox = [];
                        //
                        //         }
                        //     };
                        //     webix.confirm(delBox);
                        //
                        // }

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
                    size: 16,
                    height: 35,
                    group: 5,
                    on: {
                        onItemClick: function (ids, e, node) {
                            var control = $$("companyDT").getHeaderContent("mc1");

                            var state = control.isChecked();

                            control.uncheck();


                        }
                    },
                    animate: {
                        direction: "left"
                    }
                }
                ]
            }
        ]

    },

    selectPanel: function () {
        console.log(userData.userGroupKey == "superadmin");

        $$("main").removeView(rightPanel);
        rightPanel = "companyPanel";

        var panelCopy = webix.copy(this.panel);

        $$("main").addView(webix.copy(panelCopy));


        if (userData.userGroupKey == "superadmin") {
            $$("statisticsBtn").hide();
            $$("employee-counter").hide();
        }

        if (userData.userGroupKey == "admin") {
            $$("employee-counter").hide();
        }

        webix.ui.datafilter.masterCheckbox = webix.extend({
            refresh: function (master, node, config) {
                node.onclick = function () {
                    this.getElementsByTagName("input")[0].checked = config.checked = !config.checked;

                    var column = master.getColumnConfig(config.columnId);
                    var checked = config.checked ? column.checkValue : column.uncheckValue;
                    selectedItemsCheckBox = [];

                    master.data.each(function (obj) {


                        if (obj && master.getItemNode(obj.id)) {

                            obj[config.columnId] = checked;
                            master.callEvent("onCheck", [obj.id, config.columnId, checked]);

                        }
                    });

                    if (checked === "off") {
                        selectedItemsCheckBox = [];
                        $$("delete-selected").disable();
                        // alert(selectedItemsCheckBox.length);
                    }

                    master.refresh();
                };
            }
        }, webix.ui.datafilter.masterCheckbox);

        refreshData();


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

        webix.ui({
            view: "contextmenu",
            id: "companyContextMenu",
            width: 200,
            data: [{
                id: "1",
                value: "Izmijenite",
                icon: "pencil-square-o"
            }, {
                $template: "Separator"
            }, {
                id: "2",
                value: "Obrišite",
                icon: "trash"
            }],
            master: $$("companyDT"),
            on: {
                onItemClick: function (id) {
                    var context = this.getContext();
                    switch (id) {
                        case "1":
                            companyView.showChangeCompanyDialog($$("companyDT").getItem(context.id.row));
                            break;
                        case "2":

                            // if (userData.userGroupKey == "admin") {
                                // alert("Niste autorizovani da izbrišete kompaniju!");
                                // util.messages.showMessage("Niste autorizovani da izbrišete kompaniju!");

                                // if (userData.userGroupKey == "admin") {
                                //     //alert("Niste autorizovani da izbrišete kompaniju!");
                                //     util.messages.showMessage("Niste autorizovani da izbrišete kompaniju!");
                                //     break;
                                // }

                                if (userData.userGroupKey === "admin") {
                                    // alert(userData.userGroupKey);
                                   alert("Niste autorizovani da izbrišete kompaniju!");
                                   break;
                                }

                                var delBox = (webix.copy(commonViews.deleteConfirm("company")));
                                delBox.callback = function (result) {
                                    if (result == 1) {
                                        var item = $$("companyDT").getItem(context.id.row);
                                        $$("companyDT").detachEvent("onBeforeDelete");
                                        connection.sendAjax("DELETE", "hub/company/" + item.id, function (text, data, xhr) {
                                            if (text) {
                                                $$("companyDT").remove(context.id.row);
                                                util.messages.showMessage("Uspjesno uklanjanje");
                                                if(companies.length>0){
                                                    animateValue($$("t1"), 0, companies.length, 1000);
                                                }else{
                                                    animateValue($$("t1"), 0, 0, 1000);
                                                }
                                            }
                                        }, function (text, data, xhr) {
                                            util.messages.showErrorMessage(text);
                                        }, item);

                                    }
                                };
                                webix.confirm(delBox);
                                break;
                            // }
                    }
                }
            }
        })
    },

    addDialog: {
        view: "fadeInWindow",
        id: "addCompanyDialog",
        move: true,
        position: "center",
        modal: true,
        css:"addCompanyDialog",
        body: {
            id: "addCompanyInside",
            rows: [{
                view: "toolbar",
                cols: [{
                    view: "label",
                    label: "<span class='webix_icon fa-briefcase'></span> Dodavanje kompanije",
                    width: 400,
                    height: 50
                }, {}, {
                    hotkey: 'esc',
                    view: "icon",
                    icon: "close",
                    align: "right",
                    click: function () {
                        $$("addCompanyBtn").enable();
                        this.getTopParentView().hide();
                    },
                }]
            }, {
                view: "form",
                id: "addCompanyForm",
                width: 660,
                height: 200,
                elementsConfig: {
                    labelWidth: 200,
                    bottomPadding: 20
                },

                elements: [
                    {
                        view: "text",
                        id: "name",
                        name: "name",
                        label: "Naziv:",
                        invalidMessage: "Naziv je obavezno unijeti.",
                        required: true,
                        height:35
                    },

                    {
                        view: "text",
                        id: "pin",
                        invalidMessage: "PIN kompanije je obavezno unijeti.",
                        name: "pin",
                        editable: true,
                        stringResult: true,
                        label: "PIN kompanije:",
                        required: true,
                        height:35


                    },
                    {

                        id: "addAdmin",
                        view: "button",
                        value: "Dodajte admina",
                        type: "form",
                        align: "right",
                        hotkey: "esc",
                        width: 150,
                        margin: 50,
                        hidden: true,
                        click: function () {
                            webix.ui(webix.copy(adminsView.showAddNewAdminDialog()));
                        }


                    },

                    {  css:"companyFormButtons",
                        margin: 10,
                        cols: [{}, {
                            id: "saveCompany",
                            view: "button",
                            value: "Dodajte",
                            type: "form",
                            align: "right",
                            click: "companyView.save",
                            hotkey: "enter",
                            width: 150,
                            height:35
                        }, {

                            id: "cancelCompany",
                            view: "button",
                            value: "Otkažite",
                            type: "danger",
                            align: "right",
                            click: function () {
                                $$("addCompanyBtn").enable();
                                this.getTopParentView().hide();
                            },
                            hotkey: "esc",
                            width: 150,
                            height:35

                        }]
                    }
                ],
                rules: {
                    "name": function (value) {
                        if (!value) {
                            $$('addCompanyForm').elements.name.config.invalidMessage = 'Naziv je obavezno unijeti.';
                            return false;
                        } else if (value.length > 100) {
                            $$('addCompanyForm').elements.name.config.invalidMessage = 'Broj karaktera ne može biti veći od 100!';
                            return false;
                        } else {
                            return true;
                        }
                    },
                    "pin": function (value) {
                        if (!value) {
                            $$('addCompanyForm').elements.pin.config.invalidMessage = 'PIN kompanije je obavezno unijeti.';
                            return false;

                        } else if (isNaN(value)) {
                            console.log(isNaN(value));
                            $$('addCompanyForm').elements.pin.config.invalidMessage = 'Samo numerički znakovi mogu biti korišteni.';
                            return false;

                        } else if (value.length < 4) {
                            $$('addCompanyForm').elements.pin.config.invalidMessage = 'Broj karaktera ne može biti manji od 4!';
                            console.log("less then od 4");
                            return false;

                        } else if (value.length > 4) {
                            $$('addCompanyForm').elements.pin.config.invalidMessage = 'Broj karaktera ne može biti veci od 4!';
                            console.log("greater than 4");
                            return false;

                        } else {
                            console.log("success");
                            return true;
                        }

                    }


                }
            }]
        }
    },

    showAddDialog: function () {
        $$("addCompanyBtn").disable();
        webix.ui(webix.copy(companyView.addDialog)).show();
        webix.UIManager.setFocus("name");

    },

    save: function () {
        var form = $$("addCompanyForm");

        if (!isThereInternetConnection()) {
            // alert("Nemate pristup internetu. Provjerite konekciju i pokušajte ponovo.");
            util.messages.showMessage("Nemate pristup internetu. Provjerite konekciju i pokušajte ponovo.");
        } else {

            var validation = form.validate();
            if (validation) {

                var newCompany = {

                    id: $$("companyDT").getLastId() + 1,
                    name: form.getValues().name,
                    pin: form.getValues().pin,
                    // logo: "nemamo logo"

                };

                connection.sendAjax("POST", "/hub/company", function (text, data, xhr) {
                    if (text) {

                        $$("companyDT").add(newCompany);

                        util.dismissDialog('addCompanyDialog');
                        $$("addCompanyBtn").enable();
                        // alert("Kompanija uspješno dodata.");
                        util.messages.showMessage("Kompanija uspješno dodata.");
                        // animateValue($$("t1"), 0, tmpCompaniesLength + 1, 1000);
                        refreshData();
                        tmpCompaniesLength = tmpCompaniesLength + 1;


                    }
                }, function (text, data, xhr) {
                    if (text.includes("pin_UNIQUE")) {
                        // alert("Izabrani PIN već postoji. Unesite drugi PIN.");
                        util.messages.showMessage("Izabrani PIN već postoji. Unesite drugi PIN.");
                    }
                    if (text.includes("name_UNIQUE")) {
                        // alert("Izabrani naziv već postoji. Unesite drugi naziv.");
                        util.messages.showMessage("Izabrani naziv već postoji. Unesite drugi naziv.");
                    }

                }, newCompany);

            }
        }
    }

    ,
    changeCompanyDialog: {
        view: "fadeInWindow",
        id: "changeCompanyDialog",
        modal: true,
        position: "center",

        body: {
            id: "changeCompanyInside",
            rows: [{
                view: "toolbar",
                cols: [{
                    view: "label",
                    label: "<span class='webix_icon fa-briefcase'></span> Izmjena kompanije",
                    width: 400
                }, {}, {
                    hotkey: 'esc',
                    view: "icon",
                    icon: "close",
                    align: "right",
                    click: function () {
                        this.getTopParentView().hide();
                    },
                }]
            }, {
                view: "form",
                id: "changeCompanyForm",
                width: 600,
                elementsConfig: {
                    labelWidth: 200,
                    bottomPadding: 18
                },
                elements: [
                    {
                        view: "text",
                        name: "id",
                        hidden: true
                    },
                    {
                        view: "text",
                        id: "name",
                        name: "name",
                        label: "Naziv:",
                        invalidMessage: "Naziv je obavezno unijeti.",
                        required: true
                    },
                    {
                        view: "text",
                        id: "pin",
                        invalidMessage: "PIN kompanije je obavezno unijeti.",
                        name: "pin",
                        editable: true,
                        stringResult: true,
                        label: "PIN kompanije:",
                        required: true


                    },


                    {
                        margin: 5,
                        cols: [{}, {
                            id: "changeCompany",
                            view: "button",
                            value: "Sačuvajte izmjene",
                            type: "form",
                            click: "companyView.saveChangedCompany",
                            hotkey: "enter",
                            width: 150
                        }]
                    }],
                rules: {
                    "name": function (value) {
                        if (!value) {
                            $$('changeCompanyForm').elements.name.config.invalidMessage = 'Naziv je obavezno unijeti.';
                            return false;
                        } else if (value.length > 100) {
                            $$('changeCompanyForm').elements.name.config.invalidMessage = 'Broj karaktera ne može biti veći od 100!';
                            return false;
                        } else {
                            return true;
                        }
                    },
                    "pin": function (value) {
                        if (!value) {
                            $$('changeCompanyForm').elements.pin.config.invalidMessage = 'PIN kompanije je obavezno unijeti.';
                            return false;

                        } else if (isNaN(value)) {
                            console.log(isNaN(value));
                            $$('changeCompanyForm').elements.pin.config.invalidMessage = 'Samo numerički znakovi mogu biti korišteni.';
                            return false;

                        } else if (value.length < 4) {
                            $$('changeCompanyForm').elements.pin.config.invalidMessage = 'Broj karaktera ne može biti manji od 4!';
                            console.log("less then od 4");
                            return false;

                        } else if (value.length > 4) {
                            $$('changeCompanyForm').elements.pin.config.invalidMessage = 'Broj karaktera ne može biti veći od 4!';
                            console.log("greater than 4");
                            return false;

                        } else {
                            console.log("success");
                            return true;
                        }

                    }


                }
            }]
        }
    },


    adminChangeCompanyDialog: {
        view: "fadeInWindow",
        id: "adminChangeCompanyDialog",
        modal: true,
        position: "center",

        body: {
            id: "adminChangeCompanyInside",
            rows: [{
                view: "toolbar",
                cols: [{
                    view: "label",
                    label: "<span class='webix_icon fa-briefcase'></span> Izmjena kompanije",
                    width: 400
                }, {}, {
                    hotkey: 'esc',
                    view: "icon",
                    icon: "close",
                    align: "right",
                    click: function () {
                        this.getTopParentView().hide();
                    },
                }]
            }, {
                view: "form",
                id: "adminChangeCompanyForm",
                width: 600,
                elementsConfig: {
                    labelWidth: 200,
                    bottomPadding: 18
                },
                elements: [
                    {
                        view: "text",
                        name: "id",
                        hidden: true
                    },
                    {
                        view: "text",
                        name: "pin",
                        hidden: true
                    },
                    {
                        view: "text",
                        id: "name",
                        name: "name",
                        label: "Naziv:",
                        invalidMessage: "Naziv je obavezno unijeti.",
                        required: true
                    },


                    {
                        height: 50,
                        cols: [
                            {
                                view: "text",
                                name: "id",
                                hidden: "true"
                            },
                            {
                                view: "text",
                                name: "pin",
                                hidden: "true"
                            },
                            {
                                view: "label",
                                width: 200,
                                bottomPadding: 20,
                                leftPadding: 3,
                                required: true,
                                label: "Logo kompanije: <span style='color:#e32'>*</span>"
                            },
                            {
                                view: "list",
                                name: "companyLogoList",
                                rules: {
                                    content: webix.rules.isNotEmpty
                                },
                                scroll: false,
                                id: "companyLogoList",
                                width: 372,
                                type: {
                                    height: "auto"
                                },
                                css: "relative image-upload",
                                template: "<img src='data:image/jpg;base64,#content#'/> <span class='delete-file'><span class='webix fa fa-close'/></span>",
                                onClick: {
                                    'delete-file': function (e, id) {
                                        this.remove(id);
                                        return false;
                                    }
                                }
                            }, {},

                        ],

                    }, {},
                    {
                        view: "uploader",
                        id: "photoUploader",
                        width: 110,
                        height: 60,
                        css: "upload-logo",
                        template: "<span class='webix fa fa-upload' />Dodajte logo</span>",
                        on: {
                            onBeforeFileAdd: function (upload) {
                                var type = upload.type.toLowerCase();
                                console.log(type);
                                if (type === "jpg" || type === "png" || type === "jpeg") {
                                    var file = upload.file;
                                    var reader = new FileReader();
                                    reader.onload = function (event) {
                                        var img = new Image();
                                        img.onload = function (ev) {
                                            if (img.width > 220 || img.height > 50) {
                                                util.messages.showErrorMessage("Dimenzije logo-a moraju biti 220x50 px!");
                                            } else {
                                                var newDocument = {
                                                    name: file['name'],
                                                    content: event.target.result.split("base64,")[1],
                                                };
                                                $$("companyLogoList").clearAll();
                                                $$("companyLogoList").add(newDocument);

                                            }
                                        };
                                        img.src = event.target.result;
                                    };
                                    reader.readAsDataURL(file);
                                    return false;
                                } else {
                                    util.messages.showErrorMessage("Dozvoljene ekstenzije  su jpg, jpeg i png!");

                                    return false;
                                }

                            }
                        }
                    },
                    {
                        margin: 5,
                        cols: [{}, {
                            id: "changeCompany",
                            view: "button",
                            value: "Sačuvajte izmjene",
                            type: "form",
                            click: "companyView.saveChangedCompany",
                            hotkey: "enter",
                            width: 150,
                            margin: 20,

                        }]
                    }],
                rules: {
                    "name": function (value) {
                        if (!value) {
                            $$('changeCompanyForm').elements.name.config.invalidMessage = 'Naziv je obavezno unijeti.';
                            return false;
                        } else if (value.length > 100) {
                            $$('changeCompanyForm').elements.name.config.invalidMessage = 'Broj karaktera ne može biti veći od 100!';
                            return false;
                        } else {
                            return true;
                        }
                    }

                }
            }]
        }
    },

    showCompanyDialog: {
        view: "popup",
        id: "showCompanyDialog",
        modal: true,
        position: "center",
        drag: "true",

        body: {
            id: "showCompanyInside",
            rows: [{
                view: "toolbar",
                cols: [{
                    view: "label",
                    label: "<span class='webix_icon fa-briefcase'></span> Pregled kompanije",
                    width: 400
                }, {}, {
                    hotkey: 'esc',
                    view: "icon",
                    icon: "close",
                    align: "right",
                    click: "util.dismissDialog('showCompanyDialog');"
                }]
            }, {
                view: "form",
                id: "showCompanyForm",
                width: 600,
                elementsConfig: {
                    labelWidth: 200,
                    bottomPadding: 18
                },
                elements: [
                    {
                        view: "text",
                        name: "id",
                        hidden: false
                    },
                    {
                        view: "text",
                        id: "name",
                        name: "name",
                        label: "Naziv:",
                        editable: false,

                    },
                    {
                        view: "text",
                        id: "pin",
                        name: "pin",
                        type: "text",
                        editable: false,
                        stringResult: true,
                        label: "PIN kompanije:",


                    },


                    {
                        margin: 5,
                        cols: [{}, {
                            id: "showCompany",
                            view: "button",
                            value: "Zatvorite",
                            type: "form",
                            click: "util.dismissDialog('showCompanyDialog');",
                            hotkey: "enter",
                            width: 150
                        }]
                    }],

            }]
        }
    },


    showChangeCompanyDialog: function (company) {
        if (userData.userGroupKey == "admin") {
            webix.ui(webix.copy(companyView.adminChangeCompanyDialog));
            var form = $$("adminChangeCompanyForm");

            form.elements.id.setValue(company.id);
            form.elements.name.setValue(company.name);
            form.elements.pin.setValue(company.pin);


            setTimeout(function () {
                $$("adminChangeCompanyDialog").show();
                webix.UIManager.setFocus("name");
                var newDocument = {
                    name: '',
                    content: company.logo,


                };
                $$("companyLogoList").clearAll();
                $$("companyLogoList").add(newDocument);
            }, 0);
        } else {
            webix.ui(webix.copy(companyView.changeCompanyDialog));

            var form = $$("changeCompanyForm");

            form.elements.id.setValue(company.id);
            form.elements.name.setValue(company.name);
            form.elements.pin.setValue(company.pin);


            setTimeout(function () {
                $$("changeCompanyDialog").show();
                webix.UIManager.setFocus("name");
                var newDocument = {
                    name: company.name,
                    pin: company.pin
                };

            }, 0);

        }
    },


    showShowCompanyDialog: function (company) {

        webix.ui(webix.copy(companyView.showCompanyDialog));
        var form = $$("showCompanyForm");

        form.elements.name.setValue(company.name);
        form.elements.pin.setValue(company.pin);

        setTimeout(function () {
            $$("showCompanyDialog").show();
            webix.UIManager.setFocus("name");
            var newDocument = {
                name: company.name,
                pin: company.pin
            };

        }, 0);
    },


    saveChangedCompany: function () {
        $$("changeCompany").disable();
        if (userData.userGroupKey == "admin") {
            var form = $$("adminChangeCompanyForm");
        } else {
            var form = $$("changeCompanyForm");
        }

        var logo = $$("companyLogoList");
        console.log(logo);

        var validation = form.validate();
        if (validation) {
            var newCompany;
            if (userData.userGroupKey == "admin") {
                newCompany = {
                    id: form.getValues().id,
                    name: form.getValues().name,
                    pin: form.getValues().pin,
                    //companyLogo: logo.getItem(logo.getLastId()).content,
                    logo: logo.getItem(logo.getLastId()).content

                };
            } else {
                var record = $$("companyDT").getItem(form.getValues().id);
                console.log(record);
                companyLogo = record.logo;
                console.log(logo);
                newCompany = {
                    id: form.getValues().id,
                    name: form.getValues().name,
                    pin: form.getValues().pin,
                    logo: companyLogo


                };
            }

            console.log(newCompany.id);

            connection.sendAjax("PUT", "hub/company/" + newCompany.id,
                function (text, data, xhr) {
                    if (text) {
                        util.messages.showMessage("Kompanija uspješno izmjenjena.");
                        $$("companyDT").updateItem(newCompany.id, newCompany);
                    } else
                        util.messages.showErrorMessage("Neuspješna izmjena.");
                }, function (text, data, xhr) {
                    util.messages.showErrorMessage(text);
                    // alert(text);
                }, newCompany);

            if (userData.userGroupKey == "superadmin") {

                $$("changeCompany").enable();
                util.dismissDialog('changeCompanyDialog');
            }

        }


    }
}


function animateValue(id, start, end, duration)
{
    console.log("counter start");

    if (end === null) {

        end = 0;

        id.setHTML(`<p>${end}</p>`);

        return;
    }

    if (end === 0) {

        id.setHTML(`<p>${end}</p>`);

        return;
    }

    var range = end - start;
    var current = start;
    var increment = end > start ? 1 : -1;
    increment = end == start ? 0: increment;
    var stepTime = Math.abs(Math.floor(duration / range));
    var timer = setInterval(function () {
        current += increment;
        id.setHTML(`<p>${current}</p>`);
        if (current === end) {
            clearInterval(timer);
        }
    }, stepTime);
}

var tmpCompaniesLength = 0;

function refreshData() {
    $$("t1").setHTML(`<p>${0}</p>`);
    $$("t2").setHTML(`<p>${0}</p>`);
    $$("t3").setHTML(`<p>${0}</p>`);
    console.log("refresh data");


    webix.extend($$("companyDT"), webix.ProgressBar);

    var table = webix.$$("companyDT");
    table.clearAll();
    table.showProgress();
    var bla;

    webix.ajax("hub/user/numberOfAdmins", {
        error: function (text, data, xhr) {
            if (xhr.status !== 200) {
                util.messages.showMessage("Nema dostupnih podataka! Provjerite internet konekcijuuuuuuuuu.");
                table.hideProgress();
            }
        },
        success: function (text, data, xhr) {
            if (xhr.status === 200) {
                if (data.json() != null) {
                    console.log("loaded data with success");
                    numberOfAdmins = data.json();
                    animateValue($$("t2"), 0, numberOfAdmins, 100);
                }
            }
        }
    });


    webix.ajax("hub/company", {
        error: function (text, data, xhr) {
            if (xhr.status !== 200) {
                // alert("Nema dostupnih podataka! Provjerite internet konekciju.");
                util.messages.showMessage("Nema dostupnih podataka! Provjerite internet konekciju.");
                table.hideProgress();
            }
        },
        success: function (text, data, xhr) {
            if (xhr.status === 200) {
                if (data.json() != null) {
                    console.log("loaded data with success");
                    companies = data.json();
                    numberOfCompanies = companies.length;
                    tmpCompaniesLength = numberOfCompanies;
                    table.hideProgress();
                    // counterAnimation(1130, 1130, 2230);
                    if (userData.userGroupKey == "admin") {
                        $$("addCompanyBtn").hide();
                        // var table = webix.$$("companyDT");
                        // table.clearAll();
                        companies = companies.slice(0, 1);
                        table.parse(companies);
                        if(numberOfCompanies>0){
                            animateValue($$("t1"), 0, numberOfCompanies, 100);
                        }else{
                            animateValue($$("t1"), 0, 0, 100);
                        }
                        animateValue($$("t3"), 0, 100, 100);

                    } else {
                        table.parse(companies);
                        if(numberOfCompanies>0){
                            animateValue($$("t1"), 0, numberOfCompanies, 100);
                        }else{
                            animateValue($$("t1"), 0, numberOfCompanies, 100);
                        }
                        animateValue($$("t3"), 0, 100, 100);
                    }
                }
            }
            var control = $$("companyDT").getHeaderContent("mc1");
            var state = control.isChecked();
            control.uncheck();
        }

    });
}

function checkBoxStatus(value, obj) {

    if (obj.status === "on") {
        console.log(obj.status);

        return "webix_row_select";
    } else {
        return "";
    }

}

function isThereInternetConnection() {

    if (navigator.onLine) {
        return true;
    }

    return false;

}

function deleteSelected() {

    console.log("delete selected");

    if (selectedItemsCheckBox.length) {

        // alert(selectedItemsCheckBox);

        var delBox = (webix.copy(commonViews.deleteConfirm("company")));

        delBox.callback = function (result) {

            if (result == 1) {

                $$("companyDT").detachEvent("onBeforeDelete");

                selectedItemsCheckBox.forEach(function (item) {

                    connection.sendAjax("DELETE", "hub/company/" + item, function (text, data, xhr) {

                        if (text) {
                            $$("companyDT").remove(item);


                        }
                    }, function (text, data, xhr) {

                        util.messages.showErrorMessage(text);

                    }, item);


                });


                selectedItemsCheckBox = [];

                var control = $$("companyDT").getHeaderContent("mc1");

                control.uncheck();

                $$("companyDT").refresh();

            }
        };
        webix.confirm(delBox);

    } else {

        // alert("Nema selektovanih kompanija.");
        util.messages.showErrorMessage("Nema selektovanih kompanija.");
    }


}