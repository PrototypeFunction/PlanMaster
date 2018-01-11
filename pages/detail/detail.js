const { computeFee } = require('../../utils/util')
const app = getApp()

Page({
  data: {
  },
  onLoad: function (q) {
    let plan = JSON.parse(q.plan)
    const call = Number(q.call)
    const inProvinceTraffic = Number(q.inProvinceTraffic)
    const nationalTraffic = Number(q.nationalTraffic)

    plan.price.costEstimate = computeFee(plan.price, call, inProvinceTraffic, nationalTraffic)
    app.getAds(data => this.setData(data))
    this.setData({
      plan: plan,
      call: call,
      inProvinceTraffic: inProvinceTraffic,
      nationalTraffic: nationalTraffic,
    })
  },
  onShareAppMessage: function (res) {
    const { plan, call, inProvinceTraffic, nationalTraffic } = this.data

    return {
      title: plan.partner + plan.cardName,
      path: '/pages/detail/detail?plan=' + JSON.stringify(plan)
        + '&call=' + call
        + '&inProvinceTraffic=' + inProvinceTraffic
        + '&nationalTraffic=' + nationalTraffic,
    }
  },
  computeFee: function () {
    let { plan, call, inProvinceTraffic, nationalTraffic } = this.data
    plan.price.costEstimate = computeFee(plan.price, call, inProvinceTraffic, nationalTraffic)
    this.setData({
      plan: plan,
    })
  },
  callInputChange: function (e) {
    let call = Math.ceil(e.detail.value.match(/\d+(?:\.\d+)?/))
    this.setData({
      call: call < 0 ? 0 : call
    })
    this.computeFee()
  },
  inProvinceTrafficInputChange: function (e) {
    let traffic = Number(e.detail.value.match(/\d+(?:\.\d+)?/)).toFixed(3)
    this.setData({
      inProvinceTraffic: traffic < 0 ? 0 : Number(traffic),
    })
    this.computeFee()
  },
  nationalTrafficInputChange: function (e) {
    let traffic = Number(e.detail.value.match(/\d+(?:\.\d+)?/)).toFixed(3)
    this.setData({
      nationalTraffic: traffic < 0 ? 0 : Number(traffic),
    })
    this.computeFee()
  },
  goChangePlan: function () {
    wx.navigateTo({
      url: `/pages/changePlan/changePlan?plan=${JSON.stringify(this.data.plan)}`
    })
  },
  goApplyNew: function () {
    wx.navigateTo({
      url: `/pages/newCard/newCard?plan=${JSON.stringify(this.data.plan)}`
    })
  },
  goFeedback: function () {
    wx.navigateTo({
      url: `/pages/feedback/feedback?plan=${JSON.stringify(this.data.plan)}`
    })
  },
  goPrototype: function () {
    wx.navigateTo({
      url: `/pages/webview/webview?url=https://prototype.im/`
    })
  },
})
