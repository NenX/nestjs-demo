## 目录结构
```bash

├── README.md
├── config                   # 配置文件夹
├── dist                     # 打包产物 （平台依赖，所以必须在生产环境打包）
├── nest-cli.json
├── node_modules
├── package-lock.json
├── package.json
├── pnpm-lock.yaml
├── src                      # 源码
├── test
├── tsconfig.build.json
└── tsconfig.json

```

## 环境

- Node.js、npm 已经安装
- 安装全局依赖：
```bash

$ npm i -g pm2 pnpm

```


## 安装依赖

```bash
$ pnpm install
```

## 开发

```bash
# development
$ pnpm start

# watch mode
$ pnpm start:dev

```

## 测试

```bash
# unit tests
$ pnpm test

# e2e tests
$ pnpm test:e2e

# test coverage
$ pnpm test:cov
```


## [部署](./DEPLOY.md)

## License

Nest is [MIT licensed](LICENSE).


