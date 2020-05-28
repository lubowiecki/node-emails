'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
var build_1 = require('../../classes/build/build');
exports.command = 'emails [config]';
exports.desc = 'Build emails';
exports.builder = {};
exports.handler = function (argv) {
  return build_1.Build.emails(argv.config);
};
