<!--
 * @Descripttion: 
 * @version: 
 * @Author: wang zhiguo
 * @Date: 2020-07-19 15:07:18
 * @LastEditors: wang zhiguo
 * @LastEditTime: 2020-07-19 17:06:39
--> 
# git笔记
## git 帮助
```
git help --web <要查询的命令>
```
## 初始化
```
git init
```

## git 克隆项目到本地
```
git clone <repo> <directory>
```
参数说明：
- repo:Git 仓库。
- directory:本地目录。

## git 配置项 config
```
git config --local user.name xxx
git config --local user.email xxx@xx.xx
```
## git添加到工作区
```
git add
```
## git提交到本地仓库
```
git commit
```
## git重命名文件
```
git mv <oldname> <newname>
```
## git版本查看
```
git log --all
```
## git查看当前分支
```
git log
```
- 查看简略版本信息
```
git log --oneline
```
- 查看最近几次版本信息
```
git log -n2 --oneline
```
- 树形结构表示的版本的演变
```
git log -n2 --oneline --graph
```
- 图形界面查看版本信息

```
gitk
```
## git分支
```
git branch
```
- 查看有多少分支
```
git branch -v
```
## 清理工作区和暂存区内容
```
git reset --hard
```

## 查看git对象
git三种关键对象类型
- blob记录提交中的文件
- tree记录提交中的文件夹
- commit一次提交
```
git cat-file -t/-p [obj name]
```