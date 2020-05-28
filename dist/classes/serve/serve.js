'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
Object.defineProperty(exports, '__esModule', {value: true});
exports.Serve = void 0;
var gulp_1 = __importDefault(require('gulp'));
var loader_1 = require('../loader/loader');
var core_1 = require('../core/core');
var Serve = /** @class */ (function () {
  function Serve() {}
  Serve.emails = function (configPath) {
    var config = loader_1.Loader.loadConfig(configPath);
    var core = new core_1.Core(config, false);
    gulp_1.default.series('default');
  };
  return Serve;
})();
exports.Serve = Serve;
