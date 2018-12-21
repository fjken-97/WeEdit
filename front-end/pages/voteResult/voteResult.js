// pages/voteResult/voteResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    UserInfoByVoteIDingList: [],
    UserInfoByVoteIDedList: [],
    VoteChoiceByVoteIDList: [],
    VoteCommByVoteIDList: [],
    countEd: 0,
    countIng: 0,
    size: 0,
    hiddenmodalput: true,
    hiddenmodalput1: true,
    nickName: '',
    createFace: 'http://img.joyowo.com/formal/cms/banner/2016/12/82e4218da7b49447752f88999915559c.jpg',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var app = getApp()
    that.setData({
      voteTitle: options.voteTitle,
      voteContent: options.voteContent,
      voteAttri: options.voteAttri,
      isFaceless: options.isFaceless,
      launchTime: options.launchTime,
      deadLine: options.deadLine,
      userID: options.userID,
      nowUserID: app.globalData.userID,
      nickName: options.nickName,
      createFace:options.avatarUrl
    })
    wx.request({
      url: 'https://www.mingsonic.xyz/demo/superadmin/getUserInfoByvoteID',
      data: { "voteID": options.voteID },
      method: 'get',
      success: function (res) {
        that.setData({
          UserInfoByVoteIDingList: res.data.UserInfoByVoteIDing,
          UserInfoByVoteIDedList: res.data.UserInfoByVoteIDed,
          VoteChoiceByVoteIDList: res.data.VoteChoiceByVoteID,
          VoteCommByVoteIDList: res.data.VoteCommByVoteID,
          countEd: res.data.VoteCommByVoteID.length,
          countIng: res.data.UserInfoByVoteIDing.length,
          size: res.data.VoteCommByVoteID.length + res.data.UserInfoByVoteIDing.length
        }
        )
        console.log(that.data)
      }
    })

  },
  cancel: function () {
    this.setData({
      hiddenmodalput: true,
      hiddenmodalput1: true
    });
  },
  modalinput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  confirm: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput,
      hiddenmodalput1: !this.data.hiddenmodalput1
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