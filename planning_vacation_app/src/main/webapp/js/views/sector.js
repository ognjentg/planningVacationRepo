var sectorName = {};
var sectors = {};
var sectorsNumber={};
var sectorForChange=null;
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
                        css: "companyButton floatMeRight",
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
                    },
                    {
                        id: "deleteSectorsBtn",
                        view: "button",
                        type: "iconButton",
                        label: "Izbrišite sektore",
                        icon: "plus-circle",
                        click:"sectorView.deleteSectors",
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
                        id: "status",
                        header: "",
                        checkValue: 'on',
                        uncheckValue: 'off',
                        template: "{common.checkbox()}",
                        width: 35,
                        cssFormat: checkCheckBoxStatus,
                    },
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
                        editable: false,
                        header: ["Naziv sektora",
                            {
                                content: "textFilter", value: "", icon: "wxi-search"
                            }],
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
                        editable: false,
                        header: ["Ime rukovodioca",
                            {
                                content: "textFilter", value: "", icon: "wxi-search"
                            }],
                    },
                    {
                        id: "last_name",
                        fillspace: true,
                        editor: "text",
                        sort: "string",
                        cssFormat: checkCheckBoxStatus,
                        editable: false,
                        header: ["Prezime rukovodioca",
                            {
                                content: "textFilter", value: "", icon: "wxi-search"
                            }],
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
                            $$("deleteSectorsBtn").enable();
                            selectedItems.push(rowId);
                        } else {
                            var index = selectedItems.indexOf(rowId);
                            if (index > -1) {
                                selectedItems.splice(index, 1);
                            }
                            if(selectedItems.length ==0){
                                $$("deleteSectorsBtn").disable();
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
                                            sectorsNumber=sectorsNumber-1;
                                            animateSectorValue($$("t1"), 0, sectorsNumber, 1000);
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

    deleteSectors: function(){
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
                            $$("sectorDT").remove(item);
                            sectorsNumber=sectorsNumber-1;
                        }
                    }, function (text, data, xhr) {
                        util.messages.showErrorMessage(text);
                    }, item);


                });
                util.messages.showMessage("Uspjesno uklanjanje");
                $$("deleteSectorsBtn").disable();
                selectedItems = [];

            }
        };
        webix.confirm(delBox);
        animateSectorValue($$("t1"), 0, sectorsNumber, 1000);
    },

    selectPanel: function(){
        console.log(userData.userGroupId === 2 || userData.userGroupId ==3 || userData.userGroupId==4);

        $$("main").removeView(rightPanel);
        rightPanel = "sectorPanel";
        var panelCopy = webix.copy(this.panel);

        $$("main").addView(webix.copy(panelCopy));

        $$("deleteSectorsBtn").disable();
        if(userData.userGroupId == 4){
            $$("sectorDT").hideColumn("delete");
            $$("sectorDT").hideColumn("edit");
            $$("sectorDT").hideColumn("status");
            $$("deleteSectorsBtn").hide();
            $$("addSectorBtn").hide();
        }

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
            },{
                id: "3",
                value: "Pregledajte",
                icon: "eye"
            }],
            master: $$("sectorDT"),
            on: {
                onItemClick: function (id) {
                    var context = this.getContext();
                    switch (id) {
                        case "1":
                            sectorView.showEditDialog($$("sectorDT").getItem(context.id.row));
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

                                    connection.sendAjax("PUT", "/hub/sector/updateUsersFromSector/"+item,
                                        function (text, data, xhr) {
                                            if (text) {
                                            }
                                        }, function (text, data, xhr) {

                                        },item);

                                    connection.sendAjax("DELETE", "hub/sector/" + item.id, function (text, data, xhr) {
                                        if (text) {
                                            $$("sectorDT").remove(context.id.row);
                                            util.messages.showMessage("Uspjesno uklanjanje");
                                            sectorsNumber=sectorsNumber-1;
                                            animateSectorValue($$("t1"), 0, sectorsNumber, 1000);
                                        }
                                    }, function (text, data, xhr) {
                                        util.messages.showErrorMessage(text);
                                    }, item);

                                }
                            };
                            webix.confirm(delBox);
                            break;
                        case "3":
                            usergroupView.selectPanel();
                            break;
                    }
                }
            }
        })
        $$("sectorDT").define("url", "hub/sector/sectorInfo");
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
                                    template: "#firstName# #lastName#",
                                    url: "hub/user/getAllUsersWithoutSector",
                                }
                            },
                            required: true
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


                connection.sendAjax("PUT", "hub/user/changeToManager/" +$$("managerCombo").getValue(),
                    function (text, data, xhr) {
                        if (text) {
                        }
                    }, function (text, data, xhr) {
                        util.messages.showErrorMessage(text);
                        alert(text);
                    }, $$("managerCombo").getValue());


                var newSector={
                    id:null,
                    name: form.getValues().name,
                    maxAbsentPeople: null,
                    maxPercentageAbsentPeople: null,
                    sectorManagerId: $$("managerCombo").getValue(),
                    companyId: userData.companyId,
                    active:1
                }

                var sector=null;
                console.log(newSector.id);
               connection.sendAjax("POST", "/hub/sector",
                    function (text, data, xhr) {
                        if (text) {
                            sector=data.json();
                            $$("sectorDT").add(sector);
                            util.dismissDialog('addSectorDialog');
                            alert("Sektor uspješno dodat.");
                            sectorsNumber=sectorsNumber+1;
                            animateSectorValue($$("t1"), 0, sectorsNumber, 1000);
                        }
                    }, function (text, data, xhr) {
                        if (text.includes("name_UNIQUE")) {
                            alert("Izabrani naziv već postoji. Unesite drugi naziv.");
                        }
                    }, newSector);

               //promijeniti sektor menadzeru-ne radi iz nekog razloga
                var changeSectorInformation = {
                    id: $$("managerCombo").getValue(),
                    sectorId: sector.id
                };
                connection.sendAjax("POST", "hub/user/changeSector",
                    function (text, data, xhr) {
                    if(text){}

                    }, function (text, data, xhr) {
                        util.messages.showErrorMessage(text);
                    }, changeSectorInformation);


            }
        }
    },

    showAddDialog: function () {

        webix.ui(webix.copy(sectorView.addDialog)).show();
        webix.UIManager.setFocus("name");

    },

    editDialog: function(sector) {
        return  {
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
                                        template: "#firstName# #lastName#",
                                        url: "/hub/user/getAllUsersFromSectorByUserGroupId/"+sector.id,
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
                                click:"sectorView.saveUpdate",
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
        }  },

    showEditDialog: function (sector) {
        sectorForChange=sector;
        webix.ui(webix.copy(sectorView.editDialog(sector))).show();
        webix.UIManager.setFocus("name");
        var form = $$("editSectorForm");
        form.setValues(sector);
        $$("id").hide(true);
        $$("managerCombo").setValue(sector.sectorManagerId);

    },

    saveUpdate: function(){

        var form = $$("editSectorForm");
        var validation = form.validate();
        if(validation){
            connection.sendAjax("PUT", "hub/user/changeToWorker/" + sectorForChange.sectorManagerId,
                function (text, data, xhr) {
                    if (text) {
                    }
                }, function (text, data, xhr) {
                    util.messages.showErrorMessage(text);
                    alert(text);
                }, sectorForChange.sectorManagerId);



            connection.sendAjax("PUT", "hub/user/changeToManager/" +$$("managerCombo").getValue(),
                function (text, data, xhr) {
                    if (text) {
                    }
                }, function (text, data, xhr) {
                    util.messages.showErrorMessage(text);
                    alert(text);
                }, $$("managerCombo").getValue());

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
                        util.dismissDialog('editDialog');
                        alert("Sektor uspješno izmjenjen.");
                        $$("sectorDT").updateItem(newSector.id,newSector);

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
                    sectorsNumber= sectors.length;
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