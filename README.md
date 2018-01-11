# 套餐助手

[套餐助手](https://www.duohui.co/?utm_source=planmaster&utm_medium=web&utm_campaign=planmaster-github)是一个帮你在众多互联网套餐中选择最适合的套餐并提供转套餐指南的小程序。

## 赞助商

- [多态](https://www.duotai.net/?utm_source=planmaster&utm_medium=web&utm_campaign=planmaster-github)

## 体验

![planmaster-mina-code](https://planmaster.prototype.im/minicode.jpg)

## 截图
![planmaster-screenshot](https://wx1.sinaimg.cn/large/701cac0cgy1fna85b3gsrj20v94q8dw3.jpg)
![planmaster-screenshot](https://wx4.sinaimg.cn/large/701cac0cgy1fna85bn0uej20v92pg11d.jpg)

## 开发使用说明
1. 若未安装微信开发中者工具需先安装微信开发中者工具。
2. 下载项目，使用微信开发者工具新建项目，选择项目目录即可。

## 目录结构
```
.
├── app.js                        // 在onLaunch时做一些统计相关的工作
├── components
│   └── sponsor                   // 广告组件，每次onShow时显示下一个广告
│
├── pages
│   ├── ad                        // 广告的webview，广告的打开类型为webview时跳到该页面
│   ├── changePlan                // 修改套餐页
│   ├── detail                    // 套餐详情页
│   ├── feedback                  // 反馈页面，也是一个webview
│   ├── index                     // 首页，费用计算及套餐推荐，推荐套餐按费用升序排列
│   ├── newCard                   // 办理新卡的页面
│   └── webview                   // 一个通用的webview，其他网页都跳到这个页面
│
├── static
│   └── images
│
└── utils
    └── util.js                   // 工具函数，计算套餐的函数放在这里
```

## 项目介绍

该小程序可以通过设置每月通话时间、流量等自动计算各种互联网套餐所需的费用并按照升序排列，从而帮助用户选择出最适合自己的套餐。
该小程序有很多特色，比如加了很多漂亮的广告，这些广告不仅简洁漂亮，还支持多种打开方式，如跳转到另一个小程序，打开一个网页，甚至往剪贴板中写入一些内容。
除此之外，得益于[多态](https://www.duotai.net/?utm_source=planmaster&utm_medium=web&utm_campaign=planmaster-github)提供的表单功能，我们收集到了很多有用的用户反馈，从而帮助我们不断地改进完善，也使得我们可以及时纠正套餐信息中存在的错误。
## 许可协议

PlanMaster以[GPLv2](https://github.com/prototype/PlanMaster/blob/master/LICENSE)许可证开放源代码，但禁止以任何形式使用该小程序源代码及其衍生版本发布与套餐助手业务相同或相近的小程序。




