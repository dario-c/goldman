// Create PROVIZ namespace
window.Caviar = window.Caviar || {};

(function(ns)
{
    "use strict";

    // Set global flags
    ns.DEBUG = false;
    ns.$doc = $(document);
    ns.body = document.body;
    ns.win = window;
    ns.$win = $(window);

    // Events that can get dispatched
    ns.eventNames = {
        RESIZE : "application:RESIZE"
    };
    
    // Set debug flag
    if(ns.DEBUG) ns.body.className += " debug";

})(window.Caviar);