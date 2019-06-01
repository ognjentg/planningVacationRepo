var daysInWeek =[
    {"id":8,"value":"Ponedjeljak"},
    {"id":9,"value": "Utorak"},
    {"id":10,"value":"Srijeda"},
    {"id":11,"value":"Četvrtak"},
    {"id":12,"value":"Petak"},
    {"id":13,"value":"Subota"},
    {"id":14,"value":"Nedjelja"}];

var companyInfoView = {

    companyInfoDialog : {
        view: "popup",
        id: "companyInfoDialog",
        name: "companyInfoDialog",
        position: "center",
        modal: true,
        width:620,
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
                                {view:"datepicker",   id:"nonWorkingDays", name: "select_date",  label: 'Odaberite neradni dan', labelWidth: 140 }
                            ]
                        },
                        { view:"datatable",
                            adjust:true,
                            columns:[
                                { id:"#", hidden:true,  header:"", },
                                { id:"title",   header:"Neradni dani",  width:264},
                            ],
                            data: [
                                { id:1, title:"2019-05-03",},
                                { id:2, title:"2019-05-02",}
                            ]},]
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
                            value:"",
                            label: "Sedmični neradni dani",
                            placeholder:"Neradni dani u sedmici",
                            newValues: true,
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
        setTimeout(function() {
            $$("companyInfoDialog").show();
        }, 0);
    },
    setValues: function(){
        var companyId = userData.companyId;


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
             });

        connection.sendAjax("GET",
            "hub/constraints/" + companyId, function (text, data, xhr) {
                constraints = data.json();
             //   $$("daysInWeekCombo").setValue();
                $$("vacationDays").setValue(constraints.maxVacationDays);
                $$("sickDays").setValue(constraints.sickLeaveJustificationPeriodLength);
            });

        connection.sendAjax("GET",
            "/hub/nonWorkingDay/getNonWorkingDayByCompany/" + companyId,
            function (text, data, xhr) {
             if(text){
              //   alert(33);
                 nonWorkingDays = data.json();
         //        for( i = 0; i < nonWorkingDays.length; i++)
       //          alert(nonWorkingDays[i].day);
             }
                //dobijam listu neradnih dana, jedna od ideja je prolazenje kroz
                //tu listu i oznacavanje u DTP tih dana
                //$$("nonWorkingDays").setValue();
            });

        connection.sendAjax("GET",
            "/hub/nonWorkingDayInWeek/getNonWorkingDayInWeekByCompany/" + companyId,
            function (text, data, xhr) {
                if(text){
                    daysInWeek = data.json();
                    for( i = 0; i < daysInWeek.length; i++)
                             alert(daysInWeek[i].dayInWeekId);

                }

               //staviti cekirano u comb ako je neradni dan
            });



    },
    saveChanges: function () {
     var logo = $$("companyLogoList");
     var companyId = userData.companyId;
     var companyName = $$("companyName").getValue();
     //var companyLogo = $$("photoUploader").getValue();
    // var nonWorkingDayInWeek = $$("nonWorkingDaysInWeek").getValue();

     var numberOfVacationDays = $$("vacationDays").getValue();
     var numberOfSickDays = $$("sickDays").getValue();
     var nonWorkingDays =  $$("nonWorkingDays").getValue();
     var companyPin = $$("companyPin").getValue();

        var  company= {
         id: companyId,
         name: companyName,
         pin: companyPin,
         active: 1,
         logo: logo.getItem(logo.getLastId()).content
     };


        connection.sendAjax("PUT", "hub/company/" + companyId,
            function (text, data, xhr) {
                if (text) {
                } else {
                    //alert("Greška u dodavanju admina.");
                //    button.enable();
                }
            }, function (text, data, xhr) {
            //    alert(text);
          //      button.enable();
            }, company);

        var dayId = $$("nonWorkingDaysInWeek").getValue();
        var nonWorkingDayInWeek = {
          dayInWeekId: dayId,
          companyId: companyId,
          from: null,
          active:0,
          to: null,
        };
         
       connection.sendAjax("POST", "hub/nonWorkingDayInWeek/",
            function (text, data, xhr) {
                if (text) {
                    alert(2)
                } else {
                    alert("Greška u dodavanju neradnih dana u sedmici .");
                    //    button.enable();
                }
            }, function (text, data, xhr) {
                alert(text);
      //          button.enable();
            }, nonWorkingDayInWeek);


      /*  var date = new Date($$("nonWorkingDays").getValue());
        var nonWorkingDayInYear = {
           day:date,
           companyId:companyId,
           active:0
        }*/
/*
        connection.sendAjax("POST", "hub/nonWorkingDay/",
            function (text, data, xhr) {
                if (text) {
                    alert(2)
                } else {
                    //alert("Greška u dodavanju neradnog dana.");
                       //button.enable();
                }
            }, function (text, data, xhr) {
                alert(text);
            }, nonWorkingDayInYear);
        */

        var constraints = {
            companyId:companyId,
            maxVacationDays:numberOfVacationDays,
            vacationPeriodLength:1,
            sickLeaveJustificationPeriodLength:numberOfSickDays
        }

        connection.sendAjax("POST", "/hub/constraints",
            function (text, data, xhr) {
                if (text) {
                    alert(2)
                } else {
                    //alert("Greška u dodavanju neradnog dana.");
                    //button.enable();
                }
            }, function (text, data, xhr) {
                alert(text);
            }, constraints);


        util.dismissDialog('companyInfoDialog');
 //       var validation = $$("companyInfoDialog").validate();
            //pozvati metodu, snimiti, ispisati poruku

    }
};

