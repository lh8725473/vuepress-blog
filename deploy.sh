#!/usr/bin/env bash
#
# VuePress 通用部署脚本
#
# Windows 无法执行 .sh 文件，需要安装 git 客户端
#
# Author: haoliu
# Email: 171213574@qq.com
#

# 开始
set -e

# 编译
# package.json 中需要有这一句："build": "vuepress build docs"
yarn build

# 进去.vuepress目录
cd docs/.vuepress

# 删除 dist_temp 文件夹
rm -fr dist_temp

# 复制 dist 文件夹到 dist_temp 文件夹
cp -ir dist dist_temp

# 复制 README.md 文件到 dist_temp 文件夹
# cp -i README.md dist_temp

# 进入 dist_temp 目录
cd dist_temp

# 新建 CNAME 文件，并写入 gleehub.com 域名
# echo gleehub.com > CNAME

# 初始化仓库
git init

# 添加
git add -A

# 提交
git commit -m deploy

# 强制推送到 cnguu.github.io 仓库的 master 分支
git push -f git@github.com:lh8725473/haoliu.github.io.git master

# 多仓库部署开始 ------

# 删除 CNAME
#rm CNAME

# 返回上一级目录
cd ../

# 删除 dist_temp 文件夹
rm -fr dist_temp
