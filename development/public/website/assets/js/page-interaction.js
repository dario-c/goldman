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
    ns.PageInteraction = function ()
    {

        window.onscroll = function() {
            console.log(document.body.scrollTop);
            if(document.body.scrollTop > 300){
                console.log("trigger!");
                $("#cross-one").find(".crossing-line").removeClass("hide");
            }

            if(document.body.scrollTop > 1660) {
                $("#cross-two").find(".crossing-line").removeClass("hide");
            }
    
            if(document.body.scrollTop > 2770) {
                $("#cross-three").find(".crossing-line").removeClass("hide");
            }

            if(document.body.scrollTop > 3980) {
                $("#cross-four").find(".crossing-line").removeClass("hide");
            }
        };

        var init = function ()
        {
           console.log(document.body.scrollTop);
        };

        init();
    };

})(window.Caviar);