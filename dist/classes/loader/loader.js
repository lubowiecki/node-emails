'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
Object.defineProperty(exports, '__esModule', {value: true});
exports.Loader = void 0;
var fs_extra_1 = require('fs-extra');
var node_notify_1 = require('@lubowiecki/node-notify');
var ts_utility_1 = require('@lubowiecki/ts-utility');
var ramda_1 = __importDefault(require('ramda'));
var config_1 = require('../../config/config');
var Loader = /** @class */ (function () {
  function Loader() {}
  Loader.loadConfig = function (configPath) {
    var config = config_1.defaultConfig;
    if (ts_utility_1.isDefined(configPath)) {
      var customConfig = Loader.load(configPath);
      config = ramda_1.default.mergeDeepRight(config_1.defaultConfig, customConfig);
    }
    return config;
  };
  Loader.load = function (path) {
    var file = null;
    if (typeof path === 'string') {
      var fileAsString = this.readFile(path);
      if (typeof fileAsString === 'string') {
        file = JSON.parse(fileAsString);
      }
    }
    return file;
  };
  Loader.readFile = function (path) {
    try {
      return fs_extra_1.readFileSync(path, 'utf-8');
    } catch (e) {
      node_notify_1.Notify.error({
        message: "Can't read file: " + path,
      });
    }
  };
  return Loader;
})();
exports.Loader = Loader;
