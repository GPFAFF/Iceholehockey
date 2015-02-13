
// Load plugins
var gulp = require('gulp'),
sass = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
minifycss = require('gulp-minify-css'),
jshint = require('gulp-jshint'),
uglify = require('gulp-uglify'),
imagemin = require('gulp-imagemin'),
rename = require('gulp-rename'),
concat = require('gulp-concat'),
notify = require('gulp-notify'),
cache = require('gulp-cache'),
livereload = require('gulp-livereload'),
del = require('del');
 
// Styles
gulp.task('styles', function() {
return gulp.src('src/styles/main.scss')
.pipe(sass({ style: 'expanded', }))
.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
.pipe(gulp.dest('./build/styles'))
.pipe(rename({ suffix: '.min' }))
.pipe(minifycss())
.pipe(gulp.dest('./build/styles/'))
.pipe(notify({ message: 'Styles task complete' }));
});
 
// Scripts
gulp.task('scripts', function() {
return gulp.src('src/js/**/*.js')
.pipe(jshint('.jshintrc'))
.pipe(jshint.reporter('default'))
.pipe(concat('main.js'))
.pipe(gulp.dest('./build/js'))
.pipe(rename({ suffix: '.min' }))
.pipe(uglify())
.pipe(gulp.dest('./build/js'))
.pipe(notify({ message: 'Scripts task complete' }));
});
 
// Images
gulp.task('images', function() {
return gulp.src('src/img/**/*')
.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
.pipe(gulp.dest('./build/img'))
.pipe(notify({ message: 'Images task complete' }));
});
 
// Clean
gulp.task('clean', function(cb) {
del(['src/styles/', 'src/js/', 'src/img/'], cb)
});
 
// Default task
gulp.task('default', ['clean'], 'livereload', 'images', 'scripts', 'styles', function() {
gulp.start('styles', 'scripts', 'images');
});
 
// Watch
gulp.task('watch', function() {
 
// Watch .scss files
gulp.watch('src/styles/**/*.scss', ['styles']);
 
// Watch .js files
gulp.watch('src/scripts/**/*.js', ['scripts']);
 
// Watch image files
gulp.watch('src/images/**/*', ['images']);
 
// Create LiveReload server
livereload.listen();
 
// Watch any files in dist/, reload on change
gulp.watch(['src/**']).on('change', livereload.changed);
 
}); 