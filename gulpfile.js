'use strict';

// Include gulp
const gulp = require('gulp');
const pkg  = require('./package.json');


// Include Our Plugins
var concat      = require('gulp-concat'),
  eslint        = require('gulp-eslint'),
  sass          = require('gulp-sass')(require('sass')),
  postcss       = require('gulp-postcss'),
  rename        = require("gulp-rename"),
  replace       = require('gulp-replace'),
  uglify        = require('gulp-uglify'),
  autoprefixer  = require ('autoprefixer'),
  gulpStylelint = require ('@ronilaukkarinen/gulp-stylelint')
;

// Tasks
const tasks = {
  buildJs: function() {
    return gulp.src([
        pkg.directories.js_src + '/main.js'
      ])
      .pipe(eslint())
      .pipe(eslint.format())
      //.pipe(eslint.failAfterError())
      .pipe(concat('scripts.min.js'))
      .pipe(uglify({output: {
        max_line_len: 9000
      }}))
      .pipe(gulp.dest(pkg.directories.js))
    ;
  },

  buildCss: function() {
    return gulp.src(pkg.directories.sass + '/**/*.scss')
      .pipe(gulpStylelint({
        reporters: [
          {formatter: 'string', console: true}
        ]
      }))
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss([
        autoprefixer()
      ]))
      .pipe(gulp.dest(pkg.directories.css))
    ;
  },

  compressCss: function() {
    return gulp.src(pkg.directories.css + '/**/amp.css')
      .pipe(replace(/\n\s+/g, ''))
      .pipe(replace(/\s*(\{)\s*/g, '$1'))
      .pipe(replace(/\s*(\})/g, '$1'))
      .pipe(replace(/(;)\s*/g, '$1'))
      .pipe(replace(/(url\()/g, '$1https://cdn.3960.org/css/'))
      .pipe(replace(/\s?!important/g, ''))
      .pipe(rename('amp.min.css'))
      .pipe(gulp.dest(pkg.directories.css))
    ;
  },

  // Watch Files For Changes
  watch: function() {
    gulp.watch(pkg.directories.js_src + '/**/*.js',  tasks.buildJs);
    gulp.watch(pkg.directories.sass + '/**/*.scss',  tasks.buildCss);
    gulp.watch(pkg.directories.css + '/**/amp.css',  tasks.compressCss);
  }
};

// Bundle tasks
tasks.defaultTask = gulp.parallel(tasks.buildJs, tasks.buildCss);

// Expose tasks
gulp.task('build-js',  tasks.buildJs);
gulp.task('build-css', gulp.series(tasks.buildCss, tasks.compressCss));
//gulp.task('build',   tasks.build);
gulp.task('watch',     tasks.watch);
gulp.task('default',   tasks.defaultTask);
