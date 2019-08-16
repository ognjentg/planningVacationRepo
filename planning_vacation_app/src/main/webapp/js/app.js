var appVersion = 0.1;
var MENU_STATES = {
    COLLAPSED: 0,
    EXPANDED: 1
};
var menuState = MENU_STATES.COLLAPSED;

//menu configuration - EDITABLE
var settingsMenu = [];
var notifications = [];
var numberOfUnreadNotifications = 0;
var notificationsMenu = [];
var localMenuData = [
    {id: "template", value: "Template", icon: "code"},
    {id: "sector", value: "Sektor", icon: "code"},
    {id: "usergroup", value: "Zaposleni", icon: "users"},
    {id: "company", value: "Kompanije", icon: "fa fa-briefcase"},
    {id: "calendar", value: "Kalendar", icon: "code"},
    {id: "constraints", value: "Ograničenja", icon: "briefcase"},
    {id: "admins", value: "Admini kompanija", icon: "list"},
    {id: "secretary_sick_request", value: "Pregled zahtjeva", icon: "far fa-envelope"},
    {id: "leave_requests", value: "Pregled zahtjeva za odmor", icon: "list"},
    {id: "absence_history", value: "Isotrija odsustava", icon: "fas fa-history"},
    {id: "company_statistic", value: "Statistika kompanije", icon: "fas fa-line-chart"},
    {id: "user_statistics", value: "Statistika korisnika", icon: "fas fa-pie-chart"}
];

var menuActions = function (id) {
    switch (id) {
        case "template":
            templateView.selectPanel();
            break;

        case "sector":
            sectorView.selectPanel();
            break;

        case "usergroup":
            usergroupView.selectPanel();
            break;

        case "company":
            companyView.selectPanel();
            break;
        case "calendar":
            calendarView.selectPanel();
            break;
        case "sectorInfo":
            sectorInfoView.showSectorDialog();
            break;
        case "constraints":
            //constraints.selectPanel();
            break;
        case "admins":
            adminsView.selectPanel();
            break;
        case "secretary_sick_request":
            sickRequestsView.selectPanel();
            break;
        case "leave_requests":
            leaveRequestsView.selectPanel();
            break;
        case "absence_history":
            absenceHistoryView.selectPanel();
            break;
        case "company_statistic":
            companyStatisticView.selectPanel();
            break;
        case "user_statistics":
            userStatisticsView.selectPanel();
            break;
        case "sector_statistics":
            sectorStatisticsView.selectPanel();
            break;
    }

};

var menuSuperAdmin = [
    /*{
        id: "company",
        value: "Kompanije",
        icon: "briefcase"
    }*/
];

var menuAdmin = [
    {
        id: "calendar",
        value: "Kalendar",
        icon: "fa fa-calendar"
    },
    {
        id: "usergroup",
        value: "Zaposleni",
        icon: "users"
    },
    {
        id: "sector",
        value: "Sektori",
        icon: "briefcase"
    },
    {
        id: "leave_requests",
        value: "Zahtjevi za odmor",
        icon: "list"
    }, {
        id: "company_statistic",
        value: "Statistika kompanije",
        icon: "fas fa-line-chart"
    }, {
        id: "user_statistics",
        value: "Statistika korisnika",
        icon: "fas fa-pie-chart"
    }, {
        id: "sector_statistics",
        value: "Statistika sektora",
        icon: "fas fa-bar-chart"
    }
];

var menuDirector = [
    {
        id: "calendar",
        value: "Kalendar",
        icon: "fa fa-calendar"
    },
    {
        id: "usergroup",
        value: "Zaposleni",
        icon: "users"
    },
    {
        id: "sector",
        value: "Sektori",
        icon: "briefcase"
    },
    {
        id: "leave_requests",
        value: "Zahtjevi za odmor",
        icon: "list"
    }, {
        id: "company_statistic",
        value: "Statistika kompanije",
        icon: "fas fa-line-chart"
    }, {
        id: "user_statistics",
        value: "Statistika korisnika",
        icon: " fas fa-pie-chart"
    }, {
        id: "sector_statistics",
        value: "Statistika sektora",
        icon: "fas fa-bar-chart"
    }
];

var menuSecretary = [
    {
        id: "calendar",
        value: "Kalendar",
        icon: "fa fa-calendar"
    },

    {
        id: "secretary_sick_request",
        value: "Zahtjevi za bolovanje",
        icon: "far fa-envelope"
    },
    {
        id: "usergroup",
        value: "Zaposleni",
        icon: "users"
    },
    {
        id: "sector",
        value: "Sektori",
        icon: "briefcase"
    },
    {
        id: "leave_requests",
        value: "Zahtjevi za odmor",
        icon: "list"
    },
    {
        id: "absence_history",
        value: "Istorija odsustva",
        icon: "fas fa-history"
    }, {
        id: "company_statistic",
        value: "Statistika kompanije",
        icon: "fas fa-line-chart"
    }, {
        id: "user_statistics",
        value: "Statistika korisnika",
        icon: "fas fa-pie-chart"
    },
    {
        id: "sector_statistics",
        value: "Statistika sektora",
        icon: "fas fa-bar-chart"
    }
];

var menuSectorManager = [
    {
        id: "calendar",
        value: "Kalendar",
        icon: "fa fa-calendar"
    },
    {
        id: "usergroup",
        value: "Zaposleni",
        icon: "users"
    },
    {
        id: "leave_requests",
        value: "Zahtjevi za odmor",
        icon: "list"
    },
    {
        id: "absence_history",
        value: "Isotrija odsustava",
        icon: "fas fa-history"
    }, {
        id: "company_statistic",
        value: "Statistika kompanije",
        icon: "fas fa-line-chart"
    }, {
        id: "user_statistics",
        value: "Statistika korisnika",
        icon: " fas fa-pie-chart"
    }
];

var menuWorker = [
    {
        id: "calendar",
        value: "Kalendar",
        icon: "fa fa-calendar"
    },
    {
        id: "absence_history",
        value: "Isotrija odsustava",
        icon: "fas fa-history"
    }
];
var settingsMenuActions = function (id) {
    switch (id) {
        case "0":
            companyInfoView.showCompanyInfoDialog();
            break;
        case "1":
            showAboutDialog();
            break;
        case "2":
            changePasswordView.showChangePasswordDialog();
            break;
        case "3":
            profileView.showProfileDialog();
            break;
        case "4":
            logout();
            break;
    }
};

//core app - DO NOT EDIT
var panel = {id: "empty"};
var rightPanel = null;

var userData = null;
var companyData = null;

var init = function () {
    if (!webix.env.touch && webix.ui.scrollSize) webix.CustomScroll.init();
    localize();
    webix.ui(panel);
    panel = $$("empty");
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
    webix.ajax("hub/user/state", {
        error: function (text, data, xhr) {
            if (xhr.status == 403) { // TODO praksa obrisati || true uslov nakon sto se napravi hub/state endpoint na backendu
                showLogin();
            }
        },
        success: function (text, data, xhr) {
            if (xhr.status == "200") {
                if (data.json() != null && data.json().id != null) {
                    userData = data.json();
                    if (userData.userGroupKey == "superadmin") {
                        companyData = null;
                        showApp();
                    } else {
                        webix.ajax().get("hub/company/" + userData.companyId, {
                            success: function (text, data, xhr) {
                                var company = data.json();
                                if (company != null) {
                                    companyData = company;
                                    if( userData.firstName==null && userData.lastName==null /*userData.firstLogin === 1*/) {
                                        showFirstLogin(); //uspjesan login, prikaz layout-a za to...
                                    }else {
                                        showApp();
                                    }
                                } else {
                                    showLogin();
                                }
                            },
                            error: function (text, data, xhr) {
                                showLogin();
                            }
                        });
                    }
                    //showApp();
                    // showLogin();
                }
            }
        }
    });
}

