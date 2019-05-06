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
                            view:"label",
                            label:"Sektor za vandredne situacije"
                        },
                        {
                            view:"combo",
                            label: "Odabir sektora   ",
                            labelWidth:110,
                            value:"One",
                            options:["One", "Two", "Three"], //popuniti combo box sektorima
                            width:270
                        },
                        //iskljuciti jednu od dvije komponente u zavisnosti od tipa korisnika
                        {
                            view:"label",
                            label: "Nikolina Govedarica",  //ispraviti nakon popunjavanja combo box-a
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
                                value:"Dodaj zaposlenog",
                                width:150,
                                click: "sectorView.showDialog"
                            },
                            {
                                view:"button",
                                id:"editBtn",
                                value:"Izmijeni zaposlenog",
                                width:150,
                                click: "sectorView.showEditDialog"
                            },
                            {
                                view:"button",
                                id:"delBtn",
                                value:"Obrisi zaposlenog",
                                width:150, click: "sectorView.showDeleteDialog"
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
                        width: 1000,
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
                                header: "Slika", //izbaciti nakon popunjavanja podacima
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
                    label: "<span class='webix_icon fa-graduation-cap'><\/span> Dodavanje zaposlenog"
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
                        type: "form",
                        value: "Sačuvaj",
                        click: "sectorView.save",
                    },
                        {    view: 'button', value: 'Otkaži', width: 230,

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
                            type: "form",
                            value: "Sačuvaj",
                            click: "sectorView.saveEdited",
                        },
                            {    view: 'button', value: 'Otkaži', width: 230,

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
        sectorView.createDatatableContextMenu(); // dodavanje izmjene i brisanja na kontekstni meni
        //connection.attachAjaxEvents('sectorDT', 'KOLONA');
    },
    saveEdited: function () {
        var editForm = $$("editEmployeeForm");
        if (editForm.validate()) {
            var newItem = editForm.getValues();
           /* connection.sendAjax("PUT", "sector/" + newItem.id, function (text, data, xhr) {
                if (text === "Success") {
                    util.messages.showMessage("Podaci o sektoru su uspješno promijenjeni.");
                    $$("sectorDT").updateItem(newItem.id, newItem); // updateItem osvjezava vrijednosti za odabrani red po id-u
                }
                else
                    util.messages.showErrorMessage("Došlo je do greške prilikom promjene podataka o sektoru.");
            }, function () {
                util.messages.showErrorMessage("Došlo je do greške prilikom promjene podataka o sektoru.");
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
                if (okPressed) { // Korisnik potvrdio brisanje
                    $$("sectorDT").remove($$("sectorDT").getSelectedId());
                }
            }
        };
        webix.confirm(delBox);
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
    }

}