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
    ns.Strikes = function ()
    {
        var lines;
        var containers;
        var allStrikes  = [];

        var findAllTextLines = function() {
            containers = $(".strike-through");
            lines = $(".line");
        };

        var createStikes = function(linesArray){
            for(var x = 0; x < linesArray.length; x++) {
                var newStrike = {};
                var $line = $(linesArray[x]);
                var offset = $line.offset();

                newStrike.width = $line.innerWidth();
                newStrike.height = $line.innerHeight() / 2;  // Be half as big as the span
                newStrike.top = offset.top + newStrike.height;
                newStrike.left = offset.left;
            }
        };

        var appendStrikes = function(linesArray, allStrikes){
            for(var x = 0; x < linesArray.length; x++) {
                var $line = $(linesArray[x]);
                console.log($line.parent().find("line-container"));
                var span = $("<span>hello</span>");
                span.css({ color: "red"});

                $line.closest(".cross-out").find(".line-container").append(span);
            }
        };



        window.onscroll = function() {
        };

        var init = function ()
        {
           console.log(document.body.scrollTop);
           findAllTextLines();
           createStikes(lines);
           appendStrikes(lines, allStrikes);
           // console.log(allStrikes);
        };

        init();
    };

})(window.Caviar);