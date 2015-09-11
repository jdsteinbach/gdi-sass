(function() {
  'use strict';

  /* Required packages */
  var gulp        = require('gulp');
  var glob        = require('glob');
  var browserSync = require('browser-sync');
  var reload      = browserSync.reload;
  var sass        = require('gulp-sass');
  var sourcemaps  = require('gulp-sourcemaps');
  var reveal      = require('gulp-reveal');
  var markdown    = require('gulp-markdown');

  /* Environment variables */
  var _src_dir  = 'css/';

  gulp.task('sass', function() {
    gulp.src(_src_dir + 'reveal.scss')
      .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'expanded'}))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(_src_dir))
      .pipe(reload({stream: true}));
  });

  gulp.task('md', function() {
    gulp.src('index.md')
      .pipe(markdown())
      .pipe(reveal({
        title: 'From Zero to Sassy in 2 Sessions',
        author: 'James Steinbach',
        description: 'Getting started with Sass',
        analytics: 'UA-43397146-5'
      }))
      .pipe(gulp.dest('.'))
      .pipe(reload({stream: true}));
  });

  gulp.task('serve', function() {
    browserSync({
      server: '.',
      port: '4040'
    });
  });

  gulp.task('watch', ['md', 'sass', 'serve'], function() {
    gulp.watch(_src_dir + '**/*.scss', ['sass']);
    gulp.watch('**/*.{html,js}').on('change', reload);
    gulp.watch('**/*.{md,mustache}', ['md']);
  });
}());