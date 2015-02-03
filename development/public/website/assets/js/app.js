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
            ns.pageInteractionInstance = new ns.PageInteraction();
        };

        init();
    };

})(window.Caviar);