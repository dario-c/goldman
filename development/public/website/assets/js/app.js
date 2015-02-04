/**
*  App
*
*/
(function(ns)
{
    "use strict";

    /**
     * Desktop version of the application
     */
    ns.Application = function ()
    {

        var init = function ()
        {
            // ns.pageInteractionInstance = new ns.PageInteraction();
            ns.strikethroughonscroll = new ns.strikeThroughOnScroll();
        };

        init();
    };

})(window.Caviar);