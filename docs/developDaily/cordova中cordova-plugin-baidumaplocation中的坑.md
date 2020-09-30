---

title: cordova中cordova-plugin-baidumaplocation中的坑

meta:
  - name: description
    content: cordova中cordova-plugin-baidumaplocation中的坑
  - name: keywords
    content: cordova中cordova-plugin-baidumaplocation中的坑

created: 2020/06/20

updated: 2020/06/20
 
tags:
  - 日常开发

---

### 前言
今天项目经理要研发app，好的直接拿cordova直接干。项目经理说需要定位，行找一个插件cordova-plugin-geolocation，结果在有些机型中(国内对Android都有修改)，又由于国内不可描述原因(因为cordova-plugin-geolocation在Android调用的谷歌地图服务，你懂的！~),也可能会有问题。

### cordova-plugin-baidumaplocation
问了下以前做原生Android的同事，建议使用baidu SDK。然后找到了`cordova-plugin-baidumaplocation`插件,按照文档一步一步配置，结果打包后没反应。直接在android studio 中调试发现报包找不到啥的(我实在是看不读)。

继续谷歌问题[问题描述链接](https://github.com/aruis/cordova-plugin-baidumaplocation/issues/64)。总算解决了问题....