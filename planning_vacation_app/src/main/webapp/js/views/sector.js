var sectorName = {};
var sectorEmployees = {};

var user = true ? "director" : "admin";

var sectorView = {

    panel: {
        id: "sectorPanel",
        adjust: true,
        css:"sectorToolbar",
        cols: [{width: 20}, {
            rows: [{
                view: "toolbar",
                id:"sectorTbr",
                css:"sectorToolbar",
                padding: 10,
                rows: [

                    {
                        id:"headerComponents",
                        cols:[
                            {
                                view: "label",
                                id: "chooseSector",
                                width: 200,
                                height: 70,
                                labelWidth:250,
                                css: "companyPanelToolbar",
                                label: "Odabir sektora" //sectorName.name
                            },
                            {
                                view: "select",
                                id: "combo",
                                options: ["One", "Sektor za vanredne situacije"]//sectorEmployees //izvrsiti ubacivanje svih sektora *opcija dozvoljena samo diretkoru
                            },{},{}
                        ]
                    },
                    {
                        id:"headerComponents2",
                        cols:[
                            {
                                view: "label",
                                id: "sectorManagerName",
                                width: 200,
                                height: 70,
                                labelWidth:250,
                                css: "companyPanelToolbar",
                                label: "Rukovodilac sektora: "
                            },
                            {
                                view: "label",
                                id: "sectorManager",
                                width: 200,
                                height: 70,
                                labelWidth:250,
                                css: "companyPanelToolbar",
                            },{},{}
                        ]
                    },
                    //iskljuciti jednu od dvije komponente u zavisnosti od tipa korisnika
                    {
                        view: "label",
                        id: "name",
                    //    width: 140,
                      //  height: 70,
                        css: "companyPanelToolbar",
                        label: "Sektor za vandredne situacije" //sectorName.name
                    },
                    //iskljuciti jednu od dvije komponente u zavisnosti od tipa korisnika  *izbaciti donju komponentu u slucaju da je ulogovan rukovodioc sektora


                    {
                        cols: [
                            {
                                view: "label",
                                width: 10,
                                height: 70,
                                //css: "companyPanelToolbar",
                                label: "",  //ispraviti nakon popunjavanja combo box-a, pa selektovati rukovodica sektora
                                inputWidth: 500, align: "left",
                                font: "150px"
                            }, {
                                rows: [{},{
                                    id: "addEmployeeBtn",
                                    view: "button",
                                    type: "iconButton",
                                    label: "Dodajte zaposlenog",
                                    align: "left",
                                    icon: "plus-circle",
                                    css: "companyButton",
                                    autowidth: true,
                                    click: "sectorView.showDialog"
                                }]

                            }, {}, {}, {},   {

                            }, {width: 5}, {

                                css: "admin-counter",
                                rows: [
                                    {
                                        view: "template",
                                        id: "t2",
                                        css: "admin-counter",
                                    },
                                    {
                                        view: "label",
                                        label: "Broj zaposlenih",
                                        type: "header",
                                        css: "admin-counter"
                                    },
                                ]
                            }, {width: 20},
                            {
                                css: "employee-counter",
                                rows: [
                                    {view: "template", id: "t3", css: "employee-counter",},
                                    {
                                        view: "label",
                                        label: "Broj odsutnih",
                                        type: "header",
                                        css: "employee-counter"
                                    },
                                ]
                            },
                            {width: 20},
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
                                        label: "Broj dozvoljenih odsutnih",
                                        type: "header",
                                        css: "companies-counter"
                                    },


                                ]
                            },
                        ]
                    },

                ],
            },  {
                    height: 20
                },
                {
                    view: "datatable",
                    id: "sectorDT",
                    fillspace: true,
                    editor: "text",
                    select: "row",
                    multiselect: false,
                    resizeColumn: true,
                    resizeRow: true,
                    editable: false,
                    navigation: true,
                    width: 1620,
                    //url: , popuniti naknadno user-ima iz odgovarajuceg sektora
                    data:
                        [
                            {
                                id: 1, firstName: "Nikola", lastName: "Nikolic", eMail: "Dzoni@mail.com",
                            },
                            {
                                id: 2, firstName: "Nikaaola", lastName: "Nikoaaic", eMail: "Dzoniaa@mail.com"
                            },
                            {
                                id: 3, firstName: "Nikolaaaa", lastName: "Nikoaaalic", eMail: "Dzaaaani@mail.com"
                            }
                        ],
                    onContext: {},
                    on: {

                        onAfterContextMenu: function (item) {
                            this.select(item.row);
                        }
                    },
                    onClick: {
                        webix_icon: function (e, id) {
                            console.log(id["column"]);
                            var action = id["column"];
                            //    if (action === "delete" && user === "admin") {
                            //          alert("Niste autorizovani da izbrisete kompaniju!");
                            //  }
                            //if (action === "delete" && user === "superadmin") {
                            //        var delBox = (webix.copy(commonViews.deleteConfirm("zaposlenog")));
                            //      delBox.callback = function (result) {
                            //        if (result == 1) {
                            //          animateValue($$("t1"), 0, companies.length, 1000);
                            //    }
                            //  };
                            //webix.confirm(delBox);
                            // }
                            if (action == "delete") {
                                sectorView.showDeleteDialog();
                            }

                            if (action === "edit") {
                                sectorView.showEditDialog($$("sectorDT").getItem(id.row));
                            }
                            if (action === "view") {
                                //$$("firstName").disabled();
                               //sectorView.showSectorEmployeeDialog(); //otkomentarisati nakon sto se odradi f-ja u user.js fajlu
                            }

                        }
                    },
                    columns: [
                        {
                            id: "id",
                            hidden: true
                        },
                        {
                            id: "serialNumber",
                            name: "serialNumber",
                            header: "#",
                            width: 50,
                            fillspace: true
                        },
                        {
                            id: "photo",
                            header: "Slika", //cisto da se zna sta se treba nalaziti u koloni *izbaciti nakon popunjavanja podacima
                            editable: false,
                            fillspace: true
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
                        {
                            id: "deleteSectorEmployee",
                            header: "&nbsp;",
                            width: 35,
                            template: "<span  style='color:#777777; 0; cursor:pointer;' class='webix_icon fa-trash-o'></span>",

                        },
                        {
                            id: "editSectorEmployee",
                            header: "&nbsp;",
                            width: 35,
                            template: "<span  style='color:#777777; cursor:pointer;' class='webix_icon fa fa-pencil'></span>"
                        },
                        {
                            id: "viewSectorEmployee",
                            header: "&nbsp;",
                            width: 35,
                            template: "<span  style='color:#777777; cursor:pointer;' class='webix_icon  fa fa-eye'></span>"
                        }
                    ],
                },

                {
                    view: "toolbar",
                    id: "dtToolbar",
                    css: "highlighted_header header6",
                    paddingX: 5,
                    paddingY: 5,
                    height: 40,
                    cols: [{
                        view: "pager", id: "pagerA",
                        template: "{common.first()}{common.prev()}&nbsp; {common.pages()}&nbsp; {common.next()}{common.last()}",
                        size: 20,
                        height: 35,
                        group: 5,
                        animate: {
                            direction: "top"
                        },
                    }
                    ]
                }
            ]
        }]
    },
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
                    hotkey: 'esc',
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
                        required: true,
                        invalidMessage: "Molimo unesite ime.",
                    },
                    {
                        view: 'text',
                        label: 'Prezime',
                        id: 'lastName',
                        name: "lastName",
                        required: true,
                        invalidMessage: "Molimo unesite prezime.",
                    },
                    {
                        view: 'text',
                        label: 'E-mail',
                        name: "eMail",
                        invalidMessage: "Molimo unesite e-mail.",
                        required: true
                    },
                    {
                        cols: [
                            {
                                view: "uploader",
                                id: "photo",
                                value: "Odaberi sliku",
                                link: "mylist",
                                upload: "",
                                datatype: "photo",
                                width: 150,
                            },
                            {
                                view: "list",
                                id: "mylist",
                                type: "uploader",
                                borderless: true
                            }
                        ]
                    }, {
                        cols: [{}, {
                            view: "button",
                            hotkey: "enter",
                            width: 250,
                            id: "saveEmployee",
                            type: "iconButton",
                            label: "Sačuvaj izmjene",
                            icon: "save",
                            click: "sectorView.save",
                        },]
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
        } else {
            webix.alert({
                title: "Neuspješno dodavanje zaposlenog! ",
                text: "Podaci nisu korektno unešeni!",
                type: "alert-error"
            }).then(function () {
                alert(2);
            });
        }
    },
    editDialog: {
        view: "popup",
        id: "editSectorEmployeeDialog",
        position: "center",
        modal: true,
        body: {
            rows: [{
                view: "toolbar",
                cols: [{
                    view: "label",
                    width: 400,
                    label: "<span class='webix_icon fas fa-user'><\/span> Izmjena zaposlenog"
                }, {}, {
                    view: "icon",
                    icon: "close",
                    hotkey: 'esc',
                    align: "right",
                    click: "util.dismissDialog('editSectorEmployeeDialog')"
                }]
            }, {
                elementsConfig: {labelWidth: 140, bottomPadding: 18},
                view: "form",
                elements: [
                    {
                        view: 'text',
                        label: 'Naziv sektora: ',
                        id: 'newSector',
                        name: "sectorName",
                        required: true
                    },
                    {
                        cols: [{}, {
                            view: "button",
                            hotkey: "enter",
                            width: 250,
                            id: "saveEmployee",
                            type: "iconButton",
                            label: "Sačuvaj izmjene",
                            hotkey: 'enter',
                            icon: "save",
                            click: "sectorView.saveEdited",
                        },]
                    }],
                width: 500,
                rules: {},
                id: "editSectorEmployeeForm"
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
        animateValue($$("t1"), 0, 25, 100);
        animateValue($$("t2"), 0, 25 * 2, 100);
        animateValue($$("t3"), 0, 25 * 150, 100);
        //connection.attachAjaxEvents('sectorDT', 'KOLONA');
    },
    saveEdited: function () {
        var editForm = $$("editSectorEmployeeForm");
        if (editForm.validate()) {
            var newItem = editForm.getValues();

            //prvo delete zaposlenog iz sektora, a zatim dodavanje zaposlenog u novi sektor
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
            util.dismissDialog('editSectorEmployeeDialog');
        } else {
            webix.alert({
                title: "Neuspješna promjena informacija o korisniku! ",
                text: "Podaci nisu korektno unešeni!",
                type: "alert-error"
            }).then(function () {
            });
        }
    },
    showSectorEmployeeDialog: function () {

        webix.ui(webix.copy(sectorView.sectorEmployeeDialog));

        setTimeout(function () {
            $$("sectorEmployeeDialog").show();
        }, 0);
    },
    sectorEmployeeDialog: {
        view: "popup",
        id: "sectorEmployeeDialog",
        modal: true,
        position: "center",
        drag: "true",

        body: {
            id: "sectorEmployeeInside",
            rows: [{
                view: "toolbar",
                cols: [{
                    view: "label",
                    label: "<span class='webix_icon fa-user'></span> Pregled zaposlenog",
                    width: 400
                }, {}, {
                    hotkey: 'esc',
                    view: "icon",
                    icon: "close",
                    align: "right",
                    click: "util.dismissDialog('sectorEmployeeDialog');"
                }]
            }, {
                view: "form",
                id: "sectorEmployeeForm",
                width: 600,
                elementsConfig: {
                    labelWidth: 200,
                    bottomPadding: 18
                },
                elements: [
                    {
                        view: "text",
                        id: "name",
                        name: "name",
                        label: "Naziv:",
                        disabled: true,
                    },
                    {
                        margin: 5,
                        cols: [{}, {
                            id: "showSectorEmployee",
                            view: "button",
                            value: "Zatvorite",
                            type: "form",
                            click: "util.dismissDialog('sectorEmployeeDialog');",
                            hotkey: "enter",
                            width: 150
                        }]
                    }],

            }]
        }
    },
    showEditDialog: function (sectorEmployee) {
        webix.ui(webix.copy(sectorView.editDialog));
        $$("editSectorEmployeeForm").setValues(sectorEmployee);
        setTimeout(function () {
            $$("editSectorEmployeeDialog").show();
        }, 0);
    },
    showDeleteDialog: function () {
        var delBox = (webix.copy(commonViews.deleteConfirm("zaposlenog")));
        delBox.callback = function (result) {
            if (result == 1) {


//                        animateValue($$("t1"), 0, companies.length, 1000);  //reduce number of employees in choosen sector

                var id = $$("sectorDT").getSelectedId();
                //   connection.sendAjax("DELETE", "user/" + id, function () {
                $$("sectorDT").remove(id);
                util.messages.showMessage("Zaposleni u sektoru uspješno obrisan.");
                /* }, function () {
                     util.messages.showErrorMessage("Došlo je do greške pri brisanju fakulteta.");
                 })*/


            }
        };
        webix.confirm(delBox);
        //sectorView.showDeleteDialog();
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
                            sectorView.showDeleteDialog();
                            break;
                        }
                    }
                }
            }
        });
    },
    preloadDependencies: function () {
        $$("combo").attachEvent("onChange", function (newv, oldv) {
            webix.message("Value changed from: " + oldv + " to: " + newv);
            //ubaciti metodu koja ce vracati zaposlene samo za taj sektor
        });

         if ( userData.userGroupId == 5 || userData.userGroupId == 4){  // u slucaju da je rukovodilac sektora u pitanju on nema pristup

                if(userData.userGroupId == 5) //sektretarica ima mogucnost pregleda i po ostalim sektorima
                {
                 $$("headerComponents").removeView("combo");
                 $$("headerComponents").removeView("sectorManager");
                 $$("headerComponents").removeView("chooseSector");
                 $$("headerComponents2").removeView("sectorManagerName");

                }else{
                    $$("name").hide();
                }

               // $$("dtToolbar").hide();
                //$$("editSectorEmployee").hide();
                //$$("deleteSectorEmployee").hide();
                $$("sectorDT").hideColumn("editSectorEmployee", {spans:true});
                $$("sectorDT").hideColumn("deleteSectorEmployee", {spans:true});

        }
        else{ //user is director or admin
           $$("name").hide();
           $$("sectorManager").setValue("Nikolina Manager");
           $$("combo").setValue("Sektor za vanredne situacije");
        }

        // var name = 'name';
        //   sectorName[name] = 'Ime sektora';
        //   alert(sectorName.name);
        var firstName = "firstName";
        var lastName = "lastName";
        var eMail = "eMail";
        var photo = "photo";
//        sectorEmployees[firstName, lastName, eMail, photo] = '';
        //   sectorEmployees =  ["Prvi sektor", "Drugi sektor"];
    }
}
