import {Base} from "../../utils/util.js";
const base = new Base();
Page({
  data: {
    orderPrice:0,
    orderNo:0,
    orderId:0
  },
  onLoad: function (options) {
    this.setData({
      orderPrice: options.orderPrice,
      orderNo:options.orderNo,
      orderId:options.orderId
    })
  },
  onPayTap:function(){
    base.wxRequest('pay/per_order',{
      id:this.data.orderId
    },(res)=>{
      wx.requestPayment({
        'timeStamp': res.data.timeStamp,
        'nonceStr': res.data.nonceStr,
        'package': res.data.package,
        'signType': res.data.signType,
        'paySign': res.data.paySign,
        'success': function (res) {
          
        },
        'fail': function (res) {
          base.wxShowToast("支付失败，请重试！");
        }
      })
    })
  }
})