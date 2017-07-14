const lessToScss = require("gulp-less-to-scss");
const gulp = require("gulp");
const gutil = require("gulp-util");
const plugins = require("gulp-load-plugins")({
  rename: {
    "gulp-live-server": "serve"
  }
});
const sass = require('gulp-sass');

gulp.task("default", ["watch"]);

gulp.task("build-css-from-less", function() {
  return gulp
    .src("src/less/*.less")
    .pipe(plugins.plumber())
    .pipe(plugins.less())
    .on("error", function(err) {
      gutil.log(err);
      this.emit("end");
    })
    .pipe(
      plugins.autoprefixer({
        browsers: [
          "> 1%",
          "last 2 versions",
          "firefox >= 4",
          "safari 7",
          "safari 8",
          "IE 8",
          "IE 9",
          "IE 10",
          "IE 11"
        ],
        cascade: false
      })
    )
    .pipe(gulp.dest("build/css"))
    .on("error", gutil.log);
});

gulp.task("build-css-from-scss", function() {
  return gulp
    .src("src/scss/*.scss")
    .pipe(plugins.plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(
      plugins.autoprefixer({
        browsers: [
          "> 1%",
          "last 2 versions",
          "firefox >= 4",
          "safari 7",
          "safari 8",
          "IE 8",
          "IE 9",
          "IE 10",
          "IE 11"
        ],
        cascade: false
      })
    )
    .pipe(gulp.dest("build/css"))
    .on("error", gutil.log);
});

gulp.task("lessToScss", function() {
  gulp
    .src("src/less/**/*.less")
    .pipe(lessToScss())
    .pipe(gulp.dest("src/scss"));
});

gulp.task("watch", function() {
  gulp.watch("src/less/**/*.less", ["build-css-from-less"]);
});
