// pages/feedBack/feedBack.js
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

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  bugChange:function(e){
    this.setData({
      bug:e.detail.value
    })
  },

  adviceChange: function (e) {
    this.setData({
      advice: e.detail.value
    })
  },
  typeChange: function (e) {
    this.setData({
      type: e.detail.value
    })
  },

  confirm:function(e){
    var app = getApp()
    var that = this
    wx.request({
      url: 'https://www.mingsonic.xyz/demo/superadmin/addQuestionNaire',
      data:{
        "userID":app.globalData.userID,"advice":that.data.advice,"bugFeedBack":that.data.bug,"contactType":that.data.type
      },
      success:function(e){
        wx.switchTab({
          url: '/pages/involved/involved',
          success:function(){
            wx.showToast({
              title: '感谢您的反馈',
              duration:2000
            })
          }
        })
      }
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

  }
})