
var loginTemplate = {
    id: "loginPanel",
    rows: [
        {
            view: "template",
            height: 25,
            css: "loginBar"
        },{}, {
        view: "template",
        height: 50,
        css: "loginLogo",
        template: '<img src="img/telegroup-logo-inside.png"/>'
    }, {
        cols: [{}, //1st column
            {
                view: "form",
                id: "loginForm",
                css:"loginForm",
                width: 500,
                elements: [{
                    view: "text",
                    id: "username",
                    name: "username",
                    label: "Korisničko ime",
                    align: "center",
                    labelWidth: 150
                }, {
                    view: "text",
                    name: "password",
                    type: "password",
                    label: "Lozinka",
                    align: "center",
                    labelWidth: 150
                }, {
                    margin: 5,
                    cols: [{}, {
                        id: "login",
                        view: "button",
                        value: "Prijavi se",
                        type: "form",
                        click: "login",
                        hotkey: "enter",
                        width: 150
                    }]
                }]
            }, //2nd column
            {}
        ]
    }, {}]
};

var showLogin = function () {
    var login = webix.copy(loginTemplate);
    webix.ui(login, panel);
    panel = $$("loginPanel");
};



var login = function () {
    webix.ajax().post("login", $$("loginForm").getValues(), {
        error: function (text, data, xhr) {
            showApp();
            return;
            // TODO praksa obrisati 2 prethodne linije koda kad se napravi login na backendu

            util.messages.showErrorMessage("Neuspješna prijava!");
        },
        success: function (text, data, xhr) {
            if (data.json() != null && data.json().id != null) {
                userData = data.json();
                showApp();
            }
            else {
                util.messages.showErrorMessage("Neuspješna prijava!");
            }
        }
    });
};

var logout = function () {
    webix.ajax().get("hub/user/logout", function (text, data, xhr) {
        if (xhr.status == "200") {
            if (text == "Success") {
                util.messages.showLogoutMessage();
                connection.reload();
            } else {
                util.messages.showLogoutErrorMessage();
                connection.reload();
            }
        } else {
            util.messages.showLogoutErrorMessage();
            connection.reload();
        }
    });
};