import {Serve} from '../../classes/serve/serve';

exports.command = 'emails [config]';
exports.desc = 'Serve emails';
exports.builder = {};
exports.handler = (argv: any) => Serve.emails(argv.config);
