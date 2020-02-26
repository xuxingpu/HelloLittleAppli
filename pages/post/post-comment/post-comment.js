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
        useKeyboardFlag: true,
        //控制input组件的初始值
        keyboardInputValue:'',
        //控制是否显示图片选择面板
        sendMoreMsgFlag: false,
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
            current: imgs[imgIdx], //当前显示图片的http连接
            urls: imgs //需要预览的图片http连接列表
        })
    },

    /**
     * 评论方式切换:语音/文字
     */
    switchInputType: function(event) {
        this.setData({
            useKeyboardFlag: !this.data.useKeyboardFlag
        })
    },

    /**
     * 获取用户输入
     */
    bindCommentInput: function(event) {
        var val = event.detail.value;
        this.data.keyboardInputValue = val;
        return val;
    },

    //提交用户评论
    submitComment: function(event) {
        var newData = {
            username: "青石",
            avatar: "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1582432436&di=1ea28437e9d7ee2c1f3539d86c60b7d1&src=http://thumb.1010pic.com/pic10/d/m/404470_1.jpg",
            //评论时间
            create_time:new Date().getTime()/ 1000,
            //评论内容
            content: {
                txt: this.data.keyboardInputValue,
                txt1: 'this.data.keyboardInputValue'
            },
        };
        if (!newData.content.txt) {
            //如果没有评论内容就不执行任何操作
            return;
        }
        //保存新评论到缓存数据库中
        this.dbPost.newComment(newData);
        //显示操作结果
        this.showCommitSuccessToast();
        //重新渲染并绑定所有评论
        this.bindCommentData();
        //恢复初始状态
        this.resetAllDefaultStatus();
    },

    //新增评论成功
    showCommitSuccessToast: function(){
        //显示操作结果
        wx.showToast({
            title: '评论成功',
            duration:1000,
            icon:'success'
        })
    },
    //重新绑定评论数据
    bindCommentData: function(){
        var comments = this.dbPost.getCommentData();
        //绑定评论数据
        this.setData({
            comments:comments
        });
    },

    //清空输入框
    resetAllDefaultStatus: function(){
        this.setData({
            keyboardInputValue:""
        });
    },

    //显示选择照片/拍照等按钮
    sendMoreMsg: function(){
        this.setData({
            sendMoreMsgFlag: !this.data.sendMoreMsgFlag
        })
    }

})