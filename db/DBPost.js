var DBPost=function() {
  this.storageKeyName='postList';//所欲的文章本地缓存存储键值
}

DBPost.prototype={

  //得到全部文章信息
  getAllPostData:function(){
    var res = wx.getstorageSync(this.storageKeyName);
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