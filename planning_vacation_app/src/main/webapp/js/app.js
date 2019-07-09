var appVersion = 0.1;
var MENU_STATES = {
    COLLAPSED: 0,
    EXPANDED: 1
};
var menuState = MENU_STATES.COLLAPSED;

var film_set = [
    [ "War and Peace", "Leo Tolstoy" ],
    [ "Hamlet", "Shakespeare" ],
    [ "Madame Bovary", "Gustave Flaubert" ]
];

//menu configuration - EDITABLE
var settingsMenu = [];
var notifications = [];
var numberOfUnreadNotifications = 0;
var notificationsMenu = [];
var localMenuData = [
    {id: "template", value: "Template", icon: "code"},
    {id: "sector", value: "Sektor", icon: "code"},
    {id:"usergroup",value:"Zaposleni",icon:"users"},
    {id: "company", value: "Kompanije", icon: "fa fa-briefcase"},
    {id: "calendar", value: "Kalendar", icon: "code"},
    {id:"constraints", value: "Ograničenja", icon: "briefcase"},
    {id:"admins", value: "Admini kompanija", icon: "list"},
    {id: "secretary_sick_request", value: "Pregled zahtjeva", icon: "far fa-envelope"},
    {id:"leave_requests",value:"Pregled zahtjeva za odmor",icon:"list"}
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
      },
    {
        id: "leave_requests",
        value: "Pregled zahtjeva za odmor",
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
      },
    {
        id: "leave_requests",
        value: "Pregled zahtjeva za odmor",
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
            },
    {
        id: "leave_requests",
        value: "Pregled zahtjeva za odmor",
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
      },
    {
        id: "leave_requests",
        value: "Pregled zahtjeva za odmor",
        icon: "list"
    }
];

