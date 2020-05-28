import {readFileSync} from 'fs-extra';
import {Notify} from '@lubowiecki/node-notify';
import {Maybe, isDefined} from '@lubowiecki/ts-utility';
import R from 'ramda';

import {Config} from '../../config/models/config';
import {defaultConfig} from '../../config/config';

export class Loader {
  static loadConfig(configPath?: string): Config {
    let config = defaultConfig;

    if (isDefined(configPath)) {
      const customConfig: Config = Loader.load(configPath);

      config = R.mergeDeepRight(defaultConfig, customConfig) as Config;
    }

    return config;
  }

  static load(path: string): Maybe<any> {
    let file: Maybe<any> = null;

    if (typeof path === 'string') {
      const fileAsString = this.readFile(path);

      if (typeof fileAsString === 'string') {
        file = JSON.parse(fileAsString);
      }
    }

    return file;
  }

  static readFile(path: string): Maybe<string> {
    try {
      return readFileSync(path, 'utf-8');
    } catch (e) {
      Notify.error({
        message: `Can't read file: ${path}`,
      });
    }
  }
}
