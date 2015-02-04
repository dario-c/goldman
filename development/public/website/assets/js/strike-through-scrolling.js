window.Caviar = window.Caviar || {};

/**
* Strike through line of copy on scroll
*
*/
(function(ns)
{
    "use strict";

    /**
     *
     */
    ns.strikeThroughOnScroll = function()
    {
        var $strikeElements = $(".strike-through");
        var strikeElementsData = [];
        var $window = ns.$win;
        var currentScrollPos = $window.scrollTop();
        var scrollThresHold = 50; // Threshold in pixels for actual dom injection

        var init = function()
        {
            console.log($window.scrollTop());

            // Store all data of elements that need striking
            storeStrikeElements();

            // Do stuff when scrolling
            $window.on("scroll", function()
            {
                window.requestAnimationFrame(strikeLines);
            });
        };

        /**
        * Store all elements with their offset
        *
        */
        var storeStrikeElements = function()
        {
            $.each($strikeElements, function(i, element)
            {
                var elementData = { "index": i, "top": $(element).offset().top, "striked": false };
                strikeElementsData.push(elementData);
            });

            // console.log(strikeElementsData);
        };

        /**
        * Calculate strikes
        *
        */
        var strikeLines = function()
        {
            var scrollTop = $window.scrollTop();
            var winHeight = $window.height();
            var docHeight = ns.$doc.height();
            var scrolledFarEnough = (scrollTop + winHeight) >= (docHeight - scrollThresHold);
            
            $.each(strikeElementsData, function(i, strikeEl)
            {
                var elOffsetTop = strikeEl.top;

                if(!strikeEl.striked && scrollTop >= (elOffsetTop - scrollThresHold))
                {
                    console.log("Strike: ", strikeEl.index);

                    strikeEl.striked = true;
                }
            });

            // // Update scroll position
            // currentScrollPos = scrollTop;
        };

        /**
        * Grow bar
        *
        */
        var strikeThrough = function()
        {
            // var length = element.innerWidth() + "px"
            // var leftPos = element.position().left - 6 + "px";
            // var topPos =  element.position().top + 4 + "px";

            // bar.css({ width: length, left: leftPos, top: topPos})
        };


        init();
    };

}(window.Caviar));