import gulp from 'gulp';
import {isDefined} from '@lubowiecki/ts-utility';
import {Notify} from '@lubowiecki/node-notify';

import {Loader} from '../loader/loader';
import {Config} from '../../config/models/config';
import {Core} from '../core/core';

export class Serve {
  static emails(configPath?: string): void {
    const config: Config = Loader.loadConfig(configPath);
    const core: Core = new Core(config, false);
    core.setTasks();

    gulp.series(['default'])((error?: any) => {
      if (isDefined(error)) {
        Notify.error({error});
      } else {
        Notify.success({message: 'Done'});
      }
    });
  }
}
