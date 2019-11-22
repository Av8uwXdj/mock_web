import { src, dest, watch, /*series,*/ parallel } from "gulp";
import pug from "gulp-pug";
import sass from "gulp-sass";
import onError from "gulp-notify";
import plumber from "gulp-plumber";
import autoprefixer from "gulp-autoprefixer";

// paths
var paths = {
    "pug":  "./src/pug/",
    "sass": "./src/sass/",
    "ts":   "./src/ts/",
    "html": "./dst/html/",
    "css":  "./dst/css/",
    "js":   "./dst/js"
}

// options
var options = {
    "sass_style": "compressed",
    "pug_pretty": true
}

// task for pug
function task_pug() {
    return src([paths.pug + "**/*.pug", "!" + paths.pug + "**/_*.pug"])
    .pipe(plumber({ errorHandler: onError("Error: <%= error.message %>") }))
    .pipe(pug(options.pug_pretty))
    .pipe(dest(paths.html));
}

function watch_pug() {
    watch([paths.pug + "**/*.pug", "!" + paths.pug + "**/_*.pug"], task_pug);
}

// task for sass
function task_sass() {
    return src(paths.sass + "**/*.scss")
    .pipe(plumber({ errorHandler: onError("Error: <%= error.message %>") }))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(dest(paths.css))
}
  
function watch_sass() {
    watch(paths.sass + "**/*.scss", task_sass);
}

exports.default = parallel(watch_pug, watch_sass);