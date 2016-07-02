'use strict';
import browserSync from 'browser-sync';
import gulp from 'gulp';
import jade from 'gulp-jade';
import cleanCss from 'gulp-clean-css';
import sass from 'gulp-sass';
import pug from 'pug';

let server;

function reload() {
	if (server)
		server.reload();
}

gulp.task('style', () => {
	gulp.src('./assets/scss/**/*.scss')
		.pipe(sass())
		.pipe(cleanCss())
		.pipe(gulp.dest('./public/css'))
		.on('end', reload);
});

gulp.task('page', () => {
	gulp.src('./assets/pages/**/*.jade')
		.pipe(jade())
		.pipe(gulp.dest('./public'))
		.on('end', reload);
});

gulp.task('image', () => {
	gulp.src('./assets/images/**/*.*')
		.pipe(gulp.dest('./public/images'))
		.on('end', reload);
});

gulp.task('server', () => {
	server = browserSync.create();
	server.init({
		server: './public',
		port: 3000,
		open: false
	});
});

gulp.task('watch', () => {
	gulp.watch([
		'./assets/scss/**/*.scss'
	], ['style']);

	gulp.watch([
		'./assets/pages/**/*.jade',
		'./assets/layouts/**/*.jade'
	], ['page']);
});

gulp.task('build', ['page', 'style', 'image']);

gulp.task('dev', ['build', 'server', 'watch']);
