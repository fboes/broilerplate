// Include gulp
var gulp = require('gulp'),
    fs = require('fs'),
    pkg = JSON.parse(fs.readFileSync('./package.json'))
    beep = require('beepbeep'),
    onError = function (err) { beep(); }
;

// Include Our Plugins
var jshint = require('gulp-jshint'),
    //sass = require('gulp-sass'),
    sass    = require('gulp-ruby-sass'),
    uglify = require('gulp-uglify'),
    postcss    = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require("gulp-rename"),
    replace = require('gulp-replace')
    clone = require('gulp-clone'),
    livereload = require('gulp-livereload'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    appcache = require('gulp-appcache')
;

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
            undef:true
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
    return sass(pkg.directories.sass + '/**/*.scss', {style: 'compact'})
        .on('error', sass.logError)
        .pipe(plumber({errorHandler: onError}))
        .pipe(gulp.dest(pkg.directories.css))
    ;
    cb(err);
});

// PostCSS
gulp.task('postcss',['sass'], function (cb) {
    return gulp.src(pkg.directories.css + '/styles.css')
        .pipe( postcss([ require('autoprefixer')({browsers: ['last 2 versions', '> 5%', 'ie 8', 'ie 9']})]) )
        .pipe( gulp.dest(pkg.directories.css) )
        .pipe( postcss([ require('rtlcss')]) )
        .pipe(rename('rtl.css'))
        .pipe( gulp.dest(pkg.directories.css) )
    ;
    cb(err);
});

gulp.task('oldie',['postcss'], function () {
    var css = gulp.src(pkg.directories.css + '/*.css');

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
        .pipe(replace(/(rgba\(.+?),\s?[\d\.]+(\))/g, '$1$2'))
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

// Watch Files For Changes
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(pkg.directories.js_src + '/**/*.js', ['build-js']);
    gulp.watch(pkg.directories.sass + '/**/*.scss', ['build-sass']);
});

// Default Task
gulp.task('default',     ['build-js','build-sass']);
gulp.task('build-sass',  ['sass','postcss','oldie','appcache']);
gulp.task('build-js',    ['jshint','uglify','appcache']);
