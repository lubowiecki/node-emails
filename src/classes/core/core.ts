import gulp from 'gulp';
import plugins from 'gulp-load-plugins';
import browser from 'browser-sync';
import rimraf from 'rimraf';
import panini from 'panini';
import lazypipe from 'lazypipe';
import inky from 'inky';
import fs from 'fs';
import siphon from 'siphon-media-query';

import {Config} from '../../config/models/config';

export class Core {
  $: any;

  constructor(public config: Config, public production: boolean) {
    this.$ = plugins();
  }

  setTasks() {
    gulp.task(
      'build',
      gulp.series(this.clean.bind(this), this.pages.bind(this), this.sass.bind(this), this.images.bind(this), this.inline.bind(this))
    );
    gulp.task('default', gulp.series('build', this.server.bind(this), this.watch.bind(this)));
  }

  // Delete the "dist" folder
  // This happens every time a build starts
  clean(done: (error: Error) => void) {
    rimraf(this.config.dist, done);
  }

  // Compile layouts, pages, and partials into flat HTML files
  // Then parse using Inky templates
  pages() {
    return gulp
      .src(this.config.pages)
      .pipe(
        panini({
          root: this.config.root,
          layouts: this.config.layouts,
          partials: this.config.partials,
          helpers: this.config.helpers,
        })
      )
      .pipe(inky())
      .pipe(gulp.dest(this.config.dist));
  }

  // Reset Panini's cache of layouts and partials
  resetPages(done: () => void) {
    panini.refresh();
    done();
  }

  // Compile Sass into CSS
  sass() {
    return gulp
      .src(this.config.scss)
      .pipe(this.$.if(!this.production, this.$.sourcemaps.init()))
      .pipe(
        this.$.sass({
          includePaths: ['node_modules/foundation-emails/scss'],
        }).on('error', this.$.sass.logError)
      )
      .pipe(
        this.$.if(
          this.production,
          this.$.uncss({
            html: [`${this.config.dist}/**/*.html`],
          })
        )
      )
      .pipe(this.$.if(!this.production, this.$.sourcemaps.write()))
      .pipe(gulp.dest(`${this.config.dist}/css`));
  }

  // Copy and compress img
  images() {
    return gulp
      .src(this.config.images)
      .pipe(this.$.imagemin())
      .pipe(gulp.dest(`${this.config.dist}/assets/img`));
  }

  // Inline CSS and minify HTML
  inline() {
    return gulp
      .src(`${this.config.dist}/**/*.html`)
      .pipe(this.$.if(this.production, this.inliner(`${this.config.dist}/css/app.css`)))
      .pipe(gulp.dest(this.config.dist));
  }

  // Start a server with LiveReload to preview the site in
  server(done: () => void) {
    browser.init({
      server: this.config.dist,
    });
    done();
  }

  // Watch for file changes
  watch() {
    gulp.watch('src/pages/**/*.html').on('all', gulp.series(this.pages, this.inline, browser.reload));
    gulp.watch(['src/layouts/**/*', 'src/partials/**/*']).on('all', gulp.series(this.resetPages, this.pages, this.inline, browser.reload));
    gulp
      .watch(['../scss/**/*.scss', 'src/assets/scss/**/*.scss'])
      .on('all', gulp.series(this.resetPages, this.sass, this.pages, this.inline, browser.reload));
    gulp.watch('src/assets/img/**/*').on('all', gulp.series(this.images, browser.reload));
  }

  // Inlines CSS into HTML, adds media query CSS into the <style> tag of the email, and compresses the HTML
  inliner(cssPath: string) {
    const css = fs.readFileSync(cssPath).toString();
    const mqCss = siphon(css);

    const pipe = lazypipe()
      .pipe(this.$.inlineCss, {
        applyStyleTags: false,
        removeStyleTags: true,
        preserveMediaQueries: true,
        removeLinkTags: false,
      })
      .pipe(this.$.replace, '<!-- <style> -->', `<style>${mqCss}</style>`)
      .pipe(this.$.replace, '<link rel="stylesheet" type="text/css" href="css/app.css">', '')
      .pipe(this.$.htmlmin, {
        collapseWhitespace: true,
        minifyCSS: true,
      });

    return pipe();
  }
}
