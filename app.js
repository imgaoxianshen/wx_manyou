import {
  Base
} from "utils/util.js";
const base = new Base();
App({
  onLaunch: function() {
    // 登录
    wx.login({
      success: res => {

        base.wxRequest('token/user', {
          code: res.code
        }, res => {
          wx.setStorageSync('token', res.data);
        })

      }
    });
  },
  globalData: {
    userInfo: null
  }
})