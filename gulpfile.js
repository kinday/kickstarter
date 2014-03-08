var gulp = require('gulp'),
    jade = require('gulp-jade'),
    styl = require('gulp-stylus'),
    apfx = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    lint = require('gulp-jshint'),
    ugly = require('gulp-uglify'),
    imgo = require('gulp-imagemin');

gulp.task('html', function() {
  return gulp.src(['src/**/*.jade', '!src/**/*.inc.jade'])
    .pipe(jade())
    .pipe(gulp.dest('out'));
  });

gulp.task('css', function() {
  return gulp.src(['src/**/*.styl', '!src/**/*.inc.styl'])
    .pipe(styl({urlFunc: ['uri']}))
    .pipe(apfx('last 2 version', 'ie 8', 'ie 9'))
    .pipe(csso())
    .pipe(gulp.dest('out'));
  });

gulp.task('js', function() {
  return gulp.src('src/**/*.js')
    .pipe(lint())
    .pipe(lint.reporter('default'))
    .pipe(ugly())
    .pipe(gulp.dest('out'));
  });

gulp.task('img', function() {
  return gulp.src(['src/**/*.{gif,jpg,png}', '!src/**/uri-*.{gif,jpg,png}'])
    .pipe(imgo())
    .pipe(gulp.dest('out'));
  });

gulp.task('pass', function() {
  return gulp.src('src/**/*.{php,svg}')
    .pipe(gulp.dest('out'));
  });

gulp.task('watch', function() {
  gulp.watch('src/**/*.jade', ['html']);
  gulp.watch('src/**/*.styl', ['css']);
  gulp.watch('src/**/*.js', ['js']);
  gulp.watch('src/**/*.{gif,jpg,png}', ['img']);
  gulp.watch('src/**/*.{php,svg}', ['pass']);
  });

gulp.task('default', ['html', 'css', 'js', 'img', 'pass', 'watch']);