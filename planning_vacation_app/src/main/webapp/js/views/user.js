var file = null;

function onAfterPhotoSelected(uploadedFile) {
    var reader  = new FileReader();
    reader.addEventListener('load', function (event) {

        var file = reader.result;
        $$('preview').setValues({ src: file });
    }, false);

    if (uploadedFile) {
        reader.readAsDataURL(uploadedFile.file);
    }
}

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
                            cols: [
                                {},
                                {
                                    view: "template",
                                    id: "preview",
                                    template: "<img style='height: 100%; width: 100%;' src='#src#'>",
                                    data: { src: null },
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
                                        "onAfterFileAdd": onAfterPhotoSelected
                                    }
                                },
                                {}
                            ]
                        },
                        {
                            view: "text",
                            required: true,
                            id: "username",
                            name: "username",
                            label: "Korisničko ime",
                            invalidMessage: "Niste unijeli korisničko ime.",
                            labelWidth: 150,
                            height: 35
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
                            view: "text",
                            id: "email",
                            name: "email",
                            label: "E-mail adresa",
                            required: true,
                            invalidMessage: "Niste unijeli e-mail adresu",
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

    showProfileDialog: function() {
        webix.ui(webix.copy(profileView.profileDialog));
        setTimeout(function() {
            console.log(userData);
            $$("username").setValue(userData.username);
            $$("firstName").setValue(userData.firstName);
            $$("lastName").setValue(userData.lastName);
            $$("email").setValue(userData.email);
            $$("receiveMail").setValue(userData.receiveMail);
            $$("preview").setValues({ src: atob(userData.photo) });
            $$("profileDialog").show();
        }, 0);
    },

    save: function () {
        var profileForm = $$("profileForm");
        if(profileForm.validate()) {
            var data = $$("profileForm").getValues();
            var objectToSend = {
                username: data.username,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                receiveMail: data.receiveMail,
                photo: file,
                companyId: userData.companyId
            }
            webix.ajax().headers({
                "Content-type": "application/json"
            }).put("hub/user/" + userData.id, JSON.stringify(objectToSend), {
                error: function(text, data, xhr) {
                    util.messages.showErrorMessage(text);
                },
                success: function (text, data, xhr) {
                    util.dismissDialog("profileDialog");
                    util.messages.showMessage("Izmjene uspješno sačuvane.")
                }
            })
            // provjera validnosti e-mail adrese
            // provjera jedinstvenosti korisničkog imena
            // slanje podataka na serversku stranu
        }
    }
};

var changePasswordView = {

    changePasswordDialog : {
        view: "popup",
        id: "changePasswordDialog",
        name: "passwordDialog",
        position: "center",
        modal: true,
        body: {
            rows:[
                {
                    view:"toolbar",
                    cols:[
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
                            hotkey:"esc",
                            click: "util.dismissDialog('changePasswordDialog')"
                        }
                    ]
                },
                {
                    view:"form",
                    id:"changePasswordForm",
                    width:500,
                    elementsConfig: {
                        labelWidth: 140,
                        bottomPadding: 18
                    },
                    elements:[
                        {
                            view:"text",
                            id:"oldPassword",
                            label:"Trenutna lozinka:",
                            required:true

                        },
                        {
                            view:"text",
                            label:"Nova lozinka:",
                            id:"newPassword",
                            required:true,
                            on:{
                                'onTimedKeyPress':function () {
                                    if($$("newPassword").getValue().length<8) {
                                        util.messages.showErrorMessage("Lozinka mora imati barem 8 karaktera!");
                                    }
                                }
                            }
                        },
                        {
                            view:"text",
                            label:"Potvrda nove lozinke:",
                            id:"newPasswordConfirmation",
                            required:true,
                            on:{
                                'onTimedKeyPress':function () {
                                    if($$("newPasswordConfirmation").getValue()!==$$("newPassword").getValue())
                                        util.messages.showErrorMessage("Potvrda lozinke nije jednaka novoj lozinci!");
                                }
                            }
                        },
                        {
                            view:"button",
                            label:"Promijeni",
                            click:"util.messages.showErrorMessage(\"klik\");",
                            width:150,
                            align:"right",
                            hotkey:"enter"
                        }
                    ]
                }
            ]

        }
    },

    showChangePasswordDialog: function() {
        webix.ui(webix.copy(changePasswordView.changePasswordDialog));
        setTimeout(function() {
            $$("changePasswordDialog").show();
        }, 0);
    }
};
