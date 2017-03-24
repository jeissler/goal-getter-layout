var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browser = require('browser-sync');

var sassPaths = [
    'bower_components/foundation-sites/scss',
    //'bower_components/motion-ui/src'
];

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function () {

    browser.init({
        server: "./"
    });
});

gulp.task('sass', function () {
    return gulp.src('scss/app.scss')
        .pipe($.sass({
                includePaths: sassPaths
            })
            .on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(gulp.dest('css'))
        .pipe(browser.stream());
});

gulp.task('default', ['sass', 'serve'], function () {
    gulp.watch(['scss/**/*.scss'], ['sass']);
    gulp.watch("*.html").on('change', browser.reload);
});
