import {
  Base
} from "../../utils/util.js";
const base = new Base();

Page({
  data: {
    getNum: 0,
    getText: "",
    monthArr: [1, 3, 4, 5, 6, 7],
    monthAfter: 1
  },
  onLoad: function(options) {

  },
  onInput: function(e) {
    this.setData({
      getNum: e.detail.value
    });
  },
  onTextarea: function(e) {
    this.setData({
      getText: e.detail.value
    })
  },
  bindPickerChange: function(e) {
    var index = e.detail.value;
    this.setData({
      monthAfter: this.data.monthArr[index]
    });
  },
  onCommitTap: function() {
    if (!base.isPhone(this.data.getNum)) {
      base.wxShowToast('请输入正确的手机号！');
      return;
    }
    if (!this.data.getText) {
      base.wxShowToast('请输入信件内容！');
      return;
    }
    base.wxRequest('order', {
      text: this.data.getText,
      get_phone: this.data.getNum,
      monthAfter: this.data.monthAfter
    }, (res) => {
      if (res.code == 200) {
        wx.navigateTo({
          url: '../confirmPay/confirmPay?orderPrice=' + res.data.order_price + "&orderNo=" + res.data.order_no + "&orderId=" + res.data.order_id,
        });
      } else {
        base.wxShowToast(res.msg);
      }

    });
  }
})