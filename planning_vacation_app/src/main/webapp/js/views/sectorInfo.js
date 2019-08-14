var options = [];


var sector = null;

var sectorInfoView = {

    sectorInfoDialog: {
        view: "fadeInWindow",
        id: "sectorInfoDialog",
        name: "sectorInfoDialog",
        position: "center",
        modal: true,
        body: {
            rows: [
                {
                    view: "toolbar",
                    cols: [
                        {
                            view: "label",
                            width: 400,
                            label: "<span class='webix_icon fas fa-briefcase'></span> Sektor"
                        },
                        {},
                        {
                            view: "icon",
                            icon: "close",
                            align: "right",
                            click: "util.dismissDialog('sectorInfoDialog')"
                        }
                    ]
                },
                {
                    view: "form",
                    id: "sectorInfoForm",
                    width: 500,
                    elementsConfig: {
                        labelWidth: 140,
                        bottomPadding: 18
                    },
                    elements: [
                        {
                            view: "text",
                            required: true,
                            id: "name",
                            name: "name",
                            label: "Ime sektora",
                            invalidMessage: "Niste unijeli ime sektora.",
                            labelWidth: 150,
                            height: 35
                        },
                        {
                            view: "text",
                            required: true,
                            id: "max_absent_people",
                            name: "max_absent_people",
                            label: "Maksimalan broj istovremeno odsutnih zaposlenih",
                            invalidMessage: "Niste unijeli maksimalan broj istovremeno odsutnih zaposlenih.",
                            labelWidth: 330,
                            height: 35
                        },
                        {
                            view: "text",
                            required: true,
                            id: "max_percentage_absent_people",
                            name: "max_percentage_absent_people",
                            label: "Maksimalan procenat istovremeno odsutnih zaposlenih",
                            invalidMessage: "Niste unijeli maksimalan procenat istovremeno odsutnih zaposlenih.",
                            labelWidth: 330,
                            height: 35
                        },

                        {
                            cols: [
                                {
                                    view: "button",
                                    id: "saveSectorInfoButton",
                                    name: "saveSectorInfoButton",
                                    hotkey: "enter",
                                    label: "Sačuvaj",
                                    type: "iconButton",
                                    icon: "save",
                                    click: "sectorInfoView.save"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },

    showSectorDialog: function() {
        webix.ui(webix.copy(sectorInfoView.sectorInfoDialog));
        setTimeout(function() {
            connection.sendAjax("GET",
                "hub/sector/" + userData.companyId + "/" + userData.id,
                function (text, data, xhr) {
                    sector = data.json();
                    $$("name").setValue(sector.name);
                    $$("max_absent_people").setValue(sector.maxAbsentPeople);
                    $$("max_percentage_absent_people").setValue(sector.maxPercentageAbsentPeople);
                }, function (text, data, xhr) {
                    util.messages.showErrorMessage(text);
                });
            $$("sectorInfoDialog").show();
        }, 0);
    },

    save: function () {
        $$("saveSectorInfoButton").disable();
        sector.name = $$("name").getValue();
        sector.maxAbsentPeople = $$("max_absent_people").getValue();
        sector.maxPercentageAbsentPeople = $$("max_percentage_absent_people").getValue();
        connection.sendAjax("PUT", "hub/sector/" + sector.id,
            function (text, data, xhr) {
                util.dismissDialog("sectorInfoDialog");
                util.messages.showMessage("Izmjene uspješno sačuvane.");
            }, function (text, data, xhr) {
                util.messages.showErrorMessage(text);
                $$("saveSectorInfoButton").enable();
            }, sector);
    }
}