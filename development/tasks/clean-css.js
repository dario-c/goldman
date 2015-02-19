var gulp = require("gulp");
var config = require("../gulpconfig");
var rimraf = require("rimraf");

gulp.task("clean-css", function(errorCallback)
{
    "use strict";

    return rimraf(config.css_folder, errorCallback);
});