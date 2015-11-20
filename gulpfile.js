/**
 * Created by tcstory on 11/12/15.
 */


var gulp = require('gulp');
var del = require('del');



gulp.task('clear', function () {
   return del('build/')
});

gulp.task('step1', function () {
   return gulp.src('src/**/*')
       .pipe(gulp.dest('build/'))
});

gulp.task('build',['step1'], function () {

});
