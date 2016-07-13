'use strict';
import browserSync from 'browser-sync';
import gulp from 'gulp';
import jade from 'gulp-jade';
import cleanCss from 'gulp-clean-css';
import sass from 'gulp-sass';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import babelify from 'babelify';
import {log} from 'gulp-util';
import streamify from 'gulp-streamify';
import uglify from 'gulp-uglify';

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

gulp.task('js', () => {
  browserify({
    entries: './assets/js/app.js',
    extensions: ['.js'],
    debug: true
  })
    .require('jquery', {expose: 'jQuery'})
    .transform(babelify.configure())
    .bundle()
    .on('error', log)
    .pipe(source('app.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('./public'))
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

	gulp.watch([
		'./assets/js/**/*.js'
	], ['js']);
});

gulp.task('build', ['page', 'style', 'image', 'js']);

gulp.task('dev', ['build', 'server', 'watch']);
