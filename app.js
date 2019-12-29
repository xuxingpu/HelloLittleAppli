//app.js

//缓存加载01
// var dataObj = require("data/data.js")


App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    //缓存加载01
    // wx.setStorageSync({
    //   key: 'postList',
    //   data: dataObj.postList,
    //   success: function (res) {
    //     //success
    //   },
    //   fail: function () {
    //     //fiail
    //   },
    //   complete: function () {
    //     //complete
    //   }
    // })

    //缓存加载02
    var storageData = wx.getStorageSync('postList');
    if(!storageData){
      //如果postList缓存不存在
      var dataObj = require("data/data.js");
      //清楚缓存
      wx.clearStorageSync();
      wx.setStorageSync('postList', dataObj.postList);
    }
  },
  globalData: {
    userInfo: null
  }
})