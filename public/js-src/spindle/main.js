dojo.provide("spindle.main");

(function() {
    dojo.require("spindle._base");
    dojo.require("spindle.NavMenu");
    dojo.require("dijit.layout.BorderContainer");
    dojo.require("dijit.layout.ContentPane");
    dojo.require("dojo.parser");

    dojo.addOnLoad(function() {
        if (!dojo.cookie("spindleJsEnabled")) {
        // Detect JS
            var loc = dojo.doc.location;
            if (loc.search) {
                dojo.doc.location = loc.href + "&jsEnabled=1";
            } else {
                dojo.doc.location = loc.href + "?jsEnabled=1";
            }
        } else {
        // Detect layout
            if (dijit.byId("layout")) {
                spindle.navMenu = new spindle.NavMenu({
                    baseUrl: spindle.baseUrl,
                });
                dijit.byId("layout").addChild(spindle.navMenu);
                dijit.byId("layout").resize();
            }
        }
    });

    // Derive base URL
    var path      = window.location.pathname;
    var pathRegex = new RegExp(/^(.*?)\/spindle\/paste/);
    var matches   = pathRegex.exec(path);
    var baseUrl   = "";
    if ((null != matches) && (1 < matches.length)) {
        baseUrl = matches[1];
    }
    spindle.baseUrl = baseUrl;
})();
