const gulp = require('gulp')
const plumber = require('gulp-plumber')
const pug = require('gulp-pug')
const config = require('../config')

module.exports = function pug2html() {
  return gulp.src('src/pages/*.pug')
    .pipe(plumber())
    .pipe(pug({ pretty: config.pug2html.beautifyHtml }))
    .pipe(gulp.dest('build'))
}

