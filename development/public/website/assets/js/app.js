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
            ns.strikes = new ns.Strikes();
            // ns.strikethroughonscroll = new ns.strikeThroughOnScroll();
        };

        init();
    };

})(window.Caviar);