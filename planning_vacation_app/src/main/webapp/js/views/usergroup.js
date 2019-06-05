"use strict";

var usergroupView;
var user = null; //logged in user
var sectorID = null; // if there is sector manager
//int numberOfSectors; //when sector is changed
var selectedItems = [];

usergroupView = {
    getPanel: function () {
        console.log("uslo u usergroupview");
        switch (userData.userGroupId) {
            case 2:
                user = "admin";
                break;
            case 3:
                user = "director";
                break;
            case 4:
                user = "secretary";
                break;
            case 5:
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
                        css: "companyButton",
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
                        cols:[{
                            id:"addUserButton",
                            view:"button",
                             type: "iconButton",
                             //hotkey: "enter",
                            icon: "plus-circle",
                            label:"Dodaj korisnika",
                            width: 200,
                            height:40,
                            css: "companyButton",
                            align:"left",
                            click:'usergroupView.showAddDialog'
                        },{
                            id:"deleteSelectedButton",
                             view:"button",
                             type:"iconButton",
                             label:"Izbrisi zaposlene",
                             icon: "trash",
                             width: 200,
                             height:40,
                             css: "companyButton",
                             align:"left",
                            disabled:true,
                             click:'usergroupView.showDeleteSelectedDialog'
                        },{
                             id:"changeSectorOfSelectedButton",
                             view:"button",
                             type: "iconButton",
                            // hotkey: "enter",
                             icon: "users",
                             label:"Promijeni sektor",
                             width: 200,
                             height:40,
                             css: "companyButton",
                             align:"left",
                            disabled:true,
                             click:'usergroupView.showChangeMultipleUsersSector'
                        },{
                            view:"label",
                            id:"izaberiLabel",
                            label:"Izaberi sektor:",
                            align:"right"
                        },{
                            view:"combo",
                            id:"choseSectorCombo",
                            align:"left",
                            width:400,
                            tooltip: "Izaberite sektor u kome želite vidjeti zaposlene",
                            value: "Svi sektori",
                            placeholder:"Svi sektori",
                              on:{
                             // var input= $$("choseSectorCombo").getInputNode().value;
                                  onChange(id){
                                 //'onItemClick': function(id){
                                      sectorID = id;
                                      console.log("id sektora je"+id);
                                      webix.message("Prikazaće Vam se svi zaposleni u izabranom sektoru. "/*+ this.getValue()*/ );
                                      $$("usergroupDT").clearAll();
                                      //connection.attachAjaxEvents("usergroupDT", "hub/user/custom/bySector/"+id);
                                      $$("usergroupDT").define("url", "hub/user/custom/bySector/"+id);
                                      $$("usergroupDT").detachEvent("onBeforeDelete");
                                      if(sectorID == -1) {
                                          $$("addUserButton").hide();
                                      } else {
                                          $$("addUserButton").show();
                                      }
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
                    //pager: "pagerA",  sa ovim nema tabele...
                    //url:"hub/user",
                    on: {
                        onAfterContextMenu: function (item) {
                            this.select(item.row);
                        }
                    },
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
                            header: "<span class='webix_icon fa fa-envelope'/>Email"
                        },
                        {
                            id: "position",
                            fillspace: true,
                            editable: false,
                            sort: "string",
                            //width:220,
                            header: "<span class='webix_icon fas fa-briefcase'></span> Pozicija"
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
                        }, {
                            id: "pencil", //mijenjanje korisnicke grupe, od strane direktora i admina
                            header: "&nbsp;",
                            tooltip: "Mijenjanje radne pozicije zaposlenog",
                            width: 35,
                            template: "<span  style='color:#777777; cursor:pointer;' class='webix_icon fa fa-pencil'></span>"
                        }, {
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
                                if(selectedItems.length == 0) {
                                    $$("deleteSelectedButton").disable();
                                    $$("changeSectorOfSelectedButton").disable();
                                }
                            }
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
                                usergroupView.employeeInfo();
                            }
                            if (action == "delete") {
                                usergroupView.deleteEmployee();
                            }
                            if(action == "sector")
                                usergroupView.showChangeSectorOfSelectedDialog();

                        }
                    }
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
                        click: 'util.dismissDialog(\'addUserDialog\');'
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
                        label: "<span class='webix_icon fa-users'></span> Promjena sektora zaposlenom",
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
                    id: "addUserForm",
                    elements: [{
                        height:15
                    }, {
                        cols:[{ view: "combo",
                            id: "choseSectorCombo",
                            placeholder:"Sektor",
                            name: "choseSectorCombo",
                            invalidMessage: "Obavezan je izbor sektora.",
                            width:250,
                            align:"center",
                            required: true
                        },
                            {

                                id: "save",
                                view: "button",
                                value: "Promijeni",
                                width: 125,
                                icon: "plus-circle",
                                hotkey: "enter",
                                align:"center",
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
                        label: "<span class='webix_icon fa-users'></span> Promjena sektora zaposlenima",
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
                    id: "addUserForm",
                    elements: [{
                        height:15
                    }, {
                        cols:[{ view: "combo",
                            id: "choseSectorCombo",
                            placeholder:"Sektor",
                            name: "choseSectorCombo",
                            invalidMessage: "Obavezan je izbor sektora.",
                            width:250,
                            align:"center",
                            required: true
                        },
                            {

                                id: "save",
                                view: "button",
                                value: "Promijeni",
                                width: 125,
                                icon: "plus-circle",
                                hotkey: "enter",
                                align:"center",
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

    selectPanel: function () {
        util.selectPanel(this.getPanel());
        usergroupView.createDatatableContextMenu();
        if (user === "secretary" || user === "manager") {//sekretarica i rukovodioc ne mozgu dodavati novog zaposlenog, niti brisati nekoga
            $$("addUserButton").hide();
           // $$("delete").hide(); //OVO SKONTATI KAKO SAKRITI !!!
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


       usergroupView.sectors= [];

                     webix.ajax().get("hub/sector").then(function(data){
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
                                                     sectors.forEach(function(sector){
                                                                        usergroupView.sectors.push({
                                                                            id: sector.id,
                                                                            value: sector.name,

                                                                         });
                                                                    });
                                                          console.log(data.text());
                                                     $$("choseSectorCombo").define("options", usergroupView.sectors);
                                                     $$("choseSectorCombo").refresh();

                                                   }else {
                                                    util.messages.showErrorMessage("Neuspješno učitavanje sektora.");
                                                   }

                     });
                                                   //  $$("choseSectorCombo").attachEvent("onAfterRender", webix.once(function(){
                                                     //                         console.log('called once after first rendering:');
                                                       //                   });
                        $$("choseSectorCombo").setValue("Svi sektori");
                     $$("usergroupDT").define("url", "hub/user/custom/bySector/"+-1);
    },

    showAddDialog: function () {
        var options = [];
        webix.ui(webix.copy(usergroupView.addDialog)).show();
        webix.UIManager.setFocus("email");
        if(sectorID !== -2) {
            $$("choseUserGroupCombo").hide();
            $$("choseUserGroupComboLabel").hide();
        }
        if(sectorID == null) {
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
        /*    webix.ajax("hub/user_group", {
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
                            var userGroups = data.json();
                            //var userGroups=JSON.parse(data);
                           // numberOfCompanies = companies.length;
                            var options=[];
                           userGroups.forEach(function(userGroup)){
                                               options.push({
                                                   id: userGroup.id,
                                                   value: userGroup.key
                                                });
                                           }
                            $$("choseUserGroupCombo").define("options", options );
                            $$("choseUserGroupCombo").refresh();
                          }else {
                           util.messages.showErrorMessage("Prijavljivanje nije uspjelo!");
                          }
                    }
                }
        });*/

        webix.ajax().get("hub/user_group").then(function (data) {
            //response text
            console.log(data.text());
            if (data.json() != null) {
                console.log("loaded data with success");
                var userGroups = data.json();

                userGroups.forEach(function (userGroup) {
                    usergroupView.userGroups.push({
                        id: userGroup.id,
                        value: userGroup.key
                    });
                });
                $$("choseUserGroupCombo").define("options", usergroupView.userGroups);
                $$("choseUserGroupCombo").refresh();
                $$("choseUserGroupCombo1").define("options", usergroupView.userGroups);
                $$("choseUserGroupCombo1").refresh();
            } else {
                util.messages.showErrorMessage("Neuspješno učitavanje korisničkih grupa.");
            }

        });


    },

//! ovo se poziva kad se klikne na dugme
    addNewUser: function () { //dodavanje novog zaposlenog
        var form = $$("addUserForm");
        if (form.validate()) {
            var newUser = {
                email: form.getValues().email,
                sectorId: sectorID,
                userGroupId: 6,   //OCITATI KOJA JE USER GRUPA!!
                companyId: userData.companyId,
                pauseFlag: form.getValues().checkPauseFlag,
                startDate: form.getValues().startDate
            };
            if(sectorID === -2) {
                newUser.userGroupId = $$("choseUserGroupCombo").getValue();
                newUser.sectorId = null;
            }
            console.log(newUser);

            connection.sendAjax("POST", "/hub/user",
                function (text, data, xhr) {
                    console.log(text);
                    if (text) {
                        util.messages.showMessage("Zaposleni uspješno dodan.");
                        util.dismissDialog('addUserDialog');
                        $$("usergroupDT").add(newUser);
                        $$("usergroupDT").refresh();
                        usergroupView.refreshDatatable();
                    } else
                        alert("Greška u dodavanju zaposlenog.");
                }, function (text, data, xhr) {
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
    },

    changeSector:function(){
        var user = $$("usergroupDT").getSelectedItem();
        var sectorId = $$("choseSectorCombo").getValue();

        var changeSectorInformation = {
            id:user.id,
            sectorId:sectorId
        };
        if($$("choseSectorCombo").validate()) {
            connection.sendAjax("POST", "hub/user/changeSector",
                function (text, data, xhr) {
                    if (text) {
                        util.messages.showMessage("Uspješna promjena sektora.");
                        //usergroupView.refreshDatatable();
                        var user = $$("usergroupDT").getSelectedItem();
                        user.sectorId = sectorId;
                        $$("usergroupDT").update($$("usergroupDT").getSelectedItem().id, user);
                    } else
                        util.messages.showErrorMessage("Neuspješna izmjena lozinke.");
                }, function (text, data, xhr) {
                    util.messages.showErrorMessage(text);
                }, changeSectorInformation);
            util.dismissDialog('changeSectorDialog');
        }

    },

    changeMultipleUsersSector:function(){
        var sectorId = $$("choseSectorCombo").getValue();
        if($$("choseSectorCombo").validate()) {
            selectedItems.forEach(function (element) {
                var changeSectorInformation = {
                    id: element,
                    sectorId: sectorId
                };
                connection.sendAjax("POST", "hub/user/changeSector",
                    function (text, data, xhr) {
                        if (text) {
                            util.messages.showMessage("Uspješna promjena sektora.");
                            usergroupView.refreshDatatable();
                        } else
                            util.messages.showErrorMessage("Neuspješna promjena sektora.");
                    }, function (text, data, xhr) {
                        util.messages.showErrorMessage(text);
                        alert(text);
                    }, changeSectorInformation);
            });
            util.dismissDialog('changeMultipleUsersSectorDialog');
            usergroupView.refreshDatatable();
        }
    },

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
                {
                    id: "3",
                    value: "Promijeni grupu",
                    icon: "pencil"
                },
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
                            usergroupView.deleteEmployee();
                            break;
                        }
                        case "2": {
                            //TODO
                            break;
                        }
                        case "3": {
                            usergroupView.showChangeUserGroupDialog();
                            break;
                        }
                        case "4": {
                            usergroupView.showChangeSectorOfSelectedDialog();
                            break;
                        }
                        case "5": {
                            //TODO
                            break;
                        }
                    }
                }
            }
        });
    },
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
    },

    saveChanges: function () {
        util.messages.showMessage("Podaci o novom zaposlenom u sektoru uspješno sačuvani.");
        util.dismissDialog('changeUserGroupDialog');
    },

    employeeInfo: function () {
        //Funkcija za prikazivanje profila korisnika
    },



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

            }
        };
        webix.confirm(delBox);

    },

//brise oznacene korisnike iz tabele
    deleteSelected: function () {
        if(selectedItems.length > 0){
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
                }
            };
            webix.confirm(delBox);
        }
    },

////mijenja sektor oznacenim korisnicima iz tabele
    showChangeSectorOfSelectedDialog: function () {
        webix.ui(webix.copy(usergroupView.changeSectorDialog)).show();
        $$("choseSectorCombo").define("options", usergroupView.sectors);
        $$("choseSectorCombo").refresh();
    },

    showChangeMultipleUsersSector: function () {
        webix.ui(webix.copy(usergroupView.changeMultipleUsersSectorDialog)).show();
                $$("choseSectorCombo").define("options", usergroupView.sectors);
                $$("choseSectorCombo").refresh();
    },

    sectors: [],
    userGroups: [],

    refreshDatatable: function () {
        var table1 = $$("usergroupDT");
        console.log("usao u refreshdatatable");
        webix.extend(table1, webix.ProgressBar);

        table1.showProgress();


        table1.clearAll();

        console.log(sectorID);
        table1.define("url", "url", "hub/user/custom/bySector/" + sectorID);
    }
};

function getUserGroups() {
    usergroupView.userGroups = [];
    //pokupim sve moguce user grupe:

    /*    webix.ajax().get("hub/user_group").then(function(result) {
            if(result.text()){
            var userGroups=JSON.parse(result.text());
                userGroups.forEach(function(userGroup)){
                    usergroupView.userGroups.push({
                        id: userGroup.id,
                        value: userGroup.key
                     });
                }
                //$$("choseUserGroupCombo").define("options", usergroupView.userGroups);
                //$$("choseUserGroupCombo").refresh();
                //$$("choseUserGroupCombo1").define("options", usergroupView.userGroups);
                //$$("choseUserGroupCombo1").refresh();
            }
            //console.log("uslo u usergroupview");

        }).fail(function (err) {
            //util.messages.showErrorMessage(err.responseText);
            alert("No data to load! Check your internet connection and try again.");
            });
    */


    //var table = webix.$$("usergroupDT");
    // table.clearAll();

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
