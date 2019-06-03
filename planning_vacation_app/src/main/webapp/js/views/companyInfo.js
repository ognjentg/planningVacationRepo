var days =[
    {"id":8,"value":"Ponedjeljak"},
    {"id":9,"value": "Utorak"},
    {"id":10,"value":"Srijeda"},
    {"id":11,"value":"Četvrtak"},
    {"id":12,"value":"Petak"},
    {"id":13,"value":"Subota"},
    {"id":14,"value":"Nedjelja"}];

var updatedDays = [];
var startedSelectedValues = [];
var selectedDaysInWeekId = [];

var companyInfoView = {

    companyInfoDialog : {
        view: "popup",
        id: "companyInfoDialog",
        name: "companyInfoDialog",
        position: "center",
        modal: true,
        width:620,
        height:500,
        body:
            {
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
            cols:[
                {
                    width:265,
                    rows:[
                        {
                            view:"toolbar",
                            type:"MainBar",
                            elements:[
                                {
                                    view:"datepicker",
                                    id:"nonWorkingDaysDTP",
                                    name: "nonWorkingDaysDTP",
                                    stringResult:true,
                                    css:"non-working-day-dtp",
                                    // icon: "plus-circle",
                                    format:"%d %m %y",
                                    label: 'Odaberite neradni dan',
                                    labelWidth: 140
                                }
                            ]
                        },
                        {
                            view:"datatable",
                            id:"nonWorkingDaysDT",
                            adjust:true,
                            select: "row",
                            navigation: true,
                            columns:[
                                { id:"#", hidden:true,  header:"", },
                                { id:"day",   header:"Neradni dani",  width:227},
                                {
                                    id: "delete",
                                    header: "&nbsp;",
                                    width: 35,
                                    cssFormat: checkBoxStatus,
                                    template: "<span  style='color:#777777; 0; cursor:pointer;' class='webix_icon fa-trash-o'></span>",

                                },
                            ],

                            onClick: {
                                webix_icon: function (e, id) {
                                    var delBox = (webix.copy(commonViews.deleteConfirm("ukloniti dan iz liste neradnih dana")));
                                    delBox.callback = function (result) {
                                        if (result == 1) {
                                            var dataTableValue = $$("nonWorkingDaysDT").getItem(id);
                                            if(updatedDays.includes(dataTableValue))
                                                updatedDays = updatedDays.filter(function(element){return element.day !== dataTableValue.day});
                                            else
                                                updatedDays.push(dataTableValue);
                                            $$("nonWorkingDaysDT").remove(id);
                                        }
                                    };
                                    webix.confirm(delBox);
                                }}
                                },]
                },
                {
                    width:350,
                    rows:[
                {
                    view:"form",
                    id:"companyInfoForm",
                    width:600,
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
                            view:"multicombo",
                            id:"nonWorkingDaysInWeek",
                            name:"nonWorkingDaysInWeek",
                            value: "",
                            label: "Sedmični neradni dani:",
                            placeholder:"Neradni dani u sedmici",
                            newValues: true,
                            suggest: days,
                            on:{}
                        },
                        {
                            view: "uploader",
                            id: "photoUploader",
                            required:true,
                            invalidMessage: "Niste odabrali logo.",
                            width: 110,
                            height: 60,
                            css: "upload-logo-company",
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
                            view: "list",
                            name: "companyLogoList",
                            rules: {
                                content: webix.rules.isNotEmpty
                            },
                            scroll: false,
                            id: "companyLogoList",
                            width: 372,
                            type: {
                                height: "auto"
                            },
                            css: "relative image-upload",
                            template: "<img src='data:image/jpg;base64,#content#'/> <span class='delete-file'><span class='webix fa fa-close'/></span>",
                            onClick: {
                                'delete-file': function (e, id) {
                                    this.remove(id);
                                    return false;
                                }
                            }
                        },]},

                    ]
                }
            ]

        },
                {
                    view:"button",
                    label:"Sačuvaj izmjene",
                    click:"companyInfoView.saveChanges",
                    width:150,
                    align:"right",
                    hotkey:"enter"
                },],
    }},

    showCompanyInfoDialog: function() {
        webix.ui(webix.copy(companyInfoView.companyInfoDialog));
        companyInfoView.setValues();

        $$("nonWorkingDaysDTP").attachEvent("onChange", function(newValue) {
            var date = webix.Date.dateToStr("%Y-%m-%d")(newValue);
            var editBox = (webix.copy(commonViews.confirmOkCancel("Dodavanje neradnog dana", "Da li ste sigurni da želite da označite " + date + " kao neradni dan?")));
            var dataTableValue;

            if("" != date){
            editBox.callback = function (result) {
                if (result == 1) {
                    dataTableValue = {
                      day: date
                    };

                    if(updatedDays.includes(date))
                        updatedDays = updatedDays.filter(function(element){return element.day !== dataTableValue.day;});
                          else
                            updatedDays.push(dataTableValue);

                        $$("nonWorkingDaysDT").add(dataTableValue);
                }
            };
            webix.confirm(editBox);
            $$("nonWorkingDaysDTP").setValue("");
            }
        });
        setTimeout(function() {
            $$("companyInfoDialog").show();
        }, 0);
    },
    setValues: function(){
        var companyId = userData.companyId;

        connection.sendAjax("GET",
            "hub/company/" + companyId, function (text, data, xhr) {
             var company = data.json();
             $$("companyName").setValue(company.name);
             $$("companyPin").setValue(company.pin);
                var newDocument = {
                    name: '',
                    content: company.logo,
                };

                $$("companyLogoList").clearAll();
                $$("companyLogoList").add(newDocument);
             });

        connection.sendAjax("GET",
            "hub/constraints/" + companyId, function (text, data, xhr) {
                var constraints = data.json();
                $$("vacationDays").setValue(constraints.maxVacationDays);
                $$("sickDays").setValue(constraints.sickLeaveJustificationPeriodLength);
            });

        connection.sendAjax("GET",
            "/hub/nonWorkingDay/getNonWorkingDayByCompany/" + companyId,
            function (text, data, xhr) {
             if(text){
                 var nonWorkingDays = data.json();
                 for(var i = 0; i < nonWorkingDays.length; i++)
                     $$("nonWorkingDaysDT").add(nonWorkingDays[i]);
             }
            });

        connection.sendAjax("GET",
            "/hub/nonWorkingDayInWeek/getNonWorkingDayInWeekByCompany/" + companyId,
            function (text, data, xhr) {
                if(text){
                    var daysInWeek = data.json();
                    var values="";
                   for(var i = 0; i < daysInWeek.length; i++)
                    {
                        for(var j = 0; j < days.length; j++)
                        if(daysInWeek[i].dayInWeekId == days[j].id){
                            values+= days[j].id + ",";
                        }}

                    $$('nonWorkingDaysInWeek').setValue(values);
                    startedSelectedValues = $$("nonWorkingDaysInWeek").getValue().split(",").filter(function(s){return s;}).map(function(s){return parseInt(s)})
                }
       });
    },
    saveChanges: function () {
     var logo = $$("companyLogoList");
     var companyId = userData.companyId;
     var companyName = $$("companyName").getValue();
     var numberOfVacationDays = $$("vacationDays").getValue();
     var numberOfSickDays = $$("sickDays").getValue();
     var companyPin = $$("companyPin").getValue();

        //       var validation = $$("companyInfoDialog").validate();
        var  company= {
         id: companyId,
         name: companyName,
         pin: companyPin,
         active: 1,
         logo: logo.getItem(logo.getLastId()).content
     };

        connection.sendAjax("PUT", "hub/company/" + companyId,
            function (text, data, xhr) {
            }, function (text, data, xhr) {
                alert(text);
            }, company);

        var selectedDays = $$("nonWorkingDaysInWeek").getValue().split(",").filter(function(s){return s;}).map(function(s){return parseInt(s)})
        //svi dani u sedmici koji su selektovani u multicombo-u

        var daysId = [];


        for(var i = 0; i < selectedDays.length; i++){
            if(!startedSelectedValues.includes(selectedDays[i]))
                daysId.push(selectedDays[i]); //svi dani koji su sada selektovani
        }

        for(var i = 0; i < startedSelectedValues.length; i++){
           if(!selectedDays.includes(startedSelectedValues[i]))
             daysId.push(startedSelectedValues[i]); //svi dani koji su bili selektovani, a sada nisu
        }

        var nonWorkingDaysInWeek = []; //saljem samo dane koji nisu bili cekirani ili dane u sedmici koji su otcekirani pri pokretanju aplikacije
        var dayId;
        var nonWorkingDayInWeek;

        for(var i = 0; i < daysId.length; i++) {
            dayId = daysId[i];
            nonWorkingDayInWeek = {
                dayInWeekId: dayId,
                companyId: companyId,
                from: null,
                active: 0,
                to: null,
            };
            nonWorkingDaysInWeek.push(nonWorkingDayInWeek);
        }

       connection.sendAjax("POST", "/hub/nonWorkingDayInWeek/addNonWorkingDaysInWeek/",
            function (text, data, xhr) {
            }, function (text, data, xhr) {
                 alert(text);
            }, nonWorkingDaysInWeek);

        var nonWorkingDaysInYear = []; //saljem samo dane koji nisu bili cekirani ili dane koji su otcekirani pri pokretanju aplikacije

        for(var i = 0; i < updatedDays.length; i++) {
            var nonWorkingDayInYear = {
                day: updatedDays[i].day,
                companyId: companyId,
                active: 0
            }
            nonWorkingDaysInYear.push(nonWorkingDayInYear);
        }
        updatedDays = [];
        connection.sendAjax("POST", "/hub/nonWorkingDay/addNonWorkingDays/",
            function (text, data, xhr) {
            }, function (text, data, xhr) {
                alert(text);
            }, nonWorkingDaysInYear);

        var constraints = {
            companyId:companyId,
            maxVacationDays:numberOfVacationDays,
            vacationPeriodLength:1,
            sickLeaveJustificationPeriodLength:numberOfSickDays
        }

        connection.sendAjax("POST", "/hub/constraints",
            function (text, data, xhr) {
                if (text) {
                } else {
                    alert("Greška u izmjeni broja dana godišnjeg ili bolovanja.");
                }
            }, function (text, data, xhr) {
                alert(text);
            }, constraints);

        alert("Uspješno izvršena izmjena podataka o kompaniji");
        util.dismissDialog('companyInfoDialog');
    }
};

