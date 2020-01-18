
class DBPost{

  
  constructor(postId) {
    this.storageKeyName = 'postList';
    this.postId = postId;
  }

  //得到全部文章信息
  getAllPostData(){
    var res = wx.getStorageSync(this.storageKeyName);
    if(!res){
      res = require('../data/data.js').postList;
      this.initPostList(res);
    }
    return res;
  }

  //保存或更新缓存数据
  execStorageSync(data){
    wx.setStorageSync(this.storageKeyName, data);
  }

  //根据id获取文章数据
  getPostItemById(){
    var postData = this.getAllPostData();
    var len = postData.length;
    for(var i=0;i<len;i++){
      if(postData[i].postId == this.postId){
        return{
          //当前文章在缓存数据库中的序号
          index: i,
          data:postData[i]
        }
      }
    }
  }

  //收藏
  collect(){
    return this.updatePostData('collect');
  }
  //点赞或者取消点赞
  up() {
    var data = this.updatePostData('up');
    return data;
  }
  //更新本地的点赞、评论信息、收藏、阅读量
  updatePostData(category){//TODO 此处参数是否非category不可,是否可代替
    var itemData = this.getPostItemById(),
    postData = itemData.data,
    allPostData = this.getAllPostData();
    switch(category){
      case'collect':
        //收藏操作
        if(!postData.collectionStatus){
          //如果当前状态是未收藏
          postData.collectionNum++;
          postData.collectionStatus = true;
        }else {
          //如果当前状态是已收藏
          postData.collectionNum--;
          postData.collectionStatus = false;
        }
        break;
      case'up':
        //点赞操作
        if(!postData.upStatus){
          postData.upNum++;
          postData.upStatus = true;
        }else {
          postData.upNum--;
          postData.upStatus = false;
        }

      default:
        break;
    }
    //更新缓存数据库
    allPostData[itemData.index] = postData;
    this.execStorageSync(allPostData);
    return postData;
  }


  //获取评论数据
  getCommentData(){
    
    var itemData = this.getPostItemById().data;

    //按时间降序排列评论
    itemData.comments.sort(this.compareWithTime);
    var len = itemData.comments.length,
      comment;
    for(var i = 0;i<len;i++){
      //将comment中的时间戳转换成可阅读格式
      comment=itemData.comments[i];
      //引入util.js
      var util = require('../util/util.js');
      comment.create_time=util.getDiffTime(comment.create_time,true);
    }
    return itemData.comments;
  }


  //比较时间的方法
  compareWithTime(time1,time2){
    var flag=parseFloat(time1.create_time)-parseFloat(time2.create_time);
    if(flag<0){
      return 1;
    }else if(flag>0){
      return -1;
    }else{
      return 0;
    }
  }
};

export{DBPost}
















/**
 * DBPost 对象的prototype 写法
var DBPost=function() {
  this.storageKeyName='postList';//所欲的文章本地缓存存储键值
}

DBPost.prototype={

  //得到全部文章信息
  getAllPostData:function(){
    var res = wx.getStorageSync(this.storageKeyName);
    if(!res){
      res = require('../data/data.js').postList;
      this.execSetStorageSync(res);
    }
    return res;
  },

  //本地缓存,保存/更新
  execSetStorageSync:function(data){
    wx.setStorageSync(this.storageKeyName, data)
  },
};

module.exports={
  DBPost:DBPost
};
*/