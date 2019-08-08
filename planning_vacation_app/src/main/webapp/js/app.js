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
        icon: "fas fa-pie-chart"
    }

    /*    {
              id: "collectiveVacation",
              value: "Kolektivni godišnji odmor",
              icon: "briefcase"
         }*/
];

var menuDirector = [
    /*   {
              id: "requests",
              value: "Zahtjevi",
              icon: "briefcase"
        },
       {
             id: "statistics",
             value: "Statistika",
             icon: "fas fa-line-chart"
        }*/
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
        icon: "fas fa-pie-chart"
    }
    /*    {
              id: "collectiveVacation",
              value: "Kolektivni godišnji odmor",
              icon: "briefcase"
         }*/

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
    }, /*
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
        value: "Sektori",
        icon: "briefcase"
    },
    {
        id: "leave_requests",
        value: "Zahtjevi za odmor",
        icon: "list"
    },
    /*    {
              id: "collectiveVacation",
              value: "Kolektivni godišnji odmor",
              icon: "briefcase"
         }*/
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
        icon: "fas fa-pie-chart"
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
/*
var step=0.3333333333333;  //KORAK UVECAVANJA
var value=0;   //POCETNA VRIJEDNOST

webix.ui({
 id:"app",
 margin:5,
 //height:900,  //AKO OVO UKLJUCIM, POVECA SE TABELA< ALI SE SKLONI button "Reload with Progress Bar"
 rows:[
   { type:"header", template:"Unesite Vase podatke" },
  {
     view: "tabview",
     cells:[
         {
     header: "Profil",
     body: {
       id: "formView1",
       //view: "form"
       // form config
     }
   },
         {
     header: "Kompanija",
     body: {
       id: "formView2",
       //view: "list"
       // list config
     }
   },
   {
     header: "Ogranicenja",
     body: {
       id: "formView3",
       //view: "form"
       // form config
     }
   }
     ]
   },
//   { view:"segmented", options:["Profil", "Kompanija", "Ogranicenja"]
//  },
   { height:0 },
   {
     cols:[
     { view:"button", value:"Reload with Progress Bar", click:function(){ show_progress_bar(2000); }}
   ]
   }
 ]
});

//adding ProgressBar functionality to layout
webix.extend($$("app"), webix.ProgressBar);

function show_progress_bar(delay){
 value=value+step;  // OVDJE KORAK UVECAM
 $$("app").disable();
 $$("app").showProgress({
   type:"top",
   delay:delay,
   hide:false,
   position:value  // OVDJE POZICIJU SETUJEM
 });
 setTimeout(function(){
   $$("app").enable();
 }, delay);
};
 */
var step=0.3333333333333;  //KORAK UVECAVANJA
var value=0;   //POCETNA VRIJEDNOST
///<div id="myDiv">Default Template with some text inside</div>

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
///////////////////////////////////////////////////////////////////////////
                template: '<br><section>\n' +
                    '\n' +
                    '  <ol class="progress-bar">\n' +
                    '    <li class="is-complete"><span></span></li>  \n' +
                    '    <li class="is-complete"><span></span></li>  \n' +
                    '    <li class="is-active"><span></span></li>\n' +
                    '    <li><span></span></li>' +
                    '  </ol>' +
                    '</section>'
