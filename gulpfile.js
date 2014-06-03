var gulp = require('gulp'),
    util = require('gulp-util'),

    jade = require('gulp-jade'),
    beml = require('gulp-beml'),

    styl = require('gulp-stylus'),
    apfx = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),

    imgo = require('gulp-imagemin'),

    lvrl = require('gulp-livereload'),
    emlr = require('gulp-embedlr')
    srvr = require('tiny-lr')(),

    srcs = {
      html: ['src/**/*.jade', '!src/**/*.inc.jade', '!src/**/*.layout.jade'],
      css: ['src/**/*.styl', '!src/**/*.inc.styl'],
      coffee: ['src/js/**/*.coffee'],
      js: ['src/js/**/*.js'],
      img: ['src/**/*.{gif,jpg,png}'],
      pass: ['src/**/*.{html,css,svg,woff}']
      };

gulp.task('html', function() {
  return gulp.src(srcs.html)
    .pipe(jade({pretty: true}))
    .pipe(beml())
    .pipe(emlr({
      src: "' + 'http://localhost' + ':35729/livereload.js"
      }))
    .pipe(gulp.dest('out'))
    .pipe(lvrl(srvr));
  });

gulp.task('css', function() {
  return gulp.src(srcs.css)
    .pipe(styl({urlFunc: ['uri']}))
    .pipe(apfx('last 2 version', 'ie 8', 'ie 9'))
    .pipe(csso())
    .pipe(gulp.dest('out'))
    .pipe(lvrl(srvr));
  });

gulp.task('coffee', function() {
  return gulp.src(srcs.coffee)
    .pipe(gulp.dest('out'))
    .pipe(lvrl(srvr));
  });

gulp.task('js', function() {
  return gulp.src(srcs.js)
    .pipe(gulp.dest('out'))
    .pipe(lvrl(srvr));
  });

gulp.task('img', function() {
  return gulp.src(srcs.img)
    .pipe(imgo())
    .pipe(gulp.dest('out'))
    .pipe(lvrl(srvr));
  });

gulp.task('pass', function() {
  return gulp.src(srcs.pass)
    .pipe(gulp.dest('out'))
    .pipe(lvrl(srvr));
  });

gulp.task('lr', function() {
  srvr.listen(35729, function(err){
    if(err)
      return console.log(err);
    });
  });

gulp.task('watch', function() {
  gulp.watch(srcs.html, ['html']);
  gulp.watch(srcs.css, ['css']);
  gulp.watch(srcs.coffee, ['coffee']);
  gulp.watch(srcs.js, ['js']);
  gulp.watch(srcs.img, ['img']);
  gulp.watch(srcs.pass, ['pass']);
  });

gulp.task('default', ['html', 'css', 'coffee', 'js', 'img', 'pass', 'lr', 'watch']);