## gcc 版本过低导致 node-canvas 编译失败，所以需要进行 gcc 升级。

1. 从 http:119.23.231.175:3000 下载 gcc-8.5.0.tar.gz, 并解压到 ~ 目录

2. 进入目录, 下载依赖包

```bash

cd ~/gcc-8.5.0

./contrib/download_prerequisites

```
3. 编译并安装

```bash

mkdir ~/gccobjdir

cd ~/gccobjdir

# 这一步一般要几个小时
../gcc-8.5.0/configure --prefix=/usr/local/gcc8 --enable-checking=release --enable-languages=c,c++ --disable-multilib

# 检查是否成功
/usr/local/gcc8/bin/gcc -v

```

4. 加入 path 路径，复制 lib64

```bash
echo "export PATH=/usr/local/gcc8/bin:$PATH" >> /etc/profile

source /etc/profile

/bin/cp /usr/local/gcc8/lib64/* /lib64/

# 检查是否是 gcc version 8.5.0 (GCC)
gcc -v
```
