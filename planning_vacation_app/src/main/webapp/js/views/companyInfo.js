var daysInWeek =[ "Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota", "Nedjelja"];

var companyInfoView = {

    companyInfoDialog : {
        view: "popup",
        id: "companyInfoDialog",
        name: "companyInfoDialog",
        position: "center",
        modal: true,
        body: {
            rows:[
                {
                    view:"toolbar",
                    cols:[
                        {
                            view: "label",
                            width: 400,
                            label: "<span class='webix_icon fa-briefcase'></span> Podaci o kompaniji"
                        },
                        {},
                        {
                            view: "icon",
                            icon: "close",
                            align: "right",
                            hotkey:"esc",
                            click: "util.dismissDialog('companyInfoDialog')"
                        }
                    ]
                },
                {
                    view:"form",
                    id:"companyInfoForm",
                    width:500,
                    elementsConfig: {
                        labelWidth: 140,
                        bottomPadding: 18
                    },
                    elements:[
                        {
                            view:"text",
                            id:"companyName",
                            label:"Naziv kompanije:",
                            required:true,
                            invalidMessage: "Niste unijeli naziv kompanije",
                        },
                        {
                            view:"text",
                            label:"Logo:",
                            id:"companyLogo",
                            invalidMessage: "Niste odabrali logo.",
                            required:true,
                        },
                        {
                            view:"text",
                            label:"PIN:",
                            id:"companyPin",
                            disabled:true
                        },
                        {
                            view: "combo",
                            id:"daysInWeekCombo",
                            name:"daysInWeekCombo",
                            label:"Odabir neradnog dana:",
                            options: daysInWeek
                        },
                        {
                            view:"button",
                            label:"Sačuvaj izmjene",
                            click:"companyInfoView.saveChanges",
                            width:150,
                            align:"right",
                            hotkey:"enter"
                        }
                    ]
                }
            ]

        }
    },

    showCompanyInfoDialog: function() {
        //popuniti podatke o kompaniji

        webix.ui(webix.copy(companyInfoView.companyInfoDialog));
        setTimeout(function() {
            $$("companyInfoDialog").show();
        }, 0);
    },
    saveChanges: function () {
    // alert(2);
     companyId = userData.companyId;
     companyName = $$("companyName").getValue();
     companyLogo = $$("companyLogo").getValue();
     nonWorkingDay = $$("daysInWeekCombo").getValue();

     //pozvati metodu, snimiti, ispisati poruku
    }
};

