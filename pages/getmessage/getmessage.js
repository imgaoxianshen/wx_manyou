import {
  Base
} from '../../utils/util.js';
const base = new Base();
Page({

  data: {
    type: 'get',
    orderList: []
  },

  onLoad: function(options) {
    var type = options.type;
    this.setData({
      type: type
    });

    let url = (type == "get" ? "order/orderget" : "order/ordersend");
    base.wxRequest(url, {}, res => {
      this.setData({
        orderList: res.data
      })
    })
  },
  onShowMessageTap: function() {
    wx.navigateTo({
      url: '../showmessage/showmessage',
    })
  }
})