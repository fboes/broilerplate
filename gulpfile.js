// Include gulp
var gulp = require('gulp'),
  fs = require('fs'),
  pkg = JSON.parse(fs.readFileSync('./package.json')),
  beep = require('beeper'),
  onError = function (err) { beep(); }
;

// Include Our Plugins
var clone     = require('gulp-clone'),
  concat      = require('gulp-concat'),
  eslint      = require('gulp-eslint'),
  imageResize = require('gulp-image-resize'),
  browserSync = require('browser-sync').create(),
  plumber     = require('gulp-plumber'),
  postcss     = require('gulp-postcss'),
  rename      = require("gulp-rename"),
  sass        = require('gulp-sass'),
  sourcemaps  = require('gulp-sourcemaps'),
  uglify      = require('gulp-uglify')
;

var globs = {
  eslintJs: [
    pkg.directories.js_src + '/**/*.js',
    '!' + pkg.directories.js_src + '/vendor/*.js'
  ],
  compileJs: [
    pkg.directories.js_src + '/vendor/*.js', // disable this line by prepending '!' - in case of errors
    pkg.directories.js_src + '/**/_*.js',
    pkg.directories.js_src + '/main.js'
  ],
  sass: pkg.directories.sass + '/**/*.scss',
  icon: pkg.directories.images + '/logo.png',
  articleImages: pkg.directories.images + '/originals/*.jpg',
  allHtdocs: pkg.directories.htdocs + '/**/*'
}

var tasks = {
  makeEslint: function() {
    return gulp.src(globs.eslintJs)
      .pipe(plumber({errorHandler: onError}))
      .pipe(eslint({
        'useEslintrc': false,
        'rules': {
          'strict': [
            2,
            'safe'
          ],
          'curly': 2,
          "semi": [
            2,
            "always"
          ],
          'no-undef': 2
        },
        'envs': [
          'browser'
        ],
        "extends": [
          "eslint:recommended"
        ]
      }))
      .pipe(eslint.format())
    ;
  },

  makeUglify: function() {
    return gulp.src(globs.compileJs)
      .pipe(concat('scripts.js'))
      .pipe(uglify({output: {
        max_line_len: 9000
      }}))
      .pipe(gulp.dest(pkg.directories.js))
    ;
  },

  buildCss: function() {
    return gulp.src(globs.sass)
      .pipe(plumber({errorHandler: onError}))
      .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
      .pipe(postcss([require('autoprefixer')({browsers: ['last 2 versions', '> 2%', 'ie 9', 'ie 10', 'ie 11']})]))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(pkg.directories.css))
    ;
  },

  buildIcons: function() {
    var logo = gulp.src(globs.icon);

    [
      {
        width: 32,
        height: 32,
        name: 'favicon.ico',
        directory: pkg.directories.template
      },{
        width: 16,
        height: 16,
        name: 'favicon-16x16.png',
        directory: pkg.directories.template
      },{
        width: 32,
        height: 32,
        name: 'favicon-32x32.png',
        directory: pkg.directories.template
      },{
        width: 128,
        height: 128,
        name: 'tile-128x128.png',
        directory: pkg.directories.images
      },{
        width: 180,
        height: 180,
        name: 'apple-touch-icon-precomposed.png',
        directory: pkg.directories.template
      },{
        width: 192,
        height: 192,
        name: 'favicon-192x192.png',
        directory: pkg.directories.template
      },{
        width: 512,
        height: 512,
        name: 'favicon-512x512.png',
        directory: pkg.directories.template
      },{
        width: 270,
        height: 270,
        name: 'tile-270x270.png',
        directory: pkg.directories.images
      },{
        width: 558,
        height: 270,
        name: 'tile-558x270.png',
        directory: pkg.directories.images
      },{
        width: 558,
        height: 558,
        name: 'tile-558x558.png',
        directory: pkg.directories.images
      }
    ].forEach(function(i) {
      logo.pipe(clone())
        .pipe(imageResize({
          width: i.width,
          height: i.height,
          crop: true,
          quality: 0.7,
          gravity: 'Center',
          imageMagick: true
        }))
        .pipe(rename(i.name))
        .pipe(gulp.dest(i.directory))
      ;
    })
    return logo;
  },

  buildArticleImages: function() {
    var article_images = gulp.src(globs.articleImages);

    [{ width: 640, height: 360 },{ width: 1280, height: 720 }].forEach(function(i) {
      article_images.pipe(clone())
        .pipe(imageResize({
          width: i.width,
          height: i.height,
          crop: true,
          quality: 0.7,
          gravity: 'Center',
          imageMagick: true
        }))
        .pipe(gulp.dest(pkg.directories.images + '/articles-'+i.width))
      ;
    });
    return article_images;
  },

  reloadFrontend: function() {
    gulp.src(globs.allHtdocs)
      .pipe(browserSync.stream())
    ;
  },

  watch: function() {
    browserSync.init({
      server: {
        baseDir: pkg.directories.htdocs,
        directory: true
      }
    });

    gulp.watch(['gulpfile.js', 'package.json'], process.exit);
    gulp.watch(pkg.directories.js_src + '/**/*.js', tasks.buildJs);
    gulp.watch(globs.sass, tasks.buildCss);
    gulp.watch(globs.icon, tasks.buildIcons);
    gulp.watch(globs.articleImages, tasks.buildArticleImages);
    gulp.watch(globs.allHtdocs, tasks.reloadFrontend);
  }
};

tasks.buildJs = gulp.parallel(tasks.makeEslint, tasks.makeUglify);
tasks.build = gulp.parallel(tasks.buildJs, tasks.buildCss, tasks.buildIcons);

// Tasks
gulp.task('build-js',    tasks.buildJs);
gulp.task('build-css',   tasks.buildCss);
gulp.task('build-icons', tasks.buildIcons);
gulp.task('watch',       tasks.watch);
gulp.task('default',     tasks.build);
