---
title: 网站更新日志
description: 博客网站的历次更新记录，包括主题更换、功能添加等
tags:
  - 网站
pubDatetime: 2025-02-06T00:00:00
draft: true
---

> 2026-07-29 之后的网站变化将在 about 页面里写。

### 2025-05-02

新添[装备页面](https://blog.zhheo.com/p/de771c8e.html)。

### 2025-04-16

通过[hexo-abbrlink](https://github.com/ohroy/hexo-abbrlink)插件将网站url进行了优化，避免网址带中文复制后一大串的问题。

通过修改db文件的方式将之前的说说加入了memos。

但又暴露出新的问题：memos引入的页面没有写好，之后再改改。

### 2025-04-14

出于种种原因，还是换回了butterfly主题。

keep主题留档：

![](@/assets/images/changelog/Snipaste_2025-04-14_18-01-29.jpg)

发现了Memos引入失败的问题：Memos新旧版本不兼容，于是[换回了旧版本](https://laozhang.org/archives/3638.html)的Memos，成功。

### 2025-04-13

在服务器中部署了docker+Memos，作为说说发布工具。

遇到了docker镜像源不能用的问题，后来在一评论区发现腾讯云的服务器得用腾讯的镜像源，难绷。

Memos成功部署，但是引入博客的时候遇到了问题，还未解决。

### 2025-03-13

将字体改为方正小标宋_GBK。

### 2025-03-02

添加友链页面（虽然没有一个友链）；

将字体改为思源宋体。

### 2025-02-27

在Nginx 服务器完成SSL 证书安装部署（Linux），现在是https了。

申请加入[开往](https://github.com/travellings-link/travellings)。

### 2025-02-07

完成公安备案。

### 2025-02-06

添加百度统计；

添加utterances评论系统，但其要求登录github才能评论，暂且删除。

cactus主题只支持两种评论系统，于是更换keep主题，mongodb&vercel部署twikoo评论系统。

并给twikoo添加二级域名加速，并添加邮件提醒。

留档：

![cactus仙人掌主题](@/assets/images/changelog/Snipaste_2025-02-06_14-20-59.jpg)

### 2025-02-05

正月初八，上午管局就审核通过了，效率挺高。

已提交公安备案。

### 2025-01-14

用改日期的方式新增置顶。将部分文章合并。恢复部分文章。将图床里的图片搬到本地。

### 2025-01-13
新购域名luuooo.com，还未备案。给服务器续费一个月。

### 2025-01-10

完成萌国ICP备案。

### 2025-01-06

昨天看了几个别人博客的年度报告，感觉美化的尽头果然还是默认，我决定之后将博客主题换为极简风格。

更换主题完成，是仙人掌cactus主题。

留档：

![](@/assets/images/changelog/Snipaste_2025-01-06_17-25-15.png)

![](@/assets/images/changelog/Snipaste_2025-01-06_17-25-30.png)

![](@/assets/images/changelog/Snipaste_2025-01-06_17-25-36.png)

### 2025-01-05

删除部分文章

### 2024-02-06

使用了网站一图流

添加了文章双侧栏显示

添加了wowjs动画

以及图片，访客数，字数统计，侧边栏优化等。

参考：[博客魔改教程总结(一)](https://www.fomal.cc/posts/eec9786.html)
     [Butterfly 安装文档(三) 主题配置-1](https://butterfly.js.org/posts/4aa8abbe/)

