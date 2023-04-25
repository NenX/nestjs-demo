import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { IConfig } from './config.interface';

@Injectable()
export class ConfigService {
  private readonly envConfig: IConfig;

  constructor() {
    const filePath = `${process.env.NODE_ENV || 'development'}.config`;
    const configFile = path.resolve('./config/', filePath);
    this.envConfig = require(configFile);
  }

  get<T extends keyof IConfig>(key: T): IConfig[T] {
    return this.envConfig[key];
  }
}
