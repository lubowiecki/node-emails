import {Build} from '../../classes/build/build';

exports.command = 'emails [config]';
exports.desc = 'Build emails';
exports.builder = {};
exports.handler = (argv: any) => Build.emails(argv.config);
