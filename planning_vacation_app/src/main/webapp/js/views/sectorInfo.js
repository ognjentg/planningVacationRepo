var options = [
 //  pokupiti rukovodioce sektora, pa ih ispisati u combo box, koji se treba dodati
    //NISAM STIGLA ZAVRSITI SADA, SAMO SAM KOSTUR NEKI KUCALA, NISAM NI PROVJERILA GDJE MI JE STA
];

var sectorInfoView = {

    sectorInfoDialog: {
        view: "popup",
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
                            label: "<span class='webix_icon fas fa-user'></span> Sektor"
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
                            labelWidth: 150,
                            height: 35
                        },
                        {
                            view: "text",
                            required: true,
                            id: "max_percentage_absent_people",
                            name: "max_percentage_absent_people",
                            label: "Maksimalan procenat istovremeno odsutnih zaposlenih",
                            invalidMessage: "Niste unijeli maksimalan procenat istovremeno odsutnih zaposlenih.",
                            labelWidth: 150,
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

    save: function () {
        var sectorInfoForm = $$("sectorInfoForm");

    }
}