// Include gulp
var gulp = require('gulp');
var fs = require('fs');
var pkg = JSON.parse(fs.readFileSync('./package.json'));
var beep = require('beepbeep');
var onError = function (err) { beep(); };

// Include Our Plugins
var appcache = require('gulp-appcache');
var clone      = require('gulp-clone');
var concat     = require('gulp-concat');
var imageResize= require('gulp-image-resize');
var jshint     = require('gulp-jshint');
var livereload = require('gulp-livereload');
var plumber    = require('gulp-plumber');
var postcss    = require('gulp-postcss');
var rename     = require("gulp-rename");
var replace    = require('gulp-replace');
var sass       = require('gulp-sass');
var shell      = require('gulp-shell');
var sourcemaps = require('gulp-sourcemaps');
var uglify     = require('gulp-uglify');

// Lint Task
gulp.task('jshint', function() {
  return gulp.src([
      pkg.directories.js_src + '/**/*.js',
      '!' + pkg.directories.js_src + '/vendor/*.js'
    ])
    .pipe(plumber({errorHandler: onError}))
    .pipe(jshint({ // see https://github.com/jshint/jshint/blob/master/examples/.jshintrc
      browser: true,
      jquery: true,
      strict: true,
      curly: true,
      undef: true
    }))
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'))
  ;
});

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
    .pipe(livereload());
  ;
});

// Sass
gulp.task('sass', function(cb) {
  return gulp.src(pkg.directories.sass + '/**/*.scss')
    .pipe(plumber({errorHandler: onError}))
    .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
    .pipe(gulp.dest(pkg.directories.css))
  ;
  cb(err);
});

// PostCSS
gulp.task('postcss',['sass'], function (cb) {
  return gulp.src(pkg.directories.css + '/styles.css')
    .pipe( postcss([ require('autoprefixer')({browsers: ['last 2 versions', '> 2%', 'ie 8', 'ie 9']})]) )
    .pipe( gulp.dest(pkg.directories.css) )
    .pipe( postcss([ require('rtlcss')]) )
    .pipe(rename('rtl.css'))
    .pipe( gulp.dest(pkg.directories.css) )
  ;
  cb(err);
});

gulp.task('oldie',['postcss'], function () {
  var css = gulp.src(pkg.directories.css + '/*.css')
    .pipe(replace(/(\n)\s*\n/g, '$1'))
  ;

  var oldie = css.pipe(clone())
    .pipe(replace(/\/\*#.+?\*\//g, ''))
    .pipe(replace(/@media[^\{]+tty[^\{]+\{ (.+ \}) \}(\s*)/g, '$1$2'))
    .pipe(replace(/(@media[^\{]+device-pixel-ratio[^\{]+\{ [\s\S]+? \} \}\s*)/g, ''))
    .pipe(replace(/(@media screen) [^\{]+ \(max-width: \d+px\)( \{ [\s\S]+? \} \}\s*)/g, ''))
    .pipe(replace(/(@media screen) and \(.+?\)( \{ [\s\S]+? \} \}\s*)/g, '$1$2'))
    .pipe(replace(/-(moz|webkit)-[^\{]+?:.+?;\s*/g, ''))
    .pipe(replace(/(transition|border-[\S]*radius):.+?;\s*/g, ''))
    .pipe(replace(/opacity: 0;\s*/g, 'visibility: hidden; '))
    .pipe(replace(/opacity: 1;\s*/g, 'visibility: visible; '))
    .pipe(replace(/rgba(\(.+?),\s?[\d\.]+(\))/g, 'rgb$1$2'))
    .pipe(replace(/\s\S+\s?\{\s+\}/g, ''))
    .pipe(replace(/([\d\.]+)vw/g, function (regexMatches) {
      return Math.round(parseFloat(regexMatches[0]) * 10.24) + 'px'; // matches 1024px
    }))
    .pipe(replace(/([\d\.]+)vh/g, function (regexMatches) {
      return Math.round(parseFloat(regexMatches[0]) * 7.68) + 'px'; // matches 768 px
    }))
    .pipe(replace(/([\d\.]+)rem/g, function (regexMatches) {
      return Math.round(parseFloat(regexMatches[0]) * 12) + 'px'; // matches $fontsize-default
    }))
    .pipe( gulp.dest(pkg.directories.css + '/oldie') )
  ;

  return css
    .pipe(replace(/(@media[^\{]+tty[^\{]+\{ [\s\S]+? \} \}\s*)/g, ''))
    .pipe( gulp.dest(pkg.directories.css) )
    .pipe(livereload());
  ;
});

gulp.task('appcache', function(){
  gulp.src([
    pkg.directories.template + '/**/*',
    '!'+pkg.directories.template + '/*.html',
    '!'+pkg.directories.images + '/article*/*',
    '!'+pkg.directories.images + '/originals/*',
    '!'+pkg.directories.css + '/oldie/*'
  ])
  .pipe(appcache({
    //relativePath: pkg.directories.template,
    hash: true,
    preferOnline: true,
    filename: 'manifest.appcache',
    exclude: 'manifest.appcache'
  }))
  .pipe(gulp.dest(pkg.directories.template));
});

gulp.task('logo', function() {
  var logo = gulp.src(pkg.directories.images + '/logo.png');

  [
    {
      width: 32,
      height: 32,
      name: 'favicon.ico',
      directory: pkg.directories.template
    },{
      width: 96,
      height: 96,
      name: 'favicon-96x96.png',
      directory: pkg.directories.template
    },{
      width: 152,
      height: 152,
      name: 'apple-touch-icon-precomposed.png',
      directory: pkg.directories.template
    },{
      width: 196,
      height: 196,
      name: 'favicon-196x196.png',
      directory: pkg.directories.template
    },{
      width: 128,
      height: 128,
      name: 'tile-128x128.png',
      directory: pkg.directories.images
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

gulp.task('article_images', function() {
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

gulp.task('deploy_live', shell.task([
  pkg.directories.build + '/deploy.sh live'
]));
gulp.task('vagrant_up', shell.task([
  'cd ' + pkg.directories.build + '/vagrant && vagrant up && cd -'
]));
gulp.task('vagrant_suspend', shell.task([
  'cd ' + pkg.directories.build + '/vagrant && vagrant suspend && cd -'
]));

// Watch Files For Changes
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(['gulpfile.js','package.json'], process.exit);
  gulp.watch(pkg.directories.js_src + '/**/*.js', ['build-js']);
  gulp.watch(pkg.directories.sass + '/**/*.scss', ['build-sass']);
  gulp.watch(pkg.directories.images + '/logo.png', ['build-icons']);
  gulp.watch(pkg.directories.images + '/originals/*.jpg', ['build-article-images']);
});

// Default Task
gulp.task('default',     ['build-js','build-sass','build-icons']);
gulp.task('build-sass',  ['sass','postcss','oldie','appcache']);
gulp.task('build-js',    ['jshint','uglify','appcache']);
gulp.task('build-icons', ['logo','appcache']);
gulp.task('build-article-images',    ['article_images','appcache']);
