import {Serve} from '../../classes/serve/serve';

exports.command = 'editor [config]';
exports.desc = 'Serve openapi spec';
exports.builder = {};
exports.handler = (argv: any) => Serve.emails(argv.config);
