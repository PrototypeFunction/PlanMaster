const { computeFee } = require('../../utils/util')
const app = getApp()
let plans
const calls = [0, 50, 100, 200, 300, 500, 700, 1000, 1500, 2000, 2500, 3000]
const traffics = [0, 0.01, 0.02, 0.05, 0.2, 0.5, 0.7, 1, 2, 3, 5, 10, 20, 50, 100, 200]
const shareImage = 'https://planmaster.prototype.im/share_image.png'
let shareImageDownloaded = false

Page({
  data: {
    call: calls[1],
    callSlider: 1,
    traffic: traffics[7],
    trafficSlider: 7,
    trafficPerDay: traffics[7] / 30,
    freeTraffic: false,
    outProvinceDay: 0,
    operators: [
      {
        show: true,
        name: '联通',
        checked: true,
        img: '/static/images/unicom.svg',
      },
      {
        show: true,
        name: '电信',
        checked: false,
        img: '/static/images/telecom.svg',
      },
      {
        show: true,
        name: '移动',
        checked: false,
        img: '/static/images/cmcom.png',
      },
    ],
    selectedOperators: ['中国联通'],
    plans: [
      {
        "operator": "中国联通",
        "partner": "腾讯",
        "cardName": "大王卡",
        "guideUrl": "https://planmaster.prototype.im/tencent",
        "price": {
            "monthlyFee": 19,
            "trafficInPlan": {
                "national": 0,
                "inProvince": 0
            },
            "callInplan": 0,
            "callOutPlanPrice": 0.1,
            "trafficOutPlanPrice": {
                "national": {
                    "daily": true,
                    "price": 2,
                    "quantity": 0.5
                },
                "inProvince": {
                    "daily": true,
                    "price": 1,
                    "quantity": 0.5
                }
            }
        },
        "privilege": "腾讯视频、王者荣耀等腾讯系应用及游戏免流，斗鱼等直播免流",
        "description": "腾讯系应用及游戏免流，熊猫等直播免流"
      },
      {
        "operator": "中国联通",
        "partner": "蚂蚁金服",
        "cardName": "大宝卡",
        "guideUrl": "https://planmaster.prototype.im/alipay",
        "price": {
            "monthlyFee": 36,
            "condition": "满一年或预存200",
            "trafficInPlan": {
                "national": 3,
                "inProvince": 0
            },
            "callInplan": 200,
            "callOutPlanPrice": 0.1,
            "trafficOutPlanPrice": {
                "national": {
                    "daily": false,
                    "price": 10,
                    "quantity": 1
                },
                "inProvince": null
            }
        },
        "privilege": "线下买单送流量。2017年11月起，全系每月+3元可享优酷视频免流（视频广告也免流，缓存下载不免流）",
        "description": "送流量，优酷视频免流"
      },
      {
        "operator": "中国联通",
        "partner": "百度",
        "cardName": "小圣卡",
        "guideUrl": "https://planmaster.prototype.im/sheng",
        "price": {
            "monthlyFee": 9,
            "trafficInPlan": {
                "national": 0.1,
                "inProvince": 0
            },
            "callInplan": 0,
            "callOutPlanPrice": 0.1,
            "trafficOutPlanPrice": {
                "inProvince": {
                    "daily": true,
                    "price": 1,
                    "quantity": 0.8
                },
                "national": {
                    "daily": false,
                    "price": 15,
                    "quantity": 1
                }
            }
        },
        "privilege": "手机百度、百度贴吧、百度地图、爱奇艺、好看视频等APP免流量",
        "description": "百度系APP免流量"
      },
      {
        "operator": "中国联通",
        "partner": "哔哩哔哩",
        "cardName": "33卡",
        "guideUrl": "https://planmaster.prototype.im/bilibili",
        "price": {
            "monthlyFee": 33,
            "condition": "满一年或预存200元",
            "trafficInPlan": {
                "national": 2,
                "inProvince": 0
            },
            "callInplan": 100,
            "callOutPlanPrice": 0.1,
            "trafficOutPlanPrice": {
                "national": {
                    "daily": true,
                    "price": 1,
                    "quantity": 0.5
                },
                "inProvince": null
            }
        },
        "privilege": "哔哩哔哩免流",
        "description": "哔哩哔哩免流"
      },
      {
        "operator": "中国联通",
        "partner": "网易",
        "cardName": "大白金卡",
        "guideUrl": "https://planmaster.prototype.im/wangyi",
        "price": {
            "monthlyFee": 19,
            "trafficInPlan": {
                "national": 1,
                "inProvince": 0
            },
            "callInplan": 100,
            "callOutPlanPrice": 0.1,
            "trafficOutPlanPrice": {
                "inProvince": {
                    "daily": true,
                    "price": 1,
                    "quantity": 0.8
                },
                "national": {
                    "daily": true,
                    "price": 2,
                    "quantity": 0.8
                }
            }
        },
        "privilege": "网易系应用游戏全免流",
        "description": "网易系应用游戏全免流"
      },
    ]
  },
  onShow: function () {
    wx.request({
      url: 'https://planmaster.prototype.im',
      success: res => {
        plans = typeof res.data === 'object' ? res.data : this.data.plans
        let { operators } = this.data

        operators = plans.some(p => p.operator === '中国移动') ? operators : operators.filter(o => o.name !== '移动')
        this.setData({
          plans: plans,
          operators: operators,
        })
        this.recommendPlan(plans)
      }
    })
    app.getAds(data => this.setData(data))
  },
  onShareAppMessage: function (res) {
    return {
      title: '套餐助手',
      path: '/pages/index/index',
    }
  },
  recommendPlan: function (plans) {
    const { call, traffic, outProvinceDay, selectedOperators } = this.data
    const inProvinceTraffic = traffic * (30 - outProvinceDay) / 30
    const nationalTraffic = traffic * outProvinceDay / 30
    let recommendedPlans = plans
      .filter(p => selectedOperators.includes(p.operator))
      .map(plan => {
        plan.price.costEstimate = computeFee(plan.price, call, inProvinceTraffic, nationalTraffic)

        return plan
      })
      .sort((a, b) => a.price.costEstimate.totalFee - b.price.costEstimate.totalFee)
    if (selectedOperators.includes('中国联通') && recommendedPlans[0] && recommendedPlans[0].price.costEstimate.totalFee > 150) {
      const icecream = recommendedPlans.find(p => p.cardName === '芝麻冰激凌')
      recommendedPlans = recommendedPlans.filter(p => p.cardName !== '芝麻冰激凌')
      recommendedPlans.unshift(icecream)
    }
    this.setData({
      recommendedGreatPlans: recommendedPlans.slice(0, 1),
      recommendedGoodPlans: recommendedPlans.slice(1, 3),
      recommendedOtherPlans: recommendedPlans.slice(3),
    })
  },
  callSliderChange: function (e) {
    const callSlider = Number(e.detail.value)
    this.setData({
      callSlider: callSlider,
      call: calls[Number(e.detail.value)],
    })
    this.recommendPlan(plans)
  },
  callSliderChaning: function (e) {
    this.setData({
      call: calls[Number(e.detail.value)],
    })
  },
  callInputChange: function (e) {
    let call = Math.ceil(e.detail.value.match(/\d+(?:\.\d+)?/))
    this.setData({
      call: call < 0 ? 0 : call
    })
    this.recommendPlan(plans)
  },
  trafficSliderChange: function (e) {
    const trafficSlider = Number(e.detail.value)
    this.setData({
      trafficSlider: trafficSlider,
      traffic: traffics[Number(e.detail.value)],
      trafficPerDay: traffics[Number(e.detail.value)] / 30,
    })
    this.recommendPlan(plans)
  },
  trafficSliderChanging: function (e) {
    this.setData({
      traffic: traffics[Number(e.detail.value)],
    })
  },
  trafficInputChange: function (e) {
    let traffic = Number(e.detail.value.match(/\d+(?:\.\d+)?/)).toFixed(3)
    this.setData({
      traffic: traffic < 0 ? 0 : Number(traffic),
    })
    this.recommendPlan(plans)
  },
  outProvinceDaySliderChange: function (e) {
    this.setData({
      outProvinceDay: Number(e.detail.value),
    })
    this.recommendPlan(plans)
  },
  outProvinceDaySliderChanging: function (e) {
    this.setData({
      outProvinceDay: Number(e.detail.value),
    })
  },
  outProvinceDayInputChange: function (e) {
    let outProvinceDay = Number(e.detail.value.match(/\d+(?:\.\d+)?/))
    outProvinceDay = outProvinceDay > 30 ? 30 : outProvinceDay < 0 ? 0 : outProvinceDay
    this.setData({
      outProvinceDay: outProvinceDay,
    })
    this.recommendPlan(plans)
  },
  goOutChange: function (e) {
    this.setData({
      goOutFrequently: e.detail.value === 'yes',
    })
  },
  freeTrafficChange: function (e) {
    this.setData({
      freeTraffic: e.detail.value === 'yes',
    })
    this.recommendPlan(plans)
  },
  applyModeChange: function (e) {
    this.setData({
      applyMode: e.detail.value,
    })
    this.recommendPlan(plans)
  },
  onOperatorChange: function (e) {
    const { index, checked } = e.currentTarget.dataset
    let { operators, selectedOperators } = this.data
    operators[index].checked = !checked
    selectedOperators = operators.filter(o => o.checked).map(o => '中国' + o.name)

    this.setData({
      operators: operators,
      selectedOperators: selectedOperators,
    })
    this.recommendPlan(plans)
  },
  previewShareImage: function () {
    wx.previewImage({
      current: shareImage,
      urls: [shareImage],
    })
  },
  getShareImage: function () {
    const showSuccessModal = () => {
      wx.showModal({
        title: '分享图片保存成功',
        content: '分享图片已经保存到相册，请在朋友圈点击选择相册中的图片然后进行分享。',
      })
    }
    const showFailModal = () => {
      wx.showModal({
        title: '保存失败',
        content: '请尝试手动保存。',
        showCancel: false,
        success: () => {
          this.previewShareImage()
        }
      })
    }
    const saveImage = () => {
      wx.showLoading()
      wx.downloadFile({
        header: {
          'Accept': 'image/*'
        },
        url: shareImage,
        success: res => {
          console.log('download success')
          wx.hideLoading()
          if (res.statusCode !== 200) {
            showFailModal()
            return
          }
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: () => {
              shareImageDownloaded = true
              showSuccessModal()
            },
            fail: res => {
              showFailModal()
            },
            complete: () => {
            }
          })
        },
      })
    }
    if (shareImageDownloaded) {
      showSuccessModal()
      return
    }
    wx.getSetting({
      success: (res) => {
        if (res.authSetting["scope.writePhotosAlbum"] === undefined) {
          wx.showModal({
            title: '需要图片保存权限',
            content: '我们需要保存图片到系统相册的权限，以保存分享图片，请在弹出的授权框中选择允许。',
            showCancel: false,
            success: () => {
              saveImage()
            }
          })
        } else {
          saveImage()
        }
      }
    })

  },
  goDetail: function (e) {
    const { call, traffic, outProvinceDay, recommendedGreatPlans, recommendedGoodPlans, recommendedOtherPlans } = this.data
    const inProvinceTraffic = traffic * (30 - outProvinceDay) / 30
    const nationalTraffic = traffic * outProvinceDay / 30
    const { index, type } = e.currentTarget.dataset
    let plans

    switch (type) {
      case 'great':
        plans =recommendedGreatPlans
        break
      case 'good':
        plans =recommendedGoodPlans
        break
      case 'other':
        plans =recommendedOtherPlans
        break
      default:
        break
    }
    const plan = plans[index]
    if (plan.operator === '中国移动') {
      wx.navigateTo({
        url: '/pages/webview/webview?url=' + plan.guideUrl,
      })
    } else {
      wx.navigateTo({
        url: '/pages/detail/detail?plan='
          + JSON.stringify(plan)
          + '&call=' + call
          + '&inProvinceTraffic=' + inProvinceTraffic
          + '&nationalTraffic=' + nationalTraffic
      })
    }

  },
  goFeedback: function () {
    wx.navigateTo({
      url: `/pages/feedback/feedback`
    })
  },
  goPrototype: function () {
    wx.navigateTo({
      url: `/pages/webview/webview?url=https://prototype.im/`
    })
  },
})
