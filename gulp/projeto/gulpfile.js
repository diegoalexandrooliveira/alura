var gulp = require("gulp"),
  gulp_imgagemin = require("gulp-imagemin"),
  clean = require("gulp-clean"),
  // concat = require("gulp-concat"),
  // htmlReplace = require("gulp-html-replace"),
  uglify = require("gulp-uglify"),
  usemin = require("gulp-usemin"),
  cssmin = require("gulp-cssmin"),
  browse = require("browser-sync"),
  jshint = require("gulp-jshint"),
  jshintStylish = require("jshint-stylish"),
  csslint = require("gulp-csslint"),
  autoprefixer = require("gulp-autoprefixer"),
  less = require("gulp-less");

gulp.task("default", ["copy"], function() {
  gulp.start("build-img", "usemin");
});

gulp.task("clean", function() {
  return gulp.src("dist").pipe(clean());
});

gulp.task("copy", ["clean"], function() {
  return gulp.src("src/**/*").pipe(gulp.dest("dist"));
});

gulp.task("build-img", function() {
  gulp
    .src("dist/img/**/*")
    .pipe(gulp_imgagemin())
    .pipe(gulp.dest("dist/img"));
});

// gulp.task("build-js", function() {
//   gulp
//     .src(["dist/js/jquery.js", "dist/js/home.js", "dist/js/produto.js"])
//     .pipe(concat("all.js"))
//     .pipe(uglify())
//     .pipe(gulp.dest("dist/js"));
// });

// gulp.task("build-html", function() {
//   gulp
//     .src("dist/**/*.html")
//     .pipe(
//       htmlReplace({
//         js: "js/all.js"
//       })
//     )
//     .pipe(gulp.dest("dist"));
// });

gulp.task("usemin", function() {
  gulp
    .src("dist/**/*")
    .pipe(
      usemin({
        js: [uglify],
        css: [autoprefixer, cssmin]
      })
    )
    .pipe(gulp.dest("dist"));
});

gulp.task("server", function() {
  browse.init({
    server: {
      baseDir: "src"
      // proxy: "localhost:3000/"
    }
  });
  gulp.watch("src/js/*.js").on("change", function(event) {
    gulp
      .src(event.path)
      .pipe(jshint())
      .pipe(jshint.reporter(jshintStylish));
  });

  gulp.watch("src/css/*.css").on("change", function(event) {
    gulp
      .src(event.path)
      .pipe(csslint())
      .pipe(csslint.reporter());
  });

  gulp.watch("src/less/*").on("change", function(event) {
    console.log("Chamou o less");
    var stream = gulp
      .src(event.path)
      .pipe(
        less().on("error", function(erro) {
          console.log("LESS, erro compilação: " + erro.filename);
          console.log(erro.message);
        })
      )
      .pipe(gulp.dest("src/css"));
  });

  gulp.watch("src/**/*").on("change", browse.reload);
});
