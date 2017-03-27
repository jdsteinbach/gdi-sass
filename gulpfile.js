(function() {
  'use strict';

  /* Required packages */
  var gulp        = require('gulp');
  var glob        = require('glob');
  var browserSync = require('browser-sync');
  var reload      = browserSync.reload;
  var sass        = require('gulp-sass');
  var sourcemaps  = require('gulp-sourcemaps');

  /* Environment variables */
  var _src_dir  = 'src/';
  var _scss_dir = _src_dir + 'scss/';
  var _css_dir  = _src_dir + 'css/'

  gulp.task('sass', function() {
    gulp.src(_scss_dir + 'styles.scss')
      .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'expanded'}))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(_css_dir))
      .pipe(reload({stream: true}));
  });

  gulp.task('watch', ['sass'], function() {
    browserSync({
      server: 'src/',
      port: '5000'
    });
    gulp.watch(_scss_dir + '**/*.scss', ['sass']);
    gulp.watch(_src_dir + '**/*.html').on('change', reload);
  });
}());