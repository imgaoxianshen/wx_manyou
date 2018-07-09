const app = getApp();
Page({

  data: {
    isLogin: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')

  },

  onLoad: function(options) {
    var that = this;
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
              //用户已经授权过
              app.globalData.userInfo = res.userInfo;
              that.setData({
                isLogin: true,
                name: app.globalData.userInfo.nickName,
                avatarUrl: app.globalData.userInfo.avatarUrl
              })
            }
          })
        }
      }
    })

  },
  onPhoneTap: function() {
    wx.navigateTo({
      url: '../phone/phone',
    });
  },
  onGetMessageTap: function(event) {
    var type = event.currentTarget.dataset.type;
    wx.navigateTo({
      url: "../getmessage/getmessage?type=" + type
    });
  },
  onErrorTap: function(event) {
    wx.navigateTo({
      url: "../errorreturn/errorreturn"
    });
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      name: app.globalData.userInfo.nickName,
      avatarUrl: app.globalData.userInfo.avatarUrl,
      isLogin: true
    })
  },

})