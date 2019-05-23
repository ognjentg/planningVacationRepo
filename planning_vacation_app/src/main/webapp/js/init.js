var scriptsToLoad = [
    {
        "section": "webix",
        "path": "webix/codebase/",
        "files": ["webix", "pdfjs"]
    },
    {
        "section": "extensions",
        "path": "webix/extensions/",
        "files": ["sidebar/sidebar", "dhtmlxscheduler", "dhtmlxscheduler_limit"]
    },
    {
        "section": "common",
        "path": "js/common/",
        "files": ["authentication", "pagination_setup", "create_pdf", "connection", "util", "view_components"]
    },
    {
        "section": "views",
        "path": "js/views/",
        "files": ["template", "sector", "user", "usergroup", "company", "calendar", "sectorInfo", "admins","secretary_sick_request"] // ADD VIEWS HERE
    },
    {
        "section": "core",
        "path": "js/",
        "files": ["app"]
    }
];

var cssToLoad = [
    "https://fonts.googleapis.com/css?family=Roboto:400,500",
    "https://cdn.jsdelivr.net/npm/animate.css@3.5.2/animate.min.css",
    "webix/codebase/skins/compact.css",
    "css/extended.css", "css/company.css", "css/calendar.css", // CUSTOM CSS FILE
    "webix/extensions/sidebar/sidebar.css",
    "webix/codebase/dhtmlxscheduler_flat.css"
];

var linearJsDownloadOrder = [];

function loadScript(index) {

    var url = linearJsDownloadOrder[index];

    var script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState) {  //IE
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" ||
                script.readyState == "complete") {
                script.onreadystatechange = null;
                console.log("Loaded script " + url + " (" + (index + 1) + "/" + linearJsDownloadOrder.length + ")");
                if (index + 1 < linearJsDownloadOrder.length) {
                    loadScript(index + 1);
                }
            }
        };
    } else {  //Others
        script.onload = function () {
            console.log("Loaded script " + url + " (" + (index + 1) + "/" + linearJsDownloadOrder.length + ")");
            if (index + 1 < linearJsDownloadOrder.length) {
                loadScript(index + 1);
            }
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}


var loadScripts = function () {
    //lineralize configuration
    for (i = 0; i < scriptsToLoad.length; i++) {
        var obj = scriptsToLoad[i];
        for (j = 0; j < obj.files.length; j++) {
            var file = obj.files[j];
            linearJsDownloadOrder.push(obj.path + file + ".js");
        }
    }

    if (linearJsDownloadOrder.length > 0) loadScript(0);
}


var loadCss = function () {
    for (i = 0; i < cssToLoad.length; i++) {
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = cssToLoad[i];
        link.onload = "if(media!='all')media='all'";
        head.appendChild(link);

        console.log("Loaded css " + cssToLoad[i] + " (" + (i + 1) + "/" + cssToLoad.length + ")");
    }
}

loadCss();
loadScripts();
