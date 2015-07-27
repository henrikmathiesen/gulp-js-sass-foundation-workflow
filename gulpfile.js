var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');


gulp.task('hello-world', function(){
	console.log('Our very first Gulp task!');
});

gulp.task('js', function() {
  return gulp
  	.src([
		  './js/src/jsfile01.js', 
		  './js/src/jsfile02.js'
		 ])
	.pipe(concat('app.js'))
	.pipe(gulp.dest('./js/bld/'))
	.pipe(uglify())
    .pipe(gulp.dest('./js/bld/'));
});