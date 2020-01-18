// pages/post/post-detail/post-detail.js
import { DBPost } from '../../../db/DBPost.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.postId;
    //这里options.postId中的“postId”必须同post.js中navigateTo中url的query参数名称保持一致
    this.dbPost = new DBPost(postId);
    this.postData = this.dbPost.getPostItemById().data;
    this.setData({
      post: this.postData
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    /* 动态设置导航栏标题 */
    wx.setNavigationBarTitle({
      title: this.postData.title
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 收藏操作
   */
  onCollectionTap(){
    //dbPost对象已经在onload函数里被保存到this变量中,无需再次实例化
    var newDate = this.dbPost.collect();

    //重新绑定数据.注意,不要将整个newData全部作为setData的参数 应当有选择的更新部分数据
    this.setData({
      'post.collectionStatus':newDate.collectionStatus,
      'post.collectionNum': newDate.collectionNum
    })
    //交互反馈
    wx.showToast({
      title: newDate.collectionStatus?"收藏成功":"取消收藏",
      duration:1000,
      icon:"success",
      mask:true
    })
  },

  /**
   * 点赞操作
   */
  onUpTap(){
    var newDate = this.dbPost.up();
    this.setData({
      'post.upNum': newDate.upNum,
      'post.upStatus': newDate.upStatus
    })

    //交互反馈
    wx.showToast({
      title: newDate.upStatus ? "点赞成功" : "取消点赞",
      duration: 1000,
      icon: "success",
      mask: true
    })
  },

  /**
   * 评论操作
   */
  onCommentTap: function(event){
    var id = event.currentTarget.dataset.postId;
    wx.navigateTo({
      url: '../post-comment/post-comment?id='+id,
      /*success: function(res) {
        console.log("评论操作成功");
      },
      fail: function(res) {},
      complete: function(res) {},*/
    })
  }

})