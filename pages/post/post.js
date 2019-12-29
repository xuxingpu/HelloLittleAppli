// pages/post/post.js
Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postList = [{
      object: {
        date: "Jan 29 2017"
      },
      title: "为自己奋斗",
      postImg: "/images/post/book01.jpg",
      avatar: "/images/post/fendou.jpg",
      content: "在我们的人生历程中，我们希望自己变成一个什么样的人呢...不管我们希望变成一个怎样的人，对我们来说，只要我们真心实意地去做自己想做的事情，我们就会成功!",
      readingNum: 108,
      collectionNum: {
        array: [92]
      },
      commentNum: 8
    },
      {
        object: {
          date: "Jan 28 2017"
        },
        title: "设计大师",
        postImg: "/images/post/book02.jpg",
        avatar: "/images/icon/icon-sheji00.png",
        content: "设计大师...不仅仅是一个称号设计大师...不仅仅是一个称号",
        readingNum: 1080,
        collectionNum: {
          array: [920]
        },
        commentNum: 833
      },
      {
        object: {
          date: "Jan 28 2017"
        },
        title: "孤本",
        postImg: "/images/post/book03.jpg",
        avatar: "/images/icon/icon-guben00.png",
        content: "书籍作为文化、知识、思想的载体流传，不幸的是多湮灭于历史长河...我辈能得一孤本,幸甚至哉!",
        readingNum: 108,
        collectionNum: {
          array: [92]
        },
        commentNum: 8
      }]

    this.setData({
      postList: postList
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
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
    console.log("onload:页面被隐藏")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onload:页面卸载")
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

  }
})