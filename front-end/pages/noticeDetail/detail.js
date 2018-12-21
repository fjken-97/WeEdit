//pages/noticeDetail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticeID: 0,
    noticeSponsor: '',
    noticeTitle: '',
    noticeText: '',
    //readFlag??
    hiddenmodalput: true,
    hiddenmodalput1: true,
    createFace: 'http://img.joyowo.com/formal/cms/banner/2016/12/82e4218da7b49447752f88999915559c.jpg',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.setData({
      noticeID: options.noticeID,
      noticeSponsor: options.noticeSponsor,
      noticeTitle: options.noticeTitle,
      noticeText: options.noticeText,
      deadLine: options.deadLine,
      nickName: options.nickName,
      type: options.type,
      createFace: options.avatarUrl
    })
  },
  cancel: function() {
    this.setData({
      hiddenmodalput: true,
      hiddenmodalput1: true
    });
  },
  modalinput: function() {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  confirm: function() {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput,
      hiddenmodalput1: !this.data.hiddenmodalput1
    })
  },

  noticeRead: function() {
    var that = this
    var app = getApp()
    wx.request({
      url: 'https://www.mingsonic.xyz/demo/superadmin/readConfirm',
      data: {
        "noticeID": that.data.noticeID,
        "userID": app.globalData.userID
      },
      method: 'GET',
      success: function(res) {
        console.log(res)
        if (res.data == 1) {
          var toastText = '超过时限';
          wx.showToast({
            title: toastText,
            icon: 'none',
            duration: 2000
          })
        } else if (res.data == 2) {
          var toastText = '重复阅读';
          wx.showToast({
            title: toastText,
            icon: 'none',
            duration: 2000
          })
        } else if (res.data == 0) {
          var toastText = '确认阅读成功！';
          wx.switchTab({
            url: '/pages/index/index',
            success: function() {
              wx.showToast({
                title: toastText,
                icon: 'success',
                duration: 2000
              })
            }
          })

        }
      }
    })


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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

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

  }
})