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
        var scrollThresHold = 200;

        var findAllTextLines = function() {
            containers = $(".strike-through");
            lines = containers.find(".line");
        };

        var createStrikes = function(linesArray){
            for(var x = 0; x < linesArray.length; x++) {
                var newStrike = {};
                var $line = $(linesArray[x]);
                var lineOffset = $line.offset();
                var parentOffset = $line.closest(".cross-out").offset();

                newStrike.width = $line.innerWidth();
                newStrike.height = $line.innerHeight();
                newStrike.top = lineOffset.top - parentOffset.top;
                newStrike.left = lineOffset.left - parentOffset.left;
                newStrike.offsetPage = parentOffset.top;

                allStrikes.push(newStrike);
                console.log(parentOffset);
            }
        };

        var appendStrikes = function(linesArray, allStrikes){
            for(var x = 0; x < linesArray.length; x++) {
                var $line = $(linesArray[x]);

                var span = $("<span></span>");
                span.css({ width: allStrikes[x].width, height: allStrikes[x].height, top: allStrikes[x].top, left: allStrikes[x].left});

                $line.closest(".cross-out").find(".line-container").append(span);
            }
        };

        var start = true;
        var finishScroll;

        var detectScrollLimit = function() {
            var strikes = allStrikes;
            for(var x = 0; x < allStrikes.length; x++){


                // If I reach the startpoint 
                if($window.scrollTop() + scrollThresHold >= allStrikes[x].offsetPage){

                    if(start){
                        finishScroll = $window.scrollTop();
                        start = false;
                    }


                    var newWidth = (($window.scrollTop() * allStrikes[0].width) / finishScroll) - (allStrikes[0].width);

                    console.log(newWidth);

                    // if(newWidth < allStrikes[x].width) {
                        var span = $(".line-container").find("span")[x];
                        $(span).css({ width: newWidth });
                    // }

                }
            }
        };

        var init = function ()
        {
           console.log(document.body.scrollTop);
           findAllTextLines();
           createStrikes(lines);
           appendStrikes(lines, allStrikes);
           
            // $window.on("scroll", function()
            // {
            //     window.requestAnimationFrame(detectScrollLimit);
            // });

        };

        init();
    };

})(window.Caviar);