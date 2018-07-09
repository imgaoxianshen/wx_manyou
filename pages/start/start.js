
Page({
  data: {
  
  },
  onLoad: function (options) {
    setTimeout(function(){
      wx.switchTab({
        url: '../index/index',
      })
    },4000);
  },
})