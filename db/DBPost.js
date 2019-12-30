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

class DBPost{
  constructor(url){
    this.storageKeyName='postList';
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
};

export{DBPost}

