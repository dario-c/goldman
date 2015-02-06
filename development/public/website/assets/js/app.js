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
        };

        init();
    };

})(window.Caviar);