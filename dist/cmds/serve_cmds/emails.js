'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
var serve_1 = require('../../classes/serve/serve');
exports.command = 'editor [config]';
exports.desc = 'Serve openapi spec';
exports.builder = {};
exports.handler = function (argv) {
  return serve_1.Serve.emails(argv.config);
};
