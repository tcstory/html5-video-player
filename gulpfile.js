/**
 * Created by tcstory on 11/12/15.
 */


var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var del = require('del');



gulp.task('clear', function () {
   return del('build/')
});

gulp.task('js', function () {
   return gulp.src('src/js/*.js')
       .pipe(uglify())
       .pipe(rev())
       .pipe(gulp.dest('build/js/'))
       .pipe(rev.manifest())
       .pipe(gulp.dest('build/rev/js'))
});
gulp.task('css', function () {
   return gulp.src('src/css/*.css')
       .pipe(minifyCss())
       .pipe(rev())
       .pipe(gulp.dest('build/css/'))
       .pipe(rev.manifest())
       .pipe(gulp.dest('build/rev/css'))
});
gulp.task('rev', ['js','css'], function () {
    return gulp.src(['build/rev/**/*.json', 'src/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('build/'));
});

gulp.task('build',['js', 'css', 'rev'], function () {
    gulp.src('src/bower_components/vue/dist/vue.min.js')
        .pipe(gulp.dest('build/bower_components/vue/dist/'))
});
