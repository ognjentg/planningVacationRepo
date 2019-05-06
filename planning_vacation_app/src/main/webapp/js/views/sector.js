var sectorView =  {

            panel: {
                id: "sectorPanel",
                adjust: true,
                cols: [{ width:20},{
                rows: [ {
                    view: "toolbar",
                    padding:12,
                    rows: [
                        {view:"label", label:"Sektor za vandredne situacije"},
                        {view:"label", label: "Nikolina Govedarica", inputWidth:300, align:"left", font:"150px"},

                    ],
                },
                    {
                        cols:[
                            {view:"button", id:"addBtn", value:"Dodaj zaposlenog", width:150, click: "sectorView.showDialog"},
                            {view:"button", id:"delBtn", value:"Izmijeni zaposlenog", width:150},
                            {view:"button", id:"editBtn", value:"Obrisi zaposlenog", width:150},
                    ]
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
                        //url: , dodati naknadno
                        data:[
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
                        columns: [
                            {
                                id: "id",
                                hidden:true,
                                fillspace: true
                            },
                            {
                                id: "photo",
                                header: "Slika", //izbaciti kasnije
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
    addEmpDialog: {
        view: 'window',
        head: 'Podaci o zaposlenom',
        modal: true,
        position: 'center',
        body: {
            view: 'form',
            elements: [
                { view: 'text', label: 'Ime', id: 'firstName', required:true },
                { view: 'text', label: 'Prezime', id: 'lastName', required:true },
                { view: 'text', label: 'Email', required:true },
                {
                    cols:[
                        {
                            view:"uploader",
                            id: "photo",
                            value:"Odaberi sliku",
                            link:"mylist",
                            upload:"",
                            datatype:"photo"
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
                cols:[
                { view: 'button', value: 'Potvrdi',
                    click: function () {
                        this.getParentView().getParentView().getParentView().hide();
                    }
                },
                {    view: 'button', value: 'Otkaži',
                    click: function () {
                        this.getParentView().getParentView().getParentView().hide();
                    }}]},
            ]
        }},
    editDialog: {
        view: "popup",
        id: "editSectorDialog",
        position: "center",
        modal: true,
        body: {
            rows: [{
                view: "toolbar",
                cols: [{
                    view: "label",
                    width: 400,
                    label: "<span class='webix_icon fas fa-user'><\/span> Promijeni podatke o zaposlenom"
                }, {}, {
                    view: "icon",
                    icon: "close",
                    align: "right",
                    click: "util.dismissDialog('editSectorDialog')"
                }]
            }, {
                elementsConfig: {labelWidth: 140, bottomPadding: 18},
                view: "form",
                elements: [
                    {
                        view: "text",
                        hidden: true,
                        name: "id",
                        id: "id",
                        label: "Id:"},
                    {
                        view: 'text',
                        label: 'Ime',
                        id: 'firstName',
                        invalidMessage: "Molimo unesite ime.",
                        required:true
                    },
                    {
                        view: 'text',
                        label: 'Prezime',
                        id: 'lastName',
                        invalidMessage: "Molimo unesite prezime.",
                        required:true
                    },
                    {
                        view: 'text',
                        label: 'Email',
                        invalidMessage: "Molimo unesite e-mail.",
                        required:true
                    },  {
                    cols:[{
                        view:"uploader",
                        id: "photo",
                        value:"Odaberi sliku",
                        link:"mylist",
                        upload:"",
                        datatype:"photo"
                     },
                     {
                       view:"list",
                       id:"mylist",
                       type:"uploader",
                       autoheight:true,
                       borderless:true
                     }
]},
                    {
                    margin: 5,
                    cols: [{}, {
                        view: "button",
                        hotkey: "enter",
                        width: 150,
                        id: "saveSector",
                        type: "form",
                        value: "Sačuvaj",
                        click: "sectorView.saveEdited"
                    }]
                }],
                width: 500,
                rules: {},
                id: "editSectorForm"
            }]
        }
    },
    showDialog: function () {
        webix.ui(webix.copy(sectorView.addEmpDialog)).show();
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
        var editForm = $$("editSectorForm");
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
            util.dismissDialog('editSectorDialog');
        }
    },

    showEditDialog: function (object) {
        webix.ui(webix.copy(sectorView.editDialog));
        $$("editSectorForm").setValues(object);
        setTimeout(function () {
            $$("editSectorDialog").show();
            webix.UIManager.setFocus("name");
        }, 0);
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
                            var delBox = {
                                title: "Brisanje zaposlenog",
                                ok: "Da",
                                cancel: "Ne",
                                width: 500,
                                text: "Da li ste sigurni da želite obrisati zaposlenog?",
                           /*     callback: function (okPressed) {
                                    if (okPressed) { // Korisnik potvrdio brisanje
                                        $$("sectorDT").remove(context.id.row);
                                    } else { // Korisnik odustao od brisanja

                                    }
                                }*/
                            };
                            webix.confirm(delBox);
                            break;
                        }
                    }
                }
            }
        });
    }

}