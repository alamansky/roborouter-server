// dependencies
const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
var reload = browserSync.reload;

// path vars
const sassPath = "./public/sass/**/*.scss";
const cssPath = "./public/css/";
const htmlPath = "./public/**/*.pug";
const jsPath = "./public/js/*.js";

// dev server vars
const PORT = 3001;
const BASEDIR = "./public";

// sass task
gulp.task("sass", function() {
  return gulp
    .src(sassPath)
    .pipe(sass())
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(cssPath))
    .pipe(reload({ stream: true }));
});

// defaultask - call from terminal with `npx gulp`
// starts dev server then orders gulp to watch for changes to sass/html files
gulp.task("default", function() {
  browserSync.init({
    port: PORT,
    proxy: "http://localhost:3000/",
    reloadDelay: 1000
  });

  gulp.watch(sassPath, gulp.series("sass"));

  //gulp.watch(cssPath).on("change", reload);
  gulp.watch(htmlPath).on("change", reload);
  gulp.watch(jsPath).on("change", reload);
});
