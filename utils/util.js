class Base{

  baseUrl = 'http://192.168.0.103/manyou/public/index.php/api/v1/';

  constructor(){

  }

  formatTime(date){
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(this.formatNumber).join('-') + ' ' + [hour, minute, second].map(this.formatNumber).join(':')
  }

  formatTimetoYMD(date){
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      return [year, month, day].map(this.formatNumber).join('-')
  }

  formatNumber(n){
    n = n.toString()
    return n[1] ? n : '0' + n
  }

  wxRequest(url,data,callBack){
    var token = wx.getStorageSync('token');
    wx.request({
      url: this.baseUrl+url,
      header: {
        'content-type': 'application/json', // 默认值
        'token': token
      },
      data: data,
      method: "POST",
      success: msg => {
        callBack(msg.data)
      }
    })
  }

  isPhone(phoneNum){
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(phoneNum)) {
      return false;
    } else {
      return true;
    }
  }

  wxShowToast(title,icon="none"){
    wx.showToast({
      title: title,
      icon: icon
    })
  }
}
export {Base};