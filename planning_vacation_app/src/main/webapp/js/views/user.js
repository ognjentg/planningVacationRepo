var profileView = {
    getPanel: function() {
        return {
            id: "profileView",
            adjust: true,
            height: 0,
            width: 0,
            rows: [{
                cols: [
                    {
                        view: "form",
                        adjust: true,
                        height: 0,
                        width: 0,
                        id: "profileForm",
                        name: "profileForm",
                        elements: [
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
                                id: "notifications",
                                name: "notifications",
                                label: "Da li želite da primate obavještenja na e-mail?",
                                labelWidth: 320,
                                height: 35
                            },
                            {
                                view: "list",
                                id: "photo",
                                type: "uploader",
                                autoheight: true,
                                borderless: true
                            },
                            {
                                view: "uploader",
                                id: "photoUploader",
                                name: "photoUploader",
                                value: "Odaberi sliku",
                                link: "photo",
                                datatype: "json",
                                // upload: "metoda za upload slike"
                                multiple: false,
                                autosend: false,
                                accept: "image/png, image/jpg, image/jpeg",
                            },
                            {
                                view: "button",
                                id: "saveProfileButton",
                                name: "saveProfileButton",
                                label: "Sačuvaj",
                                click: "profileView.save"
                            }
                        ]
                    }
                ]
            },{}]
        }
    },

    selectPanel: function () {
        util.selectPanel(this.getPanel());
    },

    save: function () {
        var profileForm = $$("profileForm");
        if(profileForm.validate()) {
            // provjera validnosti e-mail adrese
            // provjera jedinstvenosti korisničkog imena
            // slanje podataka na serversku stranu
        }
    }
}