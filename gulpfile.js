var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var gulpif = require('gulp-if');
var rev = require('gulp-rev');
var del = require('del');
var inject = require('gulp-inject');
var argv = require('yargs').argv;


var isProduction = (argv.prod) ? (true) : (false);


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
		.pipe(gulpif(!isProduction, sourcemaps.init()))
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(gulpif(isProduction, rev()))
		.pipe(gulpif(!isProduction, sourcemaps.write()))
		.pipe(gulp.dest(jsBld));
});

gulp.task('js-lib', function () {
	return gulp
		.src(jsLibSrc)
		.pipe(gulpif(!isProduction, sourcemaps.init()))
		.pipe(concat('lib.js'))
		.pipe(uglify())
		.pipe(gulpif(isProduction, rev()))
		.pipe(gulpif(!isProduction, sourcemaps.write()))
		.pipe(gulp.dest(jsBld));
});

gulp.task('sass', function () {
	return gulp
		.src(sassSrc)
		.pipe(gulpif(!isProduction, sourcemaps.init()))
		.pipe(sass({ outputStyle: (!isProduction) ? ('expanded') : ('compressed') })).on('error', console.log)
		.pipe(autoprefixer({ browsers: ['last 3 versions', 'Firefox < 29'] }))
		.pipe(gulpif(isProduction, rev()))
		.pipe(gulpif(!isProduction, sourcemaps.write()))
		.pipe(gulp.dest(sassBld));
});

gulp.task('clean-build-folders', function () {
	del.sync([jsBld, sassBld]);
});


gulp.task('js-app-watcher', function () {
	gulp.watch(jsAppSrc, ['js-app']);
});

gulp.task('sass-app-watcher', function () {
	gulp.watch(sassSrcWatch, ['sass']);
});



gulp.task('default', ['clean-build-folders', 'js-app', 'js-lib', 'sass'], function () {
	// If we are in dev environment we do not revision js and css files, so do not need to modify html file on every build
	// However this approach leads to having to use the reset job bellow, after a production build, to reset references to non revisioned
	if(!isProduction) { return; }
	injectToHtml();
});

gulp.task('reset-to-dev', ['clean-build-folders', 'js-app', 'js-lib', 'sass'], function () {
	// If isProduction is false, after a isProduction build, we need to reset html file with non revisioned file references
	// Then we can keep running the small watch jobs that only keeps overwriting the non revisioned files
	injectToHtml();
});



gulp.task('watch', ['default', 'js-app-watcher', 'sass-app-watcher']);