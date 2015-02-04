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
        
        var lastScrollTop = 0;
        var scrollThresHold = 600; // Threshold in pixels for actual dom injection
        
        // Lines (width calculation)
        var $strikeElements = $(".strike-through");
        var strikeElementsData = [];
        var defaultCharWidth = 10.6;
        var boldCharWidth = 13.3;
        var topLineHeightFix = 8;
        var boldTopLineHeightFix = 11;

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
                var charWidth = ($element.hasClass("bold")) ? boldCharWidth : defaultCharWidth;
                var topFix = ($element.hasClass("bold")) ? boldTopLineHeightFix : topLineHeightFix;

                // Get all separate lines
                $.each(linesInElement, function(j, line)
                {
                    var $line = $(line);

                    // Calculate line width
                    lines.push({
                        $element: $line,
                        part: 0,
                        copy: $line.text(), // Remove whitespace
                        width: $line.text().length * charWidth
                    });

                    // Append the bar for animation
                    var strikeBar = $("<span class=\"strike-bar\"></span>");
                    var lineHeight = $element.css("lineHeight").replace("px", "") *1;

                    strikeBar.css({
                        maxWidth: $line.text().length * charWidth,
                        left: $line.position().left - 5,
                        top: (j * lineHeight) + topFix
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
                elementData.$container = $strikeContainer;

                // Store element data
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
            var scrollDown = (scrollTop > lastScrollTop) ? true : false;

            $.each(strikeElementsData, function(i, paragraph)
            {
                var elOffsetTop = paragraph.top;

                if(scrollDown && (scrollTop >= (elOffsetTop - scrollThresHold)))
                {
                    // Loop each line
                    $.each(paragraph.lines, function(j, line)
                    {
                        line.part = (line.part < 100) ? line.part += 5 : 100;

                        $(paragraph.$container.find(".strike-bar")[j]).css({
                            width: line.part + "%"
                        });
                    });
                }
                else if(!scrollDown && (scrollTop <= (elOffsetTop - scrollThresHold)))
                {
                    // Loop each line
                    $.each(paragraph.lines, function(j, line)
                    {
                        line.part -= 5;

                        $(paragraph.$container.find(".strike-bar")[j]).css({
                            width: line.part + "%"
                        });
                    });
                }
            });

            // Save scroll for direction
            lastScrollTop = scrollTop;
        };

        init();
    };

}(window.Caviar));