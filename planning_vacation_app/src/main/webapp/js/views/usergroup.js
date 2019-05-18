var usergroupView;
var user="superadmin";
//var user =null;
/*switch (userData.userGroupId) { Treba pokupiti Id korisnicke grupe trenutno prijavljenog korisnika
        case 1:
            user = "superadmin";
            break;
        case 2:
            user = "admin";
            break;
        case 3:
            user = "director";
            break;
        case 4:
            user = "secretary";
            break;
    };*/
var options = [
    { id:1, value:"Direktor"  },
    { id:2, value:"Rukovodilac"  },
    { id:3, value:"Zaposleni" },
    { id:4, value:"Sekretarica" }
];//potrebno dodati stvarne korisnicke grupe
usergroupView = {

    getPanel:function(){

        return {
            id:"userPanel",
            adjust:true,
            width:1200,
            css: "companyPanelToolbar",
            type: "space",
            rows:[{
                view: "toolbar",
                padding: 10,
                css: "companyPanelToolbarTop",

                cols: [
                    {
                        view: "label",
                        width: 200,
                        height: 70,
                        css: "companyPanelToolbar",
                        template: "<span class='fa fa-briefcase'></span> Korisničke grupe"
                    },  {},

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
                                label: "broj kompanija",
                                type: "header",
                                css: "companies-counter"
                            },

                        ]


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
                                label: "broj administratora",
                                type: "header",
                                css: "admin-counter"
                            },

                        ]


                    },
                    {
                        css: "employee-counter",
                        rows: [
                            {view: "template", id: "t3", css: "employee-counter",},
                            {view: "label", label: "broj zaposlenih", type: "header", css: "employee-counter"},

                        ]


                    },

                    {
                        id: "btn",
                        view: "button",
                        type: "iconButton",
                        label: " Analitika  ",
                        icon: "fas fa-line-chart",
                        css: "companyButton",
                        autowidth: true
                    }
                ]
            },
                {
                    cols:[{
                        id:"addUserButton",
                        view:"button",
                        type:"iconButton",
                        label:"Dodaj korisnika",
                        width: 200,
                        hight:80,
                        css: "companyButton",
                        align:"left",
                        click:'usergroupView.showAddDialog'

                    },{
                        view:"label",
                        id:"izaberiLabel",
                        label:"Izaberi korisničku grupu:",
                        align:"right"
                    },{
                        view:"combo",
                        id:"izaberiCombo",
                        align:"right",
                        width:400,
                        click:'usergroupView.filter',
                        options:options
                    }]
                },
                {

                    view:"datatable",
                    id:"usergroupDT",
                    autowidth:true,
                    navigation:true,
                    data:
                        [
                            {
                                id: 1, firstName: "Ana", lastName: "Nikolic", email: "ana96@mail.com",usergroup:"admin",sector:"a"
                            }

                        ],

                    on: {

                        onAfterContextMenu: function (item) {
                            this.select(item.row);
                        }
                    },
                    columns:[{
                        id:"id",
                        hidden:true
                    },{
                        id:"firstName",
                        editable:false,
                        sort:"string",
                        width:210,
                        header:"Ime"
                    },{
                        id:"lastName",
                        editable:false,
                        sort:"string",
                        width:210,
                        header:"Prezime"


                    },{
                        id: "usergroup",
                        editable: false,
                        sort: "string",
                        width:220,
                        header:"Korisnička grupa"
                    }, {
                        id: "email",
                        editable: false,
                        sort: "text",
                        width:220,
                        header: "E-mail"
                    },{
                        id: "sector",
                        editable: false,
                        sort: "string",
                        width:220,
                        header: "Sektor"
                    },{
                        id: "delete",
                        header: "&nbsp;",
                        width: 35,
                        template: "<span  style='color:#777777; 0; cursor:pointer;' class='webix_icon fa-trash-o'></span>",

                    },
                        {
                            id: "edit",
                            header: "&nbsp;",
                            width: 35,
                            template: "<span  style='color:#777777; cursor:pointer;' class='webix_icon fa fa-pencil'></span>"
                        },
                        {
                            id: "view",
                            header: "&nbsp;",
                            width: 35,
                            template: "<span  style='color:#777777; cursor:pointer;' class='webix_icon  fa fa-eye'></span>"
                        }],
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
                if (action=="edit"){
                    usergroupView.editEmployee();
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
                            label:"Izaberi korisničku grupu:",
                            align:"left"

                        },{
                            view:"combo",
                            id:"combo",
                            required:true,
                            options:options
                        }]



                    },{
                        cols:[{
                            view:"label",
                            id:"labelStartDate",
                            label:"Unesite početni datum:"
                        }, {
                            view: "text",
                            id: "startdate"
                        }]

                    },{
                        cols:[{
                            view:"label",
                            id:"labelPauseFlag",
                            label:"Pause flag:",
                            align:"left"

                        },{
                            view:"checkbox",
                            id:"check",
                            align:"right"
                        }]

                    },{

                        cols:[{},
                            {
                                id:"save",
                                view:"button",
                                value:"Sačuvaj",
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
                        id:"changeUserGroupCombo",
                        options:options
                    }
                    ]

                },{
                    id:"saveUserGroup",
                    align:"right",
                    view:"button",
                    value:"Sačuvaj",
                    width:150,
                    hotkey:"enter",
                    click:'usergroupView.saveChanges'
                }]
        }}
    ,
    selectPanel:function(){
        util.selectPanel(this.getPanel());
        usergroupView.createDatatableContextMenu();
        if(user==="secretary"){//sekretarica ne moze dodavati novog zaposlenog
            $$("addUserButton").disable();
        }
        if(user==="superadmin"){
            $$("izaberiLabel").hide();
            $$("izaberiCombo").hide();
        }
        animateValue($$("t1"), 0, 25, 100);
        animateValue($$("t2"), 0, 25 * 2, 100);
        animateValue($$("t3"), 0, 25 * 150, 100);
    },
    showAddDialog:function(){
        webix.ui(webix.copy(usergroupView.addDialog)).show();
        if (user !== "superadmin") { //ako nije upitanju superadmin
    $$("check").hide();
    $$("startdate").hide();
    $$("labelStartDate").hide();
    $$("labelPauseFlag").hide();
}

    },
    save:function(){ //dodavanje novog zaposlenog
        var emailText = $$("email");
        var comboSelect=$$("combo");
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
//funkcija koja ce na osnovu selektovane korisnicke grupe izlistati zaposlene iz iste
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
    editEmployee:function(){
       usergroupView.showChangeUserGroupDialog();
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

    }
};




