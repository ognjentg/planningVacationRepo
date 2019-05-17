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
    {id:"usergroup",value:"Zaposleni",icon:"list"},
    {id: "company", value: "Kompanije", icon: "fa fa-briefcase"},
    {id: "calendar", value: "Kalendar", icon: "code"},
    {id:"constrains", value: "Ograničenja", icon: "briefcase"},
    {id:"admins", value: "Admini kompanija", icon: "list"}
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
        case "constrains":
            constrains.selectPanel();
            break;
        case "admins":
            adminsView.selectPanel();
            break;
            }
};

var menuSuperAdmin = [
    {
        id: "company",
        value: "Kompanije",
        icon: "briefcase"
    },
    {
        id: "admins",
        value: "Testiranje-Admini kompanija",
        icon: "list"
    }
];

var menuAdmin=[
     {
            id: "company",
            value: "Kompanija",
            icon: "briefcase"
      },
      {
            id: "constrains",
            value: "Ogranicenja kompanije",
            icon: "briefcase"
      },
     {
           id: "usergroup",
           value: "Zaposleni",
           icon: "list"
      },
      {
           id: "sector",
           value: "Zaposleni po sektorima",
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
            id: "constrains",
            value: "Ogranicenja kompanije",
            icon: "briefcase"
      },
     {
           id: "usergroup",
           value: "Zaposleni",
           icon: "list"
      },
      {
           id: "sector",
           value: "Zaposleni po sektorima",
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
             icon: "briefcase"
     },
    /*
     {
            id: "requests",
            value: "Zahtjevi",
            icon: "briefcase"
      },
     {
           id: "statistics",
           value: "Statistika",
           icon: "briefcase"
      },*/
     {
            id: "constrains",
            value: "Ogranicenja kompanije",
            icon: "briefcase"
      },
     {
           id: "usergroup",
           value: "Zaposleni",
           icon: "lisz"
      },
            {
                 id: "sector",
                 value: "Zaposleni po sektorima",
                 icon: "list"
            }
 /*    {
           id: "collectiveVacation",
           value: "Kolektivni godišnji odmor",
           icon: "briefcase"
      },
      {
            id: "sickLeave",
            value: "Bolovanja",
            icon: "briefcase"
       }*/
];

var menuSectorManager=[
    {
        id: "calendar",
        value: "Kalendar",
        icon: "code"
    },
     {
           id: "sector",
           value: "Zaposleni po sektorima",
           icon: "list"
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
        icon: "code"
    }
];
var settingsMenu=[
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
        case "1":
            showAboutDialog();
            break;
        case "2":
            util.messages.showMessage("TODO");
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

    webix.ajax("hub/state", {
        error: function (text, data, xhr) {
            if (xhr.status == 401 || true) { // TODO praksa obrisati || true uslov nakon sto se napravi hub/state endpoint na backendu
              showLogin();
              //showApp();
            }
        },
        success: function (text, data, xhr) {
            if (xhr.status == "200") {
                if (data.json() != null && data.json().id != null) {
                    userData = data.json();
                   // showApp();
                    showLogin();
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
                        label: "<b>Template</b>",
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
    if(userData!=null)
    {
    switch (userData.userGroupId) {
        case 1:
            localMenuData = webix.copy(menuSuperAdmin);
            break;
        case 2:
            localMenuData = webix.copy(menuAdmin);
            break;
        case 3:
            localMenuData = webix.copy(menuDirector);
            break;
        case 4:
            localMenuData = webix.copy(menuSecretary);
            break;
        case 5:
            localMenuData = webix.copy(menuSectorManager);
            break;
        case 6:
            localMenuData = webix.copy(menuWorker);
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
    css:"loginLayoutBackground",
    rows: [{
        height:30,
        css:"loginLayoutBackground"
    }, {
        view: "template",
        height: 100,
        css: "loginLayoutBackground",
        template: '<img src="img/telegroup-logo.png"/>'
    },{
        height:30,
        css:"orangeBackground",
    },{
        height:10,
        css:"loginLayoutBackground",
    },{
        height:30,
        css:"orangeBackground"
    },{
        height:10
    }, {
        cols: [{}, //1st column
            {
                view: "form",
                id: "loginForm",
                css:"loginForm",
                width: 300,
                elements: [{
                    view: "text",
                    required:true,
                    id: "username",
                    name: "korisnickoIme",
                    label: "Korisničko ime",
                   // invalidMessage:"Niste unijeli korisničko ime.",
                    labelWidth: 120,
                    width: 275,
                    height:35
                }, {
                    view: "text",
                    name: "lozinka",
                    id:"password",
                    required:true,
                    type: "password",
                    label: "Lozinka",
                    //invalidMessage:"Niste unijeli lozinku.",
                    labelWidth: 120,
                    width: 275,
                    height:35
                },  {
                    view: "text",
                    id:"company",
                    name: "kompanija",
                    label: "Kompanija",
                    //invalidMessage:"Niste unijeli kompaniju.",
                    labelWidth: 120,
                    width: 275,
                    height:35
                },
                    {
                    margin: 5,
                    cols: [{}, {
                        id: "login",
                        view: "button",
                        label: "Prijavi se",
                        type: "iconButton",
                        icon: "sign-in",
                        click: "login",
                        align:"left",
                        width: 155,
                        height:35
                    }]
                }]
            },
            //2nd column
            {}
        ]
    }, {},{}]
};

var login = function () {
console.log($$("loginForm").getValues());

    var data = $$("loginForm").getValues();

    var objectToSend = {
        username: data.korisnickoIme,
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

                util.messages.showErrorMessage("1");
            },
            success: function (text, data, xhr) {
                //util.messages.showErrorMessage("2");
                if (data.json() != null && data.json().id != null) {
                   userData = data.json();
                    console.log(user);

///*********************

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

//************************
                } else {
                    util.messages.showErrorMessage("data.json() == null || data.json().id == null");
                }
            }
        });
    }
    else {
        util.messages.showErrorMessage("Neuspješna prijava!")
    }
};


//main call
window.onload = function () {
    init();
};
