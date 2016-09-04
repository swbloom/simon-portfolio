'use strict';

const gulp          = require('gulp');
const pug           = require('gulp-pug');
const sass          = require('gulp-sass');
const concat        = require('gulp-concat');
const babel         = require('gulp-babel');
const autoprefixer  = require('gulp-autoprefixer');
const browserSync   = require('browser-sync').create();
const injectSvg     = require('gulp-inject-svg');
const sourcemaps    = require('gulp-sourcemaps');
const plumber       = require('gulp-plumber');
const reload        = browserSync.reload;

gulp.task('templates', () => {
  return gulp.src('./dev/templates/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(injectSvg())
    .pipe(gulp.dest('./public/'))
    .pipe(reload({stream: true}));
})

gulp.task('styles', () => {
  return gulp.src('./dev/styles/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./public/styles/'))
    .pipe(reload({stream: true}));
});

gulp.task('scripts', () => {
  return gulp.src('./dev/scripts/main.js')
    .pipe(plumber())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./public/scripts'))
    .pipe(reload({stream: true}));
});

gulp.task('browser-sync', () => {
  browserSync.init({
    server: './public',
    open: false
  })
});

gulp.task('watch', () => {
    gulp.watch('./dev/styles/**/*.scss', ['styles']);
    gulp.watch('./dev/scripts/*.js', ['scripts']);
    gulp.watch('./dev/templates/*.pug', ['templates']);
});

gulp.task('default', ['browser-sync', 'styles', 'scripts', 'templates', 'watch']);
