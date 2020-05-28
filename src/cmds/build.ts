import {Build} from '../classes/build/build';

exports.command = 'build [config]';
exports.aliases = ['b'];
exports.desc = 'Build emails';
exports.handler = (argv: any) => Build.emails(argv.config);
