var gulp = require('gulp');
var browserSync = require('browser-sync').create(); //Виртуальный сервер
var ejs = require("gulp-ejs"); //HTML препроцессор
var prettify = require('gulp-html-prettify'); //Обагораживание HTML
var sass = require('gulp-sass'); //CSS препроцессор
var csscomb = require('gulp-csscomb'); //Облагораживание структуры CSS
var autoprefixer = require('gulp-autoprefixer'); //Автопрефиксер CSS
var uncss = require('gulp-uncss'); //Удаляет неиспользуемые стили CSS
var csso = require('gulp-csso'); //Минификация CSS
var jsmin = require('gulp-jsmin'); //Минификация js
var babel = require('gulp-babel'); //Конвертирует ECMAScript 2015+ код в более старую версию
var imagemin = require('gulp-imagemin'); //Минификатор изображений
var sourcemaps = require('gulp-sourcemaps'); //Соурсмапы
var rename = require("gulp-rename"); //Переименовывание
var concat = require('gulp-concat'); //Объединение кода
var notify = require('gulp-notify'); //Оповещения
var { parallel, series } = require('gulp');

function startwatch() {
    browserSync.init({
        server: {
            baseDir: './app/',
            directory: true
        },
        open: true,
        notify: false,
        online: true,
        reloadOnRestart: true,
        tunnel: 'local-dev',
        port: 8080
    });

    gulp.watch('./app/ejs/**/*.ejs', HTMLejs);
    gulp.watch('./app/scss/**/*.scss', style);
    gulp.watch('./app/js/modules/*.js', scripts);
    gulp.watch('./app/src/**/*').on('change', browserSync.reload);
}

function HTMLejs() {
    return gulp.src('./app/ejs/pages/*.ejs')
        .pipe(ejs())
        .on('error', function (err) {
            console.log(err.toString());

            notify.onError({
                message: err.toString(),
                title: "EJS Error!"
            })(err);

            this.emit('end');
        })

        .pipe(rename({ extname: '.html' }))
        .pipe(prettify({ indent_char: ' ', indent_size: 4 }))
        .pipe(gulp.dest('./app/pages'))
        .pipe(browserSync.stream());
}

function style() {
    return gulp.src('./app/scss/**/*.scss')
        .pipe(sass())
        .on('error', function (err) {
            console.log(err.toString());

            notify.onError({
                message: err.toString(),
                title: "Sass Error!"
            })(err);

            this.emit('end');
        })

        .pipe(autoprefixer())
        .pipe(csscomb())
        .pipe(gulp.dest('./app/css'))
        .pipe(browserSync.stream());
}

function scripts() {
    return gulp.src('./app/js/modules/*.js')

        .pipe(concat('scripts.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))

        .pipe(gulp.dest('./app/js'))
        .pipe(browserSync.stream());
}

// ======================== Экспорт ========================

function exportHTML() {
    return gulp.src('./app/**/*.html')
        .pipe(gulp.dest('./dist/'));
}

function exportCss() {
    return gulp.src('./app/css/**/*.css')
        .pipe(sourcemaps.init())

        .pipe(uncss({
            html: ['./app/**/*.html']
        }))
        .pipe(csso({
            restructure: false,
            comments: false
        }))
        .pipe(rename({ suffix: '.min' }))

        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/css/'));
}

function exportJs() {
    return gulp.src('./app/js/**/*.js')
        .pipe(sourcemaps.init())

        .pipe(jsmin())
        .pipe(rename({ suffix: '.min' }))

        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js/'));
}

function exportImages() {
    return gulp.src('./app/src/**/*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('./dist/src/'));
}

exports.start = parallel(startwatch, style, HTMLejs, scripts);
exports.export = series(exportHTML, exportCss, exportJs, exportImages);