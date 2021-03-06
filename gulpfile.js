var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var stripDebug = require('gulp-strip-debug');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var gulpif = require('gulp-if');
var rev = require('gulp-rev');
var del = require('del');
var inject = require('gulp-inject');
var argv = require('yargs').argv;


var isProduction = (argv.prod) ? (true) : (false);
var resetinject = (argv.resetinject) ? (true) : (false);


var jsAppSrc = [
	'./js/src/global.js',
	'./js/src/ajax-cache-service.js',
	'./js/src/pub-sub/event-bus-service.js',
	'./js/src/mustache-templates/event-mustache-template.js',
	'./js/src/first-words-strong-directive.js',
	'./js/src/truncate-at-char-directive.js',
	'./js/src/truncate-at-word-directive.js',
	'./js/src/render-ajax-content-directive.js',
    './js/src/jquery-timer-tools.js',
	'./js/src/cut-and-copy-command.js',
	'./js/src/pub-sub/publisher.js',
	'./js/src/pub-sub/listener01.js',
	'./js/src/pub-sub/listener02.js'
];

var jsLibSrc = [
	'./bower_components/foundation/js/vendor/jquery.js',
	'./bower_components/foundation/js/vendor/fastclick.js',
	'./bower_components/foundation/js/foundation/foundation.js',
	'./bower_components/foundation/js/foundation/foundation.equalizer.js',
	'./bower_components/mustache/mustache.min.js',
    './bower_components/jquery.timer-tools/jquery.timer-tools.min.js'
];

var sassSrc = './sass/src/app.scss';
var sassSrcWatch = './sass/src/**/*.scss';
var jsBld = './js/bld/';
var sassBld = './sass/bld/';

var injectSources = [
	jsBld + 'lib*.js', 
	jsBld + 'app*.js', 
	sassBld + 'app*.css'
];


var injectToHtml = function () {

	var sourcesToInject = gulp.src(injectSources, { read: false });

	var injectToIndexView = function(){
		var indexTarget = gulp.src('./index.html');
		
		return indexTarget
					.pipe(inject(sourcesToInject))
					.pipe(gulp.dest('./')); 
	};

	var injectToRestOfviews = function(){
		var restOfViewsTarget = gulp.src('./views/*.html');
		
		return restOfViewsTarget
					.pipe(inject(sourcesToInject))
					.pipe(gulp.dest('./views/'));
	};
	
	injectToIndexView();
	injectToRestOfviews();		

};

gulp.task('js-app', function () {
	return gulp
		.src(jsAppSrc)
		.pipe(gulpif(!isProduction, sourcemaps.init()))
		.pipe(concat('app.js'))
		.pipe(gulpif(isProduction, stripDebug()))
        .pipe(gulpif(isProduction, uglify()))
		.pipe(gulpif(isProduction, rev()))
		.pipe(gulpif(!isProduction, sourcemaps.write()))
		.pipe(gulp.dest(jsBld));
});

gulp.task('js-lib', function () {
	return gulp
		.src(jsLibSrc)
		.pipe(gulpif(!isProduction, sourcemaps.init()))
		.pipe(concat('lib.js'))
		.pipe(gulpif(isProduction, uglify()))
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

//
// Main Tasks

gulp.task('default', ['clean-build-folders', 'js-app', 'js-lib', 'sass'], function () {
	// If we are in dev environment we do not revision js and css files, so do not need to modify html file on every build
	// However this approach leads to having to use the reset, after a production build, to reset references to non revisioned
	if (!isProduction && !resetinject) { return; }
	injectToHtml();
});

gulp.task('watch', ['default', 'js-app-watcher', 'sass-app-watcher']);