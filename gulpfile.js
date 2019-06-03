'use strict';

/**
 * Install with:
 *
 * ```bash
 * npm init
 * npm install -g gulp-cli
 * npm install --save-dev autoprefixer beeper browser-sync gulp gulp-concat gulp-eslint gulp-plumber gulp-postcss node-sass gulp-sass gulp-sourcemaps gulp-uglify
 * ```
 *
 * Afterwards change `config` in line 30ff
 */

const fs       = require('fs'),
  beep         = require('beeper'),
  plumber      = require('gulp-plumber'),
  gulp         = require('gulp'),
  concat       = require('gulp-concat'),
  eslint       = require('gulp-eslint'),
  browserSync  = require('browser-sync').create(),
  postcss      = require('gulp-postcss'),
  sass         = require('gulp-sass'),
  sourcemaps   = require('gulp-sourcemaps'),
  uglify       = require('gulp-uglify'),
  autoprefixer = require('autoprefixer');

// Get configuration
//const config = JSON.parse(fs.readFileSync('./package.json'));
const config = {
  directories: {
    htdocs: "htdocs",
    theme: "src",
    sass: "src/scss",
    css: "htdocs/css",
    js_src: "src/js-src",
    js: "htdocs/js"
  },
  server: "localhost:8080"
};

// Error handler
const onError = function(err) {
  beep();
};

// -------------------------------------------------------

const globs = {
  eslintJs: [
    config.directories.js_src + '/**/*.js',
    '!' + config.directories.js_src + '/vendor/*.js'
  ],
  compileJs: [
    config.directories.js_src + '/vendor/*.js',
    config.directories.js_src + '/**/_*.js',
    config.directories.js_src + '/main.js'
  ],
  sass: config.directories.sass + '/**/*.scss',
  template: [
      config.directories.theme + '/css/*.css'
  ]
};

const tasks = {
  doEslint: function() {
    return gulp
      .src(globs.eslintJs)
      .pipe(plumber({ errorHandler: onError }))
      .pipe(
        eslint({
          useEslintrc: false,
          rules: {
            strict: [2, 'safe'],
            curly: 2,
            semi: [2, 'always'],
            'no-undef': 2
          },
          envs: ['browser', 'jquery'],
          extends: ['eslint:recommended']
        })
      )
      .pipe(eslint.format());
  },

  doUglify: function() {
    return gulp
      .src(globs.compileJs)
      .pipe(concat('scripts.js'))
      .pipe(
        uglify({
          output: {
            max_line_len: 9000
          }
        })
      )
      .pipe(gulp.dest(config.directories.js));
  },

  buildCss: function() {
    return gulp
      .src(globs.sass)
      .pipe(plumber({ errorHandler: onError }))
      .pipe(sourcemaps.init())
      .pipe(sass({ outputStyle: 'compact' }).on('error', sass.logError))
      .pipe(
        postcss([
          autoprefixer({
            browsers: ['last 2 versions', '> 2%', 'ie 9', 'ie 10', 'ie 11']
          })
        ])
      )
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(config.directories.css));
  },

  reloadFrontend: function() {
    gulp.src(globs.template).pipe(browserSync.stream());
  },

  watch: function() {
    /*browserSync.init( config.server
      ? {
        proxy: config.server,
        files: globs.template
      } : {
        server: {
          baseDir: config.directories.htdocs,
          directory: true
        }
      }
    );*/

    gulp.watch(['./gulpfile.js', './package.json'], process.exit);
    gulp.watch(globs.compileJs,     tasks.buildJs);
    gulp.watch(globs.sass,          tasks.buildCss);
    //gulp.watch(globs.template,      tasks.reloadFrontend);
  }
};

tasks.buildJs = gulp.parallel(tasks.doEslint, tasks.doUglify);
tasks.build   = gulp.parallel(tasks.buildJs, tasks.buildCss);

// Shell commands
gulp.task('build-js',    tasks.buildJs);
gulp.task('build-css',   tasks.buildCss);
gulp.task('watch',       tasks.watch);
gulp.task('default',     tasks.build);
