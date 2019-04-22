/**
 * Created by kokezab on 7/24/2017.
 */
webix.locale.pager = {
    first: "<span class='webix_icon fa-angle-double-left'></span>",
    last: "<span class='webix_icon fa-angle-double-right'></span>",
    next: "<span class='webix_icon fa-angle-right'></span>",
    prev: "<span class='webix_icon fa-angle-left'></span>"
};

var maxInt = 10000000; // Number.MAX_VALUE;
var pagerCols = [
    {
        id: "rowsPerPageRichselect",
        view: "richselect",
        //fillspace: 1,
        label: 'Redova po strani: ',
        labelWidth: 130,
        width: 200,
        options: [],
        on: {
            onChange: function (newValue, oldValue) {
                $$("pagingDiv").define("size", parseInt(newValue));
                $$("pagingDiv").select(0); // Reposition to page 1 on change
            }
        }
    }, {}, {
        id: "rowsNumberIndicator",
        view: "template",
        type: "clean",
        template: function (data) {
            var pagerConfig = data.config || {page: 0, size: 10, group: 5}; // $$("pagingDiv").config; count
            var filteredRowsCount = data.filteredRowsCount || 0;

            // if (data.config.count === 0) {data.config.group = 1; data.render();}

            var currentPage = pagerConfig.page; // starting from 0
            var rowsPerPage = pagerConfig.size;
            var rowsFrom = filteredRowsCount === 0 ? 0 : currentPage * rowsPerPage + 1;
            var rowsTo = (currentPage + 1) * rowsPerPage;

            return "<div class='rowsNumberIndicator'>Prikazani redovi: <b>" +
                rowsFrom + "-" +
                (filteredRowsCount < rowsTo ? filteredRowsCount : rowsTo) + "</b> | Ukupno redova: <b>" +
                filteredRowsCount || 1 + "</b></div>";

        }
    }, {},
    {
        view: "pager",
        id: "pagingDiv",
        css: "pagingArea",
        fillspace: 3,
        on: {
            onItemClick: function (pageNumber, mouseEvent, clickedElement) {
                // return false;
                // i onda slati ajax req sa odgovarajucim argumentima
            },
            onAfterRender: function () {
                $$("rowsNumberIndicator").setValues({filteredRowsCount: this.$master.count(), config: this.config});
            }
        },
        animate: true,
        template: "{common.first()} {common.prev()} {common.pages()} {common.next()} {common.last()}",
        container: "pagingDiv",
        size: 10,
        group: 5
    }, {width: 10}
];

function applySettings(panel, success) {
    if (success) {
        try {
            var rowsPerPageCommaDelimited = panel.settings["pagination.rowsPerPage"];
            var defaultRowsPerPage = panel.settings["pagination.defaultRowsPerPage"];
            var rowsPerPageArray = rowsPerPageCommaDelimited.split(',');
            panel.settings.rowsPerPage = rowsPerPageArray[0];
            var rowsList = $$("rowsPerPageRichselect").getList();
            for (var i = 0; i < rowsPerPageArray.length; i++) {
                if (!rowsList.exists(rowsPerPageArray[i])) // if list doesn't contain element add it to the list
                    rowsList.add({
                        id: rowsPerPageArray[i],
                        value: rowsPerPageArray[i]
                    });
            }
            var allRecordsOptionItem = {
                id: maxInt,
                value: 'Svi'
            };
            if (!rowsList.exists(allRecordsOptionItem.id)) {
                rowsList.add(allRecordsOptionItem);
            }

            $$("rowsPerPageRichselect").setValue(defaultRowsPerPage);
        } catch (ex) {
            console.error(ex);
            util.messages.showErrorMessage("Nije moguće učitati podešavanja.");
        }
    }
}
