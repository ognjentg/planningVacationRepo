var usergroupView;
var user =null; //logged in user
var sectorId=null; // if there is sector manager
//int numberOfSectors; //when sector is changed

/*
var options = [  // pristupiti stvarnim korisnickim grupama, jer se moze kasnije baza pod mijenjatij!!!!!!!!
    { id:1, value:"Direktor"  },
    { id:2, value:"Rukovodilac"  },
    { id:3, value:"Zaposleni" },
    { id:4, value:"Sekretar" }
];
*/
usergroupView = {

    getPanel:function(){




    console.log("uslo u usergroupview");
        switch (userData.userGroupId) {
            case 1:
                user = "admin";
                break;
            case 2:
                user = "director";
                break;
            case 3:
                user = "secretary";
                break;
            case 4:
                user = "manager";
                sectorId=userData.sectorId;
                console.log(sectorId);
                break;
        };

        return {
                id:"userPanel",
                adjust:true,
                autowidth:true,
                css: "companyPanelToolbar",
                type: "space",
                rows:[{
                    view: "toolbar",
                    padding: 10,
                    autowidth:true,
                    css: "companyPanelToolbarTop",

                    cols: [{
                                view: "label",
                                width: 200,
                                height: 70,
                                css: "companyPanelToolbar",
                                template: "<span class='fa fa-list'></span> Zaposleni"
                            },  {},{},{},

                            {
                                css: "employee-counter",
                                rows: [
                                    {view: "template", id: "t3", css: "employee-counter",},
                                    {view: "label", label: "Broj zaposlenih u sektoru", type: "header", css: "employee-counter"},

                                ]
                            },{
                                id: "btn",
                                view: "button",
                                type: "iconButton",
                                label: " Statistika  ",
                                icon: "fas fa-line-chart",
                                css: "companyButton",
                                align:"right",
                                autowidth: true
                            }
                            ]
                    },
                    {
                        cols:[{
                            id:"addUserButton",
                            view:"button",
                             type: "iconButton",
                             hotkey: "enter",
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
                             click:'usergroupView.showDeleteSelectedDialog'
                        },{
                            id:"changeSectorOfSelectedButton",
                             view:"button",
                             type: "iconButton",
                             hotkey: "enter",
                             icon: "users",
                             label:"Promijeni sektor",
                             width: 200,
                             height:40,
                             css: "companyButton",
                             align:"left",
                             click:'usergroupView.showChangeSectorOfSelectedDialog'
                        },{
                            view:"label",
                            id:"izaberiLabel",
                            label:"Izaberi sektor:",
                            align:"right"
                        },{
                            view:"combo",
                            id:"choseSectorCombo",
                            align:"left",
                            width:400
                            //click:'usergroupView.filter',
                            //options: {
                                //filter:function(obj, filter){
                                            //obj - combo option
                                            //filter - current text in combo control
                                             //   return obj.value.toLowerCase().indexOf(filter.toLowerCase()) != -1;
                                      //  },
                                      //  body: {
                                      //  view:list,
                                      //      template: "#name#",
                                         //  yCount: "hub/sector/numberOfSectors",
                                       //     url: "hub/sector"
                                           // on:function(id){
                                            //               webix.message("Prikazaće Vam se zaposleni u sektoru: "+this.getItem(id).value);
                                             //           }
                                      //  }
                                //}
                            }

                        ]
                    },
                    {
                        //Tabela
                        view:"datatable",
                        id:"usergroupDT",
                         margin: 10,
                         //fillspace: true,
                                    //editaction: "dblclick",
                                   // multiselect: false,
                                  //  resizeColumn: true,
                                   // resizeRow: true,
                                    //checkboxRefresh: true,
                                    //onContext: {},
                                    //pager: "pagerA",  sa ovim nema tabele...
                                    //url:"hub/user",
                        data:[
                                {
                                    id: 1, firstName: "Ana", lastName: "Nikolic", email: "ana96@mail.com",usergroup:"admin",sector:"a"
                                }

                            ],
                        on: {
                            onAfterContextMenu: function (item) {
                                this.select(item.row);
                            }
                        },
                        columns:[
                                        {
                                            id: "checkboxRow",
                                            header: "",
                                            checkValue: 'on',
                                            uncheckValue: 'off',
                                            template: "{common.checkbox()}",
                                            width: 35,
                                            cssFormat: checkBoxStatus,


                                        },
                        {
                            id:"id",
                            hidden:true
                        },{
                            id:"firstName",
                            fillspace: true,
                            editable:false,
                            sort:"string",
                            //width:210,
                            header:["<span class='webix_icon fa fa-user'/>Ime",
                            {
                            content: "textFilter", value: "" , icon:"wxi-search"
                            }]
                        },{
                            id:"lastName",
                            fillspace: true, // ovo siri kolonu
                            editable:false,
                            sort:"string",
                            //width:210,
                            header: ["<span class='webix_icon fa fa-user'/>Prezime",
                            {
                                                        content: "textFilter", value: "" , icon:"wxi-search"
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
                            id: "usergroup",
                            fillspace: true,
                            editable: false,
                            sort: "string",
                            //width:220,
                            header:"<span class='webix_icon fa fa-address-card'/>Pozicija"
                        },
                        {
                            id: "sector",
                            fillspace: true,
                            editable: false,
                            sort: "string",
                            //width:220,
                            header: ["<span class='webix_icon fa fa-users'/>Sektor",
                            {
                            content: "textFilter", value: "" , icon:"wxi-search"
                            }]
                        },
                        {
                            id: "delete",
                            header: "&nbsp;",
                            width: 35,
                            template: "<span  style='color:#777777; 0; cursor:pointer;' class='webix_icon fa-trash-o'></span>",

                        },{
                                id: "view",
                                header: "&nbsp;",
                                width: 35,
                                template: "<span  style='color:#777777; cursor:pointer;' class='webix_icon fa fa-eye'></span>"
                         },{
                                 id: "calendar",
                                 header: "&nbsp;",
                                 width: 35,
                                 template: "<span  style='color:#777777; cursor:pointer;' class='webix_icon fa fa-calendar'></span>"
                         },                       ],
                        select:"row",
                        onClick: {
                            webix_icon: function (e, id) {
                                console.log(id["column"]);
                                var action = id["column"];
                                if (action === "delete" && user === "secretary") {
                                    alert("Niste autorizovani da izvršite ovu radnju!");
                                } if (action === "edit" && user === "secretary") {
                                alert("Niste autorizovani da izvršite ovu radnju!");
                                }
                                if(action==="view"){
                                    usergroupView.profileInfo();
                                }
                                if(action=="delete"){
                                    usergroupView.deleteEmployee();
                                }
                            }
                        }
                }]
        }
    },

    addDialog:{
        view:"window",
        id:"addUserDialog",
        position:"center",
        modal:true,
        body:{
            id:"addUserInside",
            rows:[
                {
                    view:"toolbar",
                    cols:[{
                        view:"label",
                        label:"Dodavanje",
                        width:400
                    },{},{
                        hotkey:'esc',
                        view:"icon",
                        icon:"close",
                        align:"right",
                        click:'util.dismissDialog(\'addUserDialog\');'
                    }]
                },{
                    view:"form",
                    rules: {},
                    id:"addUserForm",
                    elements:[{
                        view:"text",
                        id:"email",
                        label:"E-mail:",
                        required:true
                    },{
                        cols:[{
                            view:"label",
                            label:"Izaberi korisni&#x010D;ku grupu:",   //č
                            align:"left"

                        },{
                            view:"combo",
                            id:"choseUserGroupCombo",
                            required:true//,
                            //options:usergroupView.userGroups
                        }]
                    },{
                        cols:[{
                            view:"label",
                            id:"labelStartDate",
                            label:"Unesite po&#x010D;etni datum:"  //Č
                        }, {
                            view: "text",
                            id: "startDate"
                        }]
                    },{
                        cols:[{
                            view:"label",
                            id:"labelPauseFlag",
                            label:"Korisnik je bio na dužoj pauzi od 30 dana",
                            align:"left"

                        },{
                            view:"checkbox",
                            id:"checkPauseFlag",
                            align:"left"
                        }]
                    },{
                        cols:[{},
                            {
                                id:"save",
                                view:"button",
                                value:"Sa&#x010D;uvaj",
                                width:150,
                                hotkey:"enter",
                                click:'usergroupView.save'
                            }]
                    }],
                    width:600
            }]
        }
    },

    changeUserGroupDialog:{
        view:"window",
        id:"changeUserGroupDialog",
        position:"center",
        modal:true,
        body:{
            id:"changeUserGroupInside",
            rows:[
                {
                    view:"toolbar",
                    cols:[{
                        view:"label",
                        label:"Promjena korisničke grupe",
                        width:400
                    },{},{
                        hotkey:'esc',
                        view:"icon",
                        icon:"close",
                        align:"right",
                        click:'util.dismissDialog(\'changeUserGroupDialog\');'
                    }]
                },{
                    cols:[{
                            view:"label",
                            label:"Izaberi novu grupu:",
                            align:"left"
                         },{
                            view:"combo",
                            width:200,
                            align:"right",
                            id:"choseUserGroupCombo1"//,
                            //options: usergroupView.userGroups
                    }]

                },{
                    id:"saveUserGroup",
                    align:"right",
                    view:"button",
                    value:"Sačuvaj",
                    width:150,
                    hotkey:"enter",
                    click:'usergroupView.saveChanges'
                }]
     }},

    selectPanel:function(){
        util.selectPanel(this.getPanel());
        usergroupView.createDatatableContextMenu();
        if(user==="secretary" || user==="manager"){//sekretarica i rukovodioc ne mozgu dodavati novog zaposlenog, niti brisati nekoga
            $$("addUserButton").hide();
            $$("delete").hide(); //OVO SKONTATI KAKO SAKRITI !!!
        }
        if( user==="manager"){// rukovodioc ne moze gledati ostale sektore
            $$("choseSectorCombo").hide();
            $$("izaberiLabel").hide();
        }
        animateValue($$("t3"), 0, 25 * 150, 100);
        console.log("u selectPanel");
    },

    showAddDialog:function(){
    var options=[];
        webix.ui(webix.copy(usergroupView.addDialog)).show();
        webix.UIManager.setFocus("email");
        /*
        if (user !== "superadmin") { //ako nije upitanju superadmin
            $$("check").hide();
            $$("startdate").hide();
            $$("labelStartDate").hide();
            $$("labelPauseFlag").hide();
        }*/


        usergroupView.userGroups= [];
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

       webix.ajax().get("hub/user_group").then(function(data){
           //response text
           console.log(data.text());
                                   if (data.json() != null) {
                                       console.log("loaded data with success");
                                       var userGroups = data.json();

                                       userGroups.forEach(function(userGroup){
                                                          options.push({
                                                              id: userGroup.id,
                                                              value: userGroup.key
                                                           });
                                                      });
                                       $$("choseUserGroupCombo").define("options", /*userGroups */options);
                                       $$("choseUserGroupCombo").refresh();
                                     }else {
                                      util.messages.showErrorMessage("nije uspjelo!");
                                     }

       });

    },

    save:function(){ //dodavanje novog zaposlenog
        var emailText = $$("email");
        var comboSelect=$$("choseUserGroupCombo");  //pisalo je combo kod Ane
        if (emailText.validate()&&comboSelect.validate()) {
            util.messages.showMessage("Podaci o novom zaposlenom u sektoru uspješno sačuvani.");
        }  else {
            webix.alert({
                title:"Neuspješno dodavanje zaposlenog! ",
                text:"Podaci nisu korektno uneseni!",
                type:"alert-error"}).then(function () {
                alert(2);
            });
        }
        util.dismissDialog('addUserDialog');
    },

    createDatatableContextMenu: function () {
        webix.ui({
            view: "contextmenu",
            id: "usergroupCntMenu",
            width: 200,
            data: [{
                id: "1",
                value: "Promijeni grupu",
                icon: "pencil"
            }],
            master: $$("usergroupDT"),
            on: {
                onItemClick: function (id) {
                    var context = this.getContext();
                    switch (id) {
                        case "1": {
                            usergroupView.showChangeUserGroupDialog();
                            break;
                        }
                    }
                }
            }
        });
    },

    filter:function(){
    //funkcija koja ce na osnovu selektovanog sektora izlistati zaposlene iz liste
    /*on:function(id){
                webix.message("Prikazaće Vam se zaposleni u sektoru: "+this.getItem(id).value);
    //numberOfSectors=
    }*/


    },

    showChangeUserGroupDialog:function(){
        webix.ui(webix.copy(usergroupView.changeUserGroupDialog)).show();
    },

    saveChanges:function(){
        util.messages.showMessage("Podaci o novom zaposlenom u sektoru uspješno sačuvani.");
        util.dismissDialog('changeUserGroupDialog');
    },

    profilInfo:function(){
        //Funkcija za prikazivanje profila korisnika
    },

    deleteEmployee:function(){
        var delBox = (webix.copy(commonViews.deleteConfirm("zaposlenog")));
        delBox.callback = function (result) {
            if (result == 1) {

                var id = $$("usergroupDT").getSelectedId();
                $$("usergroupDT").remove(id);
                util.messages.showMessage("Zaposleni uspješno obrisan.");
            }
        };
        webix.confirm(delBox);

    },

    showDeleteSelectedDialog:function(){
//brise oznacene korisnike iz tabele
    },

    showChangeSectorOfSelectedDialog:function(){

    },

    sectors: [],
    userGroups: []
};

function getUserGroups(){
    usergroupView.userGroups=[];
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
                  }else {
                   util.messages.showErrorMessage("Prijavljivanje nije uspjelo!");
                  }
            }
        }
    });
            //return true;
}


