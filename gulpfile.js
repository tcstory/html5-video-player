/**
 * Created by tcstory on 11/12/15.
 */


var gulp = require('gulp');
var del = require('del');
var webpack = require('webpack');
var gulpWebpack = require('gulp-webpack');



gulp.task('clear', function () {
   return del('build/')
});

gulp.task('step1', function () {
   return gulp.src('')
       .pipe(gulpWebpack(require('./webpack.config.js'),webpack))
       .pipe(gulp.dest('build/'));
});

gulp.task('step2', ['step1'], function () {
   return gulp.src('build/fonts/*')
       .pipe(gulp.dest('build/css/fonts/'))
});

gulp.task('step3', ['step2'], function () {
   return del('build/fonts/')
});

gulp.task('build',['step1', 'step2', 'step3'], function () {

});
