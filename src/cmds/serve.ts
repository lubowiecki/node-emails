exports.command = 'serve <command>';
exports.aliases = ['s'];
exports.desc = 'Manage serve commands';
exports.builder = (yargs: any) => yargs.commandDir('serve_cmds');
exports.handler = (argv: any) => {};
