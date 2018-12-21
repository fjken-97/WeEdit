Page({



messageBtn:function(options){

wx.switchTab({
  url: '../Sign/Sign',
})

},
 

  SignBtn: function (options) {

  wx.switchTab({
    url: '../Sign/Sign',
  })

},


  /**
   *    * 页面的初始数据
   *    */

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '/image/common/hello.png',
    ],
    indicatorDots: true,
    interval: 5000,
    duration: 1000,
    autoplay: true,  /*自动播放海报*/
    array: []
  },





  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData();
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
    var that = this
    var app = getApp()

    wx.request({
      url: 'https://www.mingsonic.xyz/demo/superadmin/getGroupByUserID',
      data: {
        "userID": app.globalData.userID
      },
      method: 'GET',
      success: function (res) {
        
        app.globalData.group = res.data.GroupInfoByUserID
        
      }
    })
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



  initData: function () {
    var array = [];
    var that = this
    var app = getApp()
    wx.request({
      url: 'https://www.mingsonic.xyz/demo/superadmin/getLatestInfoByUserID',
      data:{"userID":app.globalData.userID},
      success:function(res){
        console.log(res)
        that.setData({
          noticeList: res.data.NoticeInfoList,
          voteList: res.data.VoteInfoList,
          signList: res.data.SignInfoList
        })
        var j = 0;
        for (var i = 0; i < that.data.noticeList.length; i++) {
         
          var object1 = new Object();
          object1.img = '/image/common/write.png';
          object1.title = that.data.noticeList[i].noticeTitle;
          object1.type = that.data.noticeList[i].launchTime;
          object1.pinglun = "发起人：Ming";
          array[j] = object1;
          j++;
        }
        for (var i = 0; i < that.data.signList.length; i++) {

          var object1 = new Object();
          object1.img = '/image/common/gouout.png';
          object1.title = that.data.signList[i].signTitle;
          object1.type = that.data.signList[i].launchTime;
          object1.pinglun = "发起人：Ming";
          array[j] = object1;
          j++;
        }
        for (var i = 0; i < that.data.voteList.length; i++) {

          var object1 = new Object();
          object1.img = '/image/common/gouout.png';
          object1.title = that.data.voteList[i].voteTitle;
          object1.type = that.data.voteList[i].launchTime;
          object1.pinglun = "发起人：Ming";
          array[j] = object1;
          j++;
        }
        that.setData({
          array:array
        })
      }
    })
    
    // var object2 = new Object();
    // object2.img = "/image/common/gouout.png";
    // object2.title = "共享文档——小组会议报告";
    // object2.type = "2018-11-11   12:30";
    // object2.pinglun = "发起人：XXX";
    // array[1] = object2;


    console.log(array)
    
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