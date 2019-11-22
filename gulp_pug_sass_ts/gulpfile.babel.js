import { src, dest, watch, /*series,*/ parallel } from "gulp";
import pug from "gulp-pug";
import sass from "gulp-sass";
import ts from "gulp-typescript";
import onError from "gulp-notify";
import plumber from "gulp-plumber";
import autoprefixer from "gulp-autoprefixer";

// paths
var paths = {
    html: {
        src: "./src/pug/**/!(_)*.pug",
        dst: "./dst/html/"
    },
    css: {
        src: "./src/sass/**/!(_)*.scss", 
        dst: "./dst/css/"
    },
    js: {
        src: "./src/ts/**/*.ts",
        dst: "./dst/js/"
    }
}

// options
var options = {
    sass: {
        style: "compressed"
    },
    pug: {
        pretty: true
    }
}

// for html
function task_pug() {
    return src(paths.html.src)
    .pipe(plumber({ errorHandler: onError("Error: <%= error.message %>") }))
    .pipe(pug(options.pug.pretty))
    .pipe(dest(paths.html.dst));
}

function watch_pug() {
    watch(paths.html.src, task_pug);
}

// for css
function task_sass() {
    return src(paths.css.src)
    .pipe(plumber({ errorHandler: onError("Error: <%= error.message %>") }))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(dest(paths.css.dst))
}

function watch_sass() {
    watch(paths.css.src, task_sass);
}

// for js
function task_ts() {
    return src(paths.js.src)
    .pipe(ts({ noImplicitAny: true, outFile: 'main.min.js' }))
    .pipe(dest(paths.js.dst))
}

function watch_ts() {
    watch(paths.js.src, task_ts);
}

exports.default = parallel(
    watch_pug,
    watch_sass,
    watch_ts
);
