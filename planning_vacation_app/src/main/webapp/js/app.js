var appVersion = 0.1;
var MENU_STATES = {
    COLLAPSED: 0,
    EXPANDED: 1
};
var menuState = MENU_STATES.COLLAPSED;

//menu configuration - EDITABLE

var localMenuData = [
    {id: "template", value: "Template", icon: "code"},
    {id: "sector", value: "Sektor", icon: "code"},
    {id:"usergroup",value:"Zaposleni",icon:"users"},
    {id: "company", value: "Kompanije", icon: "fa fa-briefcase"},
    {id: "calendar", value: "Kalendar", icon: "code"},
    {id:"constraints", value: "Ograničenja", icon: "briefcase"},
    {id:"admins", value: "Admini kompanija", icon: "list"},
    {id: "secretary_sick_request", value: "Pregled zahtjeva", icon: "far fa-envelope"}
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
            }

};

var menuSuperAdmin = [
    {
        id: "company",
        value: "Kompanije",
        icon: "briefcase"
    }
];

var menuAdmin=[
     {
           id: "usergroup",
           value: "Zaposleni",
           icon: "users"
      },
      {
           id: "sector",
           value: "Pregled sektora",
           icon: "list"
      }

 /*    {
           id: "collectiveVacation",
           value: "Kolektivni godišnji odmor",
           icon: "briefcase"
      }*/
];

var menuDirector=[
  /*   {
            id: "requests",
            value: "Zahtjevi",
            icon: "briefcase"
      },
     {
           id: "statistics",
           value: "Statistika",
           icon: "briefcase"
      }*/
     {
           id: "usergroup",
           value: "Zaposleni",
           icon: "users"
      },
      {
           id: "sector",
           value: "Pregled sektora",
           icon: "list"
      }
 /*    {
           id: "collectiveVacation",
           value: "Kolektivni godišnji odmor",
           icon: "briefcase"
      }*/

];

var menuSecretary=[
     {
            id: "calendar",
             value: "Kalendar",
             icon: "fa fa-calendar"
     },

     {
            id: "secretary_sick_request",
            value: "Zahtjevi",
            icon: "far fa-envelope"
      },/*
     {
           id: "statistics",
           value: "Statistika",
           icon: "briefcase"
      },*/
     {
           id: "usergroup",
           value: "Zaposleni",
           icon: "users"
      },
            {
                 id: "sector",
                 value: "Pregled sektora",
                 icon: "list"
            }
 /*    {
           id: "collectiveVacation",
           value: "Kolektivni godišnji odmor",
           icon: "briefcase"
      }*/
];

var menuSectorManager=[
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
            id: "sectorInfo",
            value: "Sektor",
            icon: "briefcase"
      }
];

var menuWorker=[
    {
        id: "calendar",
        value: "Kalendar",
        icon: "fa fa-calendar"
    }
];
var settingsMenu=[
    {id: "0", value: "O kompaniji", icon: "info-circle"},
    {$template: "Separator"},
    {id: "1", value: "O programu", icon: "info-circle"},
    {$template: "Separator"},
    {id: "2", value: "Promjena lozinke", icon: "lock"},
    {$template: "Separator"},
    {id: "3", value: "Profil", icon: "user"},
    {$template: "Separator"},
    {id: "4", value: "Odjava", icon: "sign-out"}
    ];

var settingsMenuActions=function (id) {
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
                    showApp();
                    // showLogin();
                }
            }
        }
    });
}

