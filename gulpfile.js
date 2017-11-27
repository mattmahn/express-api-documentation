const babel = require('gulp-babel')
const gulp = require('gulp')
const sourcemaps = require('gulp-sourcemaps')

gulp.task('babel', () => {
  return gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('.dist'))
})

gulp.task('default', ['babel'])
