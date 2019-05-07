var sectorName =  {};
var sectorEmployees = {};

var sectorView =  {

            panel: {
                id: "sectorPanel",
                adjust: true,
                cols: [{ width:20},{
                rows: [ {
                    view: "toolbar",
                    padding:12,
                    rows: [
                        {
                            view: "select",
                            id: "combo",
                            width:270,
                            label:"Odabir sektora",
                            labelWidth:100,
                            options:["One", "Two"]//sectorEmployees //izvrsiti ubacivanje svih sektora *opcija dozvoljena samo diretkoru
                        },
                        //iskljuciti jednu od dvije komponente u zavisnosti od tipa korisnika
                        {
                            view:"label",
                            id:"name",
                            label: "Sektor za vandredne situacije" //sectorName.name
                        },
                        //iskljuciti jednu od dvije komponente u zavisnosti od tipa korisnika  *izbaciti donju komponentu u slucaju da je ulogovan rukovodioc sektora
                        {
                            view:"label",
                            label: "Nikolina Govedarica",  //ispraviti nakon popunjavanja combo box-a, pa selektovati rukovodica sektora
                            inputWidth:300, align:"left",
                            font:"150px"
                        },
                    ],
                },
                    {
                        cols:[
                            {
                                view:"button",
                                id:"addBtn",
                                label:"Dodaj zaposlenog",
                                type: "iconButton",
                                autowidth: true,
                                width:150,
                                icon: "plus-circle",
                                click: "sectorView.showDialog"
                            },
                            {
                                view:"button",
                                id:"editBtn",
                                label:"Izmijeni zaposlenog",
                                type: "iconButton",
                                autowidth: true,
                                width:150,
                                icon: "pencil",
                                click: "sectorView.showEditDialog"
                            },
                            {
                                view:"button",
                                id:"delBtn",
                                label:"Obriši zaposlenog",
                                type: "iconButton",
                                autowidth: true,
                                width:150,
                                icon: "trash",
                                click: "sectorView.showDeleteDialog"
                             },]
                    },
                    {
                        height:20
                    },
                    {
                        view: "datatable",
                        id: "sectorDT",
                        fillspace: true,
                        editor: "text",
                        select: "row",
                        editable: false,
                        navigation: true,
                        //url: , popuniti naknadno user-ima iz odgovarajuceg sektora
                        data:
                        [
                            {
                                id:1, firstName:"Nikola", lastName:"Nikolic", eMail:"Dzoni@mail.com"
                            }
                        ],
                        width: 1400,
                        resizeColumns:true,
                        resizeRows:true,
                        onContext:{},
                        on: {

                            onAfterContextMenu: function (item) {
                                this.select(item.row);
                            }
                        },
                        onClick:{},
                        columns: [
                            {
                                id: "id",
                                hidden:true,
                                fillspace: true
                            },
                            {
                                id: "photo",
                                header: "Slika", //cisto da se zna sta se treba nalaziti u koloni *izbaciti nakon popunjavanja podacima
                                editable: false,
                                width:160,
                            },
                            {
                                id: "firstName",
                                editable: false,
                                header: [
                                    "Ime", {
                                        content: "textFilter"
                                    }
                                ],
                                fillspace: true,
                                editor: "text"
                            },
                            {
                                id: "lastName",
                                fillspace: true,
                                editable: false,
                                header: [
                                    "Prezime", {
                                    content: "textFilter"
                                }],
                            },
                            {
                                id: "eMail",
                                fillspace: true,
                                editable: false,
                                header: "E-mail"
                            },
                        ],
                    },]
        }]},
    addDialog: {
        view: "popup",
        id: "addEmployeeDialog",
        header: "Podaci o zaposlenogm",
        position: "center",
        modal: true,
        body: {
            rows: [{
                view: "toolbar",
                cols: [{
                    view: "label",
                    width: 400,
                    label: "<span class='webix_icon fas fa-user'><\/span> Dodavanje zaposlenog"
                }, {}, {
                    view: "icon",
                    icon: "close",
                    align: "right",
                    click: "util.dismissDialog('addEmployeeDialog')"
                }]
            }, {
                elementsConfig: {labelWidth: 140, bottomPadding: 18},
                view: "form",
                elements: [
                    {
                    view: 'text',
                    label: 'Ime',
                    name: "firstName",
                    id: 'firstName',
                    required:true,
                    invalidMessage: "Molimo unesite ime.",
                    },
                    {
                    view: 'text',
                    label: 'Prezime',
                    id: 'lastName',
                    name: "lastName",
                    required:true,
                    invalidMessage: "Molimo unesite prezime.",
                    },
                    {
                    view: 'text',
                    label: 'E-mail',
                    name: "eMail",
                    invalidMessage: "Molimo unesite e-mail.",
                    required:true },
                    {
                        cols:[
                            {
                                view:"uploader",
                                id: "photo",
                                value:"Odaberi sliku",
                                link:"mylist",
                                upload:"",
                                datatype:"photo",
                                width:150,
                            },
                            {
                                view:"list",
                                id:"mylist",
                                type:"uploader",
                                borderless:true
                            }
                        ]
                    },  {
                    cols: [{}, {
                        view: "button",
                        hotkey: "enter",
                        width: 250,
                        id: "saveEmployee",
                        type: "iconButton",
                        label: "Sačuvaj",
                        icon: "save",
                        click: "sectorView.save",
                    },
                        {
                            view: 'button',
                            label: 'Otkaži',
                            type: "iconButton",
                            icon: "close",
                            width: 230,

                            click: function () {
                                util.dismissDialog('addEmployeeDialog');
                            }}]
                }],
                width: 500,
                rules: {},
                id: "addEmployeeForm"
            }]
        }
    },
    save: function () {
        var createForm = $$("addEmployeeForm");
        if (createForm.validate()) {
            var newItem = createForm.getValues();
            $$("sectorDT").add(newItem);
          //  connection.sendAjax("POST", "user", function (text, data, xhr) {
            //    var record = data.json();
                util.messages.showMessage("Podaci o novom zaposlenom u sektoru uspješno sačuvani.");
              /*  $$("sectorDT").add(record);
            }, function () {
                util.messages.showErrorMessage("Došlo je do greške prilikom kreiranja zapisa o zaposlenom.");
            }, newItem);*/
            util.dismissDialog('addEmployeeDialog');
        }   else {
            webix.alert({
                title:"Neuspješno dodavanje zaposlenog! ",
                text:"Podaci nisu korektno unešeni!",
                type:"alert-error"}).then(function () {
                alert(2);
            });
        }
    },
    editDialog: {
        view: "popup",
        id: "editEmployeeDialog",
        position: "center",
        modal: true,
        body: {
            rows: [{
                view: "toolbar",
                cols: [{
                    view: "label",
                    width: 400,
                    label: "<span class='webix_icon fa-graduation-cap'><\/span> Izmjena zaposlenog"
                }, {}, {
                    view: "icon",
                    icon: "close",
                    align: "right",
                    click: "util.dismissDialog('editEmployeeDialog')"
                }]
            }, {
                elementsConfig: {labelWidth: 140, bottomPadding: 18},
                view: "form",
                elements: [
                    {
                        view: 'text',
                        label: 'Ime',
                        id: 'firstName',
                        name: "firstName",
                        required:true
                    },
                    {
                        view: 'text',
                        label: 'Prezime',
                        id: 'lastName',
                        name: "lastName",
                        required:true
                    },
                    {
                        view: 'text',
                        label: 'Email',
                        name: "eMail",
                        required:true
                    },
                    {
                        cols:[
                            {
                                view:"uploader",
                                id: "photo",
                                value:"Odaberi sliku",
                                link:"mylist",
                                upload:"",
                                datatype:"photo",
                                width:150,
                            },
                            {
                                view:"list",
                                id:"mylist",
                                type:"uploader",
                                autoheight:true,
                                borderless:true
                            }
                        ]
                    },
                    {
                        cols: [{}, {
                            view: "button",
                            hotkey: "enter",
                            width: 250,
                            id: "saveEmployee",
                            type: "iconButton",
                            label: "Sačuvaj",
                            icon: "save",
                            click: "sectorView.saveEdited",
                        },
                            {
                                view: 'button',
                                type: "iconButton",
                                label: "Otkaži",
                                icon: "close",
                                width: 230,
                                click: function () {
                                    util.dismissDialog('editEmployeeDialog');
                                }}]
                    }],
                width: 500,
                rules: {},
                id: "editEmployeeForm"
            }]
        }
    },
    showDialog: function () {
        webix.ui(webix.copy(sectorView.addDialog));
        $$("addEmployeeDialog").show();
    },

    selectPanel: function () {
        $$("main").removeView(rightPanel);
        rightPanel = "sectorPanel";

        var panelCopy = webix.copy(this.panel);

        $$("main").addView(webix.copy(panelCopy));

        this.preloadDependencies();
        sectorView.createDatatableContextMenu(); // dodavanje izmjene i brisanja na kontekstni meni
        //connection.attachAjaxEvents('sectorDT', 'KOLONA');
    },
    saveEdited: function () {
        var editForm = $$("editEmployeeForm");
        if (editForm.validate()) {
            var newItem = editForm.getValues();
           /* connection.sendAjax("PUT", "user/" + newItem.id, function (text, data, xhr) {
                if (text === "Success") {
                    util.messages.showMessage("Podaci zaposlenom u sektoru su uspješno promijenjeni.");
                    $$("sectorDT").updateItem(newItem.id, newItem); // updateItem osvjezava vrijednosti za odabrani red po id-u
                }
                else
                    util.messages.showErrorMessage("Došlo je do greške prilikom promjene podataka o zaposlenom u sektoru .");
            }, function () {
                util.messages.showErrorMessage("Došlo je do greške prilikom promjene podataka o zaposlenom u sektoru .");
            }, newItem);*/
            util.dismissDialog('editEmployeeDialog');
        }  else {
            webix.alert({
                title:"Neuspješna promjena informacija o korisniku! ",
                text:"Podaci nisu korektno unešeni!",
                type:"alert-error"}).then(function () {
            });
        }
    },
    showEditDialog: function () {
        var object = $$("sectorDT").getSelectedItem();
        webix.ui(webix.copy(sectorView.editDialog));
        $$("editEmployeeForm").setValues(object);
        setTimeout(function () {
            $$("editEmployeeDialog").show();
        }, 0);
    },
    showDeleteDialog: function(){
        var delBox = {
            title: "Brisanje zaposlenog",
            ok: "Da",
            cancel: "Ne",
            width: 500,
            text: "Da li ste sigurni da želite obrisati zaposlenog?",
            callback: function (okPressed) {
                if (okPressed) // Korisnik potvrdio brisanje
                {
                    var id = $$("sectorDT").getSelectedId();
                 //   connection.sendAjax("DELETE", "user/" + id, function () {
                        $$("sectorDT").remove(id);
                        util.messages.showMessage("Zaposleni u sektoru uspješno obrisan.");
                   /* }, function () {
                        util.messages.showErrorMessage("Došlo je do greške pri brisanju fakulteta.");
                    })*/
                }
            }
        };

        var object = $$("sectorDT").getSelectedItem();
        if(object != null)
        {
            webix.confirm(delBox);
        }
    },
    createDatatableContextMenu: function () {
        webix.ui({
            view: "contextmenu",
            id: "sectorCntMenu",
            width: 200,
            data: [{
                id: "1",
                value: "Izmijeni",
                icon: "pencil"
            },
                {
                    id: "2",
                    value: "Obriši",
                    icon: "trash"
                }],
            master: $$("sectorDT"),
            on: {
                onItemClick: function (id) {


                    var context = this.getContext();
                    switch (id) {
                        case "1": {
                           sectorView.showEditDialog($$("sectorDT").getItem(context.id));
                            break;
                        }
                        case "2": {
                            sectorView.showDeleteDialog()
                            break;
                        }
                    }
                }
            }
        });
    },
    preloadDependencies: function () {
        var name = 'name';
        sectorName[name] = 'Ime sektora';
     //   alert(sectorName.name);
        var firstName = "firstName";
        var lastName = "lastName";
        var eMail = "eMail";
        var photo = "photo";
//        sectorEmployees[firstName, lastName, eMail, photo] = '';
     //   sectorEmployees =  ["Prvi sektor", "Drugi sektor"];
    }
}