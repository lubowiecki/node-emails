'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
Object.defineProperty(exports, '__esModule', {value: true});
exports.Core = void 0;
var gulp_1 = __importDefault(require('gulp'));
var gulp_load_plugins_1 = __importDefault(require('gulp-load-plugins'));
var browser_sync_1 = __importDefault(require('browser-sync'));
var rimraf_1 = __importDefault(require('rimraf'));
var panini_1 = __importDefault(require('panini'));
var lazypipe_1 = __importDefault(require('lazypipe'));
var inky_1 = __importDefault(require('inky'));
var fs_1 = __importDefault(require('fs'));
var siphon_media_query_1 = __importDefault(require('siphon-media-query'));
var $ = gulp_load_plugins_1.default();
var Core = /** @class */ (function () {
  function Core(config, production) {
    this.config = config;
    this.production = production;
    gulp_1.default.task('build', gulp_1.default.series(this.clean, this.pages, this.sass, this.images, this.inline));
    gulp_1.default.task('default', gulp_1.default.series('build', this.server, this.watch));
  }
  // Delete the "dist" folder
  // This happens every time a build starts
  Core.prototype.clean = function (done) {
    rimraf_1.default(this.config.dist, done);
  };
  // Compile layouts, pages, and partials into flat HTML files
  // Then parse using Inky templates
  Core.prototype.pages = function () {
    return gulp_1.default
      .src(this.config.pages)
      .pipe(
        panini_1.default({
          root: this.config.root,
          layouts: this.config.layouts,
          partials: this.config.partials,
          helpers: this.config.helpers,
        })
      )
      .pipe(inky_1.default())
      .pipe(gulp_1.default.dest(this.config.dist));
  };
  // Reset Panini's cache of layouts and partials
  Core.prototype.resetPages = function (done) {
    panini_1.default.refresh();
    done();
  };
  // Compile Sass into CSS
  Core.prototype.sass = function () {
    return gulp_1.default
      .src(this.config.scss)
      .pipe($.if(!this.production, $.sourcemaps.init()))
      .pipe(
        $.sass({
          includePaths: ['node_modules/foundation-emails/scss'],
        }).on('error', $.sass.logError)
      )
      .pipe(
        $.if(
          this.production,
          $.uncss({
            html: [this.config.dist + '/**/*.html'],
          })
        )
      )
      .pipe($.if(!this.production, $.sourcemaps.write()))
      .pipe(gulp_1.default.dest(this.config.dist + '/css'));
  };
  // Copy and compress img
  Core.prototype.images = function () {
    return gulp_1.default
      .src(this.config.images)
      .pipe($.imagemin())
      .pipe(gulp_1.default.dest(this.config.dist + '/assets/img'));
  };
  // Inline CSS and minify HTML
  Core.prototype.inline = function () {
    return gulp_1.default
      .src(this.config.dist + '/**/*.html')
      .pipe($.if(this.production, this.inliner(this.config.dist + '/css/app.css')))
      .pipe(gulp_1.default.dest(this.config.dist));
  };
  // Start a server with LiveReload to preview the site in
  Core.prototype.server = function (done) {
    browser_sync_1.default.init({
      server: this.config.dist,
    });
    done();
  };
  // Watch for file changes
  Core.prototype.watch = function () {
    gulp_1.default.watch('src/pages/**/*.html').on('all', gulp_1.default.series(this.pages, this.inline, browser_sync_1.default.reload));
    gulp_1.default
      .watch(['src/layouts/**/*', 'src/partials/**/*'])
      .on('all', gulp_1.default.series(this.resetPages, this.pages, this.inline, browser_sync_1.default.reload));
    gulp_1.default
      .watch(['../scss/**/*.scss', 'src/assets/scss/**/*.scss'])
      .on('all', gulp_1.default.series(this.resetPages, this.sass, this.pages, this.inline, browser_sync_1.default.reload));
    gulp_1.default.watch('src/assets/img/**/*').on('all', gulp_1.default.series(this.images, browser_sync_1.default.reload));
  };
  // Inlines CSS into HTML, adds media query CSS into the <style> tag of the email, and compresses the HTML
  Core.prototype.inliner = function (cssPath) {
    var css = fs_1.default.readFileSync(cssPath).toString();
    var mqCss = siphon_media_query_1.default(css);
    var pipe = lazypipe_1
      .default()
      .pipe($.inlineCss, {
        applyStyleTags: false,
        removeStyleTags: true,
        preserveMediaQueries: true,
        removeLinkTags: false,
      })
      .pipe($.replace, '<!-- <style> -->', '<style>' + mqCss + '</style>')
      .pipe($.replace, '<link rel="stylesheet" type="text/css" href="css/app.css">', '')
      .pipe($.htmlmin, {
        collapseWhitespace: true,
        minifyCSS: true,
      });
    return pipe();
  };
  return Core;
})();
exports.Core = Core;
