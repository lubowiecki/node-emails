import {Maybe} from '@lubowiecki/ts-utility';
import {Config} from '../../config/models/config';
export declare class Loader {
  static loadConfig(configPath?: string): Config;
  static load(path: string): Maybe<any>;
  static readFile(path: string): Maybe<string>;
}
