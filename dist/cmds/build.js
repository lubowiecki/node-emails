'use strict';
exports.command = 'build <command>';
exports.aliases = ['b'];
exports.desc = 'Manage build commands';
exports.builder = function (yargs) {
  return yargs.commandDir('build_cmds');
};
exports.handler = function (argv) {};
