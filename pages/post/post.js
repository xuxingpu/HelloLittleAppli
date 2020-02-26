// pages/post/post.jsz
/**
 * 缓存数据库DBPost.js的prototype引入方式
 * var DBPost = require("../../db/DBPost.js").DBPost;
 */
//缓存数据库DBPost.js的ES6引入方式
import {DBPost} from '../../db/DBPost.js';
Page({


  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var dbPost = new DBPost();
    this.setData({
      postList:dbPost.getAllPostData()
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    console.log("onload:页面被隐藏")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    console.log("onload:页面卸载")
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  onTapToDetail(event){
    var postId = event.currentTarget.dataset.postId;
    wx.navigateTo({
      url: 'post-detail/post-detail?postId='+postId,
    })
  }

})