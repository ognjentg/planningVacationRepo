var profileView = {
    panel: {
        id: "profileView",
        adjust: true,
        cols: [
            {
                view: "form",
                id: "profileForm",
                name: "profileForm",
                elements: [
                    {
                        view: "text",
                        required: true,
                        id: "username",
                        name: "username",
                        label: "Korisničko ime",
                        labelWidth: 150,
                        height: 35
                    },
                    {
                        view: "text",
                        required: true,
                        id: "firstName",
                        name: "firstName",
                        label: "Ime",
                        labelWidth: 150,
                        height: 35
                    },
                    {
                        view: "text",
                        required: true,
                        id: "lastName",
                        name: "lastName",
                        label: "Prezime",
                        labelWidth: 150,
                        height: 35
                    },
                    {
                        view: "text",
                        required: true,
                        id: "email",
                        name: "email",
                        label: "E-mail adresa",
                        labelWidth: 150,
                        height: 35
                    },
                    {
                        view: "checkbox",
                        id: "notifications",
                        name: "notifications",
                        label: "Da li želite da primate obavještenja na e-mail?",
                        labelWidth: 150,
                        height: 35
                    },
                    {
                        view: "button",
                        id: "saveProfileButton",
                        name: "saveProfileButton",
                        label: "Sačuvaj"
                    }
                ]
            },
            {}
        ],
    },

    selectPanel: function () {
        $$("main").removeView(rightPanel);
        rightPanel = "profilePanel";

        var panelCopy = webix.copy(this.panel);

        $$("main").addView(webix.copy(panelCopy));
    }
}