var appVersion = "1.0.0-RELEASE";
var MENU_STATES = {
    COLLAPSED: 0,
    EXPANDED: 1
};
var menuState = MENU_STATES.COLLAPSED;

var settingsMenu = [];
var notifications = [];
var numberOfUnreadNotifications = 0;
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
    {id: "absence_history", value: "Istorija odsustava", icon: "fas fa-history"},
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

var menuSuperAdmin = [];


var menuAdmin = [
    {
        id: "calendar",
        value: "Kalendar",
        icon: "fa fa-calendar"
    },
    {
        id: "absence_history",
        value: "Istorija odsustava",
        icon: "fas fa-history"
    },
    {
        id: "sector",
        value: "Sektori",
        icon: "briefcase"
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
        id: "absence_history",
        value: "Isotrija odsustava",
        icon: "fas fa-history"
    },
    {
        id: "sector",
        value: "Sektori",
        icon: "briefcase"
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
        id: "absence_history",
        value: "Istorija odsustava",
        icon: "fas fa-history"
    },
    {
        id: "sector",
        value: "Sektori",
        icon: "briefcase"
    },
    {
        id: "usergroup",
        value: "Zaposleni",
        icon: "users"
    },
    {
        id: "secretary_sick_request",
        value: "Zahtjevi za bolovanje",
        icon: "far fa-envelope"
    },
    {
        id: "leave_requests",
        value: "Zahtjevi za odmor",
        icon: "list"
    },
    {
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
        id: "absence_history",
        value: "Istorija odsustava",
        icon: "fas fa-history"
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
        value: "Istorija odsustava",
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
                                    if (userData.firstLogin !== 0) {
                                        showFirstLogin();
                                    } else {
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
                }
            }
        }
    });
}

