var usergroupView;
var options = [
    { id:1, value:"Direktor"  },
    { id:2, value:"Rukovodioc"  },
    { id:3, value:"Zaposleni" },
    { id:4, value:"Sekretarica" }
];//potrebno dodati stvarne korisnicke grupe
usergroupView = {

    getPanel:function(){

        return {
            id:"userPanel",
            adjust:true,
            rows:[
                {
                    cols:[{
                        view:"label",
                        label:"Pregled korisnika po korisnickim grupama..."
                    },{
                        view:"combo",
                        width:500,
                        align:"right",
                        click:'usergroupView.filter',
                        options:options
                    }]
                },
                {

                    view:"datatable",
                    id:"usergroupDT",
                    autowidth:true,
                    navigation:true,
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
                        width:200,
                        header:"Ime"
                    },{
                        id:"lastName",
                        editable:false,
                        sort:"string",
                        width:200,
                        header:"Prezime"


                    },{
                        id: "username",
                        editable: false,
                        sort: "string",
                        width:200,
                        header: "Korisnicko ime"
                    },{
                        id: "usergroup",
                        editable: false,
                        sort: "string",
                        width:200,
                        header:"Korisnicka grupa"
                    }, {
                        id: "email",
                        editable: false,
                        sort: "text",
                        width:200,
                        header: "E-mail"
                    }],
                    select:"row"

                },{
                    cols:[{
                        view:"label",
                        template:"Korisnici u kompaniji"
                    },{
                        id:"addUserButton",
                        view:"button",
                        type:"iconButton",
                        label:"Dodaj korisnika",
                        width:200,
                        click:'usergroupView.showAddDialog'

                    }]
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
                            label:"Izaberi korisnicku grupu:",
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
                            label:"Unesite pocetni datum:"
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
                                value:"Sacuvaj",
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
                        label:"Promjena korisnicke grupe",
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
                    value:"Sacuvaj",
                    width:150,
                    hotkey:"enter",
                    click:'usergroupView.saveChanges'
                }]
        }}
    ,
    selectPanel:function(){
        util.selectPanel(this.getPanel());
        usergroupView.createDatatableContextMenu();
    },
    showAddDialog:function(){
        webix.ui(webix.copy(usergroupView.addDialog)).show();
        // if(userData.userGroup!=1) { //ako nije upitanju superadmin
        $$("check").hide();
        $$("startdate").hide();
        $$("labelStartDate").hide();
        $$("labelPauseFlag").hide();
        //  }

    },
    save:function(){ //dodavanje novog zaposlenog
        var emailText = $$("email");
        var comboSelect=$$("combo");
        if (emailText.validate()&&comboSelect.validate()) {
            util.messages.showMessage("Podaci o novom zaposlenom u sektoru uspjesno sacuvani.");
        }  else {
            webix.alert({
                title:"Neuspjesno dodavanje zaposlenog! ",
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
        util.messages.showMessage("Podaci o novom zaposlenom u sektoru uspjesno sacuvani.");
        util.dismissDialog('changeUserGroupDialog');
    }

};



