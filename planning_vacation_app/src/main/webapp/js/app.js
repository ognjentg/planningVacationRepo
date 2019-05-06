var appVersion = 0.1;
var MENU_STATES = {
    COLLAPSED: 0,
    EXPANDED: 1
};
var menuState = MENU_STATES.COLLAPSED;

//menu configuration - EDITABLE

var localMenuData = [
    {id: "template", value: "Template", icon: "code"},
    {id: "sector", value: "Sector", icon: "code"}
];

var menuActions = function (id) {
    switch (id) {
        case "template":
            templateView.selectPanel();
            break;

        case "sector":
            sectorView.selectPanel();
            break;
    }
};

var settingsMenu=[
    {id: "1", value: "O programu", icon: "info-circle"},
    {$template: "Separator"},
    {id: "2", value: "Promjena lozinke", icon: "lock"},
    {$template: "Separator"},
    {id: "3", value: "Odjava", icon: "sign-out"}
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
            logout();
            break;
    }
};

//core app - DO NOT EDIT
var panel = {id: "empty"};
var rightPanel = null;

var userData = null;

var init = function () {
    if (!webix.env.touch && webix.ui.scrollSize) webix.CustomScroll.init();
    localize();
    webix.ui(panel);
    panel = $$("empty");

    webix.ajax("hub/state", {
        error: function (text, data, xhr) {
            if (xhr.status == 401 || true) { // TODO praksa obrisati || true uslov nakon sto se napravi hub/state endpoint na backendu
              showLogin();
              //showApp();  //Teodora:  odkomentarisite 60,a zakomentarisite 59 , da vidite template...
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


//TO DO

var loginLayout = {
    id: "loginPanel",
    rows: [{}, {
        view: "template",
        height: 100,
        css: "loginLogo",
        template: '<img src="img/telegroup-logo-inside.png"/>'
    }, {
        cols: [{}, //1st column
            {
                view: "form",
                id: "loginForm",
                width: 500,
                elements: [{
                    view: "text",
                    required:true,
                    id: "username",
                    name: "korisnickoIme",
                    label: "Korisničko ime",
                    invalidMessage:"Niste unijeli korisničko ime.",
                    on:{
                        'onEnter':function () {
                            webix.UIManager.setFocus($$('password'));
                        }
                    },
                    labelWidth: 150
                }, {
                    view: "text",
                    name: "lozinka",
                    id:"password",
                    required:true,
                    type: "password",
                    label: "Lozinka",
                    invalidMessage:"Niste unijeli lozinku.",
                    on:{
                      'onEnter':function () {
                          webix.UIManager.setFocus($$('company'));
                      }
                    },
                    labelWidth: 150
                },  {
                    view: "text",
                    id:"company",
                    name: "kompanija",
                    required:true,
                    label: "Kompanija",
                    invalidMessage:"Niste unijeli kompaniju.",
                    labelWidth: 150,
                    on:{
                        'onEnter':function(){
                            webix.UIManager.setFocus($$('company'));
                        }
                    }
                },
                    {
                    margin: 5,
                    cols: [{}, {
                        id: "login",
                        view: "button",
                        value: "Prijavi se",
                        type: "form",
                        click: "login",
                        width: 150
                    }]
                }]
            },
            //2nd column
            {}
        ]
    }, {}]
};

//TO DO
var login = function () {
    if($$("loginForm").validate()) {
        webix.ajax().post("login", $$("loginForm").getValues(), {
            error: function (text, data, xhr) {
                showApp();
                return;
                // TODO praksa obrisati 2 prethodne linije koda kad se napravi login na backendu,
                // TO DO kad se uradi login na bekendu, alert ce biti premjesten ovdje negdje,
                // za sad ovako.

                util.messages.showErrorMessage("Neuspješna prijava!");
            },
            success: function (text, data, xhr) {
                if (data.json() != null && data.json().id != null) {
                    userData = data.json();
                    showApp();
                } else {
                    util.messages.showErrorMessage("Neuspješna prijava!");
                }
            }
        });
    }
    else {
        webix.alert({
            title:"Neuspješna prijava! ",
            text:"Korisničko ime, lozinka ili kompanija nisu korektni!",
            type:"alert-error"}).then(function () {
            alert(2);
        });
    }
};

//main call
window.onload = function () {
    init();
};
