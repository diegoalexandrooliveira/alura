var gulp = require("gulp"),
  gulp_imgagemin = require("gulp-imagemin");

gulp.task("build-img", function() {
  gulp
    .src("src/img/**/*")
    .pipe(gulp_imgagemin())
    .pipe(gulp.dest("src/img"));
});
