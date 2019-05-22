var adminsView = {
    adminsCompanyId: null,
    adminsURL: "hub/user/admins/",
    nonAdminsURL: "hub/user/nonAdmins/",
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
                    // url: this.adminsURL,
                    height: 300,
                    columns: [
                        {
                            id: "id",
                            hidden: "true"
                        },
                        {
                            id: "email",
                            header: "EMAIL",
                            width: 200,
                        },
                        {
                            id: "firstName",
                            header: "IME",
                            width: 200
                        },
                        {
                            id: "lastName",
                            header: "PREZIME",
                            width: 200
                        },
                        {
                            id: "companyId",
                            hidden: "true"
                        },
                        {
                            id: "username",
                            hidden: "true"
                        },
                        {
                            id: "password",
                            hidden: "true"
                        },
                        {
                            id: "userGroupId",
                            hidden: "true"
                        },
                        {
                            id: "active",
                            hidden: "true"
                        },
                        {
                            id: "pauseFlag",
                            hidden: "true"
                        },
                        {
                            id: "startDate",
                            hidden: "true"
                        },
                        {
                            id: "salt",
                            hidden: "true"
                        },
                        {
                            id: "receiveMail",
                            hidden: "true"
                        },
                        {
                            id: "sectorId",
                            hidden: "true"
                        },
                        {
                            id: "photo",
                            hidden: "true"
                        },
                        {
                            id: "delete",
                            header: "&nbsp;",
                            width: 35,
                            template: "<span  style='color:#777777; 0; cursor:pointer;' class='webix_icon fa-trash-o'></span>"
                        }
                    ],
                    onClick: {
                        webix_icon: function (e, id) {
                            var adminTemp = $$("adminsDT").getItem(id);
                            console.log(adminTemp);
                            connection.sendAjax("PUT", "hub/user/deleteAdmin/" + adminTemp.id,
                                function (text, data, xhr) {
                                    var delBox = (webix.copy(commonViews.deleteConfirm("admins")));
                                    if(text){
                                        delBox.callback = function (result){
                                            if(result == 1){
                                                util.messages.showMessage("Admin je uspješno uklonjen.");
                                                //$$("adminsDT").remove(id);
                                                adminsView.refreshDatatables();
                                            }
                                        }
                                        webix.confirm(delBox);
                                    }
                                    else
                                        util.messages.showErrorMessage("Neuspješno uklanjanje.");
                                }, function (text, data, xhr) {
                                    util.messages.showErrorMessage(text);
                                }, adminTemp.id);

                        }
                    }
                },
                {
                    cols: [
                        {
                            view: "button",
                            id: "addNewAdminButton",
                            value: "Dodaj novog admina",
                            align: "left",
                            autoWidth: "true",
                            click: 'adminsView.showAddNewAdminDialog'
                        },
                        {
                            view: "button",
                            id: "addAdminButton",
                            value: "Izaberi admina",
                            align: "right",
                            autoWidth: "true",
                            click: 'adminsView.showChooseAdminDialog'
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
                    id: "chooseAdminDT",
                    view: "datatable",
                    border: 10,
                    //url: "hub/user/nonAdmins",
                    margin: 10,
                    editable: false,
                    multiselect: false,
                    select: "row",
                    navigation: true,
                    height: 300,
                    columns: [
                        {
                            id: "id",
                            hidden: "true"
                        },
                        {
                            id: "email",
                            header: "EMAIL",
                            width: 200,
                        },
                        {
                            id: "firstName",
                            header: "IME",
                            width: 200
                        },
                        {
                            id: "lastName",
                            header: "PREZIME",
                            width: 200
                        },
                        {
                            id: "companyId",
                            hidden: "true"
                        },
                        {
                            id: "username",
                            hidden: "true"
                        },
                        {
                            id: "password",
                            hidden: "true"
                        },
                        {
                            id: "userGroupId",
                            hidden: "true"
                        },
                        {
                            id: "active",
                            hidden: "true"
                        },
                        {
                            id: "pauseFlag",
                            hidden: "true"
                        },
                        {
                            id: "startDate",
                            hidden: "true"
                        },
                        {
                            id: "salt",
                            hidden: "true"
                        },
                        {
                            id: "receiveMail",
                            hidden: "true"
                        },
                        {
                            id: "sectorId",
                            hidden: "true"
                        },
                        {
                            id: "photo",
                            hidden: "true"
                        }
                    ]
                },
                {
                    view: "button",
                    id: "chooseAdmin",
                    value: "Izaberi admina",
                    align: "right",
                    autoWidth: "true",
                    click: 'adminsView.addSelectedAdmin'

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
                    id: "addNewAdminForm",
                    elements: [{
                        view: "text",
                        id: "email",
                        name: "email",
                        label: "Email:",
                        invalidMessage: "Email je obavezno unijeti.",
                        required: true
                    },
                        {
                            id: "addAdmin",
                            view: "button",
                            value: "Dodaj",
                            type: "form",
                            click: "adminsView.addNewAdmin",
                            align: "right",
                            hotkey: "esc",
                            width: 150,
                            margin: 50
                        }

                    ],
                    rules: {
                        "email": function (value) {
                            if (!value) {
                                $$("addNewAdminForm").elements.email.config.invalidMessage = 'Emsil je obavezno unijeti.';
                                return false;
                            } else {
                                console.log("success " + value);
                                return true;

                            }
                        }
                    }
                }


            ]
        }
    },

    showAdminsDialogForSuperadmin: function (adminsCompanyId){
        if(adminsView.adminsCompanyId != adminsCompanyId){
            adminsView.adminsCompanyId = adminsCompanyId;
            adminsView.adminsURL = "hub/user/admins/" + adminsCompanyId;
            adminsView.nonAdminsURL = "hub/user/nonAdmins/" + adminsCompanyId;
        }
        console.log(this.adminsURL);

        webix.ui(webix.copy(adminsView.adminsDialog)).show();
        connection.attachAjaxEvents("adminsDT", adminsView.adminsURL);
        $$("adminsDT").define("url", adminsView.adminsURL);
    },
    showAdminsDialog: function () {
        adminsView.adminsURL = "hub/user/admins/";
        adminsView.nonAdminsURL = "hub/user/nonAdmins/";
        console.log(adminsView.adminsCompanyId);
        webix.ui(webix.copy(adminsView.adminsDialog)).show();
        connection.attachAjaxEvents("adminsDT", adminsView.adminsURL);
        $$("adminsDT").define("url", adminsView.adminsURL);
    },
    showChooseAdminDialog: function () {
        console.log(this.nonAdminsURL);
        webix.ui(webix.copy(adminsView.chooseAdminDialog)).show();
        connection.attachAjaxEvents("chooseAdminDT", adminsView.nonAdminsURL);
        $$("chooseAdminDT").define("url", adminsView.nonAdminsURL);
    },
    showAddNewAdminDialog: function () {
        webix.ui(webix.copy(adminsView.addNewAdminDialog)).show();
        webix.UIManager.setFocus("email");
    },
    addNewAdmin: function () {
        var form = $$("addNewAdminForm");
        var newAdmin = {
            email: form.getValues().email,
            userGroup: 2
        };
        console.log(newAdmin);
        var currentDialog = this.getTopParentView();
        connection.sendAjax("POST", "/hub/user",
            function (text, data, xhr) {
                if (text) {
                    $$("adminsDT").add(newAdmin);
                    util.messages.showMessage("Admin uspješno dodan.");
                    currentDialog.hide();
                } else
                    alert("Greška u dodavanju admina.");
            }, function (text, data, xhr) {
                alert(text);
            }, newAdmin);
    },
    addSelectedAdmin: function () {
        var table = $$("chooseAdminDT");
        var selectedId = table.getSelectedId();
        console.log("SELECTED ID: " +  selectedId);
        connection.sendAjax("PUT", "hub/user/addAdmin/" + selectedId,
            function (text, data, xhr) {
                if (text) {
                    util.messages.showErrorMessage("Uspješno.");
                    adminsView.refreshDatatables();
                } else
                    util.messages.showErrorMessage("Neuspješno uklanjanje.");
            }, function (text, data, xhr) {
                util.messages.showErrorMessage(text);
                alert(text);
            }, selectedId);
    },
    refreshDatatables: function () {
        var table1 = $$("adminsDT");
        var table2 = $$("chooseAdminDT");

        table1.clearAll();
        table2.clearAll();

        table1.define("url", adminsView.adminsURL);
        table2.define("url", adminsView.nonAdminsURL);
    }
}


