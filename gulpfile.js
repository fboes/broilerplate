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
  shell       = require('gulp-shell'),
  sourcemaps  = require('gulp-sourcemaps'),
  uglify      = require('gulp-uglify')
;

// Lint Task
gulp.task('eslint', function() {
  return gulp.src([
      pkg.directories.js_src + '/**/*.js',
      '!' + pkg.directories.js_src + '/vendor/*.js'
    ])
    .pipe(plumber({errorHandler: onError}))
    .pipe(eslint({
      'envs': [
        'browser'
      ],
      "extends": [
        "eslint:recommended"
      ]
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
  ;
});

gulp.task('build-js',    ['eslint', 'uglify']);

// Concatenate & Minify JS
gulp.task('uglify', function() {
  return gulp.src([
      pkg.directories.js_src + '/vendor/*.js', // disable this line by prepending '!' - in case of errors
      pkg.directories.js_src + '/modules/*.js',
      pkg.directories.js_src + '/main.js'
    ])
    .pipe(concat('scripts.js'))
    .pipe(uglify({output: {
      max_line_len: 9000
    }}))
    .pipe(gulp.dest(pkg.directories.js))
  ;
});

// Sass
gulp.task('build-css', function (cb) {
  return gulp.src(pkg.directories.sass + '/**/*.scss')
    .pipe(plumber({errorHandler: onError}))
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
    .pipe(postcss([require('autoprefixer')({browsers: ['last 2 versions', '> 2%', 'ie 9', 'ie 10', 'ie 11']})]))
    //.pipe(replace(/([\n\r])\s*[\n\r]/g, '$1'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(pkg.directories.css))
  ;
});

gulp.task('build-icons', function() {
  var logo = gulp.src(pkg.directories.images + '/logo.png');

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
});

gulp.task('build-article-images', function() {
  var article_images = gulp.src(pkg.directories.images + '/originals/*.jpg');

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
});

gulp.task('reload-frontend', function() {
  gulp.src(pkg.directories.htdocs + '/**/*')
    .pipe(browserSync.stream())
  ;
});


// Watch Files For Changes
gulp.task('watch', function() {
  browserSync.init({
    server: {
      baseDir: "./htdocs",
      directory: true
    }
  });

  gulp.watch(pkg.directories.js_src + '/**/*.js', ['build-js']);
  gulp.watch(pkg.directories.sass + '/**/*.scss', ['build-css']);
  gulp.watch(pkg.directories.images + '/logo.png', ['build-icons']);
  gulp.watch(pkg.directories.images + '/originals/*.jpg', ['build-article-images']);
  gulp.watch(pkg.directories.htdocs + '/**/*', ['reload-frontend']);
});

// Default Task
gulp.task('default',     ['build-js','build-css','build-icons']);
