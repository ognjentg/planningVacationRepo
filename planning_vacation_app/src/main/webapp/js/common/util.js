/**
 *
 */

var util = {

    //common - utils

    selectPanel:function(view){
        $$("main").removeView(rightPanel); // brisanje trenutno prikazanog view-a na stranici kako bi se prikazao view
        rightPanel = view.id; // novi rightPanel će biti view

        var panelCopy = webix.copy(view); // webix.copy -> duboka kopija
        $$("main").addView(panelCopy);
    },
    //[{10, 'a' }{20,'b'},{30,'c'}],

    stringContains: function (string, test) {
        return string.indexOf(test) > -1;
    },

    stringStartsWith: function (string, test) {
        return string.indexOf(test) == 0;
    },

    isset: function (variable) {
        return typeof variable !== typeof undefined ? true : false;
    },

    arrayToCsv: function (array) {
        var retVal = "";
        for (var i = 0; i < array.length; i++) {
            retVal += array[i];
            if (i < array.length - 1) retVal += ",";
        }
        return retVal;
    },

    preloader: {
        state: 0,

        inc: function () {
            if (this.state == 0)
                document.getElementById("preloader").style.display = "block";
            if(document.getElementById("menu-collapse")!=null)
                document.getElementById("menu-collapse").style.display = "none";
            this.state++;
        },

        dec: function () {
            if (this.state == 0) return;
            this.state--;
            if (this.state == 0)
                document.getElementById("preloader").style.display = "none";
            if(document.getElementById("menu-collapse")!=null)
                document.getElementById("menu-collapse").style.display = "block";
        },

        reset: function () {
            this.state = 0;
            document.getElementById("preloader").style.display = "none";
            if(document.getElementById("menu-collapse")!=null)
                document.getElementById("menu-collapse").style.display = "block";
        }
    },

    //common validation

    validation: {
        checkStandardInput: function (value) {
            if (!value) return false;
            return (value.length >= 1 && value.length < 45);
        },
        checkStandardInputMinMax: function (value, min, max) {
            if (!value) return false;
            return (value.length >= min && value.length <= max);
        },

        checkGeZero: function (value) {
            return value != "" && !isNaN(value) && value >= 0;
        },

        checkGtZero: function (value) {
            return value != "" && !isNaN(value) && value > 0;
        },

        checkAmount: function (value, field, dependentField) {
            if (value > field.getItem(field.getSelectedId().id).dependentField) {
                return false;
            } else {
                return value != "" && !isNaN(value) && value > 0;
            }
        },

        validateUponEdit: function (editor, type, boundaries) {
            switch (type) {
                case "isEmpty" : {
                    if (/^\s*$/.test(editor.getValue())) {
                        util.messages.showErrorMessage("Polje je obavezno za unos.");
                        return false;
                    } else return true;
                }
                    ;
                    break;
                case "number": {
                    var check = ( editor.getValue() != "" && !isNaN(editor.getValue()));
                    if (!check) {
                        util.messages.showErrorMessage("Molimo unesite ispravan broj.");
                        return false;
                    } else return true;
                }
                    ;
                    break;
                case "numberGeZero": {
                    var check = ( editor.getValue() != "" && !isNaN(editor.getValue()) && editor.getValue() >= 0);
                    if (!check) {
                        util.messages.showErrorMessage("Molimo unesite nenegativan broj.");
                        return false;
                    } else return true;
                }
                    ;
                    break;
                case "checkGtZero": {
                    var check = ( editor.getValue() != "" && !isNaN(editor.getValue()) && editor.getValue() > 0);
                    if (!check) {
                        util.messages.showErrorMessage("Molimo unesite pozitivan broj.");
                        return false;
                    } else return true;
                }
                    ;
                    break;
                case "checkEmailAddress": {
                    var emailRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
                    var check = emailRegex.test(editor.getValue());
                    if (!check) {
                        util.messages.showErrorMessage("Molimo vas unesite email u odgovarajućem fromatu.");
                        return false;
                    } else return true;

                }
                    ;
                    break;
                case "checkStandardInputMinMax": {
                    var value = editor.getValue();

                    var min = boundaries.min;
                    var max = boundaries.max;
                    var type = boundaries.type;

                    if (type == "number") {
                        var check = (!isNaN(value) && value.length >= min && value.length <= max);
                        if (!check) {
                            util.messages.showErrorMessage("Molimo unesite pozitivan broj od " + min + " do " + max + " cifara.");
                            return false;
                        } else return true;

                    } else if (type == "string") {
                        var check = (value.length >= min && value.length <= max);
                        if (!check) {
                            util.messages.showErrorMessage("Molimo unesite tekst maksimalne dužine " + max + " karaktera.");
                            return false;
                        } else return true;
                    }
                }
                    ;
                    break;

                case "checkDateGreaterThanNow": {
                    var value = editor.getValue();
                    var currentValue = new Date();
                    if (value <= currentValue) {
                        util.messages.showErrorMessage("Molimo unesite datum i vrijeme veće od trenutnog.");
                        return false;
                    }
                }
            }
            return true;
        },

        checkSupportedTypes: function (type, typesStr) {
            var suppTypesArray = typesStr.split(',');
            var supported = false;
            for (var i = 0; i < suppTypesArray.length; i++) {
                if (type == suppTypesArray[i]) {
                    supported = true;
                    break;
                }
            }

            return supported;
        },
        checkPositiveNumber: function (value, errorMessageTarget, errorMessage) {
            var valid = true
            if (isNaN(value)) valid = false;
            else valid = (value > 0);

            if (!valid)
                $$(errorMessageTarget).setHTML(errorMessage);
            return valid;
        },
        checkEmailAddress: function (email) {
            var emailRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
            return emailRegex.test(email);

        }
        ,
        checkMacAddress: function (mac) {
            var macRegex = new RegExp("^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$");
            return macRegex.test(mac);
        },

        onBeforeEditStopCancelEdit: function (newValue, oldValue) {
            if (newValue == "" && oldValue == 0) {
            }
            else if (newValue == oldValue) return true; // === was before -> == added since "2" === 2 returned false

            return false;
        }

    },

    //common messages

    messages: {
        showMessage: function (message) {
            webix.message({type: "default", text: message});
        },
        showErrorMessage: function (message) {
            webix.message({type: "error", text: message});
        },
        showSessionExpiredError: function () {
            webix.message({type: "error", text: "Vaša sesija je istekla. Prijavite se ponovo..."});
        },
        showLogoutMessage: function () {
            webix.message({type: "default", text: "Uspješno ste se odjavili."});
        },
        showLogoutErrorMessage:function() {
            webix.message({type: "error", text: "Neuspješna odjava."});
        },
        showWarningMessage: function (message, expire) {
            webix.message({type: "warning", text: message, expire: expire || 0});
        }
    },


    dismissDialog: function (formName) {
        $$(formName).hide();
        $$(formName).destructor();
    },

    getToday: function () {
        var d = new Date();
        d.setHours(0);
        d.setMinutes(0);
        d.setSeconds(0);

        return d;
    },

    roundToTwo: function (num) {
        return +(Math.round(num + "e+2") + "e-2");
    },

    roundTo: function (decimalPlaces, num) {
        return +(Math.round(num + "e+" + decimalPlaces) + "e-" + decimalPlaces);
    },

    currencyFromCentesimal: function (value) {
        return webix.i18n.numberFormat(util.roundToTwo(value / 100));
    },

    currencyFromCentesimalPriceFormat: function (value) {
        return webix.i18n.priceFormat(util.roundToTwo(value));
    },
    currencyToCentesimal: function (value) {
        return util.roundToTwo(value) * 100;
    },

    checkboxes: {
        nonEditableYesNoField: function (obj, common, value) {
            if (value)
                return '<div class="yesNoField checked"><span class="nonCheckableCheckArea"></span></div>';
            else
                return '<div class="yesNoField notchecked"><span class="nonCheckableCheckArea"></span></div>';
        }
    },
    onAfterFilter: function (count) {
        $$("rowsNumberIndicator").setValues({filteredRowsCount: count, config: $$("pagingDiv").config});
    },
    clearAllFiltersForDatatable: function (datatableId) {
        var typeOfArgument = typeof  datatableId, datatable;
        if (typeOfArgument === "string") {
            datatable = $$(datatableId);
        } else if (typeOfArgument === "object") {
            datatable = datatableId;
        } else throw "argument is not valid";
        var columns = datatable.config.columns;
        for (var i = 0; i < columns.length; i++) {
            datatable.getFilter(columns[i].id).value = "";
        }
    },
    datetime: {
        getLastSunday: function (d) {
            var t = new Date(d);
            t.setDate(t.getDate() - t.getDay());
            return t;
        }
    },
    escapeHtml: function (unsafe) {
        return unsafe.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/`/g, '&#x60;')
            .replace(/'/g, "&#039;");
        // '&': '&amp;',
        //     '<': '&lt;',
        //     '>': '&gt;',
        //     '"': '&quot;',
        //     "'": '&#x27;',
        //     '`': '&#x60;'

    }
}