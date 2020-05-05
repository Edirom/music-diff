const gulp = require('gulp')
const zip = require('gulp-zip')
const replace = require('gulp-replace')
const dateformat = require('dateformat')
const bump = require('gulp-bump')
const newer = require('gulp-newer')
const fs = require('fs')
const git = require('git-rev-sync')

const packageJson = require('./package.json')

// bump version on patch level
gulp.task('bump-patch', function () {
  return gulp.src(['./package.json'])
    .pipe(bump({ type: 'patch' }))
    .pipe(gulp.dest('./'))
})

// bump version on minor level
gulp.task('bump-minor', function () {
  return gulp.src(['./package.json'])
    .pipe(bump({ type: 'minor' }))
    .pipe(gulp.dest('./'))
})

// bump version on major level
gulp.task('bump-major', function () {
  return gulp.src(['./package.json'])
    .pipe(bump({ type: 'major' }))
    .pipe(gulp.dest('./'))
})

// reading from fs as this prevents caching problems
function getPackageJsonVersion () {
  return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version
}

// handles verovio
gulp.task('verovio', function () {
  return gulp.src('./data/**/*')
    .pipe(newer('./build/content/'))
    .pipe(gulp.dest('./build/content/'))
})

gulp.task('dist', function () {
  const git = getGitInfo()

  return gulp.src('./build/**/*')

    .pipe(replace('$$git-url$$', git.url))
    .pipe(replace('$$git-short$$', git.short))
    .pipe(replace('$$git-dirty$$', git.dirty))

    .pipe(zip(packageJson.name + '-' + getPackageJsonVersion() + '.xar'))
    .pipe(gulp.dest('./dist'))
})