var menuWorker=[
    {
        id: "calendar",
        value: "Kalendar",
        icon: "fa fa-calendar"
    }
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
                    if (userData.userGroupKey == "superadmin") {
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

var mainLayout = {
    id: "app",
    width: "auto",
    height: "auto",
    css:"fadeInAnimation",
    rows: [
        {
            cols: [{
                id: "companyLogoImage",
                name: "companyLogoImage",
                view: "template",
                width: 220,
                css: "logoInside",
                template: "<img src='#src#'/>",
                data: { src: null }
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
                        view:"button",
                        width:60,
                        badge:numberOfUnreadNotifications,
                        type:"icon",
                        icon:"bell",
                        popup:"notificationMenu",
                        click: function() {
                            showNotifications();


                    }},
                {
                    view: "menu",
                    width: 45,
                    icon: "cog",
                    id:"settingsMenu",
                    name:"settingsMenu",
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
] ,

saveUserFirstAndLastNameFunction : function (){
    var form = $$("addFirstAndLastNameForm");

    if (!isThereInternetConnection()) {
        alert("Nemate pristup internetu. Provjerite konekciju i pokušajte ponovo.");
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

            switch (userData.userGroupKey){
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
                    } else
                        util.messages.showErrorMessage("Neuspješno dodavanje.");
                }, function (text, data, xhr) {
                    util.messages.showErrorMessage(text);
                    alert(text);
                }, newUser);
        }
    }
},
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
    for(var i = 0; i < companyInfoItems.length; i++)
    settingsMenu.push(companyInfoItems[i]);
}

for(var i = 0; i < subMenuItems.length; i++)
    settingsMenu.push(subMenuItems[i]);


console.log("Company data: ");
console.log(companyData);
var main = webix.copy(mainLayout);
mainApp = webix.ui(main, panel);
panel = $$("app");
//$$("usernameHolder").define("template", '<span class="usernameHolderName">' + userData.ime + ' ' + userData.prezime + ' (' + rolaNameSerbian[userData.rolaNivo] + ')' + '</span><br /><span class="usernameHolderUsername">' + userData.korisnickoIme + '</span>');
//**************
var localMenuData = null;



webix.ajax().get("/hub/notification/getAllNotificationByUser/" + 6, { // userData.id,
    success: function (text, data, xhr) {
        numberOfUnreadNotifications = 0;
        var userNotifications = data.json();
        var notification;
        for (var i = 0; i <userNotifications.length; i++)
        {
            if(userNotifications[i].seen == 0)
                numberOfUnreadNotifications++; //broj neprocitanih poruka, za badge se uvecava brojac
            notification = {
                id: userNotifications[i].id,
                title: userNotifications[i].title,
                text: userNotifications[i].text
            };
            notifications.push(notification);

            //treba jos datum, bilo bi fino i to prikazati kad se doda u tabeli notification
        }
        $$("notificationBtn").config.badge = numberOfUnreadNotifications;
        $$("notificationBtn").refresh();
    },
    error: function (text, data, xhr) {
      alert(text)
    }
});

if(userData!=null)
{
    if(userData.userGroupKey !== "superadmin") {
        $$("companyLogoImage").setValues({src: "data:image/png;base64," + companyData.logo});
    } else {
        $$("companyLogoImage").setValues({src: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D"});
    }
    switch (userData.userGroupKey) {
    case "superadmin":
        localMenuData = webix.copy(menuSuperAdmin);
        $$("usernameHolder").define("template", '<span class="usernameHolderName">' + userData.firstName + ' ' + userData.lastName + '</span><br /><span class="usernameHolderRole">Superadmin</span>');
        if(userData.firstName == null || userData.lastName == null){
            showAddFirstAndLastNameDialog();
        }
        break;
    case "admin":
        localMenuData = webix.copy(menuAdmin);
        $$("usernameHolder").define("template", '<span class="usernameHolderName">' + userData.firstName + ' ' + userData.lastName + '</span><br /><span class="usernameHolderRole">Admin</span>');
        if(userData.firstName == null || userData.lastName == null){
            showAddFirstAndLastNameDialog();
        }
        break;
    case "direktor":
        localMenuData = webix.copy(menuDirector);
        $$("usernameHolder").define("template", '<span class="usernameHolderName">' + userData.firstName + ' ' + userData.lastName + '</span><br /><span class="usernameHolderRole">Direktor</span>');
        if(userData.firstName == null || userData.lastName == null){
            showAddFirstAndLastNameDialog();
        }
        break;
    case "sekretar":
        localMenuData = webix.copy(menuSecretary);
        $$("usernameHolder").define("template", '<span class="usernameHolderName">' + userData.firstName + ' ' + userData.lastName + '</span><br /><span class="usernameHolderRole">Sekretar</span>');
        if(userData.firstName == null || userData.lastName == null){
            showAddFirstAndLastNameDialog();
        }
        break;
    case "direktor":
        localMenuData = webix.copy(menuSectorManager);
        $$("usernameHolder").define("template", '<span class="usernameHolderName">' + userData.firstName + ' ' + userData.lastName + '</span><br /><span class="usernameHolderRole">Menadzer</span>');
        if(userData.firstName == null || userData.lastName == null){
            showAddFirstAndLastNameDialog();
        }
        break;
    case "zaposleni":
        localMenuData = webix.copy(menuWorker);
        $$("usernameHolder").define("template", '<span class="usernameHolderName">' + userData.firstName + ' ' + userData.lastName + '</span><br /><span class="usernameHolderRole">Zaposleni</span>');
        if(userData.firstName == null || userData.lastName == null){
            showAddFirstAndLastNameDialog();
        }
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
switch (userData.userGroupKey){
    case "superadmin":
        $$("mainMenu").select("company");
        companyView.selectPanel();
        break;
    case "admin":
        $$("mainMenu").select("usergroup");
        usergroupView.selectPanel();
        break;
    case "direktor":
        $$("mainMenu").select("usergroup");
        usergroupView.selectPanel();
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
        $$("mainMenu").select("calendar");
        calendarView.selectPanel();
        break;
}
//templateView.selectPanel();
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
                    type: "password",
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
                    console.log(userData.userGroupKey);

                    if (userData.userGroupKey == "superadmin") {
                        if(objectToSend.companyPin.length==0) {
                            companyData = null;
                            showApp();
                        }
                        else{
                            util.messages.showErrorMessage("Prijavljivanje nije uspjelo!");
                        }
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
                                //hotkey: "enter",
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
        }, 0);
};


showNotifications=function(){
    webix.ui({
        view: "popup",
        id: "notificationMenu",
        head: "Submenu",
        height: 400,
        body: {
            rows: [
                {
                    view: "list",
                    id: "notificationList",
                    name: "notificationList",
                    select: true,
                    resize: true,
                    autoheight: true,
                    borderless: true,
                    template: function (obj) {
                        return "<span class='m_title'>" + (obj.title) + "</span>" +
                            "<span class='message'>" + (obj.text) + "</span>";

                    },
                    // template: "#title#.#text#{common.markCheckbox()}",
                    //  data: notifications,
                    css: "notifications",
                    width: 300,
                    type: {
                        height: 80,
                        width: 300 /* BEWARE needs to be more than specified in extended-orange.css for contactName and message_text */
                    },
                    on: {
                        "onItemClick": function (id, e, node) {
                            var item = this.getItem(id);
                            webix.alert({
                                title: item.title,
                                ok: "OK",
                                text: item.text
                            });
                        }
                    },
                    onClick: {
                        "check": function (e, id) {
                            var item = this.getItem(id);
                            item.markCheckbox = item.markCheckbox ? 0 : 1;
                            if (item.markCheckbox == 0)
                                numberOfUnreadNotifications--;
                            else
                                numberOfUnreadNotifications++;
                            $$("notificationBtn").config.badge = numberOfUnreadNotifications;
                            $$("notificationBtn").refresh();
                            this.updateItem(id, item);
                        }
                    },
                }
            ]
        }
    });
    var list = $$("notificationList");
    list.parse(notifications);
};


//main call
window.onload = function () {
    init();
};
