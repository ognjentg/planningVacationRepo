var sectorName = {};
var sectors = {};
var sectorEmployees = {};

var selectedItems = [];

var sectorView = {
    panel:{
        type: "space",
        id: "sectorPanel",
        css: "companyPanelToolbar",
        adjust: true,
        rows:[
            {
                view: "toolbar",
                padding: 10,
                css: "companyPanelToolbarTop",
                cols: [
                    {
                        view: "label",
                        width: 140,
                        height: 70,
                        css: "companyPanelToolbar",
                        template: "<span class='fa fa-briefcase'></span> Sektori"
                    }, {}, {}, {},
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
                                label: "broj sektora",
                                type: "header",
                                css: "companies-counter"
                            },

                        ]


                    },
                    {
                        id: "statisticBtn",
                        view: "button",
                        type: "iconButton",
                        label: " Statistika  ",
                        icon: "fas fa-line-chart",
                        css: "companyButton",
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
                cols:[
                    {
                        id: "addSectorBtn",
                        view: "button",
                        type: "iconButton",
                        label: "Dodajte sektor",
                        icon: "plus-circle",
                        click: 'sectorView.showAddDialog',
                        css: "companyButton",
                        autowidth: true
                    }
                ]
            },
            {
                id: "sectorDT",
                view: "datatable",
                css: "companyDatatable",
                margin: 10,
                editable: true,
                editaction: "dblclick",
                multiselect: false,
                resizeColumn: true,
                resizeRow: true,
                checkboxRefresh: true,
                onContext: {},
                pager: "pagerA",
                columns:[
                    {
                        id: "id",
                        hidden: true,
                        fillspace: true,
                        height: 35,

                    },

                    {
                        id: "id",
                        header: "#",
                        width: 50,
                        cssFormat: checkCheckBoxStatus
                    },

                    {
                        id: "name",
                        width: 400,
                        header: {text: "Naziv sektora", css: "wrap-line"},
                        cssFormat: checkCheckBoxStatus
                    },
                    {
                        id: "max_percentage_absent_people",
                        fillspace: true,
                        editor: "text",
                        sort: "string",
                        cssFormat: checkCheckBoxStatus,
                        header: "Maksimalan procenat odsutnih"
                    },
                    {
                        id: "sectorManagerId",
                        header: "sectorManagerId",
                        width: 50,
                        cssFormat: checkCheckBoxStatus,
                        hidden: true
                    },
                    {
                        id: "first_name",
                        fillspace: true,
                        editor: "text",
                        sort: "string",
                        cssFormat: checkCheckBoxStatus,
                        header: "Ime rukovodioca"
                    },
                    {
                        id: "last_name",
                        fillspace: true,
                        editor: "text",
                        sort: "string",
                        cssFormat: checkCheckBoxStatus,
                        header: "Prezime rukovodioca"
                    },
                    {
                        id: "delete",
                        header: "&nbsp;",
                        width: 35,
                        cssFormat: checkCheckBoxStatus,
                        template: "<span  style='color:#777777; 0; cursor:pointer;' class='webix_icon fa-trash-o'></span>",

                    },
                    {
                        id: "edit",
                        header: "&nbsp;",
                        width: 35,
                        cssFormat: checkCheckBoxStatus,
                        template: "<span  style='color:#777777; cursor:pointer;' class='webix_icon fa fa-pencil'></span>"
                    },
                    {
                        id: "view",
                        header: "&nbsp;",
                        width: 35,
                        cssFormat: checkCheckBoxStatus,
                        template: "<span  style='color:#777777; cursor:pointer;' class='webix_icon fa fa-eye'></span>"
                    },
                    {
                        id: "status",
                        header: "",
                        checkValue: 'on',
                        uncheckValue: 'off',
                        template: "{common.checkbox()}",
                        width: 35,
                        cssFormat: checkCheckBoxStatus,
                    },
                    {
                        id: "delete-selected",
                        header: "<span  style='color:#777777; cursor:pointer;' class='webix_icon fa fa-trash delete-selected'></span>",
                        width: 35,

                    }
                ],
                select: "row",
                navigation: true,
                url:"hub/sector/sectorInfo",
                on: {

                    onAfterContextMenu: function (item) {
                        this.select(item.row);
                    },

                    onCheck: function (rowId, colId, state) {
                        console.log(state);
                        if (state === "on") {
                            $$("sectorDT").showColumn("delete-selected");
                            selectedItems.push(rowId);
                        } else {
                            var index = selectedItems.indexOf(rowId);
                            if (index > -1) {
                                selectedItems.splice(index, 1);
                            }
                            if(selectedItems.length ==0){
                                $$("sectorDT").hideColumn("delete-selected");
                            }
                        }


                    }
                },
                onClick: {
                    webix_icon: function (e, id) {

                        console.log(id["column"]);
                        var action = id["column"];
                        if (action === "delete" && userData.userGroupId === 4) {
                            alert("Niste autorizovani da izbrišete sektor!");
                        }
                        if (action === "delete" && (userData.userGroupId === 2 || userData.userGroupId === 3 )) {

                            var delBox = (webix.copy(commonViews.deleteConfirm("sector")));
                            delBox.callback = function (result) {
                                if (result == 1) {
                                    var item = $$("sectorDT").getItem(id);
                                    $$("sectorDT").detachEvent("onBeforeDelete");

                                    connection.sendAjax("PUT", "/hub/sector/updateUsersFromSector/"+id,
                                        function (text, data, xhr) {
                                            if (text) {
                                            }
                                        }, function (text, data, xhr) {

                                        },item);

                                    connection.sendAjax("DELETE", "hub/sector/" + id, function (text, data, xhr) {
                                        if (text) {
                                            $$("sectorDT").remove(id);
                                            util.messages.showMessage("Uspjesno uklanjanje");
                                            animateSectorValue($$("t1"), 0, sectors.length, 1000);
                                        }
                                    }, function (text, data, xhr) {
                                        util.messages.showErrorMessage(text);
                                    }, item);
                                }
                            };
                            webix.confirm(delBox);
                        }
                        if (action === "edit" && userData.userGroupId === 4) {
                            alert("Niste autorizovani da mijenjate sektor!");
                        }

                        if (action === "edit" && (userData.userGroupId === 2 || userData.userGroupId === 3 )) {

                            sectorView.showEditDialog($$("sectorDT").getItem(id.row));

                        }
                        if (action === "view") {
                            usergroupView.selectPanel();
                        }

                        if (action === "delete-selected" && selectedItems.length) {
                            console.log("delete sector selected");

                            var delBox = (webix.copy(commonViews.deleteConfirm("sector")));
                            delBox.callback = function (result) {
                                if (result == 1) {

                                    $$("sectorDT").detachEvent("onBeforeDelete");

                                    selectedItems.forEach(function (item) {

                                        connection.sendAjax("PUT", "/hub/sector/updateUsersFromSector/"+item,
                                            function (text, data, xhr) {
                                                if (text) {
                                                }
                                            }, function (text, data, xhr) {

                                            },item);

                                        connection.sendAjax("DELETE", "hub/sector/" + item, function (text, data, xhr) {
                                            if (text) {
                                                $$("sectorDT").remove(id);
                                                util.messages.showMessage("Uspjesno uklanjanje");
                                                animateSectorValue($$("t1"), 0, sectors.length, 1000);
                                            }
                                        }, function (text, data, xhr) {
                                            util.messages.showErrorMessage(text);
                                        }, item);


                                    });

                                    selectedItems = [];

                                }
                            };
                            webix.confirm(delBox);
                            refreshSectorData();
                        }


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
                    size: 19,
                    height: 35,
                    group: 5,
                    animate: {
                        direction: "top"
                    },
                }
                ]
            }

        ]
    },

    selectPanel: function(){
        console.log(userData.userGroupId === 2 || userData.userGroupId ==3 || userData.userGroupId==4);

        $$("main").removeView(rightPanel);
        rightPanel = "sectorPanel";
        var panelCopy = webix.copy(this.panel);

        $$("main").addView(webix.copy(panelCopy));

        if(userData.userGroupId == 4){
            $$("sectorDT").hideColumn("delete");
            $$("sectorDT").hideColumn("edit");
            $$("sectorDT").hideColumn("status");
        }

        $$("sectorDT").hideColumn("delete-selected");

        refreshSectorData();

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
            id: "sectorContextMenu",
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
            master: $$("sectorDT"),
            on: {
                onItemClick: function (id) {
                    var context = this.getContext();
                    switch (id) {
                        case "1":
                            sectorView.showChangeCompanyDialog($$("sectorDT").getItem(context.id.row));
                            break;
                        case "2":
                            if (userData.userGroupId === 4) {
                                alert("Niste autorizovani da izbrišete sektor!");
                                break;
                            }
                            var delBox = (webix.copy(commonViews.deleteConfirm("sector")));
                            delBox.callback = function (result) {
                                if (result == 1) {
                                    var item = $$("sectorDT").getItem(context.id.row);
                                    $$("sectorDT").detachEvent("onBeforeDelete");
                                    connection.sendAjax("DELETE", "hub/sector/" + item.id, function (text, data, xhr) {
                                        if (text) {
                                            $$("sectorDT").remove(context.id.row);
                                            util.messages.showMessage("Uspjesno uklanjanje");
                                            animateSectorValue($$("t1"), 0, sectors.length, 1000);
                                        }
                                    }, function (text, data, xhr) {
                                        util.messages.showErrorMessage(text);
                                    }, item);

                                }
                            };
                            webix.confirm(delBox);
                            break;
                    }
                }
            }
        })
    },


    addDialog:{
        view: "fadeInWindow",
        id: "addSectorDialog",
        move: true,
        position: "center",
        modal: true,
        body: {
            id: "addSectorInside",
            rows: [
                {
                    view: "toolbar",
                    cols: [{
                        view: "label",
                        label: "<span class='webix_icon fa-briefcase'></span> Dodavanje sektora",
                        width: 400,
                        height: 50
                    }, {}, {
                        hotkey: 'esc',
                        view: "icon",
                        icon: "close",
                        align: "right",
                        click: function () {
                            this.getTopParentView().hide();
                        },
                    }]
                },
                {
                    view: "form",
                    id: "addSectorForm",
                    width: 660,
                    height: 200,
                    elementsConfig: {
                        labelWidth: 200,
                        bottomPadding: 20
                    },
                    elements:[
                        {
                            view: "text",
                            id: "name",
                            name: "name",
                            label: "Naziv:",
                            invalidMessage: "Naziv je obavezno unijeti.",
                            required: true
                        },
                        {
                            view: "combo",
                            id:"managerCombo",
                            name:"managerCombo",
                            label:"Rukovodilac",
                            options:{
                                body:{
                                    template: "#id# #firstName# #lastName#",
                                    url: "hub/user",
                                }
                            },
                            required:true
                        },
                        {
                            id: "saveSector",
                            view: "button",
                            value: "Dodajte",
                            type: "form",
                            align: "right",
                            click: "sectorView.save",
                            hotkey: "enter",
                            width: 150

                        }
                    ],
                    rules: {
                        "name": function (value) {
                            if (!value) {
                                $$('addSectorForm').elements.name.config.invalidMessage = 'Naziv je obavezno unijeti.';
                                return false;
                            } else if (value.length > 45) {
                                $$('addSectorForm').elements.name.config.invalidMessage = 'Broj karaktera ne može biti veći od 45!';
                                return false;
                            } else {
                                return true;
                            }
                        },
                        "managerCombo": function (value) {
                            if (!value) {
                                return false;
                            }else {
                                return true;
                            }

                        }
                    }
                }
            ]
        }
    },


    save: function(){
        var form = $$("addSectorForm");
        if(!checkInternetConnection()){
            alert("Nemate pristup internetu. Provjerite konekciju i pokušajte ponovo.");
        }else{
            var validation = form.validate();
            if(validation){
                var newSector={
                    id:null,
                    name: form.getValues().name,
                    maxAbsentPeople: null,
                    maxPercentageAbsentPeople: null,
                    sectorManagerId: $$("managerCombo").getValue(),
                    companyId: userData.companyId,
                    active:1
                }

                console.log(newSector.id);
                connection.sendAjax("POST", "/hub/sector",
                    function (text, data, xhr) {
                        if (text) {
                            //$$("sectorDT").add(newCompany);

                            util.dismissDialog('addSectorDialog');
                            alert("Sektor uspješno dodat.");
                        }
                    }, function (text, data, xhr) {
                        if (text.includes("name_UNIQUE")) {
                            alert("Izabrani naziv već postoji. Unesite drugi naziv.");
                        }
                    }, newSector);
            }
        }
        refreshSectorData();
    },

    showAddDialog: function () {

        webix.ui(webix.copy(sectorView.addDialog)).show();
        webix.UIManager.setFocus("name");

    },

    editDialog:{
        view: "fadeInWindow",
        id: "editSectorDialog",
        move: true,
        position: "center",
        modal: true,
        body: {
            id: "editSectorInside",
            rows: [
                {
                    view: "toolbar",
                    cols: [{
                        view: "label",
                        label: "<span class='webix_icon fa-briefcase'></span> Izmjena sektora",
                        width: 400,
                        height: 50
                    }, {}, {
                        hotkey: 'esc',
                        view: "icon",
                        icon: "close",
                        align: "right",
                        click: function () {
                            this.getTopParentView().hide();
                        },
                    }]
                },
                {
                    view: "form",
                    id: "editSectorForm",
                    width: 660,
                    height: 200,
                    elementsConfig: {
                        labelWidth: 200,
                        bottomPadding: 20
                    },
                    elements:[
                        {
                            view: "text",
                            id: "id",
                            name: "id",
                            label: "id:",
                            //hidden: true,
                            //editable: false
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
                            view: "combo",
                            id:"managerCombo",
                            name:"managerCombo",
                            label:"Rukovodilac",
                            options:{
                                body: {
                                    template: "#id# #firstName# #lastName#",
                                    url: "hub/user",
                                }
                            },
                            required:true
                        },
                        {
                            id: "saveSector",
                            view: "button",
                            value: "Sačuvajte izmjene",
                            type: "form",
                            align: "right",
                            click: "sectorView.saveUpdate",
                            hotkey: "enter",
                            width: 150

                        }
                    ],
                    rules: {
                        "name": function (value) {
                            if (!value) {
                                $$('addSectorForm').elements.name.config.invalidMessage = 'Naziv je obavezno unijeti.';
                                return false;
                            } else if (value.length > 45) {
                                $$('addSectorForm').elements.name.config.invalidMessage = 'Broj karaktera ne može biti veći od 45!';
                                return false;
                            } else {
                                return true;
                            }
                        },
                        "managerCombo": function (value) {
                            if (!value) {
                                //$$('addSectorForm').elements.managerCombo.config.invalidMessage = 'Rukovodioca je obavezno odabrati.';
                                return false;
                            }else {
                                return true;
                            }

                        }
                    }
                }
            ]
        }
    },

    showEditDialog: function (sector) {

        webix.ui(webix.copy(sectorView.editDialog)).show();
        webix.UIManager.setFocus("name");
        var form = $$("editSectorForm");
        form.elements.name.setValue(sector.name);
        form.elements.id.setValue(sector.id);
        form.elements.id.hide(true);
        $$("managerCombo").setValue(sector.sectorManagerId);

    },

    saveUpdate: function(){
        var form = $$("editSectorForm");
        var validation = form.validate();
        if(validation){
            var newSector={
                id:form.getValues().id,
                name: form.getValues().name,
                sectorManagerId: $$("managerCombo").getValue(),
                maxAbsentPeople: null,
                maxPercentageAbsentPeople: null,
                companyId: userData.companyId,
                active:1
            }

            console.log(newSector.id);
            connection.sendAjax("PUT", "hub/sector/" + newSector.id,
                function (text, data, xhr) {
                    if (text) {
                        util.messages.showMessage("Sektor uspješno izmjenjen.");
                        util.dismissDialog('editDialog');
                        $$("sectorDT").updateItem(newSector.id, newSector);
                    } else
                        util.messages.showErrorMessage("Neuspješna izmjena.");
                }, function (text, data, xhr) {
                    util.messages.showErrorMessage(text);
                    alert(text);
                }, newSector);
        }
    }


};
function animateSectorValue(id, start, end, duration) {
    console.log("counter start");
    var range = end - start;
    var current = start;
    var increment = end > start ? 1 : -1;
    var stepTime = Math.abs(Math.floor(duration / range));
    var timer = setInterval(function () {
        current += increment;
        id.setHTML(`<p>${current}</p>`);
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}

function checkCheckBoxStatus(value, obj) {

    if (obj.status === "on") {
        console.log(obj.status);

        return "webix_row_select";
    } else {
        return "";
    }

}
function checkInternetConnection() {

    if (navigator.onLine) {
        return true;
    }

    return false;

}

function refreshSectorData() {
    $$("t1").setHTML(`<p>${0}</p>`);
    console.log("refresh sector data");


    webix.extend($$("sectorDT"), webix.ProgressBar);

    var table = webix.$$("sectorDT");
    table.clearAll();
    table.showProgress();


    webix.ajax("hub/sector/sectorInfo", {

        error: function (text, data, xhr) {

            if (xhr.status != 200) {
                alert("No data to load! Check your internet connection and try again.");
                table.hideProgress();
            }

        },

        success: function (text, data, xhr) {

            if (xhr.status === 200) {
                if (data.json() != null) {
                    console.log("loaded data with success");
                    sectors = data.json();
                    numberOfSectors = sectors.length;
                    table.hideProgress();

                    if(userData.userGroupId == 4){
                        $$("sectorDT").hideColumn("delete");
                        $$("sectorDT").hideColumn("edit");
                        $$("sectorDT").hideColumn("status");
                    }

                    $$("sectorDT").hideColumn("delete-selected");
                    table.parse(sectors);
                    animateSectorValue($$("t1"), 0, numberOfSectors, 100);
                }
            }

        }

    });
}