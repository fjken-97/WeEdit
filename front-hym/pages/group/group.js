// pages/group/group.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    group:[],
    hiddenmodalput: true,  
    groupName:'',
    groupIntro:''
  },


  nameChange:function(e){
    this.setData({
      groupName: e.detail.value
    })
  },


  introChange: function (e) {
    this.setData({
      groupIntro: e.detail.value
    })
  },


  modalinput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //取消按钮  
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认  
  confirm: function () {
    var app = getApp()
    var that = this
    this.setData({
      hiddenmodalput: true
    })
    wx.request({
      url: 'http://127.0.0.1:8082/demo/superadmin/addGroup',
      data:{"userID":app.globalData.userID,"groupName":that.data.groupName,"groupIntro":that.data.groupIntro},
      success(){
        var toastText = '创建小组成功';
        wx.showToast({
          title: toastText,
          icon: '',
          duration: 2000
        })
      }
    })
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    var app = getApp()
    that.setData(
      {
        group:app.globalData.group
      }
    )
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