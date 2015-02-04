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
        var $window = ns.$win;
        var currentScrollPos = $window.scrollTop();
        var $strikeElements = $(".strike-through");
        var lineHeight = $strikeElements.first().css("lineHeight").replace("px", "") *1;
            
        var strikeElementsData = [];
        var scrollThresHold = 200; // Threshold in pixels for actual dom injection
        var defaultCharWidth = 10.6;
        var BoldCharWidth = 11;

        var init = function()
        {
            // Check all elements that need striking
            checkStrikeElements();

            // Do stuff when scrolling
            $window.on("scroll", function()
            {
                window.requestAnimationFrame(strikeLines);
            });
        };

        /**
        * 
        * Store all elements with their offset
        * Prepare all elements with strike bars
        */
        var checkStrikeElements = function()
        {
            $.each($strikeElements, function(i, element)
            {
                // Store data
                var $element = $(element);
                var lines = [];
                var linesInElement = $element.find(".line");
                var elementData = {};
                var $strikeContainer = $("<div class=\"strike-container\"></div>");


                // Get all separate lines
                $.each(linesInElement, function(j, line)
                {
                    var $line = $(line);

                    // Calculate line width
                    lines.push({
                        $element: $line,
                        copy: $line.text(), // Remove whitespace
                        width: $line.text().length * defaultCharWidth
                    });

                    // Append the bar for animation
                    var strikeBar = $("<span class=\"strike-bar\"></span>");
                    strikeBar.css({
                        maxWidth: $line.text().length * defaultCharWidth,
                        left: $line.position().left - 5,
                        top: (j * lineHeight) + 8
                    });
                    $strikeContainer.append(strikeBar);

                    // Append the container
                    if(j === linesInElement.length-1)
                    {
                        $element.append($strikeContainer);
                    }
                });
                
                // Store data
                elementData.index = i;
                elementData.top = $element.offset().top;
                elementData.striked = false;
                elementData.$element = $element;
                elementData.lines = lines;

                // Store element data
                strikeElementsData.push(elementData);
            });

            console.log(strikeElementsData);
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
            
            $.each(strikeElementsData, function(i, paragraph)
            {
                var elOffsetTop = paragraph.top;

                if(!paragraph.striked && scrollTop >= (elOffsetTop - scrollThresHold))
                {
                    console.log("Strike paragraph, ", paragraph.index);
                    // $.each(paragraph.lines, function(j, line)
                    // {
                    //     line.$element.find(".strike-bar").css({
                    //         width: line.width
                    //     });
                    // });

                    paragraph.striked = true;
                }
            });

            // // Update scroll position
            // currentScrollPos = scrollTop;
        };

        /**
        * Grow bar
        *
        */
        var strikeLine = function()
        {
        };


        init();
    };

}(window.Caviar));