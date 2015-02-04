var MAX_SMALL_WIDTH = 630;
var MAX_WIDTH = 800;
var didScroll = false;
var scrollFinish;

$(document).ready(function() {
    setTimeout(fetchQuoteBars, 1000);

    if (!Modernizr.testProp("backgroundBlendMode")) $(document.body).addClass("no-blend");
    
    if (Modernizr.touch) {
        checkScroll(true);
        $(window).on("touchmove", startScroll);
        $(window).scroll(stopScroll);
    } else {
        checkScroll(false);
        $(window).scroll(startScroll);
    }
    
    $(".annotation").click(handleAnnotationClicked);
});

var startScroll = function() {
    if (scrollFinish) clearTimeout(scrollFinish);
    didScroll = true;
}

var stopScroll = function() {
    scrollFinish = setTimeout(3000, function() {
        didScroll = false;
        handleScroll();
    });
}

var checkScroll = function(touch) {
    setInterval(function() {
        if(didScroll) {
            handleScroll();
            if (!touch) didScroll = false;
        }
    }, 50);
}

var handleScroll = function(event) {

    var scrollTop = $(window).scrollTop();
    var widthFactor;
    var maxWidth;

    _.each(this.quotes, function(element) {
        domEl = $(element.domElement);
        var offsetTop = domEl.offset().top;
        var scrollOffset = 1-(offsetTop - scrollTop-300);
        if (domEl.hasClass("small")) {
            widthFactor = 8.6;
            maxWidth = MAX_SMALL_WIDTH;
        } else {
            widthFactor = 11.8;
            maxWidth = MAX_WIDTH;
        }

        var parentElement = element;
        _.each(domEl.find(".bar"), function(bar, index) {
            var lineObject = parentElement.lines[index];
            var line = lineObject.copy;
            var charCount = line.length;
            var perc = 0;
            
            if (offsetTop-400 <= scrollTop) {
                perc = scrollOffset/lineObject.scrollHeight;
                if (perc > 1) perc = 1;
                if (perc < 0) perc = 0;
            }

            var projectedWidth = charCount*widthFactor;
            if (projectedWidth > maxWidth) projectWidth = maxWidth;
            $(bar).css({width : projectedWidth*perc});
        });
    });
};

var handleAnnotationClicked = function() {
    var topOffset = $(".info").offset().top - 100;
    $("html, body").animate({scrollTop: topOffset}, 1200);
};

var fetchQuoteBars = function() {
    this.quotes = [];
    var self = this;
    _.each($(".quote"), function(element){
        var quote = {};
        var domElement = $(element);
        quote.domElement = domElement;
        
        var spans = [];
        var lastTop = 0;
        _.each(domElement.find("span"), function(span) {
            var spanElement = $(span);
            var spanOffset = spanElement.offset();
            var spanObj = {};
            spanObj.top = spanOffset.top;
            if (lastTop != spanObj.top) spans.push(spanObj);
            lastTop = spanObj.top;
        });

        var newLines = [];
        _.each(domElement.find("p").not(".ignore"), function(paragraph) {
            var htmlString = $(paragraph).html();
            var lines = htmlString.split("<br>");
            
            _.each(lines, function(line) {
                var lineObject = {};
                var newLine = line.replace("<span>", "");
                newLine = newLine.replace("</span>", "");
                // newLine = newLine.replace(",", "");
                // newLine = newLine.replace(".", "");
                // newLine = newLine.replace("“", "");
                // newLine = newLine.replace("”", "");
                // newLine = newLine.replace("‘", "");
                // newLine = newLine.replace("’", "");
                // newLine = newLine.replace(" ", "");
                lineObject.copy = newLine;
                lineObject.scrollHeight = Math.random()*50 + 150;
                newLines.push(lineObject);
            });
        });
        quote.lines = newLines;
        quote.spans = spans;
        self.quotes.push(quote);
    });

    createBlockBars();
}; 

var createBlockBars = function() {
    var domEl;
    var topOffset;
    var widthFactor;
    var maxWidth;

    _.each(this.quotes, function(quote){
        domEl = quote.domElement;

        if (domEl.hasClass("small")) {
            topOffset = 8;
            widthFactor = 8.6;
            maxWidth = MAX_SMALL_WIDTH;
            domEl.prepend("<div class='bar-container small'></div>")

        } else {
            topOffset = 14;
            widthFactor = 11.8;
            maxWidth = MAX_WIDTH;
            domEl.prepend("<div class='bar-container'></div>");
        }

        var parentElement = quote;
        _.each(quote.lines, function(lineObject, index) {
            var bar = $("<div class='bar'></div>");
            domEl.find(".bar-container").append(bar);
            var line = lineObject.copy;
            var charCount = line.length;
            var span = parentElement.spans[index];

            var projectedWidth = charCount*widthFactor;
            if (projectedWidth > maxWidth) projectedWidth = maxWidth;
            bar.css({
                left : (domEl.width() - projectedWidth)/2 ,
                top : span.top - domEl.offset().top + topOffset,
                width : 0
            });
        });
    });
};

