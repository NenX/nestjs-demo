import { resolve } from 'path';
import { loadEnvFile } from '../preload';



export interface IConfig {
  name: string
  port: string
  prefix: string

  DATABASE_HOST: string
  DATABASE_PORT: string
  DATABASE_PASSWORD: string
  DATABASE_DATABASE: string
  DATABASE_USERNAME: string
}

export class AppConfig {
  private static _envConfig: IConfig;

  private static get config() {
    if (AppConfig._envConfig) return AppConfig._envConfig
    const c = loadEnvFile()
    const configPath = './config'
    const filePath = `${process.env.NODE_ENV || 'development'}.config`;
    const configFile = resolve(configPath, filePath);
    const dd = require(configFile);

    AppConfig._envConfig = Object.assign({}, dd, c)
    console.log('sbbxx', AppConfig._envConfig.DATABASE_HOST, process.env.DATABASE_HOST)
    return AppConfig._envConfig
  }

  static get<T extends keyof IConfig>(key: T): IConfig[T] {
    const c = AppConfig.config
    return c[key];
  }
}

export const appConfig = new AppConfig
