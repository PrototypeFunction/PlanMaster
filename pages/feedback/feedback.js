const app = getApp()

Page({
  data: {
  },
  onLoad: function (q) {
    try {
      let sysInfo = encodeURIComponent(JSON.stringify(wx.getSystemInfoSync()))
      let plan = q.plan && JSON.parse(q.plan)
      this.setData({
        url: `https://i.duotai.co/forms/dkyqo?${sysInfo ? 'appVersion=' + sysInfo : ''}${plan ? '&plan=' + encodeURIComponent(plan.partner + plan.cardName) : ''}`
      })
    } catch (error) {
      console.error(error)
    }
  },
})
