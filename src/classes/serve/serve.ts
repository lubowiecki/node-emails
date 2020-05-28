import gulp from 'gulp';

import {Loader} from '../loader/loader';
import {Config} from '../../config/models/config';
import {Core} from '../core/core';

export class Serve {
  static emails(configPath?: string): void {
    const config: Config = Loader.loadConfig(configPath);
    const core: Core = new Core(config, false);

    gulp.series('default');
  }
}
