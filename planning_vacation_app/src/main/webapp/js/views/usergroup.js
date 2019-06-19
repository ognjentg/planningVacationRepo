"use strict";

var usergroupView;
var user = null; //logged in user
var sectorID = null; // if there is sector manager
//int numberOfSectors; //when sector is changed
var selectedItems = [];
var selectedManager = [];

usergroupView = {
    getPanel: function () {
        console.log("uslo u usergroupview");
        switch (userData.keyUserGroup) {
            case "admin":
                user = "admin";
                break;
            case "direktor":
                user = "director";
                break;
            case "sekretar":
                user = "secretary";
                break;
            case "menadzer":
                user = "manager";
                sectorID = userData.sectorId;
                console.log(sectorID);
                break;
        }
        ;

        return {
            id: "userPanel",
            adjust: true,
            autowidth: true,
            css: "companyPanelToolbar",
            type: "space",
            rows: [{
                view: "toolbar",
                padding: 10,
                autowidth: true,
                css: "companyPanelToolbarTop",
                cols: [{
                    view: "label",
                    width: 200,
                    height: 70,
                    css: "companyPanelToolbar",
                    template: "<span class='fa fa-users'></span> Zaposleni"
                }, {}, {}, {},

                    {
                        css: "employee-counter",
                        rows: [
                            {view: "template", id: "t3", css: "employee-counter"},
                            {
                                view: "label",
                                label: "Broj zaposlenih u sektoru",
                                type: "header",
                                css: "employee-counter"
                            },
                        ]
                    }, {
                        id: "btn",
                        view: "button",
                        type: "iconButton",
                        label: " Statistika  ",
                        icon: "fas fa-line-chart",
                        css: "companyButton floatMeRight",
                        align: "right",
                        autowidth: true
                    }
                ]
            },
                {
                    view: "toolbar",
                    css: "companyPanelToolbar",
                    paddingX: 5,
                    paddingY: 5,
                    height: 60,
                    cols: [{
                        id: "addUserButton",
                        view: "button",
                        type: "iconButton",
                        //hotkey: "enter",
                        icon: "plus-circle",
                        label: "Dodaj korisnika",
                        width: 200,
                        height: 40,
                        css: "companyButton",
                        align: "left",
                        disabled: true,
                        click: 'usergroupView.showAddDialog'
                    }, {
                        id: "deleteSelectedButton",
                        view: "button",
                        type: "iconButton",
                        label: "Izbrisi zaposlene",
                        icon: "trash",
                        width: 200,
                        height: 40,
                        css: "companyButton",
                        align: "left",
                        disabled: true,
                        click: 'usergroupView.deleteSelected'
                    }, {
                        id: "changeSectorOfSelectedButton",
                        view: "button",
                        type: "iconButton",
                        // hotkey: "enter",
                        icon: "users",
                        label: "Promijeni sektor",
                        width: 200,
                        height: 40,
                        css: "companyButton",
                        align: "left",
                        disabled: true,
                        click: 'usergroupView.showChangeMultipleUsersSector'
                    }, {
                        view: "button",
                        id: "changeManagerBtn",
                        type: "iconButton",
                        icon: "user",
                        label: "Promijeni menadžera",
                        width: 200,
                        height: 40,
                        align: "left",
                        disabled: true,
                        css: "companyButton",
                        click: 'usergroupView.showChangeManagerDialog'
                    }, {
                        view: "label",
                        id: "izaberiLabel",
                        label: "Izaberi sektor:",
                        align: "right"
                    }, {
                        view: "combo",
                        id: "choseSectorCombo",
                        align: "left",
                        width: 400,
                        tooltip: "Izaberite sektor u kome želite vidjeti zaposlene",
                        value: "Svi sektori",
                        placeholder: "Svi sektori",
                        on: {
                            // var input= $$("choseSectorCombo").getInputNode().value;
                            onChange(id) {
                                //'onItemClick': function(id){
                                sectorID = id;
                                if (sectorID == -1) {
                                    $$("addUserButton").enable();
                                }

                                if (sectorID == -2 || sectorID == -1) {
                                    $$("changeManagerBtn").disable();
                                } else $$("changeManagerBtn").enable()
                                console.log("id sektora je" + id);
                                //webix.message("Prikazaće Vam se svi zaposleni u izabranom sektoru. "/*+ this.getValue()*/);
                                $$("usergroupDT").clearAll();
                                //connection.attachAjaxEvents("usergroupDT", "hub/user/custom/bySector/"+id);
                                $$("usergroupDT").define("url", "hub/user/custom/bySector/" + id);
                                $$("usergroupDT").detachEvent("onBeforeDelete");


                                if (sectorID == -2 || sectorID == -1) {
                                    $$("changeManagerBtn").disable();
                                    F
                                } else $$("changeManagerBtn").enable()
                            }

                        }
                    }
                    ]
                },
                {
                    //Tabela
                    view: "datatable",
                    id: "usergroupDT",
                    margin: 10,
                    tooltip: true,
                    //fillspace: true,
                    //editaction: "dblclick",
                    // multiselect: false,
                    //  resizeColumn: true,
                    // resizeRow: true,
                    //checkboxRefresh: true,
                    //onContext: {},
                    pager: "pagerB",
                    //data:users, Kako uzeti podatke o users
                    url: "hub/user",
                    columns: [
                        {
                            id: "checkboxRow",
                            header: "",
                            checkValue: 'on',
                            uncheckValue: 'off',
                            template: "{common.checkbox()}",
                            width: 35,
                            cssFormat: checkBoxStatus
                        },
                        {
                            id: "id",
                            hidden: true
                        }, {
                            id: "firstName",
                            fillspace: true,
                            editable: false,
                            sort: "string",
                            //width:210,
                            header: ["<span class='webix_icon fa fa-user'/>Ime",
                                {
                                    content: "textFilter", value: "", icon: "wxi-search"
                                }]
                        }, {
                            id: "lastName",
                            fillspace: true, // ovo siri kolonu
                            editable: false,
                            sort: "string",
                            //width:210,
                            header: ["<span class='webix_icon fa fa-user'/>Prezime",
                                {
                                    content: "textFilter", value: "", icon: "wxi-search"
                                }]
                        },
                        {
                            id: "email",
                            fillspace: true,
                            editable: false,
                            sort: "text",
                            //width:220,
                            header: ["<span class='webix_icon fa fa-user'/>Email",
                                {
                                    content: "textFilter", value: "", icon: "wxi-search"
                                }]
                        },
                        {
                            id: "position",
                            fillspace: true,
                            editable: false,
                            sort: "string",
                            header: ["<span class='webix_icon fas fa-briefcase'/>Pozicija",
                                {
                                    content: "textFilter", value: "", icon: "wxi-search"
                                }]
                        },
                        {
                            id: "sector_name",
                            fillspace: true,
                            editable: false,
                            sort: "string",
                            //width:220,
                            header: ["<span class='webix_icon fas fa-briefcase'/>Sektor",
                                {
                                    content: "textFilter", value: "", icon: "wxi-search"
                                }]
                        },
                        {
                            id: "delete",
                            header: "&nbsp;",
                            width: 35,
                            template: "<span  style='color:#777777; 0; cursor:pointer;' class='webix_icon fa-trash-o'></span>",

                        }, {
                            id: "view",
                            header: "&nbsp;",
                            tooltip: "Informacije o zaposlenom",
                            width: 35,
                            template: "<span  style='color:#777777; cursor:pointer;' class='webix_icon fa fa-eye'></span>"
                        }, /*{
                            id: "pencil", //mijenjanje korisnicke grupe, od strane direktora i admina
                            header: "&nbsp;",
                            tooltip: "Mijenjanje radne pozicije zaposlenog",
                            width: 35,
                            template: "<span  style='color:#777777; cursor:pointer;' class='webix_icon fa fa-pencil'></span>"
                        },*/ {
                            id: "sector", //mijenjanje sektora, od strane direktora i admina
                            header: "&nbsp;",
                            tooltip: "Mijenjanje sektora zaposlenog.",
                            width: 35,
                            template: "<span  style='color:#777777; cursor:pointer;' class='webix_icon fa fa-users'></span>"
                        }, {
                            id: "calendar",
                            header: "&nbsp;",
                            width: 35,
                            template: "<span  style='color:#777777; cursor:pointer;' class='webix_icon fa fa-calendar'></span>"
                        }
                    ],
                    select: "row",
                    multiselect: false,
                    checkboxRefresh: true,
                    onContext: {},
                    navigation: true,
                    on: {
                        onAfterContextMenu: function (item) {
                            this.select(item.row);
                        },
                        onCheck: function (rowId, colId, state) {
                            if (state == "on") {
                                selectedItems.push(rowId);
                                $$("deleteSelectedButton").enable();
                                $$("changeSectorOfSelectedButton").enable();
                                this.select(rowId);
                            } else {
                                var index = selectedItems.indexOf(rowId);
                                if (index > -1) {
                                    selectedItems.splice(index, 1);
                                    this.unselect(rowId);
                                }
                                if (selectedItems.length == 0) {
                                    $$("deleteSelectedButton").disable();
                                    $$("changeSectorOfSelectedButton").disable();
                                }
                            }
                        },
                        onAfterLoad: function () {
                            var numberOfEmployees = $$("usergroupDT").count();
                            animateValue($$("t3"), 0, numberOfEmployees, 1000);
                        }
                    },
                    onClick: {
                        webix_icon: function (e, id) {
                            console.log(id["column"]);
                            var action = id["column"];
                            if ((action === "delete" || action === "sector") && (user === "secretary" || user === "menager")) {
                                alert("Niste autorizovani da izvršite ovu radnju!");
                            }
                            if (action === "edit" && user === "secretary") {
                                alert("Niste autorizovani da izvršite ovu radnju!");
                            }
                            if (action === "view") {
                                usergroupView.employeeInfo(id);
                            }
                            if (action == "delete") {
                                if ($$("usergroupDT").getItem(id).position != "menadzer")
                                    usergroupView.deleteEmployee();
                                else
                                    util.messages.showErrorMessage("Nije moguće izbrisati menadžera.");
                            }
                            if (action == "sector") {
                                if ($$("usergroupDT").getItem(id).position == "zaposleni")
                                    usergroupView.showChangeSectorOfSelectedDialog();
                                else
                                    util.messages.showErrorMessage("Sektor je moguće promijeniti samo zaposlenom.");

                            }
                            if (action == "calendar")
                                usergroupView.showEmployeeVacationInfoDialog(id);

                        }
                    },
                }, {
                    view: "toolbar",
                    css: "highlighted_header header6",
                    paddingX: 5,
                    paddingY: 5,
                    height: 40,
                    cols: [{
                        view: "pager", id: "pagerB",
                        template: "{common.first()}{common.prev()}&nbsp; {common.pages()}&nbsp; {common.next()}{common.last()}",
                        size: 20,
                        height: 35,
                        group: 5,
                        on: {
                            onItemClick: function (ids, e, node) {
                                util.messages.showErrorMessage("PAGER");
                            }
                        },
                        animate: {
                            direction: "left"
                        }
                    }
                    ]
                }]
        }
    },


    addDialog: {
        view: "window",
        id: "addUserDialog",
        position: "center",
        modal: true,
        move: true,
        body: {
            id: "addUserInside",
            rows: [
                {
                    view: "toolbar",
                    cols: [{
                        view: "label",
                        label: "<span class='webix_icon fa-user'></span> Podaci o novom zaposlenom",
                        autoWidth: true,
                    }, {}, {
                        hotkey: 'esc',
                        view: "icon",
                        icon: "close",
                        align: "right",
                        click: function () {
                            $$("addUserButton").enable();
                            util.dismissDialog("addUserDialog");
                        }
                    }]
                }, {
                    view: "form",
                    // rules: {},
                    id: "addUserForm",
                    elements: [{
                        view: "text",
                        id: "email",
                        name: "email", //bez ovog name, nece da izbaci gresku ako nedostaje prlikom odavanja!!!!
                        label: "E-mail:",
                        invalidMessage: "Obavezan je unos e-mail adrese zaposlenog.",
                        required: true
                    }, {
                        cols: [{
                            view: "label",
                            id: "choseUserGroupComboLabel",
                            name: "choseUserGroupComboLabel",
                            label: "Izaberi poziciju:",   //č
                            align: "left",
                        }, {
                            view: "combo",
                            id: "choseUserGroupCombo",
                            name: "choseUserGroupCombo",
                            invalidMessage: "Obavezan je izbor radne pozicije.",
                            required: true,
                            on: {
                                onChange: function (newId, oldId) {

                                    if (this.getList().getItem(newId).disabled) {

                                        util.messages.showErrorMessage("Nije moguće izabrati menadžera.");
                                        this.blockEvent();
                                        oldId ? this.setValue("") : this.setValue(oldId);
                                        this.unblockEvent();
                                    }
                                }
                            },
                            //options:usergroupView.userGroups
                        }]
                    }, {
                        cols: [{
                            view: "label",
                            id: "labelStartDate",
                            label: "Unesite po&#x010D;etni datum:"  //Č
                        }, {
                            view: "datepicker",
                            id: "startDate",
                            name: "startDate",
                            invalidMessage: "Obavezan je unos datuma po&#x010D;etka rada.",
                            required: true,
                            multiselect: false,
                            timepicker: false
                        }]
                    }, {
                        cols: [{
                            view: "label",
                            id: "labelPauseFlag",
                            name: "labelPauseFlag",
                            label: "Korisnik je bio na dužoj pauzi od 30 dana",  // Ž !!!
                            align: "left"

                        }, {
                            view: "checkbox",
                            id: "checkPauseFlag",
                            name: "checkPauseFlag",
                            align: "left",
                            required: true
                        }]
                    }, {
                        cols: [{},
                            {
                                id: "save",
                                view: "button",
                                value: "Dodaj",
                                width: 150,
                                icon: "plus-circle",
                                hotkey: "enter",
                                click: 'usergroupView.addNewUser'
                            }]
                    }],
                    width: 600,
                    rules: {
                        "email": function (value) {
                            if (!value) {
                                $$('addUserForm').elements.email.config.invalidMessage = 'Obavezan je unos e-mail adrese zaposlenog.';
                                return false;
                            }
                            if (value.length > 100) {
                                $$('addUserForm').elements.email.config.invalidMessage = 'Maksimalan broj karaktera je 100';
                                return false;
                            }
                            if (!webix.rules.isEmail(value)) {
                                $$('addUserForm').elements.email.config.invalidMessage = 'E-mail nije u validnom formatu.';
                                return false;
                            }

                            return true;
                        },
                        "startDate": function (value) {
                            if (!value) {
                                $$('addUserForm').elements.startDate.config.invalidMessage = 'Obavezan je unos datuma početka.';
                                return false;
                            }
                            return true;
                        },  //
                        "choseUserGroupCombo": function (value) {
                            if (!value) {
                                $$('addUserForm').elements.choseUserGroupCombo.config.invalidMessage = 'Obavezno je izabrati poziciju.';
                                return false;
                            }
                            return true;
                        }
                    }
                }]
        }
    },

    changeManagerDialog: {
        view: "popup",
        width: 600,
        id: "changeManagerDialog",
        position: "center",
        modal: "true",
        move: "true",
        select: "row",
        multiselect: false,
        checkboxRefresh: true,
        onContext: {},
        navigation: true,
        body: {
            rows: [
                {
                    view: "toolbar",
                    cols: [{
                        view: "label",
                        label: "<span class='webix_icon fa-user'></span> Promjena menadzera u sektoru",
                        autoWidth: true,
                    }, {}, {
                        hotkey: 'esc',
                        view: "icon",
                        icon: "close",
                        align: "right",
                        click: function () {
                            $$("changeManagerBtn").enable();
                            util.dismissDialog("changeManagerDialog");
                        }
                    }]
                },
                {
                    view: "datatable",
                    id: "changeManagerTable",
                    margin: 10,
                    height: 250,
                    width: 600,
                    tooltip: true,
                    select: "row",
                    multiselect: false,
                    checkboxRefresh: true,
                    onContext: {},
                    navigation: true,
                    //url:"hub/user/custom/bySector/-1",
                    on: {
                        onAfterContextMenu: function (item) {
                            this.select(item.row);
                        }
                    },
                    columns: [
                        {
                            id: "id",
                            hidden: true
                        },
                        {
                            id: "firstName",
                            fillspace: true,
                            editable: false,
                            sort: "string",
                            header: ["<span class='webix_icon fa fa-user'/>Ime",
                                {
                                    content: "textFilter", value: "", icon: "wxi-search"
                                }]
                        }, {
                            id: "lastName",
                            fillspace: true,
                            editable: false,
                            sort: "string",
                            header: ["<span class='webix_icon fa fa-user'/>Prezime",
                                {
                                    content: "textFilter", value: "", icon: "wxi-search"
                                }]
                        }, {
                            id: "position",
                            fillspace: true,
                            editable: false,
                            sort: "string",
                            header: ["<span class='webix_icon fa fa-briefcase'/>Pozicija",
                                {
                                    content: "textFilter", value: "", icon: "wxi-search"
                                }]
                        }

                    ]

                }, {
                    height: 15
                },
                {
                    view: "button",
                    label: "Promijeni",
                    id: "changeManagerButton",
                    align: "right",
                    click: "usergroupView.changeManager",
                    width: 200
                }
            ]
        }

    },

    changeSectorDialog: {
        view: "window",
        id: "changeSectorDialog",
        position: "center",
        modal: true,
        move: true,
        body: {
            id: "addUserInside",
            rows: [
                {
                    view: "toolbar",
                    cols: [{
                        view: "label",
                        label: "<span class='webix_icon fa-users'></span> Promjena sektora",
                        autoWidth: true,
                    }, {}, {
                        view: "icon",
                        icon: "close",
                        hotkey: "esc",
                        align: "right",
                        click: "util.dismissDialog('changeSectorDialog');"
                    }]
                }, {
                    view: "form",
                    // rules: {},
                    id: "changeSectorForm",
                    elements: [{
                        height: 15
                    }, {
                        cols: [{
                            view: "combo",
                            id: "cuCombo",
                            placeholder: "Sektor",
                            name: "cuCombo",
                            invalidMessage: "Obavezan je izbor sektora.",
                            width: 250,
                            align: "center",
                            required: true
                        },
                            {

                                id: "save",
                                view: "button",
                                value: "Promijeni",
                                width: 125,
                                icon: "plus-circle",
                                hotkey: "enter",
                                align: "center",
                                click: 'usergroupView.changeSector'
                            }]
                    }],
                    width: 400,
                }]
        }
    },

    changeMultipleUsersSectorDialog: {
        view: "window",
        id: "changeMultipleUsersSectorDialog",
        position: "center",
        modal: true,
        move: true,
        body: {
            id: "addUserInside",
            rows: [
                {
                    view: "toolbar",
                    cols: [{
                        view: "label",
                        label: "<span class='webix_icon fa-users'></span> Promjena sektora",
                        autoWidth: true,
                    }, {}, {
                        view: "icon",
                        icon: "close",
                        hotkey: "esc",
                        align: "right",
                        click: "util.dismissDialog('changeMultipleUsersSectorDialog');"
                    }]
                }, {
                    view: "form",
                    // rules: {},
                    id: "changeSectorForm",
                    elements: [{
                        height: 15
                    }, {
                        cols: [{
                            view: "combo",
                            id: "cmuCombo",
                            placeholder: "Sektor",
                            name: "cmuCombo",
                            invalidMessage: "Obavezan je izbor sektora.",
                            width: 250,
                            align: "center",
                            required: true
                        }, {
                            id: "save",
                            view: "button",
                            value: "Promijeni",
                            width: 125,
                            icon: "plus-circle",
                            hotkey: "enter",
                            align: "center",
                            click: 'usergroupView.changeMultipleUsersSector'
                        }]
                    }],
                    width: 400,
                }]
        }
    },


    changeUserGroupDialog: {
        view: "window",
        id: "changeUserGroupDialog",
        position: "center",
        modal: true,
        body: {
            id: "changeUserGroupInside",
            rows: [
                {
                    view: "toolbar",
                    cols: [{
                        view: "label",
                        label: "Promjena korisničke grupe",
                        width: 400
                    }, {}, {
                        hotkey: 'esc',
                        view: "icon",
                        icon: "close",
                        align: "right",
                        click: 'util.dismissDialog(\'changeUserGroupDialog\');'
                    }]
                }, {
                    cols: [{
                        view: "label",
                        label: "Izaberi novu grupu:",
                        align: "left"
                    }, {
                        view: "combo",
                        width: 200,
                        align: "right",
                        id: "choseUserGroupCombo1"//,
                        //options: usergroupView.userGroups
                    }]

                }, {
                    id: "saveUserGroup",
                    align: "right",
                    view: "button",
                    value: "Sačuvaj",
                    width: 150,
                    hotkey: "enter",
                    click: 'usergroupView.saveChanges'
                }]
        }
    },
    employeeVacationInfoDialog: {
        view: "window",
        id: "employeeVacationInfoDialog",
        name: "employeeVacationInfoDialog",
        position: "center",
        modal: true,
        body: {
            padding: 15,
            rows: [
                {
                    view: "toolbar",
                    cols: [{
                        view: "label",
                        label: "<span class='webix_icon fa-user'></span> Informacije o zahtjevu:",
                        width: 400,
                    }, {}, {
                        hotkey: 'esc',
                        view: "icon",
                        icon: "close",
                        align: "right",
                        click: 'util.dismissDialog(\'employeeVacationInfoDialog\');'
                    }]
                }, {
                    cols: [{
                        view: "label",
                        id: "vacation_days",
                        name: "vacation_days",
                        label: "Broj preostalih dana godišnjeg:",
                        width: 300
                    }, {}]
                }, {
                    cols: [{
                        view: "label",
                        id: "current_status",
                        name: "current_status",
                        label: "Trenutni status:"
                    }]
                },
                {
                    view: "template",
                    gravity: 2.5,
                    template: "<div id=\"employeeCalendar\" class=\"dhx_cal_container\" style='width:100%; height:100%;'>\n" +
                        "\t<div class=\"dhx_cal_navline\">\n" +
                        "\t\t<div class=\"dhx_cal_prev_button\">&nbsp;</div>\n" +
                        "\t\t<div class=\"dhx_cal_next_button\">&nbsp;</div>\n" +
                        "\t\t<div class=\"dhx_cal_today_button\"></div>\n" +
                        "\t\t<div class=\"dhx_cal_date\"></div>\n" +
                        "\t</div>\n" +
                        "\t<div class=\"dhx_cal_header\">\n" +
                        "\t</div>\n" +
                        "\t<div class=\"dhx_cal_data\">\n" +
                        "\t</div>\n" +
                        "</div>"
                }
            ]
        }

    }
    ,

    showChangeManagerDialog: function () {
        webix.ui(webix.copy(usergroupView.changeManagerDialog));
        var sector = $$("choseSectorCombo").getValue();
        if (sector === -1 || sector === -2 || sector === "Svi sektori") {
            util.messages.showErrorMessage("Odabir sektora nije validan.")

        } else {
            $$("changeManagerTable").define("url", "hub/user/custom/bySector/" + sector);
            $$("changeManagerDialog").show();
        }
    },

    changeManager: function () {
        if ($$("changeManagerTable").getSelectedItem().id === "undefined") {
            util.messages.showErrorMessage("Moguce je odabrati samo jednog menadzeraaa.");
        } else {
            var employe;
            $$("changeManagerTable").eachRow(
                function (row) {
                    if ($$("changeManagerTable").getItem(row).position === "menadzer") {
                        employe = row;
                    }
                }
            );
            var changeManagerInformation = {
                newManager: $$("changeManagerTable").getSelectedItem().id,
                newEmployee: employe
            };
            connection.sendAjax("POST", "hub/user/changeManager",
                function (text, data, xhr) {
                    if (text) {
                        util.messages.showMessage("Uspješna promjena pozicije zaposlenom.");
                        $$("changeManagerTable").eachRow(
                            function (row) {
                                if ($$("changeManagerTable").getItem(row).position === "menadzer") {
                                    var user1 = $$("changeManagerTable").getItem(row);
                                    user1.position = "zaposleni";
                                    $$("changeManagerTable").updateItem(row, user1);
                                }
                            }
                        );
                        $$("usergroupDT").eachRow(
                            function (row) {
                                if ($$("usergroupDT").getItem(row).position === "menadzer") {
                                    var user1 = $$("usergroupDT").getItem(row);
                                    user1.position = "zaposleni";
                                    $$("usergroupDT").updateItem(row, user1);
                                }
                            }
                        );
                        var user = $$("changeManagerTable").getItem(changeManagerInformation.newManager);
                        user.position = "menadzer";
                        $$("changeManagerTable").updateItem(changeManagerInformation.newManager, user);
                        $$("usergroupDT").updateItem(changeManagerInformation.newManager, user);

                    } else
                        util.messages.showErrorMessage("Neuspješna promjena pozicije zaposlenom.");
                }, function (text, data, xhr) {
                    util.messages.showErrorMessage(text);
                }, changeManagerInformation);
        }
    },


    selectPanel: function () {
        util.selectPanel(this.getPanel());
        usergroupView.createDatatableContextMenu();
        if (user === "secretary" || user === "manager") {//sekretarica i rukovodioc ne mozgu dodavati novog zaposlenog, niti brisati nekoga
            $$("addUserButton").hide();
            // $$("delete").hide(); //OVO SKONTATI KAKO SAKRITI !!!
            $$("usergroupDT").hideColumn("delete");
            $$("usergroupDT").hideColumn("sector");
            // var columns = webix.toArray($$("companyDT").config.columns);  just adjust to your needs, for super admin in company section this is solution
            // columns.removeAt(4);
            // $$("companyDT").refreshColumns();
        }
        if (user === "manager") {// rukovodioc ne moze gledati ostale sektore
            $$("choseSectorCombo").hide();
            $$("izaberiLabel").hide();
        }
        //animateValue($$("t3"), 0, 25 * 150, 100);
        console.log("u selectPanel");


        usergroupView.sectors = [];

        webix.ajax().get("hub/sector").then(function (data) {
            //response text
            console.log(data.text());
            if (data.json() != null) {
                console.log("loaded data with success");
                var sectors = data.json();
                usergroupView.sectors.push({
                    id: -2,
                    value: "Bez sektora"
                });
                usergroupView.sectors.push({
                    id: -1,
                    value: "Svi sektori"
                });
                sectors.forEach(function (sector) {
                    usergroupView.sectors.push({
                        id: sector.id,
                        value: sector.name,

                    });
                });
                console.log(data.text());
                $$("choseSectorCombo").define("options", usergroupView.sectors);
                $$("choseSectorCombo").refresh();

            } else {
                util.messages.showErrorMessage("Neuspješno učitavanje sektora.");
            }

        });
        //  $$("choseSectorCombo").attachEvent("onAfterRender", webix.once(function(){
        //                         console.log('called once after first rendering:');
        //                   });
        $$("choseSectorCombo").setValue("Svi sektori");
        $$("usergroupDT").define("url", "hub/user/custom/bySector/" + -1);

    }
    ,

    showAddDialog: function () {
        var options = [];
        $$("addUserButton").disable();
        webix.ui(webix.copy(usergroupView.addDialog)).show();
        webix.UIManager.setFocus("email");
        if (sectorID !== -2) {
            $$("choseUserGroupCombo").hide();
            $$("choseUserGroupComboLabel").hide();
        }
        if (sectorID == null) {
            $$("choseUserGroupCombo").show();
            $$("choseUserGroupComboLabel").show();
        }

        if (sectorID === -1) {
            $$("choseUserGroupCombo").show();
            $$("choseUserGroupComboLabel").show();




        }
        /*
        if (user !== "superadmin") { //ako nije upitanju superadmin
            $$("check").hide();
            $$("startdate").hide();
            $$("labelStartDate").hide();
            $$("labelPauseFlag").hide();
        }*/


        usergroupView.userGroups = [];

        webix.ajax().get("hub/user_group").then(function (data) {
            //response text
            console.log(data.text());
            if (data.json() != null) {
                console.log("loaded data with success");
                var userGroups = data.json();

                userGroups.forEach(function (userGroup) {
                    usergroupView.userGroups.push({
                        id: userGroup.id,
                        value: userGroup.keyUserGroup
                    });
                });
                $$("choseUserGroupCombo").define("options", usergroupView.userGroups);

                if (sectorID === -1) {
                    $$("choseUserGroupCombo").getList().getItem(5).disabled = true;
                    $$("choseUserGroupCombo").getList().addCss(5, "disabled");
                }

                $$("choseUserGroupCombo").refresh();
                $$("choseUserGroupCombo1").define("options", usergroupView.userGroups);
                $$("choseUserGroupCombo1").refresh();
            } else {
                util.messages.showErrorMessage("Neuspješno učitavanje korisničkih grupa.");
            }

        });


    }
    ,

//! ovo se poziva kad se klikne na dugme
    addNewUser: function () { //dodavanje novog zaposlenog
        var form = $$("addUserForm");
        if (form.validate()) {
            $$("save").disable();
            var newUser = {
                email: form.getValues().email,
                sectorId: sectorID,
                userGroupId: 6,   //OCITATI KOJA JE USER GRUPA!!
                companyId: userData.companyId,
                pauseFlag: form.getValues().checkPauseFlag,
                startDate: form.getValues().startDate
            };
            if (sectorID === -2) {
                newUser.userGroupId = $$("choseUserGroupCombo").getValue();
                newUser.sectorId = null;
            }

            if (sectorID === -1) {
                newUser.userGroupId = $$("choseUserGroupCombo").getValue();
                newUser.sectorId = null;
            }
            console.log(newUser);

            connection.sendAjax("POST", "/hub/user",
                function (text, data, xhr) {
                    console.log(text);
                    if (text) {
                        util.messages.showMessage("Zaposleni uspješno dodan.");
                        $$("addUserButton").enable();
                        util.dismissDialog('addUserDialog');
                        $$("usergroupDT").add(newUser);
                        $$("usergroupDT").refresh();
                        usergroupView.refreshDatatable();
                    } else
                        alert("Greška u dodavanju zaposlenog.");
                }, function (text, data, xhr) {
                    $$("save").enable();
                    util.messages.showErrorMessage(text);
                }, newUser);

            /*
                    var emailText = $$("email");
                    var comboSelect=$$("choseUserGroupCombo");
                    var startDateText=$$("startDate");
                    var pauseFlagSelect=$$("checkPauseFlag");

                    if (emailText.validate() && comboSelect.validate()) {
                        util.messages.showMessage("Podaci o novom zaposlenom u sektoru uspješno sačuvani.");
                    }  /*else {
                        webix.alert({
                            title:"Neuspješno dodavanje zaposlenog! ",
                            text:"Podaci nisu korektno uneseni!",
                            type:"alert-error"}).then(function () {
                            alert(2);
                        });
                    }*/

            //util.dismissDialog('addUserDialog');
        }
    }
    ,

    changeSector: function () {

        var user = $$("usergroupDT").getSelectedItem();
        var sectorId = $$("cuCombo").getValue();
        if (sectorId === -1 || sectorId === -2) {
            util.messages.showErrorMessage("Odabrani sektor ne postoji!");
        } else {
            var changeSectorInformation = {
                id: user.id,
                sectorId: sectorId
            };
            if ($$("cuCombo").validate()) {
                connection.sendAjax("POST", "hub/user/changeSector",
                    function (text, data, xhr) {
                        if (text) {
                            util.messages.showMessage("Uspješna promjena sektora.");
                            //usergroupView.refreshDatatable();
                            if ($$("choseSectorCombo").getValue() === "Svi sektori") {
                                var user = $$("usergroupDT").getSelectedItem();
                                var sectorName;
                                usergroupView.sectors.forEach(function (value) {
                                    if (value.id === sectorId) {
                                        sectorName = value.value;
                                    }
                                });
                                user.sector_name = sectorName;
                                $$("usergroupDT").updateItem($$("usergroupDT").getSelectedItem().id, user);
                            } else {
                                $$("usergroupDT").remove($$("usergroupDT").getSelectedId());
                            }
                        } else
                            util.messages.showErrorMessage("Neuspješna izmjena lozinke.");
                    }, function (text, data, xhr) {
                        util.messages.showErrorMessage(text);
                    }, changeSectorInformation);
                util.dismissDialog('changeSectorDialog');
            }
        }

    }
    ,

    changeMultipleUsersSector: function () {
        var sectorId = $$("cmuCombo").getValue();

        if (sectorId === -1 || sectorId === -2) {
            util.messages.showErrorMessage("Odabrani sektor ne postoji!");
        } else {
            if ($$("cmuCombo").validate()) {
                selectedItems.forEach(function (element) {
                    var changeSectorInformation = {
                        id: element,
                        sectorId: sectorId
                    };
                    connection.sendAjax("POST", "hub/user/changeSector",
                        function (text, data, xhr) {
                            if (text) {
                                util.messages.showMessage("Uspješna promjena sektora.");
                                if ($$("choseSectorCombo").getValue() === "Svi sektori") {
                                    var user = $$("usergroupDT").getItem(element);
                                    var sectorName;
                                    usergroupView.sectors.forEach(function (value) {
                                        if (value.id === sectorId) {
                                            sectorName = value.value;
                                        }
                                    });
                                    user.sector_name = sectorName;
                                    $$("usergroupDT").updateItem(element, user);
                                } else {
                                    $$("usergroupDT").remove(element);
                                }
                            } else
                                util.messages.showErrorMessage("Neuspješna promjena sektora.");
                        }, function (text, data, xhr) {
                            util.messages.showErrorMessage(text);
                            alert(text);
                        }, changeSectorInformation);
                });
                util.dismissDialog('changeMultipleUsersSectorDialog');
            }
        }
    }
    ,

    createDatatableContextMenu: function () {
        webix.ui({
            view: "contextmenu",  //na desni klik opcije
            id: "usergroupCntMenu",
            width: 205,
            data: [
                {
                    id: "1",
                    value: "Izbriši zaposlenog",
                    icon: "trash"
                },
                {
                    id: "2",
                    value: "Informacije o zaposlenom",
                    icon: "eye"
                },
                /*{
                    id: "3",
                    value: "Promijeni grupu",
                    icon: "pencil"
                },*/
                {
                    id: "4",
                    value: "Promijeni sektor",
                    icon: "users"
                },
                {
                    id: "5",
                    value: "Prikaži kalendar",
                    icon: "calendar"
                }
            ],
            master: $$("usergroupDT"),
            on: {
                onItemClick: function (id) {
                    var context = this.getContext();
                    switch (id) {
                        case "1": {
                            if ($$("usergroupDT").getSelectedItem().position != "menadzer")
                                usergroupView.deleteEmployee();
                            else
                                util.messages.showErrorMessage("Nije moguće izbrisati menadžera");
                            break;
                        }
                        case "2": {
                            usergroupView.employeeInfo($$("usergroupDT").getSelectedId());
                            break;
                        }
                        case "3": {
                            usergroupView.showChangeUserGroupDialog();
                            break;
                        }
                        case "4": {
                            if ($$("usergroupDT").getSelectedItem().position == "zaposleni")
                                usergroupView.showChangeSectorOfSelectedDialog();
                            else
                                util.messages.showErrorMessage("Sektor je moguće promijeniti samo zaposlenom.");
                            break;
                        }
                        case "5": {
                            usergroupView.showEmployeeVacationInfoDialog(id);
                            break;
                        }
                    }
                }
            }
        });
    }
    ,
    /*
        filter:function(){
        //funkcija koja ce na osnovu selektovanog sektora izlistati zaposlene iz liste
        /*on:function(id){
                    webix.message("Prikazaće Vam se zaposleni u sektoru: "+this.getItem(id).value);
        //numberOfSectors=
        }*/
//function select_first(){
//    $$("list").select($$("list").getFirstId();)
//};

//   },*/

//nakon klika na desni dio misa, pa kad se iyabere "Promijeni grupu"
    showChangeUserGroupDialog: function () {
        webix.ui(webix.copy(usergroupView.changeUserGroupDialog)).show();
    }
    ,

    saveChanges: function () {
        util.messages.showMessage("Podaci o novom zaposlenom u sektoru uspješno sačuvani.");
        util.dismissDialog('changeUserGroupDialog');
    }
    ,

    employeeInfo: function (id) {
        webix.ui(webix.copy(usergroupView.employeeInfoDialog));
        var position = $$("usergroupDT").getItem(id.row).position;
        connection.sendAjax("GET", "hub/user/" + id,
            function (text, data, xhr) {
                user = data.json();
                $$("firstName").setValue(user.firstName);
                $$("lastName").setValue(user.lastName);
                $$("preview").setValues({src: "data:image/png;base64," + user.photo});
                $$("email").setValue(user.email);
                if (position === "direktor") {
                    $$("startDate").hide();
                } else {
                    $$("startDate").setValue(user.startDate === null ? "" : webix.i18n.dateFormatStr(user.startDate.split("T")[0]));
                }
                $$("userGroup").setValue(position);
                setTimeout(function () {
                    $$("employeeInfoDialog").show();
                }, 0);
            }, function (text, data, xhr) {
                util.messages.showErrorMessage(text);
            });
    }
    ,

    employeeInfoDialog: {
        view: "popup",
        id:
            "employeeInfoDialog",
        name:
            "employeeInfoDialog",
        position:
            "center",
        modal:
            true,
        body:
            {
                rows: [
                    {
                        view: "toolbar",
                        cols: [
                            {
                                view: "label",
                                width: 400,
                                label: "<span class='webix_icon fas fa-user'></span> Podaci o zaposlenom"
                            },
                            {},
                            {
                                view: "icon",
                                icon: "close",
                                align: "right",
                                hotkey: "esc",
                                click: "util.dismissDialog('employeeInfoDialog')"
                            }
                        ]
                    },
                    {
                        view: "form",
                        id: "employeeInfoForm",
                        width: 500,
                        elementsConfig: {
                            labelWidth: 140,
                            bottomPadding: 18
                        },
                        elements: [
                            {
                                cols: [
                                    {},
                                    {
                                        view: "template",
                                        id: "preview",
                                        name: "preview",
                                        template: "<img style='height: 100%; width: 100%;' src='#src#'>",
                                        height: 200,
                                        width: 200,
                                    },
                                    {}
                                ]
                            },
                            {
                                view: "text",
                                id: "firstName",
                                name: "firstName",
                                label: "Ime",
                                disabled: true,
                                labelWidth: 150,
                                height: 35
                            },
                            {
                                view: "text",
                                id: "lastName",
                                name: "lastName",
                                label: "Prezime",
                                disabled: true,
                                labelWidth: 150,
                                height: 35
                            },
                            {
                                view: "text",
                                id: "email",
                                name: "email",
                                label: "E-mail",
                                disabled: true,
                                labelWidth: 150,
                                height: 35
                            },
                            {
                                view: "text",
                                id: "userGroup",
                                name: "userGroup",
                                label: "Korisnička grupa",
                                disabled: true,
                                labelWidth: 150,
                                height: 35
                            },
                            {
                                view: "text",
                                id: "startDate",
                                name: "startDate",
                                label: "Početak rada",
                                disabled: true,
                                labelWidth: 150,
                                height: 35
                            },
                            {
                                cols: [
                                    {},
                                    {
                                        view: "button",
                                        id: "closeEmployeeInfoButton",
                                        name: "closeEmployeeInfoButton",
                                        hotkey: "enter",
                                        label: "Zatvori",
                                        type: "iconButton",
                                        icon: "close",
                                        click: "util.dismissDialog('employeeInfoDialog')"
                                    },
                                    {}
                                ]
                            }
                        ]
                    }
                ]
            }
    }
    ,


    deleteEmployee: function () {
        var delBox = (webix.copy(commonViews.deleteConfirm("zaposlenog")));
        delBox.callback = function (result) {
            if (result == 1) {

                var id = $$("usergroupDT").getSelectedId();
                var user = $$("usergroupDT").getItem(id);
                console.log("USR ID: " + id + "USER " + user.email);
                connection.sendAjax("PUT", "hub/user/deleteUser/" + id,
                    function (text, data, xhr) {
                        util.messages.showMessage("Zaposleni uspješno izbrisan iz sektora.");
                        $$("usergroupDT").remove(id);
                    }, function (text, data, xhr) {
                        util.messages.showErrorMessage(text);
                        alert(text);
                    }, id);
                var numberOfEmployees = $$("usergroupDT").count();
                animateValue($$("t3"), 0, numberOfEmployees, 1000);
            }
        };
        webix.confirm(delBox);

    }
    ,

//brise oznacene korisnike iz tabele
    deleteSelected: function () {
        var validate = true;
        selectedItems.forEach(function (value) {
            if ($$("usergroupDT").getItem(value).position == "menadzer") {
                validate = false;
            }
        })
        if (validate == false)
            util.messages.showErrorMessage("Nije moguće izbrisati menadžera");
        else if (selectedItems.length > 0) {
            var delBox = (webix.copy(commonViews.deleteConfirm(selectedItems.length + " zaposlenih")));
            delBox.callback = function (result) {
                if (result == 1) {

                    selectedItems.forEach(function (element) {
                        connection.sendAjax("PUT", "hub/user/deleteUser/" + element,
                            function (text, data, xhr) {
                                $$("usergroupDT").remove(element);
                            }, function (text, data, xhr) {
                                util.messages.showErrorMessage(text);
                                alert(text);
                            }, element);
                    });
                    util.messages.showMessage("Zaposleni uspješno izbrisani iz sektora.");
                    var numberOfEmployees = $$("usergroupDT").count();
                    animateValue($$("t3"), 0, numberOfEmployees, 1000);
                }
                var numberOfEmployees = $$("usergroupDT").count();
                animateValue($$("t3"), 0, numberOfEmployees, 1000);
            };
            webix.confirm(delBox);

        }
    }
    ,

////mijenja sektor oznacenim korisnicima iz tabele
    showChangeSectorOfSelectedDialog: function () {
        webix.ui(webix.copy(usergroupView.changeSectorDialog)).show();
        $$("cuCombo").define("options", usergroupView.sectors);
        $$("cuCombo").refresh();
    }
    ,

    showChangeMultipleUsersSector: function () {
        var validate = true;
        selectedItems.forEach(function (value) {
            if ($$("usergroupDT").getItem(value).position != "zaposleni")
                validate = false;
        })
        if (validate) {
            webix.ui(webix.copy(usergroupView.changeMultipleUsersSectorDialog)).show();
            $$("cmuCombo").define("options", usergroupView.sectors);
            $$("cmuCombo").refresh();
        } else
            util.messages.showErrorMessage("Sektor je moguće promijeniti samo zaposlenom");
    }
    ,

    sectors: [],
    userGroups:
        [],

    refreshDatatable:

        function () {
            var table1 = $$("usergroupDT");
            console.log("usao u refreshdatatable");
            webix.extend(table1, webix.ProgressBar);

            table1.showProgress();


            table1.clearAll();

            console.log(sectorID);
            table1.define("url", "url", "hub/user/custom/bySector/" + sectorID);
        }

    ,
    showEmployeeVacationInfoDialog: function (id) {
        webix.ui(webix.copy(usergroupView.employeeVacationInfoDialog));
        var employee = $$("usergroupDT").getItem(id.row);
        connection.sendAjax("GET", "hub/vacation_days/byUserId/" + employee.id,
            function (text, data, xhr) {
                var days = data.json();
                var daysLeft = days.totalDays - days.usedDays;
                console.log(daysLeft);
                if (!webix.rules.isNumber(daysLeft)) {
                    $$("vacation_days").setValue("Broj preostalih dana godišnjeg: ");
                } else
                    $$("vacation_days").setValue("Broj preostalih dana godišnjeg: " + daysLeft);


            }, function (text, data, xhr) {
                util.messages.showErrorMessage(text);
            });
        connection.sendAjax("GET", "hub/leave_request/leaveRequestFilteredByLeaveRequestStatus/2/" + employee.id,
            function (text, data, xhr) {

                var leaves = data.json();
                var status = "";
                if (leaves.isAbsent == true)
                    status = "Odsutan";
                else
                    status = "Prisutan";
                $$("current_status").setValue("Trenutni status: " + status);
                var reqs = webix.toArray(leaves.leaves);
                reqs.forEach(function (element) {
                    util.messages.showErrorMessage("From " + element.dateFrom + " to " + element.dateTo);
                })

            }, function (text, data, xhr) {
            },
            setTimeout(function () {
                $$("employeeVacationInfoDialog").show();
            }, 0));
        var date = new Date();
        scheduler.setCurrentView();
        scheduler.config.multi_day = true;
        scheduler.config.full_day = true;
        scheduler.config.xml_date = "%Y-%m-%d %H:%i";
        scheduler.locale = locale_sr_latin;
        scheduler.init('employeeCalendar', new Date(date.getFullYear(), date.getMonth(), date.getDate()), "month");

    }
};

function getUserGroups() {
    usergroupView.userGroups = [];
    //pokupim sve moguce user grupe:

    webix.ajax("hub/user_group", {

        error: function (text, data, xhr) {

            if (xhr.status != 200) {
                alert("No data to load! Check your internet connection and try again.");
                // table.hideProgress();
            }

        },

        success: function (text, data, xhr) {

            if (xhr.status === 200) {
                if (data.json() != null) {
                    console.log("loaded data with success");
                    var companies = data.json();
                    // numberOfCompanies = companies.length;
                    $$("choseUserGroupCombo").define("options", /*usergroupView.userGroups*/ companies);
                    $$("choseUserGroupCombo").refresh();
                } else {
                    util.messages.showErrorMessage("Prijavljivanje nije uspjelo!");
                }
            }
        }
    });
}

function animateValue(id, start, end, duration) {
    console.log("counter start");
    var range = end - start;
    var current = start;
    var increment = end > start ? 1 : -1;
    var stepTime = Math.abs(Math.floor(duration / range));
    var timer = setInterval(function () {
        current += increment;
        id.setHTML(`<p>${current}</p>`);
        if (current === end) {
            clearInterval(timer);
        }
    }, stepTime);
}


