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
                                        onBeforeFileAdd: function (upload) {
                                            var file = upload.file;
                                            var reader = new FileReader();
                                            reader.onload = function (ev) {
                                                $$("preview").setValues({src:ev.target.result});
                                                $$("base64ImageUser").setValue(ev.target.result.split("base64,")[1  ]);
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

    showProfileDialog: function() {
        webix.ui(webix.copy(profileView.profileDialog));
        setTimeout(function() {
            $$("firstName").setValue(userData.firstName);
            $$("lastName").setValue(userData.lastName);
            if(userData.userGroupId == 1) {
                $$("receiveMail").hide();
            }
            $$("receiveMail").setValue(userData.receiveMail);
            $$("base64ImageUser").setValue(userData.photo);
            $$("preview").setValues({ src: "data:image/png;base64," + userData.photo });
            $$("profileDialog").show();
        }, 0);
    },

    save: function () {
        var profileForm = $$("profileForm");
        if(profileForm.validate()) {
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
                error: function(text, data, xhr) {
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
                            width:150,
                            click:"changePasswordView.savePassword",
                            align:"right",
                            hotkey:"enter"
                        }
                    ]
                }
            ]

        }
    },
    savePassword:function(){
        if ($$("changePasswordForm").validate()) {
            var passwordInformation={
                oldPassword:$$("changePasswordForm").getValues().oldPassword,
                newPassword:$$("changePasswordForm").getValues().newPassword,
                repeatedNewPassword:$$("changePasswordForm").getValues().newPasswordConfirmation,
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

    showChangePasswordDialog: function() {
        webix.ui(webix.copy(changePasswordView.changePasswordDialog));
        setTimeout(function() {
            $$("changePasswordDialog").show();
        }, 0);
    }
};
