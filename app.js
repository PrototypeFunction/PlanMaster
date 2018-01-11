App({
  onLaunch: function (opts) {
    if (opts.referrerInfo && opts.referrerInfo.extraData && opts.referrerInfo.extraData.from) {
      wx.reportAnalytics('adclick', {
        from: opts.referrerInfo.extraData.from,
      })
    }
    wx.setStorage({
      key: 'showTime',
      data: null,
    })
  },
  getAds: function (cb) {
    wx.request({
      url: 'https://planmaster.prototype.im/ads.json',
      success: res => {
        const { showAd, ads } = res.data
        let showTime = Number(wx.getStorageSync('showTime')) || 0
        if (showAd) {
          wx.setStorage({
            key: 'showTime',
            data: showTime + 1
          })
        }
        const adData = {
          showAd: showAd,
          ads: ads,
          ad: ads[showTime % ads.length],
        }
        typeof cb === 'function' && cb(adData)
      }
    })
  },
})