/// <reference types="node" />
import {Config} from '../../config/models/config';
export declare class Core {
  private config;
  private production;
  constructor(config: Config, production: boolean);
  clean(done: (error: Error) => void): void;
  pages(): any;
  resetPages(done: () => void): void;
  sass(): any;
  images(): any;
  inline(): any;
  server(done: () => void): void;
  watch(): void;
  inliner(cssPath: string): NodeJS.ReadWriteStream;
}
