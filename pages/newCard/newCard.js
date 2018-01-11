

const app = getApp()

Page({
  data: {
  },

  onLoad: function (q) {
    this.setData({
      plan: JSON.parse(q.plan),
    })
  },

})
