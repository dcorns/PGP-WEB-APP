/**
 * gulpfile
 * Created by dcorns on 8/9/15.
 */
'use strict';

var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var connect = require('gulp-connect');
var glob = require('glob');
var webpack = require('gulp-webpack');
var karma = require('gulp-karma');

gulp.task('connect', function(){
  connect.server({
    root:'build',
    port: '5000'
    });
});

gulp.task('webpack', function(){
  return gulp.src(glob.sync('app/js/**/*.js'))
    .pipe(webpack({
      output:{
        filename: 'bundle.js'
      }
    }))
      .pipe(gulp.dest('./build'));
});

gulp.task('webpackTests', function(){
  return gulp.src(glob('app/test/**/*._test.js'))
    .pipe(webpack({
      output: {
        filename: 'testmain.js'
      }
    }))
    .pipe(gulp.dest('./app/test'));
});

gulp.task('watch', function(){
  gulp.watch('app/**/*.js', ['webpack']);
  gulp.watch('sass/**/*.sass', ['sass']);
});

gulp.task('sass', function(){
return sass(glob.sync('sass/**/*.sass'))
  .pipe(gulp.dest('./build/css/'))
});

gulp.task('angularTest', ['webpackTests'], function(){
return gulp.src(['test/testmain.js'])
  .pipe(karma({
    configfile: 'karma.conf.js',
    action: 'run'
  }));
});

gulp.task('default', ['connect', 'watch']);
gulp.task('unitTests', ['webpackTests', 'angularTests']);