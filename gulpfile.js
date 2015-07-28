var isDev = true;


var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var gulpif = require('gulp-if');
var rev = require('gulp-rev');
var del = require('del');
var inject = require('gulp-inject');


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


var injectToHtml = function () {
	var target = gulp.src('./index.html');
	var sources = gulp.src([jsBld + 'lib*.js', jsBld + 'app*.js', sassBld + 'app*.css'], { read: false });

	return target.pipe(inject(sources))
		.pipe(gulp.dest('./'));
};



gulp.task('js-app', function () {
	return gulp
		.src(jsAppSrc)
		.pipe(gulpif(isDev, sourcemaps.init()))
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(gulpif(!isDev, rev()))
		.pipe(gulpif(isDev, sourcemaps.write()))
		.pipe(gulp.dest(jsBld));
});

gulp.task('js-lib', function () {
	return gulp
		.src(jsLibSrc)
		.pipe(gulpif(isDev, sourcemaps.init()))
		.pipe(concat('lib.js'))
		.pipe(uglify())
		.pipe(gulpif(!isDev, rev()))
		.pipe(gulpif(isDev, sourcemaps.write()))
		.pipe(gulp.dest(jsBld));
});

gulp.task('sass', function () {
	return gulp
		.src(sassSrc)
		.pipe(gulpif(isDev, sourcemaps.init()))
		.pipe(sass({ outputStyle: 'compressed' })).on('error', console.log)
		.pipe(gulpif(!isDev, rev()))
		.pipe(gulpif(isDev, sourcemaps.write()))
		.pipe(gulp.dest(sassBld));
});

gulp.task('clean-build-folders', function (callback) {
	del([jsBld, sassBld], callback);
});


gulp.task('js-app-watcher', function () {
	gulp.watch(jsAppSrc, ['js-app']);
});

gulp.task('sass-app-watcher', function () {
	gulp.watch(sassSrcWatch, ['sass']);
});



gulp.task('default', ['clean-build-folders', 'js-app', 'js-lib', 'sass'], function () {
	// If we are in dev environment we do not revision js and css files, so do not need to modify html file
	if(isDev) { return; }
	injectToHtml();
});

gulp.task('reset-to-dev', ['clean-build-folders', 'js-app', 'js-lib', 'sass'], function () {
	// If isDev is true, after a !isDev build, we need to reset html file with non revisioned file references
	// Then we can keep running the small watch jobs that only keeps overwriting the non revisioned files
	injectToHtml();
});



gulp.task('watch', ['default', 'js-app-watcher', 'sass-app-watcher']);