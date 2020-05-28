'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
exports.defaultConfig = void 0;
exports.defaultConfig = {
  dist: 'dist',
  pages: ['src/pages/**/*.html', '!src/pages/archive/**/*.html'],
  root: 'src/pages',
  layouts: 'src/layouts',
  partials: 'src/partials',
  helpers: 'src/helpers',
  scss: 'src/assets/scss/app.scss',
  images: ['src/assets/img/**/*', '!src/assets/img/archive/**/*'],
};
