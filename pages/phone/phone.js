import {
  Base
} from "../../utils/util.js";
const base = new Base();
Page({

  data: {
    mobile: 0,
    code: 0,
    time: 0,
    setInterval: "",
    getCode: 0, //后台传过来的验证码
    isBindMobile: false,
    bindMobile: 0
  },
  onLoad: function(options) {
    base.wxRequest('user/getmobile', {}, res => {
      if (res.code == 200) {
        this.setData({
          isBindMobile: true,
          bindMobile: res.data
        });
      }
    })
  },

  OnMobileInput: function(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  OnCodeInput: function(e) {
    this.setData({
      code: e.detail.value
    })
  },

  OnGetCodeTap: function() {
    if (!this.data.mobile || !(/(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/.test(this.data.mobile))) {
      base.wxShowToast("请先输入正确的手机号");
      return;
    }
    if (this.data.time != 0) {
      base.wxShowToast("请30s后再重新获取验证码")
      return;
    }
    var that = this;
    base.wxRequest('TestSms/sendcode', {
      mobile: this.data.mobile,
      code: this.data.code
    }, res => {
      console.log(res);
      if (res.code != 200) {
        base.wxShowToast(res.msg.mobile)
        return;
      }
      //如果成功开始倒计时
      that.setData({
        time: 30,
        getCode: res.data
      });
      base.wxShowToast("发送验证码成功");
      that.data.setInterval = setInterval(function() {
        let nowtime = that.data.time;
        that.setData({
          time: nowtime - 1
        });
        if (nowtime == 1) {
          clearInterval(that.data.setInterval)
        }
      }, 1000);
    })

  },

  OnBindMobile: function() {
    if (!this.data.mobile || !(/(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/.test(this.data.mobile))) {
      base.wxShowToast("请先输入正确的手机号");
      return;
    }
    if (this.data.getCode != this.data.code) {
      base.wxShowToast("验证码错误，请重试");
    }
    base.wxRequest("user/bindmobile", {
      mobile: this.data.mobile
    }, res => {
      if (res.code == 200) {
        base.wxShowToast('绑定手机号成功！');
        setTimeout(function() {
          wx.switchTab({
            url: '../center/center',
          });
        }, 2000);
      }
    })
  }
})