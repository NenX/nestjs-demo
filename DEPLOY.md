## 无外网环境

- 本地机器安装 Node.js, 然后安装 pnpm
```bash
npm i -g pnpm
# 验证
pnpm -v
```
- 进入 `assisted-server-nest` 目录，执行
```bash
pnpm i
```
- 打包，执行：
```bash
pnpm build
```

- 生产机器安装 Node.js：到[官网](http://nodejs.cn/download/)下载一个 lts (长期支持版本)的 exe 安装包，并安装。
```
# 验证 Node.js 安装成功
node -v

# 验证 npm 安装成功
npm -v
```
- 复制 `assisted-server-nest` 目录到生产机，进入目录并执行对应命令：


```bash
# 运行
$ npm run serve:start

# 查看状态
$ npm run serve:status

# 重启
$ npm run serve:restart

# 杀死
$ npm run serve:kill
```



## 有外网环境


- 生产机 Node.js、npm 安装
- 安装全局依赖：

```bash
$ npm i -g pm2 pnpm

```

- clone 下项目，进入目录并执行对应命令：

```bash
# 运行
$ pnpm serve:start

# 查看状态
$ pnpm serve:status

# 重启
$ pnpm serve:restart

# 杀死
$ pnpm serve:kill

```