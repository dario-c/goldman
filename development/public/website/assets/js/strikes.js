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
        var $window = ns.$win;
        var lines;
        var containers;
        var allStrikes  = [];
        var scrollThresHold = 400;

        var findAllTextLines = function() {
            containers = $(".strike-through");
            lines = containers.find(".line");
        };


         var createStrikes = function(linesArray){
            for(var x = 0; x < linesArray.length; x++) {

                var newStrike = {};
                var $line = $(linesArray[x]);
                var lineOffset = $line.offset();

                newStrike.offsetPage = lineOffset.top;

                allStrikes.push(newStrike);
            }
        };

        var appendStrikesToLine = function(linesArray, allStrikes){
            for(var x = 0; x < linesArray.length; x++) {
                var $line = $(linesArray[x]);

                var span = $("<span class='strike'></span>");
                $line.append(span);
            }
        };


        var detectScrollLimit = function() {
            for(var x = 0; x < allStrikes.length; x++){
                var start =  allStrikes[x].offsetPage - $window.scrollTop();
                var speed = 200;

                var ratio = (100 / speed);

                if(start < scrollThresHold) {
                    var percent = Math.round((scrollThresHold - start) * ratio);
                    percent = Math.min(percent, 100);

                  $(lines[x]).find(".strike").css({ width: percent + "%" });
                }
                else {
                    $(lines[x]).find(".strike").css({ width: "0%" });
                }
            }
        };

        var init = function ()
        {
           findAllTextLines();
           createStrikes(lines);
           appendStrikesToLine(lines, allStrikes);
           
            $window.on("scroll", function()
            {
                window.requestAnimationFrame(detectScrollLimit);
            });

        };

        init();
    };

})(window.Caviar);