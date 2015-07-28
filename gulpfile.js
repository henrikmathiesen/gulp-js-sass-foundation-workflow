var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var gulpif = require('gulp-if');


var jsAppSrc = [
	'./js/src/jsfile01.js',
	'./js/src/jsfile02.js'
];

var jsLibSrc = [
	'./bower_components/foundation/js/vendor/jquery.js',
	'./bower_components/foundation/js/vendor/fastclick.js',
	'./bower_components/foundation/js/foundation/foundation.js'
];

var sassSrc = './sass/src/app.scss';
var sassSrcWatch = './sass/src/**/*.scss';
var jsBld = './js/bld/';
var sassBld = './sass/bld/';

var isDev = true;


gulp.task('js-app', function () {
	return gulp
		.src(jsAppSrc)
		.pipe(gulpif(isDev, sourcemaps.init()))
		.pipe(concat('app.js'))
		.pipe(gulp.dest(jsBld))
		.pipe(uglify())
		.pipe(gulpif(isDev, sourcemaps.write()))
		.pipe(gulp.dest(jsBld));
});

gulp.task('js-lib', function () {
	return gulp
		.src(jsLibSrc)
		.pipe(gulpif(isDev, sourcemaps.init()))
		.pipe(concat('lib.js'))
		.pipe(gulp.dest(jsBld))
		.pipe(uglify())
		.pipe(gulpif(isDev, sourcemaps.write()))
		.pipe(gulp.dest(jsBld));
});

gulp.task('sass', function () {
	return gulp
		.src(sassSrc)
		.pipe(gulpif(isDev, sourcemaps.init()))
		.pipe(sass({ outputStyle: 'compressed' }))
		.pipe(gulpif(isDev, sourcemaps.write()))
		.pipe(gulp.dest(sassBld));
});


gulp.task('js-app-watcher', function () {
	gulp.watch(jsAppSrc, ['js-app']);
});

gulp.task('sass-app-watcher', function(){
	gulp.watch(sassSrcWatch, ['sass']);
});


gulp.task('default', ['js-app', 'js-lib', 'sass']);
gulp.task('watch', ['js-app', 'js-lib', 'sass', 'js-app-watcher', 'sass-app-watcher']);