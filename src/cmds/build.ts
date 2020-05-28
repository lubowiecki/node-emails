exports.command = 'build <command>';
exports.aliases = ['b'];
exports.desc = 'Manage build commands';
exports.builder = (yargs: any) => yargs.commandDir('build_cmds');
exports.handler = (argv: any) => {};
