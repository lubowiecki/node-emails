import gulp from 'gulp';
import {Notify} from '@lubowiecki/node-notify';
import {isDefined} from '@lubowiecki/ts-utility';

import {Loader} from '../loader/loader';
import {Config} from '../../config/models/config';
import {Core} from '../core/core';

export class Build {
  static emails(configPath?: string): void {
    const config: Config = Loader.loadConfig(configPath);
    const core: Core = new Core(config, true);
    core.setTasks();

    gulp.series(['build'])((error?: any) => {
      if (isDefined(error)) {
        Notify.error({error});
      } else {
        Notify.success({message: 'Done'});
      }
    });
  }
}
