import {
  Base
} from "../../utils/util.js";
const base = new Base();
const app = getApp()

Page({
  data: {
    now: "",
    orderList: []
  },
  onLoad: function() {
    var time = base.formatTimetoYMD(new Date());
    this.setData({
      now: time
    });
  },
  onShow: function() {
    //查询信息
    base.wxRequest("order/list", {}, (res) => {
      if(res.code!=200){
        base.wxShowToast(res.msg);
      }else{
        this.setData({
          orderList: res.data
        });
      }
      
    });
  },
  OnMailTap: function() {
    wx.navigateTo({
      url: '../mail/mail',
    });
  },
  onShowMessageTap: function(e) {
    let order_id = e.currentTarget.dataset.order_id;
    //这里还要调用接口点击查看信件
    base.wxRequest('order/watchorder', {
      order_id: order_id
    }, res => {
      console.log(res);
    })
    wx.navigateTo({
      url: '../showmessage/showmessage?order_id=' + order_id,
    });
  }

})