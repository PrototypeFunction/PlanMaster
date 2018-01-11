Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    ad: {
      type: Object,
      value: {},
    },
    show: {
      type: Boolean,
      value: false,
    }
  },
  data: {
  },
  methods: {
    setSopnsorImageHeight: function (e) {
      try {
        const { windowWidth } = wx.getSystemInfoSync()
        this.setData({
          sopnsorImageHeight: (windowWidth - 30) / 3,
        })
      } catch (error) {
        console.error(error)
      }
    },
    goAd: function (e) {
      const { ad } = this.data
      const { openType } = e.currentTarget.dataset

      if (openType === 'mina') {
        wx.navigateToMiniProgram({
          appId: ad.appId,
          path: ad.url,
          extraData: {
            from: 'planmaster',
          },
          success(res) {
          }
        })
      }
      if (openType === 'webview') {
        wx.navigateTo({
          url: `/pages/ad/ad?url=${ad.url}`
        })
      }
      if (openType === 'clipboard') {
        const { text, modal: { title, content } } = ad.data
        wx.setClipboardData({
          data: text,
          success: function(res) {
            wx.showModal({
              title: title,
              content: content,
              showCancel: false,
            })
          }
        })
      }
    },
  }
})