// dependencies
const gulp = require("gulp");
const browserSync = require("browser-sync").create();
var reload = browserSync.reload;

// path vars
const cssPath = "./public/css/*.css";
const htmlPath = "./public/*.pug";
const jsPath = "./public/js/*.js";

// dev server vars
const PORT = 3001;
const BASEDIR = "./public";

/* // dev server task
gulp.task("serve", function() {
  browserSync.init({
    server: "./public"
  });
}); */

// defaultask - call from terminal with `npx gulp`
// starts dev server then orders gulp to watch for changes to sass/html files
gulp.task("default", function() {
  browserSync.init({
    port: PORT,
    proxy: "http://localhost:3000/",
    reloadDelay: 1000
  });

  gulp.watch(cssPath).on("change", reload);
  gulp.watch(htmlPath).on("change", reload);
  gulp.watch(jsPath).on("change", reload);
});
