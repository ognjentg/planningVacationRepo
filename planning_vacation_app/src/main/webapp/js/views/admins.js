var adminsView = {
    adminsDialog: {
        view: "fadeInWindow",
        id: "adminsDialog",
        move: true,
        modal: true,
        width: 635,
        position: "center",
        body: {
            id: "adminsDialogInside",
            rows: [
                {
                    view: "toolbar",
                    cols: [
                        {
                            view: "label",
                            label: "<span class='webix_icon fa-briefcase'></span> Admini kompanije",
                            autoWidth: true,
                            height: 50
                        }, {}, {
                            hotkey: 'esc',
                            view: "icon",
                            icon: "close",
                            align: "right",
                            click: function () {
                                this.getTopParentView().hide();
                            }
                        }
                    ]
                },

                {
                    id: "adminsDT",
                    view: "datatable",
                    border: 10,
                    margin: 10,
                    editable: false,
                    multiselect: false,
                    url: "hub/user",
                    height: 300,
                    columns: [
                        {
                            id: "email",
                            header: "EMAIL",
                            width: 200,
                        },
                        {
                            id: "first_name",
                            header: "IME",
                            width: 200
                        },
                        {
                            id: "last_name",
                            header: "PREZIME",
                            width: 200
                        },
                        {
                            //TODO: delete!
                            id: "delete",
                            header: "&nbsp;",
                            width: 35,
                            template: "<span  style='color:#777777; 0; cursor:pointer;' class='webix_icon fa-trash-o'></span>"
                        }
                    ]
                },
                {
                    cols: [
                        {
                            view: "button",
                            id: "addAdminButton",
                            value: "Dodaj admina",
                            align: "right",
                            autoWidth: "true",
                            click: 'adminsView.showChooseAdminDialog',
                        }
                    ]
                }
            ]
        }
    },
    chooseAdminDialog: {
        view: "fadeInWindow",
        id: "chooseAdminDialog",
        move: true,
        modal: true,
        position: "center",
        body: {
            id: "chooseAdminDialogInside",
            width: 600,
            rows: [
                {
                    view: "toolbar",
                    cols: [
                        {
                            view: "label",
                            label: "<span class='webix_icon fa-briefcase'></span> Izaberi admina",
                            autoWidth: true,
                            height: 50
                        }, {}, {
                            hotkey: 'esc',
                            view: "icon",
                            icon: "close",
                            align: "right",
                            click: function () {
                                this.getTopParentView().hide();
                            }
                        }
                    ]
                },

                {
                    //TODO: izbor admina
                    id: "chooseAdminDT",
                    view: "datatable",
                    border: 10,
                    url: "hub/user",
                    margin: 10,
                    editable: false,
                    multiselect: false,
                    select: "row",
                    navigation: true,
                    height: 300,
                    columns: [
                        {
                            id: "email",
                            header: "EMAIL",
                            width: 200,
                        },
                        {
                            id: "first_name",
                            header: "IME",
                            width: 200
                        },
                        {
                            id: "last_name",
                            header: "PREZIME",
                            width: 200
                        }
                    ]
                },
                {
                    cols: [
                        {
                            view: "button",
                            id: "add_new_button",
                            value: "Dodaj novoga",
                            align: "right",
                            autoWidth: "true",
                            click: "adminsView.showAddNewAdminDialog"
                        }
                    ]
                }
            ]


        }
    },
    addNewAdminDialog: {
        view: "fadeInWindow",
        id: "addNewAdminDialog",
        move: true,
        modal: true,
        position: "center",
        body: {
            id: "chooseAdminDialogInside",
            width: 450,
            rows: [
                {
                    view: "toolbar",
                    cols: [
                        {
                            view: "label",
                            label: "<span class='webix_icon fa-briefcase'></span> Izaberi admina",
                            autoWidth: true,
                            height: 50
                        }, {}, {
                            hotkey: 'esc',
                            view: "icon",
                            icon: "close",
                            align: "right",
                            click: function () {
                                this.getTopParentView().hide();
                            }
                        }
                    ]
                },
                {
                    view: "form",
                    id: "addNewAdmin",
                    elements: [{
                        view: "text",
                        id: "email",
                        name: "email",
                        label: "Email:",
                        invalidMessage: "Email je obavezno unijeti.",
                        required: true
                    }]
                },

                {
                    cols: [
                        {
                            //TODO: Dodavanje novog admina
                            view: "button",
                            id: "add_button",
                            value: "Dodaj",
                            align: "right",
                            autoWidth: "true",
                            //click: " "
                        }
                    ]
                }
            ]
        }
    },

    //TODO: pravi upiti za bazu
    showAdminsDialog: function () {
        webix.ui(webix.copy(adminsView.adminsDialog)).show();
        connection.attachAjaxEvents("adminsDT", "hub/user");
    },
    showChooseAdminDialog: function () {
        webix.ui(webix.copy(adminsView.chooseAdminDialog)).show();
        connection.attachAjaxEvents("chooseAdminDT", "hub/user");
    },
    showAddNewAdminDialog: function () {
        webix.ui(webix.copy(adminsView.addNewAdminDialog)).show();
        webix.UIManager.setFocus("email");
    }

}


