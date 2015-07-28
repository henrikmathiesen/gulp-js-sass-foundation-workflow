var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('hello-world', function () {
	console.log('Our very first Gulp task!');
});

gulp.task('js-app', function () {
	return gulp
		.src([
			'./js/src/jsfile01.js',
			'./js/src/jsfile02.js'
		])
		.pipe(sourcemaps.init())
		.pipe(concat('app.js'))
		.pipe(gulp.dest('./js/bld/'))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./js/bld/'));
});

gulp.task('js-lib', function () {
	return gulp
		.src([
			'./bower_components/foundation/js/vendor/jquery.js',
			'./bower_components/foundation/js/vendor/fastclick.js',
			'./bower_components/foundation/js/foundation/foundation.js'
		])
		.pipe(sourcemaps.init())
		.pipe(concat('lib.js'))
		.pipe(gulp.dest('./js/bld/'))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./js/bld/'));
});


gulp.task('default', ['js-app', 'js-lib']);