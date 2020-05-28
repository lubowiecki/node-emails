import {Serve} from '../classes/serve/serve';

exports.command = 'serve [config]';
exports.aliases = ['s'];
exports.desc = 'Serve emails';
exports.handler = (argv: any) => Serve.emails(argv.config);