var tabCompleted = [false, false, false, false];
var firstLoginTabs = [];
var profileTab = {
    header: "Profil",
    body: {
        id: "formProfileInformation",
        view: "form",
        width: 500,
        elementsConfig: {
            labelWidth: 140,
            bottomPadding: 16 //TODO: change other forms
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
                        data: {src: "img/profilePicture.png"},
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
                        value: "Odaberite sliku",
                        link: "photo",
                        multiple: false,
                        autosend: false,
                        accept: "image/*",
                        width: 150,
                        on: {
                            onBeforeFileAdd: function (upload) {
                                var file = upload.file;
                                if (file.size > 1048576) {
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
                        label: "Sačuvajte",
                        type: "iconButton",
                        icon: "save",
                        width: 150,
                        align: "center",
                        click: "firstLoginLayout.save"
                    },
                    {}
                ]
            }, {}
        ]
    }
};
var percentageSecurePassword = 0;
var passwordTab = {
    header: "Lozinka",
    id: "passwordTab",
    body: {
        id: "formChangePassword",
        view: "form",
        width: 500,
        elementsConfig: {
            labelWidth: 140,
            bottomPadding: 16  //TODO: change other forms
        },
        elements: [
            {
                cols: [
                    {},
                    {
                        view: "text",
                        id: "oldPassword",
                        type: "password",
                        name: "oldPassword",
                        label: "Trenutna lozinka:",
                        invalidMessage: "Unesite lozinku!",
                        required: true,
                        labelWidth: 200,
                        height: 35
                    },
                    {}
                ]
            },
            {
                cols: [
                    {},
                    {
                        rows: [
                            {
                                view: "text",
                                label: "Nova lozinka:",
                                id: "newPassword",
                                name: "newPassword",
                                type: "password",
                                invalidMessage: "Unesite lozinku!",
                                required: true,
                                bottomLabel: "*Min. 8 karaktera. Barem 1 veliko slovo, broj ili specijalni karakter.",
                                keyPressTimeout: 1000,
                                labelWidth: 200,
                                height: 35,
                                on: {
                                    'onTimedKeyPress': function () {
                                        var typed = $$("newPassword").getValue();
                                        if (typed == "") {
                                            $$("securePasswordBar").hide();
                                            $$("securePasswordBar").refresh();
                                            $$("securePasswordLabel").setValue("");
                                            return;
                                        }
                                        var strength = 0;
                                        var re1 = /[0-9]/;
                                        var re2 = /[A-Z]/;
                                        var re3 = /[@#$%^&+=]/;
                                        if (re1.test(typed))
                                            strength++;
                                        if (re2.test(typed))
                                            strength++;
                                        if (re3.test(typed))
                                            strength++;
                                        if (typed.length >= 8)
                                            strength++;
                                        switch (strength) {
                                            case 0:
                                            case 1:
                                            case 2:
                                                percentageSecurePassword = 10;
                                                $$("securePasswordBar").show();
                                                $$("securePasswordBar").refresh();
                                                $$("securePasswordLabel").setValue("Jačina lozinke: slabo");

                                                break;
                                            case 3:
                                                percentageSecurePassword = 50;
                                                $$("securePasswordBar").show();
                                                $$("securePasswordBar").refresh();
                                                $$("securePasswordLabel").setValue("Jačina lozinke: srednje");

                                                break;
                                            case 4:
                                                percentageSecurePassword = 100;
                                                $$("securePasswordBar").show();
                                                $$("securePasswordBar").refresh();
                                                $$("securePasswordLabel").setValue("Jačina lozinke: jako");

                                                break;
                                        }
                                    }
                                }
                            },
                            {
                                cols: [
                                    {},
                                    {
                                        id: "securePasswordLabel",
                                        view: "label",
                                        align: "right",
                                    },
                                    {
                                        id: "securePasswordBar",
                                        view: "label",
                                        align: "right",
                                        hidden: true,
                                        template: function () {
                                            var html = "<div class='progress_bar_element'>";
                                            html += ("<div class='progress_result ' style='width:" + ((percentageSecurePassword).toFixed(2) + "%") + "'></div>");
                                            html += "</div>";
                                            return html;
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {}
                ]
            },
            {
                cols: [
                    {},
                    {
                        view: "text",
                        label: "Potvrda nove lozinke:",
                        id: "newPasswordConfirmation",
                        name: "newPasswordConfirmation",
                        invalidMessage: "Unesite lozinku!",
                        type: "password",
                        required: true,
                        labelWidth: 200,
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
                        id: "changePasswordBtn",
                        name: "changePasswordBtn",
                        label: "Sačuvajte i pređite na aplikaciju",
                        width: 150,
                        type: "iconButton",
                        icon: "save",
                        click: "firstLoginLayout.savePassword",
                        align: "center",
                        hotkey: "enter"
                    },
                    {}
                ]
            }, {}
        ],
        rules: {
            "oldPassword": function (value) {
                if (!value)
                    return false;
                return true;
            },
            "newPassword": function (value) {
                if (value.length < 8) {
                    $$('formChangePassword').elements.newPassword.config.invalidMessage = "Lozinka mora imati minimum 8 karaktera!";
                    return false;
                }
                if (value == $$("oldPassword").getValue()) {
                    $$('formChangePassword').elements.newPassword.config.invalidMessage = "Lozinka ne smije biti jednaka staroj lozinki!";
                    return false;
                }
                var re = /[0-9A-Z@#$%^&+=]/;
                if (!re.test(value)) {
                    $$('formChangePassword').elements.newPassword.config.invalidMessage = "Lozinka mora sadržati barem jedan broj, veliko slovo ili specijalan karakter!";
                    return false;
                }
                return true;
            },
            "newPasswordConfirmation": function (value) {
                if (!value)
                    return false;
                if (value != $$("formChangePassword").getValues().newPassword) {
                    $$('formChangePassword').elements.newPasswordConfirmation.config.invalidMessage = 'Unešene lozinke nisu iste!';
                    return false;
                }

                return true;

            },
        }
    }
};
var companyTab = {
    header: "Kompanija",
    body: {
        view: "form",
        id: "formCompanyInformation",
        name: "formCompanyInformation",
        width: 650,
        elementsConfig: {
            labelWidth: 190,
            bottomPadding: 18
        },
        elements: [
            {
                cols: [
                    {},
                    {
                        view: "text",
                        id: "companyName",
                        name: "companyName",
                        label: "Naziv kompanije:",
                        required: true,
                        invalidMessage: "Niste unijeli naziv kompanije",
                        labelWidth: 200,
                        height: 35
                    },
                    {}
                ]
            },
            {
                view: "text",
                label: "PIN:",
                id: "companyPin",
                disabled: true,
                hidden: true,
                labelWidth: 200,
                height: 35
            },
            {
                cols: [
                    {},
                    {
                        view: "uploader",
                        id: "photoUploader",
                        required: true,
                        invalidMessage: "Niste odabrali logo.",
                        width: 560,
                        height: 50,
                        value: "Dodajte logo",
                        on: {
                            onBeforeFileAdd: function (upload) {
                                var type = upload.type.toLowerCase();
                                if (type === "jpg" || type === "png" || type === "jpeg") {
                                    var file = upload.file;
                                    if (file.size > 1048576) {
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
                                    util.messages.showErrorMessage("Dozvoljene ekstenzije su jpg, jpeg i png!");

                                    return false;
                                }

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
                        view: "list",
                        name: "companyLogoList",
                        rules: {
                            content: webix.rules.isNotEmpty
                        },
                        scroll: false,
                        id: "companyLogoList",
                        width: 208,//560,
                        height: 34,
                        type: {
                            height: 100
                        },
                        css: "relative image-upload",
                            template: "<img src='data:image/jpg;base64,#content#'/> <style>.delete-file {   margin: 0;\n" +
                                "  position: absolute;\n" +
                                "  top: 23%;\n" +
                                "  -ms-transform: translateY(-50%);\n" +
                                "  transform: translateY(-50%); }</style> <span class='delete-file'><span class='webix fa fa-close'/></span>",
                        onClick: {
                            'delete-file': function (e, id) {
                                this.remove(id);
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
                        view: "button",
                        id: "saveCompanyBtn",
                        name: "saveCompanyBtn",
                        label: "Sačuvajte",
                        width: 150,
                        type: "iconButton",
                        icon: "save",
                        click: "firstLoginLayout.saveCompany",
                        align: "center",
                        hotkey: "enter"
                    },
                    {}
                ]
            }, {}
        ]
    }
};

var days = [
    {"id": 8, "value": "Ponedjeljak"},
    {"id": 9, "value": "Utorak"},
    {"id": 10, "value": "Srijeda"},
    {"id": 11, "value": "Četvrtak"},
    {"id": 12, "value": "Petak"},
    {"id": 13, "value": "Subota"},
    {"id": 14, "value": "Nedjelja"}];
var updatedDays = [];
var updatedCollectiveVacations = [];
var startedSelectedValues = [];

var constraintsTab = {
    header: "Ogranicenja",
    body: {
        view: "scrollview",
        id: "scrollConstraintsInformation",
        scroll: "y",
        body: {

            cols: [
                {gravity: 0.1},
                {
                    id: "formConstraintsInformation",
                    view: "form",
                    borderless: true,
                    elementsConfig: {
                        labelWidth: 90,
                        bottomPadding: 16
                    },
                    elements: [{
                        rows: [{
                            cols: [{
                                rows: [
                                    {
                                        view: "form",
                                        id: "companyInfoForm",
                                        name: "companyInfoForm",
                                        borderless: true,
                                        elementsConfig: {
                                            labelWidth: 200,
                                            bottomPadding: 18
                                        },
                                        elements: [
                                            {
                                                view: "text",
                                                name: "vacationDays",
                                                label: "Broj dana godišnjeg:",
                                                id: "vacationDays",
                                                required: true,
                                                invalidMessage: "Niste unijeli broj"
                                            },
                                            {
                                                view: "text",
                                                name: "maxVacDaysPeriod",
                                                label: "Maksimalni period godišnjeg:",
                                                id: "maxVacDaysPeriod",
                                                required: true,
                                                invalidMessage: "Niste unijeli period"
                                            },
                                            {
                                                view: "text",
                                                name: "maxOldVacationPeriod",
                                                label: "Period starog godišnjeg:",
                                                id: "maxOldVacationPeriod",
                                                required: true,
                                                invalidMessage: "Niste unijeli period",
                                            },
                                            {
                                                view: "text",
                                                name: "sickDays",
                                                label: "Period opravdanja bolovanja:",
                                                id: "sickDays",
                                                required: true,
                                                invalidMessage: "Niste unijeli period",
                                            },
                                            {
                                                view: "multicombo",
                                                id: "nonWorkingDaysInWeek",
                                                name: "nonWorkingDaysInWeek",
                                                value: "",
                                                label: "Sedmični neradni dani:",
                                                placeholder: "Neradni dani u sedmici",
                                                required: true,
                                                invalidMessage: "Niste unijeli neradne dane u sedmici",
                                                newValues: true,
                                                suggest: days,
                                                on: {}
                                            }]
                                    },

                                ]
                            },
                                {
                                    borderless: true,
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
                                                    labelWidth: 200,
                                                    required: true,
                                                    invalidMessage: "Niste unijeli neradne dane"
                                                }
                                            ]
                                        },
                                        {
                                            view: "datatable",
                                            id: "nonWorkingDaysDT",
                                            adjust: true,
                                            select: "row",
                                            height: 120,
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
                                                    //fillspace: true,
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
                                                            var newDate = newFormat(string);
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
                                            height: 20,
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
                                                    labelWidth: 40,
                                                    required: true,
                                                    invalidMessage: "Niste unijeli datum početka kolektivnog godišnjeg odmora"

                                                },
                                                {
                                                    view: "datepicker",
                                                    id: "collectiveVacationToDTP",
                                                    name: "collectiveVacationToDTP",
                                                    stringResult: true,
                                                    format: "%d.%m.%Y.",
                                                    label: 'Do:',
                                                    labelWidth: 40,
                                                    required: true,
                                                    invalidMessage: "Niste unijeli datum kraja kolektivnog godišnjeg odmora"
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
                                            height: 120,
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
                                                   // fillspace: true,
                                                    width:35,
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
                                                            var newDateFrom = newFormat(stringDateFrom);
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
                                        },
                                        {
                                            height: 20
                                        }
                                    ]
                                }]
                        },
                            {
                                cols: [{}, {
                                    id: "saveInformation",
                                    view: "button",
                                    label: "Sačuvajte i pređite na aplikaciju",
                                    type: "iconButton",
                                    icon: "save",
                                    type: "iconButton",
                                    click: "firstLoginLayout.saveConstrains",
                                    align: "center",
                                    hotkey: "enter",
                                    width: 300,
                                    height: 40
                                }, {}
                                ]
                            }
                        ]
                    }],
                    rules: {
                        "maxOldVacationPeriod": function (value) {
                            if (!value)
                                return false;
                            return true;
                        }
                    }

                },
                {gravity: 0.1, height: 200}]
        }
    }
};

var sectorTab = {
    header: "Sektor",
    body: {
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
        body: {
            rows: [
                {
                    view: "template",
                    height: 200,
                    template: "<p>test</p><p>Test</p>"
                },
                {
                    height: 200,
                },
                {
                    view: "template",
                    height: 200,
                    template: "<p>test</p><p>Test</p>"
                },
                {height: 200,},
                {
                    view: "template",
                    height: 200,
                    template: "<p>test</p><p>Test</p>"
                }
            ]
        }
    }
}
firstLoginTabs.push(profileTab, passwordTab);
var firstLoginLayout = {
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
        }, {height: 5},
        {
            id: "firstLoginWizard",

            margin: 5,
            rows: [
                {type: "header", template: "Unesite Vaše podatke"},
                {
                    view: "template",
                    width: 400,
                    height: 70,
                    template: '<br><section>\n' +
                        '\n' +
                        '  <ol id="progressBar" class="progress-bar">\n' +
                        '  </ol>' +
                        '</section>'
                },
                {
                    id: "firstLoginTabs",
                    view: "tabview",
                    tabbar: {
                        on: {
                            onBeforeTabClick: function (id) {
                                var tabbar = $$("firstLoginTabs").getTabbar();
                                var oldIndex = tabbar.optionIndex(this.getValue());
                                var newIndex = tabbar.optionIndex(id);

                                if (newIndex > oldIndex && !tabCompleted[oldIndex]) {
                                    util.messages.showErrorMessage("Popunite formu prije nastavljanja");
                                    return false;
                                }
                                if (oldIndex != newIndex) {
                                    firstLoginLayout.progressBar.setIndex(newIndex, "is-active");
                                    firstLoginLayout.progressBar.unsetIndex(oldIndex, "is-active");
                                }
                                return true;
                            }
                        }
                    },
                    cells: firstLoginTabs,

                },

            ]
        }
    ],

    save: function () {
        var profileForm = $$("formProfileInformation");
        if (profileForm.validate()) {
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
                    userData.firstName = dataToSend.firstName;
                    userData.lastName = dataToSend.lastName;
                    userData.receiveMail = dataToSend.receiveMail;
                    userData.photo = objectToSend.photo;
                    util.messages.showMessage("Izmjene uspješno sačuvane.");
                    let ownTabId = profileTab.body.id;
                    firstLoginLayout.progressBar.unsetIndex(firstLoginLayout.progressBar.getTabIndex(ownTabId), "is-active");
                    firstLoginLayout.progressBar.updateNode(ownTabId, "is-complete");
                    $$("firstLoginTabs").getTabbar().setValue(passwordTab.body.id);
                    firstLoginLayout.progressBar.updateNode(passwordTab.body.id, "is-active");
                }
            })
        }
    },
    savePassword: function () {
        var changePasswordForm = $$("formChangePassword");
        if (changePasswordForm.validate()) {
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
                        let ownTabId = passwordTab.body.id;
                        firstLoginLayout.progressBar.updateNode(ownTabId, "is-complete");
                        var tabbar = $$("firstLoginTabs").getTabbar();
                        var tlength = tabbar.config.options.length;
                        var pindex = firstLoginLayout.progressBar.getTabIndex("formChangePassword");
                        if (tlength == pindex + 1) {
                            connection.sendAjax("POST", "hub/user/firstLogin",
                                function (text, data, xhr) {
                                    userData.firstLogin = 0;
                                }, function (text, data, xhr) {
                                    util.messages.showErrorMessage(text);
                                }, 0);
                            showApp();
                        } else {
                            firstLoginLayout.progressBar.unsetIndex(firstLoginLayout.progressBar.getTabIndex(ownTabId), "is-active");
                            $$("firstLoginTabs").getTabbar().setValue(companyTab.body.id);
                            firstLoginLayout.progressBar.updateNode(ownTabId, "is-complete");
                            firstLoginLayout.progressBar.updateNode(companyTab.body.id, "is-active");
                        }
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
    saveCompany: function () {
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
                    util.messages.showMessage("Izmjene uspješno sačuvane.");
                    let ownTabId = companyTab.body.id;
                    firstLoginLayout.progressBar.unsetIndex(firstLoginLayout.progressBar.getTabIndex(ownTabId), "is-active");
                    firstLoginLayout.progressBar.updateNode(ownTabId, "is-complete");
                    $$("firstLoginTabs").getTabbar().setValue(constraintsTab.body.id);
                    firstLoginLayout.progressBar.updateNode(constraintsTab.body.id, "is-active");
                }, function (text, data, xhr) {
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
                let ownTabId = sectorTab.body.id;
                firstLoginLayout.progressBar.unsetIndex(firstLoginLayout.progressBar.getTabIndex(ownTabId), "is-active");
                $$("firstLoginTabs").getTabbar().setValue(profileTab.body.id);
                firstLoginLayout.progressBar.updateNode(ownTabId, "is-complete");
                firstLoginLayout.progressBar.updateNode(profileTab.body.id, "is-active");
            }, function (text, data, xhr) {
                util.messages.showErrorMessage(text);
            }, sector);
    },
    saveConstrains: function () {  //poziv showApp
        var logo = $$("companyLogoList");
        var companyId = userData.companyId;
        var companyName = $$("companyName").getValue();
        var numberOfVacationDays = $$("vacationDays").getValue();
        var maxVacDaysPeriod = $$("maxVacDaysPeriod").getValue();
        var numberOfSickDays = $$("sickDays").getValue();
        var companyPin = $$("companyPin").getValue();
        var maxOldVacationPeriod = $$("maxOldVacationPeriod").getValue();

        var validation = $$("companyInfoForm").validate();
        if (validation) {
            var selectedDays = $$("nonWorkingDaysInWeek").getValue().split(",").filter(function (s) {
                return s;
            }).map(function (s) {
                return parseInt(s)
            })
            var daysId = [];


            for (var i = 0; i < selectedDays.length; i++) {
                if (!startedSelectedValues.includes(selectedDays[i]))
                    daysId.push(selectedDays[i]);
            }

            for (var i = 0; i < startedSelectedValues.length; i++) {
                if (!selectedDays.includes(startedSelectedValues[i]))
                    daysId.push(startedSelectedValues[i]);
            }

            var nonWorkingDaysInWeek = [];
            var dayId;
            var nonWorkingDayInWeek;

            for (var i = 0; i < daysId.length; i++) {
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

            var nonWorkingDaysInYear = [];

            for (var i = 0; i < updatedDays.length; i++) {
                var nonWorkingDayInYear = {
                    day: updatedDays[i].day,
                    companyId: companyId,
                    active: 0
                }
                nonWorkingDaysInYear.push(nonWorkingDayInYear);
            }
            updatedDays = [];

            var constraints = {
                companyId: companyId,
                maxVacationDays: numberOfVacationDays,
                vacationPeriodLength: maxVacDaysPeriod,
                sickLeaveJustificationPeriodLength: numberOfSickDays,
                maxOldVacationPeriodLength: maxOldVacationPeriod,
            }

            var collectiveVacations = [];

            for (var i = 0; i < updatedCollectiveVacations.length; i++) {

                var collectiveVacation = {
                    dateFrom: updatedCollectiveVacations[i].dateFrom,
                    dateTo: updatedCollectiveVacations[i].dateTo,
                    companyId: companyId
                }
                collectiveVacations.push(collectiveVacation);
            }
            updatedCollectiveVacations = [];

            let requests = [
                {method: "POST", url: "/hub/colectiveVacation/addColectiveVacations", item: collectiveVacations},
                {method: "POST", url: "/hub/constraints", item: constraints},
                {method: "POST", url: "/hub/nonWorkingDay/addNonWorkingDays/", item: nonWorkingDaysInYear},
                {method: "POST", url: "/hub/nonWorkingDayInWeek/addNonWorkingDaysInWeek/", item: nonWorkingDaysInWeek},
            ];
            let promises = [];
            for (let req of requests) {
                let reqPromise = webix.ajax().headers({
                    "Content-type": "application/json"
                }).post(req.url, JSON.stringify(req.item));
                promises.push(reqPromise);
            }
            webix.promise.all(promises).then(function (results) {
                let allOk = true;
                for (let res of results) {
                    if (!res.text) {
                        allOk = false;
                        util.messages.showErrorMessage(JSON.parse(res.response).error);
                    }
                }
                if (allOk) {
                    connection.sendAjax("POST", "hub/user/firstLogin",
                        function (text, data, xhr) {
                            userData.firstLogin = 0;
                        }, function (text, data, xhr) {
                            util.messages.showErrorMessage(text);
                        }, 0);
                    util.messages.showMessage("Uspješno izvršena izmjena podataka o kompaniji");
                    showApp();
                }
            });
            var collectiveVacations = $$("collectiveVacationDT").serialize();
            var numOfDays = 0;
            collectiveVacations.forEach(function (value) {
                numOfDays += getDatesFromRange(new Date(value.dateFrom), new Date(value.dateTo)).length;
            })
            var vacationDays = $$("vacationDays").getValue();
            connection.sendAjax("PUT", "hub/user/setVacation/" + vacationDays + "/" + numOfDays,
                function (text, data, xhr) {
                }, function (text, data, xhr) {
                });

        }
    },
    progressBar: {
        active: "is-active",
        complete: "is-complete",
        setIndex: function (index, style) {
            var progNode = document.getElementById("progNode" + (index + 1).toString());
            if (progNode == null) {
                return;
            }
            if (!progNode.className.includes(style.trim()))
                progNode.className += " " + style;
        },
        unsetIndex: function (index, style) {
            var progNode = document.getElementById("progNode" + (index + 1).toString());
            if (progNode == null) {
                return;
            }
            progNode.className = progNode.className.replace(style.trim(), '').trim();
        },
        init: function () {
            var progress = document.getElementById("progressBar");
            var tabbar = $$("firstLoginTabs").getTabbar();
            for (var i = 0; i < tabbar.config.options.length; i++) {
                var item = document.createElement("li");
                item.id = "progNode" + (i + 1).toString();
                progress.appendChild(item);
                if (tabCompleted[i]) {
                    this.setIndex(i, this.complete);
                }
            }
            this.setIndex(0, this.active);
        },
        updateNode: function (ownTabId, style) {
            var tabIndex = this.getTabIndex(ownTabId);
            if (style.includes(this.complete))
                tabCompleted[tabIndex] = true;
            this.setIndex(tabIndex, style);
        },
        getTabIndex: function (id) {
            var tabbar = $$("firstLoginTabs").getTabbar();
            var tabIndex = tabbar.optionIndex(id);
            return tabIndex;
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

                $$("usernameHolder").refresh();
                connection.sendAjax("PUT", "hub/user/" + newUser.id,
                    function (text, data, xhr) {
                        if (text) {

                            util.dismissDialog('addFirstAndLastNameDialog');
                            util.messages.showMessage("Ime i prezime uspješno dodano.");
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
            } else {
                $$("saveUserFirstAndLastName").enable();
            }
        }
    }
};

var menuEvents = {
    onItemClick: function (item) {
        menuActions(item);
    }
}

var firstLogin;
var showFirstLogin = function () {
    if (userData != null && userData.firstLogin != 0) {
        switch (userData.userGroupKey) {
            case "admin":
                firstLoginTabs.push(companyTab, constraintsTab);
                break;
            case "menadzer":
                firstLoginTabs.unshift(sectorTab);
                break;
        }
        var main = webix.copy(firstLoginLayout);
        firstLogin = webix.ui(main, panel);
        panel = $$("firstLoginPanel");

        if (userData.userGroupKey == "admin") {
            $$("changePasswordBtn").data.label = "Sačuvajte";
            $$("changePasswordBtn").refresh();
        }
        var companyId = userData.companyId;
        if (firstLoginTabs.includes(companyTab)) {
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

        if ($$("nonWorkingDaysDTP"))
            $$("nonWorkingDaysDTP").attachEvent("onChange", function (newValue) {

                var date = webix.Date.dateToStr("%Y-%m-%d")(newValue);
                var dateInDTFormat = webix.Date.dateToStr("%d.%m.%Y.")(newValue);
                var isDaySelected = 0;
                $$("nonWorkingDaysDT").eachRow(function (row) {
                    var record = $$("nonWorkingDaysDT").getItem(row);
                    if (dateInDTFormat == record.day)
                        isDaySelected = 1;
                });

                if (isDaySelected == 1)
                    util.messages.showMessage("Dan " + dateInDTFormat + " je već označen kao neradni dan.");
                else {
                    var editBox = (webix.copy(commonViews.confirm("Dodavanje neradnog dana", "Da li ste sigurni da želite da označite " + dateInDTFormat + " kao neradni dan?")));
                    var dataTableValue;
                    var updatedValue;

                    if ("" != date) {
                        editBox.callback = function (result) {
                            if (result == 1) {
                                dataTableValue = {
                                    day: dateInDTFormat
                                };
                                $$("nonWorkingDaysDT").add(dataTableValue);

                                updatedValue = {
                                    day: date
                                }

                                if (updatedDays.includes(dateInDTFormat))
                                    updatedDays = updatedDays.filter(function (element) {
                                        return element.day !== dateInDTFormat;
                                    });
                                else {
                                    updatedDays.push(updatedValue);
                                }
                            }
                        };
                        webix.confirm(editBox);
                    }
                }
                $$("nonWorkingDaysDTP").setValue("");
            });
        if (firstLoginTabs.includes(sectorTab)) {
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
        }
        if (companyData.logo != null) {
            $$("companyLogoImage").setValues({src: "data:image/png;base64," + companyData.logo});
        }
        else {
            $$("companyLogoImage").setValues({src: "img/noLogo.png"});
        }
    } else {
        showApp();
    }
};

var mainApp;

var showApp = function () {

    var companyInfoItems = [
        {id: "0", value: "O kompaniji", icon: "info-circle"},
        {id: "sep1", $template: "Separator"}];

    var subMenuItems = [
        {id: "1", value: "O programu", icon: "info-circle"},
        {id: "sep2", $template: "Separator"},
        {id: "2", value: "Promjena lozinke", icon: "lock"},
        {id: "sep3", $template: "Separator"},
        {id: "3", value: "Profil", icon: "user"},
        {id: "sep4", $template: "Separator"},
        {id: "4", value: "Odjava", icon: "sign-out"}
    ]

    if (userData.userGroupKey == "admin" || userData.userGroupKey == "direktor") {
        for (var i = 0; i < companyInfoItems.length; i++)
            settingsMenu.push(companyInfoItems[i]);
    }

    for (var i = 0; i < subMenuItems.length; i++)
        settingsMenu.push(subMenuItems[i]);

    var main = webix.copy(mainLayout);
    mainApp = webix.ui(main, panel);
    panel = $$("app");

    var localMenuData = null;

    if (userData != null) {
        if (userData.userGroupKey !== "superadmin") {
            if (companyData.logo == null)
                $$("companyLogoImage").setValues({src: "img/noLogo.png"});
            else
                $$("companyLogoImage").setValues({src: "data:image/png;base64," + companyData.logo});
        } else {
            $$("companyLogoImage").setValues({src: "img/telegroup-logo-inside.png"});
        }
        switch (userData.userGroupKey) {
            case "superadmin":
                localMenuData = webix.copy(menuSuperAdmin);
                $$("usernameHolder").define("template", '<span class="usernameHolderName">' + userData.firstName + ' ' + userData.lastName + '</span><br /><span class="usernameHolderRole">Superadmin</span>');
                $$("mainMenu").define("width", 1);
                $$("sidebarBelow").define("width", 1);

                break;
            case "admin":
                localMenuData = webix.copy(menuAdmin);
                $$("usernameHolder").define("template", '<span class="usernameHolderName">' + userData.firstName + ' ' + userData.lastName + '</span><br /><span class="usernameHolderRole">Admin</span>');

                break;
            case "direktor":
                localMenuData = webix.copy(menuDirector);
                $$("usernameHolder").define("template", '<span class="usernameHolderName">' + userData.firstName + ' ' + userData.lastName + '</span><br /><span class="usernameHolderRole">Direktor</span>');

                break;
            case "sekretar":
                localMenuData = webix.copy(menuSecretary);
                $$("usernameHolder").define("template", '<span class="usernameHolderName">' + userData.firstName + ' ' + userData.lastName + '</span><br /><span class="usernameHolderRole">Sekretar</span>');

                break;
            case "menadzer":
                localMenuData = webix.copy(menuSectorManager);
                $$("usernameHolder").define("template", '<span class="usernameHolderName">' + userData.firstName + ' ' + userData.lastName + '</span><br /><span class="usernameHolderRole">Menadzer</span>');

                break;
            case "zaposleni":
                localMenuData = webix.copy(menuWorker);
                $$("usernameHolder").define("template", '<span class="usernameHolderName">' + userData.firstName + ' ' + userData.lastName + '</span><br /><span class="usernameHolderRole">Zaposleni</span>');

                break;
        }
    }


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

    if (userData.userGroupKey == "superadmin")
        $$("notificationBtn").hide();

    $$("mainMenu").define("data", localMenuData);
    $$("mainMenu").define("on", menuEvents);


    $$("usernameHolder").refresh();

    rightPanel = "emptyRightPanel";
    switch (userData.userGroupKey) {
        case "superadmin":
            $$("menu-collapse").hide();
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

    if (userData.userGroupKey != "superadmin") {
        getNotifications();
        window.setInterval(getNotifications, 15000);
    }

};


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
            monthFull: ["Januar", "Februar", "Mart", "April", "Maj", "Jun",
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
                    template: '<img style="margin-top: 29px; margin-bottom: 29px;" src="img/telegroup-logo.png" onclick="gameView.showGameDialog()" /><div id="aboutRibbon"></div>',
                    onEnter: "gameView.gameDialog",
                    on: {
                        'onItemClick': function (id) {
                            gameView.showGameDialog();
                        }
                    },

                },
                {
                    view: "template",
                    height: 28,
                    css: "aboutLine",
                    template: '<b>Verzija:</b> ' + appVersion,

                    on: {
                        "onItemClick": function () {
                            gameView.gameDialog();
                        }
                    },
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
            ,
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

            {}
        ]
    }, {}, {}]

};


var login = function () {
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
                util.messages.showErrorMessage("Prijavljivanje nije uspjelo!")
            },
            success: function (text, data, xhr) {


                // util.messages.showErrorMessage("2");
                if (data.json() != null && data.json().id != null) {
                    userData = data.json();
                    if (userData.userGroupKey == "superadmin") {
                        if (objectToSend.companyPin.length == 0) {
                            companyData = null;
                            showApp();
                        } else {
                            util.messages.showErrorMessage("Prijavljivanje nije uspjelo!");
                        }
                    } else {
                        webix.ajax().get("hub/company/" + userData.companyId, {
                            success: function (text, data, xhr) {
                                var company = data.json();
                                if (company != null) {
                                    companyData = company;
                                    if (userData.firstLogin != 0) {
                                        showFirstLogin();
                                    } else {
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
                        var format = webix.Date.dateToStr("%d.%m.%Y. %H:%i");
                        var date = "" + obj.created;
                        var pom = "" + date.slice(8, 10) + "." + date.slice(6, 7) + "." + date.slice(0, 4) + ". " + date.slice(11, 19);

                        if (obj.seen) {
                            return "<span style='color: lightgrey' class='m_title' >" + (obj.title) + "</span>" +
                                "<span style='color:lightgrey' class='message'>" + (obj.text) + "</span>" +
                                "<span style='color:lightgrey' class='message'>" + (pom) + "</span>";
                        }
                        return "<span style='color:darkslategray;font-weight:bold' class='m_title'>" + (obj.title) + "</span>" +
                            "<span style='color:darkslategray;font-weight:bold' class='message'>" + (obj.text) + "</span>" +
                            "<span style='color:darkslategray;font-weight:bold' class='message'>" + (pom) + "</span>";
                    },
                    css: "notifications",
                    width: 300,
                    type: {
                        height: 90,
                        width: 350
                    },
                    on: {
                        "onItemClick": function (id, e, node) {
                            var item = this.getItem(id);
                            if ("Bolovanje" == item.title) {
                                if (userData.userGroupKey == "zaposleni") {
                                    calendarView.selectPanel();
                                    $$("mainMenu").select("calendar");
                                } else if (userData.userGroupKey == "sekretar") {
                                    $$("mainMenu").select("secretary_sick_request");
                                    sickRequestsView.selectPanel();
                                }
                            } else if("Obrađen zahtjev za godišnji odmor" == item.title || "Obrađen zahtjev za odsustvo" == item.title || "Obrađen zahtjev za praznik" == item.title
                                        || "Obrađen zahtjev za otkazivanje godišnjeg odmora" == item.title ||  "Obrađen zahtjev za otkazivanje odsustva" == item.title || "Obrađen zahtjev za otkazivanje praznika" == item.title){
                                $$("mainMenu").select("absence_history");
                                absenceHistoryView.selectPanel();
                            }else{
                                $$("mainMenu").select("leave_requests");
                                leaveRequestsView.selectPanel();
                            }

                            if (item.seen == 0) {
                                numberOfUnreadNotifications--;
                                item.seen = 1;
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
};

getNotifications = function () {
    notifications = [];
    webix.ajax().get("/hub/notification/getAllNotificationByUser/" + userData.id, {
        success: function (text, data, xhr) {
            numberOfUnreadNotifications = 0;
            notifications = [];
            var userNotifications = data.json();
            var notification;
            if (userNotifications != null) {
                for (var i = 0; i < userNotifications.length; i++) {
                    if (userNotifications[i].seen == 0) {
                        numberOfUnreadNotifications++;
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
                if (notifications.length < 10) {
                    var leng = 10 - notifications.length;
                    var j = 0;
                    for (var i = 0; i < leng; i++) {
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
                        } else {
                            i--;
                        }
                        if (j < userNotifications.length - 1) {
                            j++;
                        } else {
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
window.onload = function () {
    init();
};