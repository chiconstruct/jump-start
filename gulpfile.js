var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var runSequence = require('run-sequence');

//Tasks
//Convert scss to css
gulp.task('sass', function(){
	return gulp.src('app/scss/**/*.scss') //Get all files with .scss type
	.pipe(sass()) //Convert scss to css with gulp-sass
	.pipe(gulp.dest('app/css')) //Output css file to css folder
	.pipe(browserSync.reload({ //To update browser whenever sass task is ran
		stream: true
	}))
})
//update browser as files change
gulp.task('watch', ['browserSync', 'sass'], function(){
	gulp.watch('app/scss/**/*.scss', ['sass']);
	//Reload the browser whenever HTML or JS files change
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
})

gulp.task('browserSync', function(){
	browserSync.init({
		server: {
			baseDir: 'app'
		},
	})
})
//Link different css files
gulp.task('useref', function(){
	return gulp.src('app/*.html')
		.pipe(useref())
		.pipe(gulp.dest('dist'))
})

gulp.task('useref', function(){
	return gulp.src('app/*.html')
		.pipe(useref())
		// Minifies only if it's a css file
		.pipe(gulpIf('*.css', cssnano()))
		.pipe(gulp.dest('dist'))
})

gulp.task('default', function(callback){
	runSequence(['sass', 'browserSync', 'watch'], callback)
})

gulp.task('build', function(callback){
	runSequence(['sass', 'useref'], callback)
})
