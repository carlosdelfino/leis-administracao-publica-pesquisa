const gulp = require('gulp');
const del = require('del');
const exec = require('child_process').exec;
const gulpLoadPlugins = require('gulp-load-plugins');
//const gulpGitbook = require('gulp-gitbook');
 
const $ = gulpLoadPlugins();

gulp.task('copy-pdf', function () {
  return gulp.src('./book.pdf')
    .pipe(gulp.dest('./_book'));
});

gulp.task('copy-moby', function () {
  return gulp.src('./book.moby')
    .pipe(gulp.dest('./_book'));
});

gulp.task('clean', function () {
  return del(['_book/**', '_book/.*', '!_book'], {
    force: true
  });
});

// Publishes the site to GitHub Pages
gulp.task('gh-pages', () => {
  console.log('Publishing to GH Pages');
  return gulp.src('./_book/**/*')
    .pipe($.ghPages({
      origin: 'origin',
      branch: 'gh-pages'
    }));
});

gulp.task('build-web', function (callback) {
  // In gulp 4, you can return a child process to signal task completion
  exec('gitbook build', function (err, stdout, stderr) {
    console.log("Building Book WebSite")
    console.log(stdout);
    console.log(stderr);
    console.log("Finish Building Book WebSite");
    callback();
  });
});
gulp.task('build-pdf', function (callback) {
  // In gulp 4, you can return a child process to signal task completion
  exec('gitbook pdf', function (err, stdout, stderr) {
    console.log("Building Book PDF")
    console.log(stdout);
    console.log(stderr);
    console.log("Finish Building Book PDF");
    callback();
  });
});

gulp.task('build-web2', function (cb) {
//  gulpGitbook('website',cb);
});

gulp.task('publish', gulp.series('copy-pdf', 'gh-pages'));

