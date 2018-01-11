const app = getApp()
const serviceNumbers = {
  '中国联通': '10010',
  '中国电信': '10000',
  '中国移动': '10086',
}

Page({
  data: {
    serviceNumbers: serviceNumbers,
  },
  onLoad: function (q) {
    this.setData({
      plan: JSON.parse(q.plan),
    })
  },
  onShow: function () {
    app.getAds(data => this.setData(data))
  },
  goChangePlanNow: function () {
    wx.makePhoneCall({
      phoneNumber: serviceNumbers[this.data.plan.operator]
    })
  },
})
