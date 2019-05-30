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
                            label:"PIN:",
                            id:"companyPin",
                            disabled:true
                        },
                        {
                            view:"text",
                            label:"Broj dana godišnjeg:",
                            id:"vacationDays",
                        },
                        {
                            view:"text",
                            label:"Broj dana bolovanja:",
                            id:"sickDays",
                        },
                        {
                            view:"datepicker",
                          //  value:"2016-1-14, 2016-1-16, 2016-1-18",
                            multiselect:"touch",
                            stringResult:true,
                            label:"Odabir neradnih dana",
                            id:"nonWorkingDays"
                        },
                        {
                            view: "combo",
                            id:"daysInWeekCombo",
                            name:"daysInWeekCombo",
                            label:"Odabir neradnog dana:",
                            options: daysInWeek
                        },
                        {
                            view: "uploader",
                            id: "photoUploader",
                            required:true,
                            invalidMessage: "Niste odabrali logo.",
                            width: 110,
                            height: 60,
                            css: "upload-logo",
                            template: "<span class='webix fa fa-upload' />Dodajte logo</span>",
                            on: {
                                onBeforeFileAdd: function (upload) {
                                    var type = upload.type.toLowerCase();
                                    console.log(type);
                                    if (type === "jpg" || type === "png" || type === "jpeg") {
                                        var file = upload.file;
                                        var reader = new FileReader();
                                        reader.onload = function (event) {
                                            var img = new Image();
                                            img.onload = function (ev) {
                                                if (img.width > 220 || img.height > 50) {
                                                    util.messages.showErrorMessage("Dimenzije logo-a moraju biti 220x50 px!");
                                                } else {
                                                    var newDocument = {
                                                        name: file['name'],
                                                        content: event.target.result.split("base64,")[1],
                                                    };
                                                    $$("companyLogoList").clearAll();
                                                    $$("companyLogoList").add(newDocument);

                                                }
                                            };
                                            img.src = event.target.result;
                                        };
                                        reader.readAsDataURL(file);
                                        return false;
                                    } else {
                                        util.messages.showErrorMessage("Dozvoljene ekstenzije  su jpg, jpeg i png!");

                                        return false;
                                    }

                                }
                            }
                        },
                        {
                            view:"button",
                            label:"Sačuvaj izmjene",
                            click:"companyInfoView.saveChanges",
                            width:150,
                            align:"right",
                            hotkey:"enter"
                        },
                    ]
                }
            ]

        }
    },

    showCompanyInfoDialog: function() {

        webix.ui(webix.copy(companyInfoView.companyInfoDialog));
        companyInfoView.setValues();
        setTimeout(function() {
            $$("companyInfoDialog").show();
        }, 0);
    },
    setValues: function(){
        var companyId = userData.companyId;
        var company;

        connection.sendAjax("GET",
            "hub/company/" + companyId, function (text, data, xhr) {
            //provjera svega
             company = data.json();
             $$("companyName").setValue(company.name);
             $$("companyPin").setValue(company.pin);
                var newDocument = {
                    name: '',
                    content: company.logo,
                }; 
             $$("companyLogoList").clearAll();
             $$("companyLogoList").add(newDocument);
             $$("daysInWeekCombo").setValue();
             $$("vacationDays").setValue();
             $$("sickDays").setValue();
             $$("nonWorkingDays").setValue();
            });
    },
    saveChanges: function () {
     companyId = userData.companyId;
     companyName = $$("companyName").getValue();
     companyLogo = $$("photoUploader").getValue();
     nonWorkingDay = $$("daysInWeekCombo").getValue();
     numberOfVacationDays = $$("vacationDays").getValue();
     numberOfSickDays = $$("sickDays").getValue();
     nonWorkingDays =  $$("nonWorkingDays").getValue();


 //       var validation = $$("companyInfoDialog").validate();
            //pozvati metodu, snimiti, ispisati poruku

    }
};

