'use strict';
exports.command = 'serve <command>';
exports.aliases = ['s'];
exports.desc = 'Manage serve commands';
exports.builder = function (yargs) {
  return yargs.commandDir('serve_cmds');
};
exports.handler = function (argv) {};
