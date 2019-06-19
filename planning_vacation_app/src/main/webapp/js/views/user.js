var profileView = {
    profileDialog: {
        view: "popup",
        id: "profileDialog",
        name: "profileDialog",
        position: "center",
        modal: true,
        body: {
            rows: [
                {
                    view: "toolbar",
                    cols: [
                        {
                            view: "label",
                            width: 400,
                            label: "<span class='webix_icon fas fa-user'></span> Profil"
                        },
                        {},
                        {
                            view: "icon",
                            icon: "close",
                            align: "right",
                            click: "util.dismissDialog('profileDialog')"
                        }
                    ]
                },
                {
                    view: "form",
                    id: "profileForm",
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
                            labelWidth: 150,
                            height: 35
                        },
                        {
                            view: "text",
                            required: true,
                            id: "lastName",
                            name: "lastName",
                            label: "Prezime",
                            invalidMessage: "Niste unijeli prezime.",
                            labelWidth: 150,
                            height: 35
                        },
                        {
                            view: "checkbox",
                            id: "receiveMail",
                            name: "receiveMail",
                            label: "Da li želite da primate obavještenja na e-mail?",
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
                                    click: "profileView.save"
                                },
                                {
                                    view: "button",
                                    hotkey: "esc",
                                    label: "Otkaži",
                                    type: "iconButton",
                                    icon: "close",
                                    click: function () {
                                        util.dismissDialog("profileDialog")
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },

    showProfileDialog: function () {
        webix.ui(webix.copy(profileView.profileDialog));
        setTimeout(function () {
            $$("firstName").setValue(userData.firstName);
            $$("lastName").setValue(userData.lastName);
            if (userData.key == "admin") {
                $$("receiveMail").hide();
            }
            $$("receiveMail").setValue(userData.receiveMail);
            $$("base64ImageUser").setValue(userData.photo);
            $$("preview").setValues({src: "data:image/png;base64," + userData.photo});
            $$("profileDialog").show();
        }, 0);
    },

    save: function () {
        var profileForm = $$("profileForm");
        if (profileForm.validate()) {
            $$("saveProfileButton").disable();
            var dataToSend = $$("profileForm").getValues();
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
};

var changePasswordView = {

    changePasswordDialog: {
        view: "popup",
        id: "changePasswordDialog",
        name: "passwordDialog",
        position: "center",
        modal: true,
        body: {
            rows: [
                {
                    view: "toolbar",
                    cols: [
                        {
                            view: "label",
                            width: 400,
                            label: "<span class='webix_icon fas fa-lock'></span> Promjena lozinke"
                        },
                        {},
                        {
                            view: "icon",
                            icon: "close",
                            align: "right",
                            hotkey: "esc",
                            click: "util.dismissDialog('changePasswordDialog')"
                        }
                    ]
                },
                {
                    view: "form",
                    id: "changePasswordForm",
                    name: "changePasswordForm",
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
                            label: "Promijeni",
                            width: 150,
                            click: "changePasswordView.savePassword",
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
                                $$('changePasswordForm').elements.newPassword.config.invalidMessage="Lozinka mora imati minimum 8 karaktera!";
                                return false;}
                            if (value == $$("oldPassword").getValue()){
                                $$('changePasswordForm').elements.newPassword.config.invalidMessage="Lozinka ne smije biti jednaka staroj lozinki!";
                                return false;
                            }
                            var re = /[0-9A-Z@#$%^&+=]/;
                            if (!re.test(value)) {
                                $$('changePasswordForm').elements.newPassword.config.invalidMessage="Lozinka mora sadržati barem jedan broj, veliko slovo ili specijalan karakter!";
                                return false;
                            }
                            return true;
                        },
                        "newPasswordConfirmation":function (value) {
                            if (!value)
                                return false;
                            if(value!=$$("changePasswordForm").getValues().newPassword)
                            {
                                $$('changePasswordForm').elements.newPasswordConfirmation.config.invalidMessage = 'Unešene lozinke nisu iste!';
                                return false;}

                            return true;

                        },
                    }
                }
            ]

        }
    },

    savePassword: function () {
        if ($$("changePasswordForm").validate()) {
            var passwordInformation = {
                oldPassword: $$("oldPassword").getValue(),
                newPassword: $$("newPassword").getValue(),
                newPasswordConfirmation: $$("newPasswordConfirmation").getValue()
            };

            connection.sendAjax("POST", "hub/user/updatePassword",
                function (text, data, xhr) {
                    if (text) {
                        util.messages.showMessage("Uspješna izmjena lozinke.");
                    } else
                        util.messages.showErrorMessage("Neuspješna izmjena lozinke.");
                }, function (text, data, xhr) {
                    util.messages.showErrorMessage(text);
                }, passwordInformation);
            util.dismissDialog('changePasswordDialog');


        }
    },

    showChangePasswordDialog: function () {
        webix.ui(webix.copy(changePasswordView.changePasswordDialog));
        setTimeout(function () {
            $$("changePasswordDialog").show();
        }, 0);

    },


};