///////////////////////////////////////////////////////////////////////////
            },
                {
                    view: "tabview",
                    cells:[
                        {
                            header: "Profil",
                            body: {
                                id: "formProfileInformation",
                                view: "form",
                                width: 500,
                                elementsConfig: {
                                    labelWidth: 140,
                                    bottomPadding: 18
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
                                        view: "text",
                                        required: true,
                                        id: "firstName",
                                        name: "firstName",
                                        label: "Ime",
                                        invalidMessage: "Niste unijeli ime.",
                                        labelWidth: 100,
                                        height: 35
                                    },
                                    {
                                        view: "text",
                                        required: true,
                                        id: "lastName",
                                        name: "lastName",
                                        label: "Prezime",
                                        invalidMessage: "Niste unijeli prezime.",
                                        labelWidth: 100,
                                        height: 35
                                    },
                                    {
                                        view: "checkbox",
                                        id: "receiveMail",
                                        name: "receiveMail",
                                        label: "Želim da primam obavještenja na e-mail.",
                                        labelWidth: 320,
                                        height: 35
                                    },
                                    {
                                        cols: [
                                            {
                                                view: "button",
                                                id: "saveProfileButton",
                                                name: "saveProfileButton",
                                                hotkey: "enter",
                                                label: "Sačuvaj",
                                                type: "iconButton",
                                                icon: "save",
                                                click: "firstLoginLayout.save"
                                            }
                                        ]
                                    }
                                ]
                            }
                        },
                        {
                            header: "Lozinka",
                            body: {
                                id: "formChangePassword",
                                //view: "list"
                                // list config
                            }
                        },
                        {
                            header: "Kompanija",
                            body: {
                                id: "formCompanyInformation",
                                //view: "list"
                                // list config
                            }
                        },
                        {
                            header: "Ogranicenja",
                            body: {
                                id: "formConstrainsInformation",
                                view: "form",
                                elements: [{
                                    id: "saveInformation",
                                    view: "button",
                                    label: "Sacuvajte i predjite na aplikaciju",
                                    type: "iconButton",
                                    //icon: "sign-in",
                                    click: "showApp",
                                    align: "left",
                                    hotkey: "enter",
                                    width: 580,
                                    height: 40
                                }]
                            }
                        }
                    ]
                },
                { height:0 },
              /*  {
                    cols:[
                        { view:"button", value:"Reload with Progress Bar", click:function(){ firstLoginLayout.show_progress_bar(2000); }}
                    ]
                },*/
                {height:20}

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
                    userData.firstName = dataToSend.firstName;
                    userData.lastName = dataToSend.lastName;
                    userData.receiveMail = dataToSend.receiveMail;
                    userData.photo = objectToSend.photo;
                    util.dismissDialog("profileDialog");
                    util.messages.showMessage("Izmjene uspješno sačuvane.");
                }
            })
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
    },

    changePasswordFirstLoginFunction: function() {
        $$("changePasswordBtn").disable();
        if ($$("changePasswordFirstLoginForm").validate()) {
            var passwordInformation = {
                oldPassword: $$("oldPassword").getValue(),
                newPassword: $$("newPassword").getValue(),
                newPasswordConfirmation: $$("newPasswordConfirmation").getValue()
            };

            connection.sendAjax("POST", "hub/user/updatePassword",
                function (text, data, xhr) {
                    if (text) {
                        util.dismissDialog('changePasswordDialogFirstLogin');
                        util.messages.showMessage("Uspješna izmjena lozinke.");
                        switch (userData.userGroupKey) {
                            case "admin":
                                connection.sendAjax("POST", "hub/user/firstLogin",
                                    function (text, data, xhr) {
                                        userData.firstLogin = 3;
                                        // Ovde treba dodati prikaz dijaloga za unos podataka o kompaniji za admina
                                    }, function (text, data, xhr) {
                                        util.messages.showErrorMessage(text);
                                    }, 3);
                                break;
                            case "direktor":
                                connection.sendAjax("POST", "hub/user/firstLogin",
                                    function (text, data, xhr) {
                                        userData.firstLogin = 0;
                                    }, function (text, data, xhr) {
                                        util.messages.showErrorMessage(text);
                                    }, 0);
                                break;
                            case "sekretar":
                                connection.sendAjax("POST", "hub/user/firstLogin",
                                    function (text, data, xhr) {
                                        userData.firstLogin = 0;
                                    }, function (text, data, xhr) {
                                        util.messages.showErrorMessage(text);
                                    }, 0);
                                break;
                            case "menadzer":
                                connection.sendAjax("POST", "hub/user/firstLogin",
                                    function (text, data, xhr) {
                                        userData.firstLogin = 3;
                                        // Ovde treba dodati prikaz dijaloga za unos maksimalnog procenta odsustva za menadzerov sektor
                                    }, function (text, data, xhr) {
                                        util.messages.showErrorMessage(text);
                                    }, 3);
                                break;
                            case "zaposleni":
                                connection.sendAjax("POST", "hub/user/firstLogin",
                                    function (text, data, xhr) {
                                        userData.firstLogin = 0;
                                    }, function (text, data, xhr) {
                                        util.messages.showErrorMessage(text);
                                    }, 0);
                                break;
                        }
                    } else {
                        util.messages.showErrorMessage("Neuspješna izmjena lozinke.");
                        $$("changePasswordBtn").enable();
                    }
                }, function (text, data, xhr) {
                    util.messages.showErrorMessage(text);
                    $$("changePasswordBtn").enable();
                }, passwordInformation);

        } else {
            $$("changePasswordBtn").enable();
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
    if(userData != null && userData.userGroupKey == "admin" && userData.firstName==null && userData.lastName==null ){
        //todo: switch
console.log("Usao u if showFirstLogin");
         var main = webix.copy(firstLoginLayout);
         firstLogin = webix.ui(main, panel);
         panel = $$("firstLoginPanel"); //firstLoginPanel je id za firstLoginLayout

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
            //$$("menu-collapse").hide();
            calendarView.selectPanel();
            $$("mainMenu").select("calendar");
            break;
    }
//templateView.selectPanel();

    getNotifications();
    window.setInterval(getNotifications, 15000);
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

var dialogChangePassword = function () {

    return {
        view: "popup",
        id: "changePasswordDialogFirstLogin",
        move: true,
        position: "center",
        padding: 0,
        type: "clean",
        modal: true,
        body: {
            id: "aboutInside",
            css: "aboutInside",
            width: 550,
            margin: 0,
            type: "clean",
            rows: [{
                view: "toolbar",
                cols: [{
                    view: "label",
                    label: "<span class='webix_icon fa-briefcase'></span> Promjena lozinke",
                    width: 500,
                    height: 50
                }, {},]
            },
                {
                    view: "form",
                    id: "changePasswordFirstLoginForm",
                    name: "changePasswordFirstLoginForm",
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
                            label: "U redu",
                            width: 150,
                            click: "mainLayout.changePasswordFirstLoginFunction",
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
                                $$('changePasswordFirstLoginForm').elements.newPassword.config.invalidMessage="Lozinka mora imati minimum 8 karaktera!";
                                return false;}
                            if (value == $$("oldPassword").getValue()){
                                $$('changePasswordFirstLoginForm').elements.newPassword.config.invalidMessage="Lozinka ne smije biti jednaka staroj lozinki!";
                                return false;
                            }
                            var re = /[0-9A-Z@#$%^&+=]/;
                            if (!re.test(value)) {
                                $$('changePasswordFirstLoginForm').elements.newPassword.config.invalidMessage="Lozinka mora sadržati barem jedan broj, veliko slovo ili specijalan karakter!";
                                return false;
                            }
                            return true;
                        },
                        "newPasswordConfirmation":function (value) {
                            if (!value)
                                return false;
                            if(value!=$$("changePasswordFirstLoginForm").getValues().newPassword)
                            {
                                $$('changePasswordFirstLoginForm').elements.newPasswordConfirmation.config.invalidMessage = 'Unešene lozinke nisu iste!';
                                return false;}

                            return true;

                        },
                    }
                }
            ]
        }
    };

}


showAddFirstAndLastNameDialog = function () {
    webix.ui(webix.copy(addDialogFirstAndLastName()));
    setTimeout(function () {
        $$("addFirstAndLastNameDialog").show();
        webix.UIManager.removeHotKey("enter", null);
        $$("saveUserFirstAndLastName").define("hotkey", "enter");
    }, 0);


};

showChangePasswordDialog = function () {
    webix.ui(webix.copy(dialogChangePassword()));
    setTimeout(function () {
        $$("changePasswordDialogFirstLogin").show();
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
                        j++;
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