var tabCompleted=[false, false, false, false];
var firstLoginTabs = []
var profileTab = {
    header: "Profil",
        body: {
    id: "formProfileInformation",
        view: "form",
        width: 500,
        elementsConfig: {
        labelWidth: 140,
            bottomPadding: 5  //TODO: change other forms
    },
    elements: [
        {
            view: "text",
            id: "base64ImageUser",
            name: "base64ImageUser",
            hidden: true
        },
        {
            cols: [
                {},
                {
                    view: "template",
                    id: "preview",
                    name: "preview",
                    template: "<img style='height: 100%; width: 100%;' src='#src#'>",
                    data: {src: null},
                    height: 200,
                    width: 200,
                },
                {}
            ]
        },
        {
            cols: [
                {},
                {
                    view: "uploader",
                    id: "photoUploader",
                    name: "photoUploader",
                    value: "Odaberi sliku",
                    link: "photo",
                    multiple: false,
                    autosend: false,
                    accept: "image/*",
                    width: 150,
                    on: {
                        onBeforeFileAdd: function (upload) {
                            var file = upload.file;
                            if(file.size > 1048576){
                                util.messages.showErrorMessage("Maksimalna veličina slike je 1MB.");
                                return false;
                            }
                            var reader = new FileReader();
                            reader.onload = function (ev) {
                                $$("preview").setValues({src: ev.target.result});
                                $$("base64ImageUser").setValue(ev.target.result.split("base64,")[1]);
                            }
                            reader.readAsDataURL(file)
                            return false;
                        }
                    }
                },
                {}
            ]
        },
        {
            cols: [
                {},
                {
                    view: "text",
                    required: true,
                    id: "firstName",
                    name: "firstName",
                    label: "Ime",
                    invalidMessage: "Niste unijeli ime.",
                    labelWidth: 90,
                    height: 35
                },
                {}
            ]
        },
        {
            cols: [
                {},
                {
                    view: "text",
                    required: true,
                    id: "lastName",
                    name: "lastName",
                    label: "Prezime",
                    invalidMessage: "Niste unijeli prezime.",
                    labelWidth: 90,
                    height: 35
                },
                {}
            ]
        },
        {
            cols: [
                {},
                {
                    view: "checkbox",
                    id: "receiveMail",
                    name: "receiveMail",
                    label: "Želim da primam obavještenja na e-mail.",
                    labelWidth: 320,
                    height: 35
                },
                {}
            ]
        },
        {
            cols: [
                {},
                {
                    view: "button",
                    id: "saveProfileButton",
                    name: "saveProfileButton",
                    hotkey: "enter",
                    label: "Sačuvaj",
                    type: "iconButton",
                    icon: "save",
                    width: 150,
                    align: "center",
                    click: "firstLoginLayout.save"
                },
                {}
            ]
        }
    ]
}
};
var passwordTab ={
    header: "Lozinka",
        body: {
    id: "formChangePassword",
        view: "form",
        width: 500,
        elementsConfig: {
        labelWidth: 140,
            bottomPadding: 18
    },
    elements: [
        {
            view: "text",
            id: "oldPassword",
            type: "password",
            name:"oldPassword",
            label: "Trenutna lozinka:",
            invalidMessage:"Unesite lozinku!",
            required: true

        },
        {
            view: "text",
            label: "Nova lozinka:",
            id: "newPassword",
            name:"newPassword",
            type: "password",
            invalidMessage:"Unesite lozinku!",
            required: true,
            bottomLabel: "*Min. 8 karaktera. Barem 1 veliko slovo, broj ili specijalni karakter.",
            keyPressTimeout:1000,
            on: {
                'onTimedKeyPress': function () {
                    var typed = $$("newPassword").getValue();
                    var strength=0;
                    var re1=/[0-9]/;
                    var re2=/[A-Z]/;
                    var re3=/[@#$%^&+=]/;
                    if(re1.test(typed))
                        strength++;
                    if (re2.test(typed))
                        strength++;
                    if (re3.test(typed))
                        strength++;
                    if(typed.length>=8)
                        strength++;
                    switch(strength){
                        case 0:
                        case 1:
                        case 2:
                            $$("strength").setValue("Jačina lozinke: slabo");
                            $$("strength").show();
                            break;
                        case 3:
                            $$("strength").setValue("Jačina lozinke: srednje");
                            $$("strength").show();
                            break;
                        case 4:
                            $$("strength").setValue("Jačina lozinke: jako");
                            $$("strength").show();
                            break;
                    }

                }

            }

        },
        {
            view: "label",
            id:"strength",
            name:"strength",
            hidden:true,
            height:15,
            align:"right"
        },
        {
            view: "text",
            label: "Potvrda nove lozinke:",
            id: "newPasswordConfirmation",
            name:"newPasswordConfirmation",
            invalidMessage:"Unesite lozinku!",
            type: "password",
            required: true,

        },

        {
            view: "button",
            id: "changePasswordBtn",
            name: "changePasswordBtn",
            label: "Sačuvaj",
            width: 150,
            click: "firstLoginLayout.savePassword",
            align: "right",
            hotkey: "enter"
        }
    ],
        rules: {
        "oldPassword":function (value) {
            if (!value)
                return false;
            return true;
        },
        "newPassword": function (value) {
            if(value.length<8){
                $$('formChangePassword').elements.newPassword.config.invalidMessage="Lozinka mora imati minimum 8 karaktera!";
                return false;}
            if (value == $$("oldPassword").getValue()){
                $$('formChangePassword').elements.newPassword.config.invalidMessage="Lozinka ne smije biti jednaka staroj lozinki!";
                return false;
            }
            var re = /[0-9A-Z@#$%^&+=]/;
            if (!re.test(value)) {
                $$('formChangePassword').elements.newPassword.config.invalidMessage="Lozinka mora sadržati barem jedan broj, veliko slovo ili specijalan karakter!";
                return false;
            }
            return true;
        },
        "newPasswordConfirmation":function (value) {
            if (!value)
                return false;
            if(value!=$$("formChangePassword").getValues().newPassword)
            {
                $$('formChangePassword').elements.newPasswordConfirmation.config.invalidMessage = 'Unešene lozinke nisu iste!';
                return false;}

            return true;

        },
    }
}
};
var companyTab ={
    header: "Kompanija",
        body: {
    view: "form",
        id: "formCompanyInformation",
        name:"formCompanyInformation",
        width:650,
        elementsConfig: {
        labelWidth: 190,
            bottomPadding: 18
    },
    elements:[
        {
            view:"text",
            id:"companyName",
            name:"companyName",
            label:"Naziv kompanije:",
            required:true,
            invalidMessage: "Niste unijeli naziv kompanije",
        },
        {
            view:"text",
            label:"PIN:",
            id:"companyPin",
            disabled:true,
            hidden:true
        },
        {
            view: "uploader",
            id: "photoUploader",
            required:true,
            invalidMessage: "Niste odabrali logo.",
            width: 400,
            height: 50,
            value: "Dodajte logo",
            on: {
                onBeforeFileAdd: function (upload) {
                    var type = upload.type.toLowerCase();
                    console.log(type);
                    if (type === "jpg" || type === "png" || type === "jpeg") {
                        var file = upload.file;
                        if(file.size > 1048576){
                            util.messages.showErrorMessage("Maksimalna veličina slike je 1MB.");
                            return false;
                        }
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
        },
        {
            view: "button",
            id: "saveCompanyBtn",
            name: "saveCompanyBtn",
            label: "Sačuvaj",
            width: 150,
            type: "iconButton",
            icon: "save",
            click: "firstLoginLayout.saveCompany",
            align: "center",
            hotkey: "enter"
        }
    ]
    // list config
}
};

var days =[
    {"id":8,"value":"Ponedjeljak"},
    {"id":9,"value": "Utorak"},
    {"id":10,"value":"Srijeda"},
    {"id":11,"value":"Četvrtak"},
    {"id":12,"value":"Petak"},
    {"id":13,"value":"Subota"},
    {"id":14,"value":"Nedjelja"}];
var updatedDays = [];
var updatedCollectiveVacations = [];
var startedSelectedValues = [];

var constraintsTab = {
    header: "Ogranicenja",
        body: {
                view:"scrollview",
                id:"verses",
                scroll:"y", // vertical scrolling
                //height: 600,//"auto",
                //width: 150,
                body: {

             ///////////////////////////////////
               cols:[
                        {gravity:0.1},
                        {
                    id: "formConstrainsInformation",
                    view: "form",
                    width: 800,
                    elementsConfig: {
                        labelWidth: 90,
                        bottomPadding: 5
                    },
                    elements: [{
                        rows: [{
                            // {///
                           // width: 300,
                            rows: [
                                {
                                    view: "form",
                                    id: "companyInfoForm",
                                    name: "companyInfoForm",
                                    width: 140,
                                    elementsConfig: {
                                        labelWidth: 200,
                                        bottomPadding: 18
                                    },
                                    elements: [
                                        {
                                            view: "text",
                                            label: "Broj dana godišnjeg:",
                                            id: "vacationDays",
                                        },
                                        {
                                            view: "text",
                                            label: "Maksimalni period godišnjeg:",
                                            id: "maxVacDaysPeriod",
                                        },
                                        {
                                            view: "text",
                                            label: "Period starog godišnjeg:",
                                            id: "maxOldVacationPeriod",
                                        },
                                        {
                                            view: "text",
                                            label: "Period opravdanja bolovanja:",
                                            id: "sickDays",
                                        },
                                        {
                                            view: "multicombo",
                                            id: "nonWorkingDaysInWeek",
                                            name: "nonWorkingDaysInWeek",
                                            value: "",
                                            label: "Sedmični neradni dani:",
                                            placeholder: "Neradni dani u sedmici",
                                            newValues: true,
                                            suggest: days,
                                            on: {}
                                        }]
                                },

                            ]
                        },
                            {
                                width: 350,
                                rows: [
                                    {
                                        view: "toolbar",
                                        type: "MainBar",
                                        elements: [
                                            {
                                                view: "datepicker",
                                                id: "nonWorkingDaysDTP",
                                                name: "nonWorkingDaysDTP",
                                                stringResult: true,
                                                format: "%d.%m.%Y.",
                                                label: 'Odaberite neradni dan',
                                                labelWidth: 140
                                            }
                                        ]
                                    },
                                    {
                                        view: "datatable",
                                        id: "nonWorkingDaysDT",
                                        adjust: true,
                                        select: "row",
                                        navigation: true,
                                        tooltip: {
                                            dx: -35, //20 by default
                                            dy: 20
                                        },
                                        columns: [
                                            {
                                                id: "#",
                                                hidden: true,
                                                header: "",
                                            },
                                            {
                                                id: "day",
                                                header: "Neradni dani",
                                                width: 310
                                            },
                                            {
                                                id: "delete",
                                                header: "&nbsp;",
                                                tooltip: "Brisanje",
                                                fillspace: true,
                                                width: 35,
                                                cssFormat: "checkBoxStatus",
                                                template: "<span  style='color:#777777; 0; cursor:pointer;' class='webix_icon fa-trash-o'></span>",

                                            },
                                        ],

                                        onClick: {
                                            webix_icon: function (e, id) {

                                                var dataTableValue = $$("nonWorkingDaysDT").getItem(id);
                                                var day = dataTableValue.day;
                                                var delBox = (webix.copy(commonViews.deleteConfirm("Uklanjanje dana iz liste neradnih dana", day + " iz neradnih dana")));
                                                delBox.callback = function (result) {
                                                    if (result == 1) {
                                                        var format = webix.Date.strToDate("%d.%m.%Y.");
                                                        var string = format(day);
                                                        var newFormat = webix.Date.dateToStr("%Y-%m-%d");
                                                        var newDate = newFormat(string); //datum u formatu kakav je potreban za backend stranu
                                                        dataTableValue.day = newDate;
                                                        if (updatedDays.includes(dataTableValue))
                                                            updatedDays = updatedDays.filter(function (element) {
                                                                return element.day !== dataTableValue.day
                                                            });
                                                        else {
                                                            updatedDays.push(dataTableValue);
                                                        }
                                                        $$("nonWorkingDaysDT").remove(id);
                                                    }
                                                };
                                                webix.confirm(delBox);
                                            }
                                        }
                                    },
                                    {
                                        view: "label",
                                        label: "Kolektivni godišnji odmori:",
                                        align: "left"
                                    },
                                    {
                                        cols: [
                                            {

                                                view: "datepicker",
                                                id: "collectiveVacationFromDTP",
                                                name: "collectiveVacationFromDTP",
                                                stringResult: true,
                                                format: "%d.%m.%Y.",
                                                label: 'Od:',
                                                labelWidth: 30
                                            },
                                            {
                                                view: "datepicker",
                                                id: "collectiveVacationToDTP",
                                                name: "collectiveVacationToDTP",
                                                stringResult: true,
                                                format: "%d.%m.%Y.",
                                                label: 'Do:',
                                                labelWidth: 30
                                            },
                                            {
                                                id: "addCollectiveVacationBtn",
                                                view: "button",
                                                type: "iconButton",
                                                icon: "plus-circle",
                                                css: "companyButton",
                                                view: "button",
                                                click: "companyInfoView.addCollectiveVacation",
                                                width: 40,
                                                align: "center",
                                                hotkey: "enter"
                                            }
                                        ]
                                    },
                                    {
                                        view: "datatable",
                                        id: "collectiveVacationDT",
                                        label: "Kolektivni godišnji odmor:",
                                        adjust: true,
                                        select: "row",
                                        tooltip: {
                                            dx: -35, //20 by default
                                            dy: 20
                                        },
                                        navigation: true,
                                        columns: [
                                            {
                                                id: "#",
                                                hidden: true,
                                                header: "",
                                            },
                                            {
                                                id: "dateFrom",
                                                header: "Od",
                                                width: 156
                                            },
                                            {
                                                id: "dateTo",
                                                header: "Do",
                                                width: 156
                                            },
                                            {
                                                id: "delete",
                                                header: "&nbsp;",
                                                tooltip: "Brisanje",
                                                fillspace: true,
                                                cssFormat: "checkBoxStatus",
                                                template: "<span  style='color:#777777; 0; cursor:pointer;' class='webix_icon fa-trash-o'></span>",

                                            },
                                        ],

                                        onClick: {
                                            webix_icon: function (e, id) {
                                                var dataTableValue = $$("collectiveVacationDT").getItem(id);
                                                var dateFrom = dataTableValue.dateFrom;
                                                var dateTo = dataTableValue.dateTo;
                                                var delBox = (webix.copy(commonViews.deleteConfirm("kolektivnog godišnjeg odmora", "period " + dateFrom + " - " + dateTo + " iz liste kolektivnih godišnjih odmora")));
                                                delBox.callback = function (result) {
                                                    if (result == 1) {
                                                        var format = webix.Date.strToDate("%d.%m.%Y.");
                                                        var stringDateFrom = format(dateFrom);
                                                        var stringDateTo = format(dateTo);
                                                        var newFormat = webix.Date.dateToStr("%Y-%m-%d");
                                                        var newDateFrom = newFormat(stringDateFrom); //datum u formatu kakav je potreban za backend stranu
                                                        var newDateTo = newFormat(stringDateTo);
                                                        dataTableValue.dateFrom = newDateFrom;
                                                        dataTableValue.dateTo = newDateTo;

                                                        if (updatedDays.includes(dataTableValue)) {
                                                            updatedCollectiveVacations = updatedCollectiveVacations.filter(function (element) {
                                                                return element.dateFrom !== dateFrom && element.dateTo !== dateTo;
                                                            });
                                                        } else {
                                                            updatedCollectiveVacations.push(dataTableValue);
                                                        }
                                                        $$("collectiveVacationDT").remove(id);
                                                    }
                                                };
                                                webix.confirm(delBox);
                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                id: "saveInformation",
                                view: "button",
                                label: "Sacuvajte i predjite na aplikaciju",
                                type: "iconButton",
                                //icon: "sign-in",
                                click: "showApp",
                                align: "center",
                                hotkey: "enter",
                                width: 580,
                                height: 40
                            }
                        ]
                    }]

                },
{gravity:0.1, height:200}]
/////////////////////////////////////////
                }
            }
};

var sectorTab = {
    header:"Sektor",
    body:{
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
                        click: "firstLoginLayout.saveSector"
                    }
                ]
            }]
    },
};
var scrollTab = {
    header: "Scroll Test",
    body: {
        view: "scrollview",
        id: "scrolltest",
        scroll: "y",
        body:{
            rows:[
                {
                    view:"template",
                    height:200,
                    template:"<p>test</p><p>Test</p>"
                },
                {
                    height:200,
                },
                {
                    view:"template",
                    height:200,
                    template:"<p>test</p><p>Test</p>"
                },
                {height:200,},
                {
                    view:"template",
                    height:200,
                    template:"<p>test</p><p>Test</p>"
                }
            ]
        }
    }
}
firstLoginTabs.push(profileTab, passwordTab);
var firstLoginLayout= {    //firstLoginPanel je id za firstLoginLayout //todo za admina
    id: "firstLoginPanel",
    width: "auto",
    height: "auto",
    css: "fadeInAnimation",
    rows: [
        {
            cols: [{
                id: "companyLogoImage",
                name: "companyLogoImage",
                view: "template",
                width: 220,
                css: "logoInside",
                template: "<img src='#src#'/>",
                data: {src: null}
            }, {
                view: "toolbar",
                css: "mainToolbar",
                autowidth: true,
                height: 50,
                cols: [
                    {
                        view: "label",
                        label: "<b>Planiranje godišnjeg odmora</b>",
                        width: "auto"
                    }
                ]
            }]
        },{height:20},
        {
            id:"firstLoginWizard",

            margin:5,
            //height:900,  //AKO OVO UKLJUCIM, POVECA SE TABELA< ALI SE SKLONI button "Reload with Progress Bar"
            rows:[
                { type:"header", template:"Unesite Vase podatke" }, //todo: nek ne bude bjelo na plavom, vec plavo na bijelom
                {
                view: "template",
                    width: 400,
                    height:70,
                   // css: "progressNodes",
                template: '<br><section>\n' +
                    '\n' +
                    '  <ol id="progressBar" class="progress-bar">\n' +
                    '  </ol>' +
                    '</section>'
            },
                {
                    id:"firstLoginTabs",
                    view: "tabview",
                    tabbar:{
                        on:{
                            onChange: function(){
                               // if(this.getValue()=="formProfileInformation") {

                             //   }else if
                                util.messages.showMessage("you have clicked on an item with id="+this.getValue());
                            },
                            onBeforeTabClick:function(id){
                                // if(id=="formChangePassword"   /*&& tabCompleted[0])  ||*/    )
                                //    return false;
                                // else return true;
                                //todo: ovo zavrsiti, kad se napravi za progressBar
                                var tabbar = $$("firstLoginTabs").getTabbar();
                                firstLoginLayout.progressBar.setIndex(tabbar.optionIndex(id), "is-active");
                                var oldInd = tabbar.optionIndex(this.getValue());

                                firstLoginLayout.progressBar.setIndex(oldInd, tabCompleted[oldInd]?"is-complete":"");
                            }
                        }
                    },
                    cells:firstLoginTabs,

                },

            ]
        }
    ],
/*
    show_progress_bar: function (delay) {
        value=value+step;  // OVDJE KORAK UVECAM
        $$("firstLoginWizard").disable();
        $$("firstLoginWizard").showProgress({
            type:"bottom",
            delay:delay,
            hide:false,
            position:value  // OVDJE POZICIJU SETUJEM
        });
        setTimeout(function(){
            $$("firstLoginWizard").enable();
        }, delay);
    },
*/
    save: function () {
        var profileForm = $$("formProfileInformation");
        if (profileForm.validate()) {
            $$("saveProfileButton").disable();
            var dataToSend = $$("formProfileInformation").getValues();
            var objectToSend = {
                firstName: dataToSend.firstName,
                lastName: dataToSend.lastName,
                receiveMail: dataToSend.receiveMail,
                photo: dataToSend.base64ImageUser,
                companyId: userData.companyId
            };
            webix.ajax().headers({
                "Content-type": "application/json"
            }).put("hub/user/" + userData.id, JSON.stringify(objectToSend), {
                error: function (text, data, xhr) {
                    $$("saveProfileButton").enable();
                    util.messages.showErrorMessage(text);
                },
                success: function (text, data, xhr) {
                    tabCompleted[0]=true;
                    userData.firstName = dataToSend.firstName;
                    userData.lastName = dataToSend.lastName;
                    userData.receiveMail = dataToSend.receiveMail;
                    userData.photo = objectToSend.photo;
                    util.dismissDialog("profileDialog");
                    util.messages.showMessage("Izmjene uspješno sačuvane.");
                }
            })
        }
    },
    
    savePassword: function () {

        var changePasswordForm = $$("formChangePassword");
        if (changePasswordForm.validate()) {
            console.log("AAAAAAAAAAAAa");
            $$("changePasswordBtn").disable();
            console.log("BBBBBBBBBBBB");
            var passwordInformation = {
                oldPassword: $$("oldPassword").getValue(),
                newPassword: $$("newPassword").getValue(),
                newPasswordConfirmation: $$("newPasswordConfirmation").getValue()
            };

            connection.sendAjax("POST", "hub/user/updatePassword",
                function (text, data, xhr) {
                    if (text) {
                        util.messages.showMessage("Uspješna izmjena lozinke.");
                        firstLoginLayout.progressBar.setIndex(1, "is-complete");
                        $$("changePasswordBtn").enable();
                        // Prebacivanje na sljedeci panel
                    } else {
                        util.messages.showErrorMessage("Neuspješna izmjena lozinke.");
                        $$("changePasswordBtn").enable();
                    }
                }, function (text, data, xhr) {
                    util.messages.showErrorMessage(text);
                    $$("changePasswordBtn").enable();
                }, passwordInformation);
        }
    },
    saveCompany: function() {
        var logo = $$("companyLogoList");
        var companyId = userData.companyId;
        var companyName = $$("companyName").getValue();
        var companyPin = $$("companyPin").getValue();
        var validation = $$("formCompanyInformation").validate();
        if (validation) {
            var company = {
                id: companyId,
                name: companyName,
                pin: companyPin,
                active: 1,
                logo: logo.getItem(logo.getLastId()).content
            };
            connection.sendAjax("PUT", "hub/company/" + companyId,
                function (text, data, xhr) {
                }, function (text, data, xhr) {
                    //alert(text);
                    util.messages.showErrorMessage(text);
                }, company);
        }
    },
    saveSector: function () {
        sector.name = $$("name").getValue();
        sector.maxAbsentPeople = $$("max_absent_people").getValue();
        sector.maxPercentageAbsentPeople = $$("max_percentage_absent_people").getValue();
        connection.sendAjax("PUT", "hub/sector/" + sector.id,
            function (text, data, xhr) {
                util.messages.showMessage("Izmjene uspješno sačuvane.");
            }, function (text, data, xhr) {
                util.messages.showErrorMessage(text);
            }, sector);
    },
    progressBar:{
        active: " is-active",
        complete: " is-complete",
        setIndex: function(index, style){
            var progNode = document.getElementById("progNode"+(index+1).toString());
            if(progNode==null) {
                console.log(`progNode${index} doesn't exist`);
                return;
            }
            progNode.className=style;
        },
        init: function(){
            var progress = document.getElementById("progressBar");
            var tabbar = $$("firstLoginTabs").getTabbar();
            for(var i = 0; i < tabbar.config.options.length; i++)
            {
                var item = document.createElement("li");
                item.id = "progNode" + (i+1).toString();
                progress.appendChild(item);
            }
            this.setIndex(0,this.active);
        }
    }
}



var mainLayout = {
    id: "app",
    width: "auto",
    height: "auto",
    css: "fadeInAnimation",
    rows: [
        {
            cols: [{
                id: "companyLogoImage",
                name: "companyLogoImage",
                view: "template",
                width: 220,
                css: "logoInside",
                template: "<img src='#src#'/>",
                data: {src: null}
            }, {
                view: "toolbar",
                css: "mainToolbar",
                autowidth: true,
                height: 50,
                cols: [
                    {
                        view: "label",
                        label: "<b>Planiranje godišnjeg odmora</b>",
                        width: 400
                    }, {},
                    {
                        id: "usernameHolder",
                        css: "usernameHolder",
                        view: "template",
                        width: 600
                    },
                    {
                        id: "notificationBtn",
                        view: "button",
                        width: 60,
                        badge: numberOfUnreadNotifications,
                        type: "icon",
                        icon: "bell",
                        popup: "notificationMenu",
                        click: function () {
                            showNotifications();
                        }
                    },
                    {
                        view: "menu",
                        width: 45,
                        icon: "cog",
                        id: "settingsMenu",
                        name: "settingsMenu",
                        css: "settingsMenu",
                        align: "right",
                        submenuConfig: {width: 180},
                        data: [{
                            id: "settingsSubMenu", icon: "cog", value: "", submenu: settingsMenu
                        }],
                        openAction: "click",
                        on: {
                            onMenuItemClick: settingsMenuActions
                        }
                    },
                ]
            }]

        },
        {
            id: "main", cols: [{
                rows: [
                    {
                        id: "mainMenu",
                        css: "mainMenu",
                        view: "sidebar",
                        gravity: 0.01,
                        minWidth: 41,
                        collapsed: true
                    },
                    {
                        id: "sidebarBelow",
                        css: "sidebar-below",
                        view: "template",
                        template: "",
                        height: 50,
                        gravity: 0.01,
                        minWidth: 41,
                        width: 41,
                        type: "clean"
                    }]
            },
                {id: "emptyRightPanel"}
            ]
        }
    ],


    saveUserFirstAndLastNameFunction: function () {
        var form = $$("addFirstAndLastNameForm");
        $$("saveUserFirstAndLastName").disable();
        if (!isThereInternetConnection()) {
            alert("Nemate pristup internetu. Provjerite konekciju i pokušajte ponovo.");
            $$("saveUserFirstAndLastName").enable();
        } else {

            var validation = form.validate();
            if (validation) {
                var newUser;

                userData.firstName = $$('firstname').getValue();
                userData.lastName = $$('lastname').getValue();

                newUser = {
                    id: userData.id,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                };

                switch (userData.userGroupKey) {
                    case "superadmin":
                        $$("usernameHolder").define("template", '<span class="usernameHolderName">' + userData.firstName + ' ' + userData.lastName + '</span><br /><span class="usernameHolderRole">Superadmin</span>');
                        break;
                    case "admin":
                        $$("usernameHolder").define("template", '<span class="usernameHolderName">' + userData.firstName + ' ' + userData.lastName + '</span><br /><span class="usernameHolderRole">Admin</span>');
                        break;
                    case "direktor":
                        $$("usernameHolder").define("template", '<span class="usernameHolderName">' + userData.firstName + ' ' + userData.lastName + '</span><br /><span class="usernameHolderRole">Direktor</span>');
                        break;
                    case "sekretar":
                        $$("usernameHolder").define("template", '<span class="usernameHolderName">' + userData.firstName + ' ' + userData.lastName + '</span><br /><span class="usernameHolderRole">Sekretar</span>');
                        break;
                    case "menadzer":
                        $$("usernameHolder").define("template", '<span class="usernameHolderName">' + userData.firstName + ' ' + userData.lastName + '</span><br /><span class="usernameHolderRole">Menadzer</span>');
                        break;
                    case "zaposleni":
                        $$("usernameHolder").define("template", '<span class="usernameHolderName">' + userData.firstName + ' ' + userData.lastName + '</span><br /><span class="usernameHolderRole">Zaposleni</span>');
                        break;
                }

                // $$("usernameHolder").define("template", '<span class="usernameHolderName">' + userData.firstName +
                //     ' ' + userData.lastName + '</span><br /><span class="usernameHolderRole">Sekretar</span>');
                $$("usernameHolder").refresh();

                console.log(newUser.id);
                connection.sendAjax("PUT", "hub/user/" + newUser.id,
                    function (text, data, xhr) {
                        if (text) {

                            util.dismissDialog('addFirstAndLastNameDialog');
                            util.messages.showMessage("Ime i prezime  uspješno dodano.");
                            switch (userData.userGroupKey) {
                                case "superadmin":
                                    connection.sendAjax("POST", "hub/user/firstLogin",
                                        function (text, data, xhr) {
                                            userData.firstLogin = 0;
                                        }, function (text, data, xhr) {
                                            util.messages.showErrorMessage(text);
                                        }, 0);
                                    break;
                                case "admin":
                                    connection.sendAjax("POST", "hub/user/firstLogin",
                                        function (text, data, xhr) {
                                            userData.firstLogin = 2;
                                            showChangePasswordDialog();
                                        }, function (text, data, xhr) {
                                            util.messages.showErrorMessage(text);
                                        }, 2);
                                    break;
                                case "direktor":
                                    connection.sendAjax("POST", "hub/user/firstLogin",
                                        function (text, data, xhr) {
                                            userData.firstLogin = 2;
                                            showChangePasswordDialog();
                                        }, function (text, data, xhr) {
                                            util.messages.showErrorMessage(text);
                                        }, 2);
                                    break;
                                case "sekretar":
                                    connection.sendAjax("POST", "hub/user/firstLogin",
                                        function (text, data, xhr) {
                                            userData.firstLogin = 2;
                                            showChangePasswordDialog();
                                        }, function (text, data, xhr) {
                                            util.messages.showErrorMessage(text);
                                        }, 2);
                                    break;
                                case "menadzer":
                                    connection.sendAjax("POST", "hub/user/firstLogin",
                                        function (text, data, xhr) {
                                            userData.firstLogin = 2;
                                            showChangePasswordDialog();
                                        }, function (text, data, xhr) {
                                            util.messages.showErrorMessage(text);
                                        }, 2);
                                    break;
                                case "zaposleni":
                                    connection.sendAjax("POST", "hub/user/firstLogin",
                                        function (text, data, xhr) {
                                            userData.firstLogin = 2;
                                            showChangePasswordDialog();
                                        }, function (text, data, xhr) {
                                            util.messages.showErrorMessage(text);
                                        }, 2);
                                    break;
                            }
                        } else {
                            util.messages.showErrorMessage("Neuspješno dodavanje.");
                            $$("saveUserFirstAndLastName").enable();
                        }
                    }, function (text, data, xhr) {
                        util.messages.showErrorMessage(text);
                        $$("saveUserFirstAndLastName").enable();
                    }, newUser);
            }
            else{
                $$("saveUserFirstAndLastName").enable();
            }
        }
    }
};

var menuEvents = {
// onMenuItemClick: function (id) {
//     menuActions(id);
// }
    onItemClick: function (item) {
        menuActions(item);
    }
}

var firstLogin;
var showFirstLogin = function () {

    console.log("Usao u showFirstLogin");
    //Ako je admin i ako je ulogovan 1. put na sistem:
    if(userData != null && userData.firstName==null && userData.lastName==null ){
        switch(userData.userGroupKey)
        {
            case "admin":
                firstLoginTabs.push(companyTab,constraintsTab);
                break;
            case "menadzer":
                break;
        }
        //todo: switch
        console.log("Usao u if showFirstLogin");
         var main = webix.copy(firstLoginLayout);
         firstLogin = webix.ui(main, panel);
         panel = $$("firstLoginPanel"); //firstLoginPanel je id za firstLoginLayout
        var companyId = userData.companyId;
        if(firstLoginTabs.includes(companyTab)) {
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
        }
        firstLoginLayout.progressBar.init();
//adding ProgressBar functionality to layout
        webix.extend($$("firstLoginWizard"), webix.ProgressBar);

        $$("companyLogoImage").setValues({src: "data:image/png;base64," + companyData.logo}); //da se prikaze dobar logo gore


    }else{
        showApp();
    }
};

var mainApp;

var showApp = function () {

var companyInfoItems = [
    {id: "0", value: "O kompaniji", icon: "info-circle"},
    {id:"sep1", $template: "Separator"}];

var subMenuItems = [
    {id: "1", value: "O programu", icon: "info-circle"},
    {id:"sep2", $template: "Separator"},
    {id: "2", value: "Promjena lozinke", icon: "lock"},
    {id:"sep3", $template: "Separator"},
    {id: "3", value: "Profil", icon: "user"},
    {id:"sep4", $template: "Separator"},
    {id: "4", value: "Odjava", icon: "sign-out"}
]

    if (userData.userGroupKey == "admin" || userData.userGroupKey == "direktor") //nema mogucnost promjene ogranicenja o kompaniji ako nije direktor ili admin
    {
        for (var i = 0; i < companyInfoItems.length; i++)
            settingsMenu.push(companyInfoItems[i]);
    }

    for (var i = 0; i < subMenuItems.length; i++)
        settingsMenu.push(subMenuItems[i]);

    console.log("Company data: ");
    console.log(companyData);
    var main = webix.copy(mainLayout);
    mainApp = webix.ui(main, panel);
    panel = $$("app");
//$$("usernameHolder").define("template", '<span class="usernameHolderName">' + userData.ime + ' ' + userData.prezime + ' (' + rolaNameSerbian[userData.rolaNivo] + ')' + '</span><br /><span class="usernameHolderUsername">' + userData.korisnickoIme + '</span>');
//**************
    var localMenuData = null;

    if (userData != null) {
        if (userData.userGroupKey !== "superadmin") {
            $$("companyLogoImage").setValues({src: "data:image/png;base64," + companyData.logo});
        } else {
            $$("companyLogoImage").setValues({src: "img/telegroup-logo-inside.png"});
        }
        switch (userData.userGroupKey) {
            case "superadmin":
                localMenuData = webix.copy(menuSuperAdmin);
                $$("usernameHolder").define("template", '<span class="usernameHolderName">' + userData.firstName + ' ' + userData.lastName + '</span><br /><span class="usernameHolderRole">Superadmin</span>');
                if (userData.firstLogin === 1) {
                    showAddFirstAndLastNameDialog();
                }
                break;
            case "admin":
                localMenuData = webix.copy(menuAdmin);
                $$("usernameHolder").define("template", '<span class="usernameHolderName">' + userData.firstName + ' ' + userData.lastName + '</span><br /><span class="usernameHolderRole">Admin</span>');
/*<<<<<<< HEAD
                if (userData.firstLogin === 1) {
                    showAddFirstAndLastNameDialog();
                } else if(userData.firstLogin === 2) {
                    showChangePasswordDialog();
                } else if(userData.firstLogin === 3) {
                    // Ovde treba dodati prikaz dijaloga za unos podataka o kompaniji za admina
                }
=======*/
               /* if (userData.firstName == null || userData.lastName == null) {
                    showAddFirstAndLastNameDialog();
                }*/
//>>>>>>> Wizard for first admin's login
                break;
            case "direktor":
                localMenuData = webix.copy(menuDirector);
                $$("usernameHolder").define("template", '<span class="usernameHolderName">' + userData.firstName + ' ' + userData.lastName + '</span><br /><span class="usernameHolderRole">Direktor</span>');
                if (userData.firstLogin === 1) {
                    showAddFirstAndLastNameDialog();
                } else if(userData.firstLogin === 2) {
                    showChangePasswordDialog();
                }
                break;
            case "sekretar":
                localMenuData = webix.copy(menuSecretary);
                $$("usernameHolder").define("template", '<span class="usernameHolderName">' + userData.firstName + ' ' + userData.lastName + '</span><br /><span class="usernameHolderRole">Sekretar</span>');
                if (userData.firstLogin === 1) {
                    showAddFirstAndLastNameDialog();
                } else if(userData.firstLogin === 2) {
                    showChangePasswordDialog();
                }
                break;
            case "menadzer":
                localMenuData = webix.copy(menuSectorManager);
                $$("usernameHolder").define("template", '<span class="usernameHolderName">' + userData.firstName + ' ' + userData.lastName + '</span><br /><span class="usernameHolderRole">Menadzer</span>');
                if (userData.firstLogin === 1) {
                    showAddFirstAndLastNameDialog();
                } else if(userData.firstLogin === 2) {
                    showChangePasswordDialog();
                } else if(userData.firstLogin === 3) {
                    // Ovde treba dodati prikaz dijaloga za unos maksimalnog procenta odsustva za menadzerov sektor
                }
                break;
            case "zaposleni":
                localMenuData = webix.copy(menuWorker);
                $$("usernameHolder").define("template", '<span class="usernameHolderName">' + userData.firstName + ' ' + userData.lastName + '</span><br /><span class="usernameHolderRole">Zaposleni</span>');
                console.log("AAAA: " + userData.firstLogin);
                if (userData.firstLogin === 1) {
                    showAddFirstAndLastNameDialog();
                } else if(userData.firstLogin === 2) {
                    showChangePasswordDialog();
                }
                break;
        }
    }

//***************

    webix.ui({
        id: "menu-collapse",
        view: "template",
        template: '<div id="menu-collapse" class="menu-collapse">' +
            '<span></span>' +
            '<span></span>' +
            '<span></span>' +
            '</div>',
        onClick: {
            "menu-collapse": function (e, id, trg) {

                var elem = document.getElementById("menu-collapse");

                if (menuState == MENU_STATES.COLLAPSED) {
                    elem.className = "menu-collapse open";
                    menuState = MENU_STATES.EXPANDED;
                    $$("mainMenu").toggle();
                } else {
                    elem.className = "menu-collapse";
                    menuState = MENU_STATES.COLLAPSED;
                    $$("mainMenu").toggle();
                }
            }
        }
    });

//Sakrivanje notifikacija kod superadmina
    if (userData.userGroupKey == "superadmin")
        $$("notificationBtn").hide();

//if(userData.userGroupKey != "superadmin" && userData.userGroupKey != "zaposleni"){
    $$("mainMenu").define("data", localMenuData);
    $$("mainMenu").define("on", menuEvents);
//}


    $$("usernameHolder").refresh();

    rightPanel = "emptyRightPanel";
    switch (userData.userGroupKey) {
        case "superadmin":
            //$$("menu-collapse").hide();
            //$$("mainMenu").select("company");
            companyView.selectPanel();
            break;
        case "admin":
            $$("mainMenu").select("calendar");
            calendarView.selectPanel();
            break;
        case "direktor":
            $$("mainMenu").select("calendar");
            calendarView.selectPanel();
            break;
        case "sekretar":
            $$("mainMenu").select("calendar");
            calendarView.selectPanel();
            break;
        case "menadzer":
            $$("mainMenu").select("calendar");
            calendarView.selectPanel();
            break;
        case "zaposleni":
            //$$("menu-collapse").hide();
            calendarView.selectPanel();
            $$("mainMenu").select("calendar");
            break;
    }
//templateView.selectPanel();

    if(userData.userGroupKey!="superadmin"){
        getNotifications();
        window.setInterval(getNotifications, 15000);
    }

};

//login and logout


var localize = function () {
    webix.i18n.locales["sr-BA"] = {
        groupDelimiter: " ",
        groupSize: 3,
        decimalDelimiter: ".",
        decimalSize: 2,

        dateFormat: "%d.%m.%Y.",
        timeFormat: "%H:%i",
        longDateFormat: "%d. %F %Y.",
        fullDateFormat: "%d.%m.%Y. %H:%i",

        price: "{obj} KM",
        priceSettings: {
            groupDelimiter: " ",
            groupSize: 3,
            decimalDelimiter: ".",
            decimalSize: 2
        },
        fileSize: ["b", "Kb", "Mb", "Gb", "Tb", "Pb", "Eb"],

        calendar: {
            monthFull: ["Januar", "Ferbruar", "Mart", "April", "Maj", "Jun",
                "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"
            ],
            monthShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Avg",
                "Sep", "Okt", "Nov", "Dec"
            ],
            dayFull: ["Nedjelja", "Ponedjeljak", "Utorak", "Srijeda", "Četvrtak",
                "Petak", "Subota"
            ],
            dayShort: ["Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"],
            hours: "Sati",
            minutes: "Minuta",
            done: "Gotovo",
            clear: "Očisti",
            today: "Danas"
        },

        controls: {
            select: "Odaberi"
        },

        dataExport: {
            page: "Strana",
            of: "od"
        }
    };

    webix.Date.startOnMonday = true;
    webix.i18n.setLocale("sr-BA");
}

//about dialog

var getAboutDialog = function () {

    return {
        view: "popup",
        id: "aboutDialog",
        modal: true,
        position: "center",
        padding: 0,
        type: "clean",
        css: "aboutDialog",
        body: {
            id: "aboutInside",
            css: "aboutInside",
            width: 450,
            margin: 0,
            type: "clean",
            rows: [
                {
                    view: "icon",
                    icon: "close",
                    align: "right",
                    click: "util.dismissDialog('aboutDialog');",
                    height: 0,
                    css: "closeAbout",
                    type: "clean"
                },
                {
                    view: "template",
                    height: 140,
                    css: "aboutLogo",
                    type: "clean",
                    template: '<img style="margin-top: 29px; margin-bottom: 29px;" src="img/telegroup-logo.png"/><div id="aboutRibbon"></div>'
                },
                {
                    view: "template",
                    height: 28,
                    css: "aboutLine",
                    template: '<b>Verzija:</b> ' + appVersion
                },
                {
                    view: "template",
                    height: 28,
                    css: "aboutLine",
                    template: '&copy; 2019 Sva prava zadržana.'
                },
                {
                    height: 10
                }]
        }
    };
};

showAboutDialog = function () {
    if (appVersion) {
        webix.ui(webix.copy(getAboutDialog()));
        setTimeout(function () {
            $$("aboutDialog").show();
        }, 0);
    }
};


var showLogin = function () {
    var login = webix.copy(loginLayout);
    webix.ui(login, panel);
    panel = $$("loginPanel");
};

var loginLayout = {
    id: "loginPanel",
    rows: [{
        height: 110
    }, {
        cols: [{}
            , //1st column
            {
                rows: [{
                    view: "label",
                    css: "welcomeLabel",
                    label: "Dobro do&#154;li",
                    align: "center",
                    width: 590
                }, {
                    height: 30
                },
                    {
                        height: 120,
                        template: '<img src="img/user.png"/>',
                        css: "loginLogo",
                        align: "center"
                    }, {
                        view: "form",
                        id: "loginForm",
                        css: "loginForm",
                        width: 600,
                        elements: [{
                            view: "text",
                            type: "email",
                            placeholder: "E-mail",
                            required: true,
                            id: "email",
                            name: "email",
                            invalidMessage: "Niste unijeli e-mail adresu.",
                            width: 600,
                            height: 40
                        }, {
                            view: "text",
                            placeholder: "Lozinka",
                            name: "lozinka",
                            id: "password",
                            required: true,
                            type: "password",
                            invalidMessage: "Niste unijeli lozinku.",
                            width: 600,
                            height: 40
                        }, {
                            view: "text",
                            placeholder: "Kompanija",
                            css: "textS",
                            id: "company",
                            name: "kompanija",
                            type: "password",
                            width: 600,
                            height: 40
                        }, {}, {
                            id: "login",
                            view: "button",
                            label: "Prijavi se",
                            type: "iconButton",
                            icon: "sign-in",
                            click: "login",
                            align: "left",
                            hotkey: "enter",
                            width: 580,
                            height: 40
                        }]
                    }]

            },
            //2nd column
            {}
        ]
    }, {}, {}]
    /*  css:"backgroundImage",
    cols:[
        {},
        {
            rows:[{
                height:130
            },
                {
                    height:130,
                    template: '<img src="img/user.png"/>',
                    css:"loginLogo",
                    align:"center"
                },{
                    view: "form",
                    id: "loginForm",
                    css:"loginForm",
                    width: 600,
                    elements: [{
                        view: "text",
                        type:"email",
                        placeholder:"E-mail",
                        required:true,
                        id: "email",
                        name: "email",
                        invalidMessage:"Niste unijeli e-mail adresu.",
                        width: 600,
                        height:40
                    }, {
                        view: "text",
                        placeholder:"Lozinka",
                        name: "lozinka",
                        id:"password",
                        required:true,
                        type: "password",
                        invalidMessage:"Niste unijeli lozinku.",
                        width: 600,
                        height:40
                    },  {
                        view: "text",
                        placeholder:"Kompanija",
                        css:"textS",
                        id:"company",
                        name: "kompanija",
                        width: 600,
                        height:40
                    }, {
                        id: "login",
                        view: "button",
                        label: "Prijavi se",
                        type: "iconButton",
                        icon: "sign-in",
                        click: "login",
                        align:"left",
                        hotkey:"enter",
                        width: 580,
                        height:40
                    },
                        {
                            height:20
                        }]
                }]
        },{
            height:722
        }
        ]*/
};


var login = function () {
    console.log($$("loginForm").getValues());

    var data = $$("loginForm").getValues();

    var objectToSend = {
        email: data.email,
        password: data.lozinka,
        companyPin: data.kompanija
    }

    if ($$("loginForm").validate()) {
        webix.ajax().headers({
            "Content-type": "application/json"
        }).post("hub/user/login", JSON.stringify(objectToSend), {
            error: function (text, data, xhr) {
                // showApp();
                //return;
                // TODO praksa obrisati 2 prethodne linije koda kad se napravi login na backendu,
                util.messages.showErrorMessage("Prijavljivanje nije uspjelo!")
            },
            success: function (text, data, xhr) {


                // util.messages.showErrorMessage("2");
                if (data.json() != null && data.json().id != null) {
                    userData = data.json();
                    console.log(userData.userGroupKey);

                    if (userData.userGroupKey == "superadmin") {
                        if (objectToSend.companyPin.length == 0) {
                            companyData = null;
                            showApp();
                        }
                        else {
                            util.messages.showErrorMessage("Prijavljivanje nije uspjelo!");
                        }
                    } else {
                        webix.ajax().get("hub/company/" + userData.companyId, {
                            success: function (text, data, xhr) {
                                var company = data.json();
                                if (company != null) {
                                    companyData = company;
                                    if(userData.firstName==null && userData.lastName==null /*userData.firstLogin === 1*/) {
                                        showFirstLogin(); //uspjesan login, prikaz layout-a za to...
                                    }else {
                                        showApp();
                                    }
                                } else {
                                    util.messages.showErrorMessage("Prijavljivanje nije uspjelo!");
                                }
                            },
                            error: function (text, data, xhr) {
                                util.messages.showErrorMessage("Prijavljivanje nije uspjelo!");
                            }
                        });
                    }
                } else {
                    util.messages.showErrorMessage("data.json() == null || data.json().id == null");
                }
            }
        });
    }
};

var addDialogFirstAndLastName = function () {
    return {
        view: "popup",
        id: "addFirstAndLastNameDialog",
        move: true,
        position: "center",
        padding: 0,
        type: "clean",
        modal: true,
        body: {
            id: "aboutInside",
            css: "aboutInside",
            width: 450,
            margin: 0,
            type: "clean",
            rows: [{
                view: "toolbar",
                cols: [{
                    view: "label",
                    label: "<span class='webix_icon fa-briefcase'></span> Unesite ime i prezime",
                    width: 400,
                    height: 50
                }, {},]
            },
                {
                    view: "form",
                    id: "addFirstAndLastNameForm",
                    width: 660,
                    height: 200,
                    elementsConfig: {
                        labelWidth: 200,
                        bottomPadding: 20
                    },
                    elements: [
                        {
                            view: "text",
                            id: "firstname",
                            name: "name",
                            label: "Ime:",
                            invalidMessage: "Ime je obavezno unijeti.",
                            required: true
                        },
                        {
                            view: "text",
                            id: "lastname",
                            name: "surname",
                            label: "Prezimeme:",
                            invalidMessage: "Prezime je obavezno unijeti.",
                            required: true
                        },
                        {
                            margin: 5,
                            cols: [{}, {
                                id: "saveUserFirstAndLastName",
                                view: "button",
                                value: "U redu",
                                type: "form",
                                align: "right",
                                click: "mainLayout.saveUserFirstAndLastNameFunction",
                                hotkey: "enter",
                                width: 150
                            },]
                        },
                    ],
                }
            ]
        }
    };
};


showAddFirstAndLastNameDialog = function () {
    webix.ui(webix.copy(addDialogFirstAndLastName()));
    setTimeout(function () {
        $$("addFirstAndLastNameDialog").show();
        webix.UIManager.removeHotKey("enter", null);
        $$("saveUserFirstAndLastName").define("hotkey", "enter");
    }, 0);


};

showNotifications = function () {
    webix.ui({
        view: "popup",
        id: "notificationMenu",
        head: "Submenu",
        height: 300,
        body: {
            rows: [
                {
                    view: "list",
                    id: "notificationList",
                    name: "notificationList",
                    select: true,
                    resize: true,
                    scroll: "y",
                    layout: "y",
                    borderless: true,
                    template: function (obj) {
                        if (obj.seen)
                            return "<span style='color: lightgrey' class='m_title' >" + (obj.title) + "</span>"  +
                                "<span style='color:lightgrey' class='message'>" + (obj.text) + "</span>" +
                                "<time style='color:lightgrey' datetime='DD.MM.YYY hh:mm:ss'>" + (obj.created) + "</time>"
                                ;
                        return "<span style='color:darkgrey;font-weight:bold' class='m_title'>" + (obj.title) + "</span>" +
                            "<span style='color:darkgrey;font-weight:bold' class='message'>" + (obj.text) + "</span>" +
                            "<time style='color:darkgrey;font-weight:bold' datetime='DD.MM.YYY hh:mm:ss'>" + (obj.created) + "</time>";
                    },
                    css: "notifications",
                    width: 300,
                    type: {
                        height: 90,
                        width: 350 /* BEWARE needs to be more than specified in extended-orange.css for contactName and message_text */
                    },
                    on: {
                        "onItemClick": function (id, e, node) {
                            //if (e.target.type != "checkbox") {
                                var item = this.getItem(id);
                                if ("Bolovanje" == item.title) {
                                    if (userData.userGroupKey == "zaposleni") {
                                        calendarView.selectPanel();
                                        $$("mainMenu").select("calendar");
                                    }
                                    else if (userData.userGroupKey == "sekretar") {
                                        $$("mainMenu").select("secretary_sick_request");
                                        sickRequestsView.selectPanel();
                                    }
                                }
                                else if("Kolektivni godišnji odmor" != item.title) {
                                    if (userData.userGroupKey == "zaposleni") {
                                        $$("mainMenu").select("absence_history");
                                        absenceHistoryView.selectPanel();
                                    }
                                    else {
                                        $$("mainMenu").select("leave_requests");
                                        leaveRequestsView.selectPanel();
                                    }
                                }

                            //}


                            if(item.seen==0){
                                numberOfUnreadNotifications--;
                                item.seen=1;
                                var updatedNotifications = [];
                                var updatedNotification = notifications.filter(
                                    function (element) {
                                        return element.id == item.id;
                                    });
                                updatedNotifications.push(updatedNotification[0]);
                                connection.sendAjax("PUT", "/hub/notification/updateNotifications/",
                                    function (text, data, xhr) {
                                    }, function (text, data, xhr) {
                                        alert(text)
                                    }, updatedNotifications);

                                $$("notificationBtn").config.badge = numberOfUnreadNotifications;
                                $$("notificationBtn").refresh();
                            }
                        }
                    },
                }
            ]
        }
    });
    var list = $$("notificationList");
    list.parse(notifications);
   // window.setTimeout(updateNotifications, 15000);
};
updateNotifications = function () {

    console.log("USLOOOOOOOO");

    /*for(var i=0;i<notifications.length;i++){
        var notification = notifications.filter(
            function (element) {
                return element.id == i;
            });
        if(notification.seen == 0){
            notification.seen = 1;
            numberOfUnreadNotifications--;
            var updatedNotifications = [];
            updatedNotifications.push(notification);
            connection.sendAjax("PUT", "/hub/notification/updateNotifications/",
                function (text, data, xhr) {
                }, function (text, data, xhr) {
                    alert(text)
                }, updatedNotifications);

        }
        $$("notificationBtn").config.badge = numberOfUnreadNotifications;
        $$("notificationBtn").refresh();
    }*/
};
    getNotifications = function () {
        console.log("USLO U GET");
        notifications=[];
        webix.ajax().get("/hub/notification/getAllNotificationByUser/" + userData.id, {
            success: function (text, data, xhr) {
                numberOfUnreadNotifications = 0;
                notifications = [];
                var userNotifications = data.json();
                var notification;
                if(userNotifications != null){
                    for (var i = 0; i < userNotifications.length; i++) {
                        if (userNotifications[i].seen == 0){
                            numberOfUnreadNotifications++; //broj neprocitanih poruka, za badge se uvecava brojac
                            notification = {
                                id: userNotifications[i].id,
                                title: userNotifications[i].title,
                                text: userNotifications[i].text,
                                active: userNotifications[i].active,
                                seen: userNotifications[i].seen,
                                receiverUserId: userNotifications[i].receiverUserId,
                                companyId: userNotifications[i].companyId,
                                leaveType: userNotifications[i].leaveType,
                                created: userNotifications[i].created,
                            };
                            notifications.push(notification);
                        }
                    }
                    if(notifications.length<10){
                        var leng=10-notifications.length;
                        var j=0;
                        for (var i = 0; i < leng; i++){
                            if (userNotifications[j].seen == 1) {
                                notification = {
                                    id: userNotifications[i].id,
                                    title: userNotifications[i].title,
                                    text: userNotifications[i].text,
                                    active: userNotifications[i].active,
                                    seen: userNotifications[i].seen,
                                    receiverUserId: userNotifications[i].receiverUserId,
                                    companyId: userNotifications[i].companyId,
                                    leaveType: userNotifications[i].leaveType,
                                    created: userNotifications[i].created,
                                };
                                notifications.push(notification);
                            }else{
                                i--;
                            }
                            if(j< userNotifications.length - 1){
                                j++;
                            }else{
                                break;
                            }
                        }
                    }
                }
                $$("notificationBtn").config.badge = numberOfUnreadNotifications;
                $$("notificationBtn").refresh();

            },
            error: function (text, data, xhr) {
                alert(text)
            }
        });
    };

//main call
window.onload = function () {
    init();
};