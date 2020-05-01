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
        //容器:保存已选择的图片
        chooseFiles:[],
        //被删除的图片序号
        deleteIndex:-1,
        //保存当前正在播放的录音的url
        currentAudio:''
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
        //阅读计数
        this.addReadingTimes();
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
        var imgs = this.data.chooseFiles;
        var newData = {
            username: "青石",
            avatar: "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1582432436&di=1ea28437e9d7ee2c1f3539d86c60b7d1&src=http://thumb.1010pic.com/pic10/d/m/404470_1.jpg",
            //评论时间
            create_time:new Date().getTime()/ 1000,
            //评论内容
            content: {
                txt: this.data.keyboardInputValue,
                txt1: 'this.data.keyboardInputValue',
                img:imgs
            },
        };
        if (!newData.content.txt && imgs.length===0) {
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
            keyboardInputValue:"",
            chooseFiles:[],
            sendMoreMsgFlag:false
        });
    },

    //显示选择照片/拍照等按钮
    sendMoreMsg: function(){
        this.setData({
            sendMoreMsgFlag: !this.data.sendMoreMsgFlag
        })
    },
    
    //选择本地照片与拍照功能
    chooseImage: function(event){
        //已选择图片数组
        var imgArr = this.data.chooseFiles;
        //只能上传3张照片,包括拍照
        var leftCount = 3-imgArr.length;
        if(leftCount <= 0){
            return;
        }
        //决定当前选择的是哪一种上传图片的方式:1.相册选取 2.拍照
        var sourceType = [event.currentTarget.dataset.category],
        that = this;
        wx.chooseImage({
            count:leftCount,//指定一次最多可以上传多少张图片
            sourceType: sourceType,//指定是拍照生成照片还是从手机相册里选择照片
            success: function(res) {
                console.log(res)
                //可以分次选择图片,但总数不能超过3张
                that.setData({
                    //tempFilePaths 数组,装载了选择的图片的url
                    chooseFiles:imgArr.concat(res.tempFilePaths)
                })
            },
        })
    },
    //删除已选图片
    deleteImage: function(event){
        var index = event.currentTarget.dataset.idx,
        that = this;
        that.data.chooseFiles.splice(index,1);
        setTimeout(function(){
            that.setData({
                deleteIndex:-1,
                chooseFiles:that.data.chooseFiles//重新绑定容器
            });
        },500)
    },

    //开始录音
    recordStart: function(){
        var that = this;
        this.setData({
            recodingClass:'recoding'
        });
        //记录录音开始时间
        this.startTime = new Date();
        wx.startRecord({
            success: function(res){
                //计算录音时长
                var diff = (that.endTime - that.startTime)/1000;
                diff = Math.ceil(diff);

                //发送录音
                that.submitCommentVoiceComment({url:res.tempFilePath,timeLen:diff});
            },
            fail: function(res){
                console.log(res);
            },
            complete: function(res){
                console.log(res);
            }
        })
    },

    //录音结束
    recordEnd: function(){
        this.setData({
            recodingClass: ''
        });
        this.endTime = new Date();
        wx.stopRecord();
    },

    submitCommentVoiceComment: function(audio){
        var newData = {
            username:'慕北',
            avatar:'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1404977740,2394090196&fm=26&gp=0.jpg',
            create_time:new Date().getTime()/1000,
            content:{
                txt:'xxp 2020-4-19 21:48:09 完成功能点',
                img:[],
                audio:audio
            },
        };
        //保存新评论到缓存数据库中
        this.dbPost.newComment(newData);
        //显示操作结果
        this.showCommitSuccessToast();
        //重新渲染并绑定所有评论
        this.bindCommentData();
    },

    //播放评论语音
    playAudio: function(event){
        var url = event.currentTarget.dataset.url,
        that = this;

        //暂停当前录音
        if(url == this.data.currentAudio){
            wx.pauseVoice();
            this.data.currentAudio = ''
        }

        //播放录音
        else{
            this.data.currentAudio = url;
            wx.playVoice({
                filePath: url,
                complete: function(){
                    //只有当录音播放完毕后才会执行
                    that.data.currentAudio='';
                }
            });
        }
    }

})