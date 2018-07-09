import {
  Base
} from "../../utils/util.js";
const base = new Base();
Page({

  data: {
    message: "",
    name: "",
    time: "",
    get_phone: ""
  },
  onLoad: function(options) {
    base.wxRequest("order/one", {
      order_id: options.order_id
    }, (res) => {
      if (!res) {
        base.showToast("无法查询到对应的信件，请重试");
      } else {
        this.setData({
          message: res.data.order_detail.text,
          time: res.data.create_time,
          name: res.data.order_detail.name,
          get_phone: res.data.get_phone,
          year:res.data.create_time.substring(0,4)
        });
      }
    });
  },

})