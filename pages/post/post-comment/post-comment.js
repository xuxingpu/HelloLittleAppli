// pages/post/psot-comment/post-comment.js
import {
    DBPost
} from '../../../db/DBPost.js';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //初始化变量值
        useKeyboardFlag:false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var postId = options.id;
        this.dbPost = new DBPost(postId);
        var comments = this.dbPost.getCommentData();
        console.log("comments==" + comments);
        //绑定评论数据
        this.setData({
            comments: comments
        });

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
		console.log("预览结束触发 onShow");
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {
		console.log("图片点击触发 onHide")
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

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

	/**
	 * 预览图片
	 */
	previewImg: function(event) {
		//获取评论序号
		var commentIdx = event.currentTarget.dataset.commentIdx,
			//获取图片在图片数组中的序号
			imgIdx = event.currentTarget.dataset.imgIdx,
			//获取评论的全部图片
			imgs = this.data.comments[commentIdx].content.img;
		console.log("当前预览图片的路径>>>" + imgs[imgIdx]);
		wx.previewImage({
			current: imgs[imgIdx],//当前显示图片的http连接
			urls: imgs//需要预览的图片http连接列表
		})
	},

    /**
     * 评论方式切换:语音/文字
     */
    switchInputType: function (event) {
        this.setData({
            useKeyboardFlag:!this.data.useKeyboardFlag
        })
    }


})