var mainLayout = {
    id: "app",
    width: "auto",
    height: "auto",
    rows: [
        {
            cols: [{
                view: "template",
                width: 220,
                css: "logoInside",
                template: function () {
                    return '<img src="img/telegroup-logo-inside.png"/>';
                }
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
                        view: "menu",
                        width: 45,
                        icon: "cog",
                        css: "settingsMenu",
                        align: "right",
                        submenuConfig: {width: 180},
                        data: [{
                            id: "settingsMenu", icon: "cog", value: "", submenu: settingsMenu
                        }],
                        openAction: "click",
                        on: {
                            onMenuItemClick: settingsMenuActions
                        }
                    }
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
    ]
};

var menuEvents = {
    // onMenuItemClick: function (id) {
    //     menuActions(id);
    // }
    onItemClick: function (item) {
        menuActions(item);
    }
}
var mainApp;
var showApp = function () {
    var main = webix.copy(mainLayout);
    mainApp = webix.ui(main, panel);
    panel = $$("app");
    //$$("usernameHolder").define("template", '<span class="usernameHolderName">' + userData.ime + ' ' + userData.prezime + ' (' + rolaNameSerbian[userData.rolaNivo] + ')' + '</span><br /><span class="usernameHolderUsername">' + userData.korisnickoIme + '</span>');
    //**************
    var localMenuData = null;

    //if (userData.userGroupId != 2 || userData.userGroupId != 3) //nema mogucnost promjene ogranicenja o kompaniji ako nije direktor ili admin

    if(userData!=null)
    {
    switch (userData.userGroupId) {
        case 1:
            localMenuData = webix.copy(menuSuperAdmin);
            $$("usernameHolder").define("template", '<span class="usernameHolderName">' + userData.firstName + ' ' + userData.lastName + '</span><br /><span class="usernameHolderRole">Superadmin</span>');
            break;
        case 2:
            localMenuData = webix.copy(menuAdmin);
            $$("usernameHolder").define("template", '<span class="usernameHolderName">' + userData.firstName + ' ' + userData.lastName + '</span><br /><span class="usernameHolderRole">Admin</span>');
            break;
        case 3:
            localMenuData = webix.copy(menuDirector);
            $$("usernameHolder").define("template", '<span class="usernameHolderName">' + userData.firstName + ' ' + userData.lastName + '</span><br /><span class="usernameHolderRole">Direktor</span>');
            break;
        case 4:
            localMenuData = webix.copy(menuSecretary);
            $$("usernameHolder").define("template", '<span class="usernameHolderName">' + userData.firstName + ' ' + userData.lastName + '</span><br /><span class="usernameHolderRole">Sekretar</span>');
            break;
        case 5:
            localMenuData = webix.copy(menuSectorManager);
            $$("usernameHolder").define("template", '<span class="usernameHolderName">' + userData.firstName + ' ' + userData.lastName + '</span><br /><span class="usernameHolderRole">Menadzer</span>');
            break;
        case 6:
            localMenuData = webix.copy(menuWorker);
            $$("usernameHolder").define("template", '<span class="usernameHolderName">' + userData.firstName + ' ' + userData.lastName + '</span><br /><span class="usernameHolderRole">Zaposleni</span>');
            break;
    }}

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


    $$("mainMenu").define("data", localMenuData);
    $$("mainMenu").define("on", menuEvents);

    $$("usernameHolder").refresh();

    rightPanel = "emptyRightPanel";

    $$("mainMenu").select("template");
    templateView.selectPanel();
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
                    template: '<b>Verzija:</b> ' +appVersion
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
        height:110
        },{
        cols: [{}
        , //1st column
            {
                rows:[{
                    view:"label",
                    css:"welcomeLabel",
                    label:"Dobro do&#154;li",
                    align:"center",
                    width:590
                },{
                    height:30
                },
                    {
                    height:120,
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
                    },{}, {
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
                    }]
                }]

            },
            //2nd column
            {}
        ]
    }, {},{}]
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

    if($$("loginForm").validate()) {
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
                    console.log(userData.userGroupId);

                    if (userData.userGroupId == 1) {
                        companyData = null;
                        showApp();
                    } else {
                        webix.ajax().get("hub/company/" + userData.companyId, {
                            success: function (text, data, xhr) {
                                var company = data.json();
                                if (company != null) {
                                    companyData = company;
                                    showApp();
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


//main call
window.onload = function () {
    init();
};
