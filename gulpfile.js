var gulp = require('gulp'),
    jade = require('gulp-jade'),
    styl = require('gulp-stylus'),
    apfx = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    lint = require('gulp-jshint'),
    ugly = require('gulp-uglify'),
    imgo = require('gulp-imagemin')
    srcs = {
      html: ['src/**/*.jade', '!src/**/*.inc.jade'],
      styl: ['src/**/*.styl', '!src/**/*.inc.styl'],
      js: 'src/**/*.js',
      img: ['src/**/*.{gif,jpg,png}', '!src/**/uri-*.{gif,jpg,png}'],
      pass: ['src/**/*.{php,svg}', 'src/**/.htaccess']
      };

gulp.task('html', function() {
  return gulp.src(srcs.html)
    .pipe(jade())
    .pipe(gulp.dest('out'));
  });

gulp.task('css', function() {
  return gulp.src(srcs.styl)
    .pipe(styl({urlFunc: ['uri']}))
    .pipe(apfx('last 2 version', 'ie 8', 'ie 9'))
    .pipe(csso())
    .pipe(gulp.dest('out'));
  });

gulp.task('js', function() {
  return gulp.src(srcs.js)
    .pipe(lint())
    .pipe(lint.reporter('default'))
    .pipe(ugly())
    .pipe(gulp.dest('out'));
  });

gulp.task('img', function() {
  return gulp.src(srcs.img)
    .pipe(imgo())
    .pipe(gulp.dest('out'));
  });

gulp.task('pass', function() {
  return gulp.src(srcs.pass)
    .pipe(gulp.dest('out'));
  });

gulp.task('watch', function() {
  gulp.watch(srcs.html, ['html']);
  gulp.watch(srcs.styl, ['css']);
  gulp.watch(srcs.js, ['js']);
  gulp.watch(srcs.img, ['img']);
  gulp.watch(srcs.pass, ['pass']);
  });

gulp.task('default', ['html', 'css', 'js', 'img', 'pass', 'watch']);