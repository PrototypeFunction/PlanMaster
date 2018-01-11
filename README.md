<a href="https://planmaster.prototype.im"><img src="https://prototype.im/projects/planmaster@2x.png" height="160" align="right"></a>

# 套餐助手

### 手机套餐对比选购小程序

套餐助手是一个帮你在众多互联网套餐中选择最适合的套餐的小程序。

## 赞助商

<div valign="middle">
  <a href="https://www.duotai.net/?utm_source=planmaster&utm_medium=web&utm_campaign=planmaster-github">
    <img src="https://user-images.githubusercontent.com/978810/34824409-447c85e8-f709-11e7-813d-41c9e7f919fe.png" alt="多态" height="180" />
  </a>
  <a href="https://www.duohui.co/?utm_source=planmaster&utm_medium=web&utm_campaign=planmaster-github">
    <img src="https://user-images.githubusercontent.com/978810/34824476-8fc7f4ce-f709-11e7-8f53-b10fdced0038.png" height="180"/>
  </a>
</div>

## 立即体验

![套餐助手小程序码](https://planmaster.prototype.im/minicode.jpg?fix)

## 截图

<img src="https://cdn.sspai.com/2017/11/19/a7c2965a0dfc12c27bf70859c3b9bb13.gif?imageView2/2/w/1120/q/90/interlace/1/ignore-error/1" width="420"/>

## 开发使用说明

1. 若未安装微信开发中者工具需先安装微信开发中者工具。
2. Clone 项目，使用微信开发者工具新建项目，选择项目目录即可。

## 目录结构

```
.
├── app.js                        // 在 onLaunch 时做一些统计相关的工作
├── components
│   └── sponsor                   // 广告组件，每次 onShow 时显示下一个广告
├── pages
│   ├── ad                        // 广告的 webview，广告的打开类型为 webview 时跳到该页面
│   ├── changePlan                // 修改套餐页
│   ├── detail                    // 套餐详情页
│   ├── feedback                  // 反馈页面
│   ├── index                     // 首页，费用计算及套餐推荐，推荐套餐按费用升序排列
│   ├── newCard                   // 办理新卡的页面
│   └── webview                   // 一个通用的 webview，其他网页都跳到这个页面
├── static
│   └── images
└── utils
    └── util.js                   // 工具函数，计算套餐的函数放在这里
```
## 项目介绍

该小程序可以通过设置每月通话时间、流量等自动计算各种互联网套餐所需的费用并按照升序排列，从而帮助用户选择出最适合自己的套餐。

该小程序有很多特色，比如加了很多漂亮的广告，这些广告不仅简洁漂亮，还支持多种打开方式，如跳转到另一个小程序，打开一个网页，甚至往剪贴板中写入一些内容。

除此之外，得益于[多态](https://www.duotai.net/?utm_source=planmaster&utm_medium=web&utm_campaign=planmaster-github)提供的表单功能，我们收集到了很多有用的用户反馈，从而帮助我们不断改进完善，也使得我们可以及时纠正套餐信息中存在的错误。

## 许可协议

套餐助手小程序以附加禁止竞业限制的 GPLv2 许可证开放源代码。

本项目的授权协议禁止您使用本项目源码来开发和发布与套餐助手业务相同或相近的小程序（手机套餐对比推荐）。
