// pages/groupDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    showIndex: 0,
    groupID: 0,
    voteList: [],
    noticeList: [],
    signList: [],
    curNav: 1,
    hiddenmodalput: true,
    hiddenmodalput1: true,
    hiddenmodalput2: true,
    hiddenmodalput3: true,
    hiddenmodalput4: true,
    hiddenmodalput5: true,
    hiddenmodalput6: true,
    symbols: '进行中',
    tempName: '',
    tempIntro: '',
    tempSecret: '',
    content:'',
  },
  switchRightTab: function (e) {
    let id = e.target.dataset.id;
    console.log(id);
    this.setData({
      curNav: id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var app = getApp()
    that.data.groupID = options.groupID
    that.data.userID1 = options.userID
    that.data.userID2 = app.globalData.userID
    //console.log(options.groupID)

    wx.request({
      url: 'https://www.mingsonic.xyz/demo/superadmin/getAllInfoByGroupID',
      data: {
        "groupID": that.data.groupID
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          voteList: res.data.VoteInfoByGroupID,
          noticeList: res.data.NoticeInfoByGroupID,
          signList: res.data.SignInfoByGroupID,
          memberList: res.data.GroupMemberByGroupID
        })
        console.log(res)
      }
    })

  },
  modalinput5: function (e) {
    var that = this
    var app = getApp()
    that.setData({
      tempID: e.currentTarget.id
    })
    wx.request({
      url: 'https://www.mingsonic.xyz/demo/superadmin/getUserInfoByID',
      data: { "userID": e.currentTarget.id },
      success(res) {
        that.setData({
          tempNickName: res.data.UserInfoByID.nickName,
          tempSelfIntro: res.data.UserInfoByID.selfIntro,
          tempavatarUrl: res.data.UserInfoByID.avatarUrl
          
        }
        )
      }
    })
    this.setData({
      hiddenmodalput5: !this.data.hiddenmodalput5,
    })
    console.log(e)
  },
  modalinput4: function (e) {
    this.setData({
      hiddenmodalput4: !this.data.hiddenmodalput4,
    })
    console.log(e)
  },
  modalinput3: function (e) {
    this.setData({
      hiddenmodalput3: !this.data.hiddenmodalput3,
    })
    console.log(e)
  },
  modalinput2: function (e) {
    this.setData({
      hiddenmodalput2: !this.data.hiddenmodalput2,
      value:2
    })
    console.log(e)
  },
  modalinput1: function () {
    this.setData({
      hiddenmodalput1: !this.data.hiddenmodalput1,
      value:1
    })
  },

  modalinput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput,
      value:0
    })
  },
  cancel: function () {
    this.setData({
      hiddenmodalput: true,
      hiddenmodalput1: true,
      hiddenmodalput2: true,
      hiddenmodalput3: true,
      hiddenmodalput4: true,
      hiddenmodalput5: true,
      hiddenmodalput6: true
    });
  },
  contentChange: function (e) {
    this.setData({
      content: e.detail.value
    })
  },

  confirm: function () {
    var app = getApp()
    var that = this
    this.cancel()
    wx.request({
      url: 'https://www.mingsonic.xyz/demo/superadmin/updateGroupInfo',
      data: { "groupID": that.data.groupID, "type":that.data.value,"content": that.data.content },
      success() {
        var toastText = '操作成功';
        wx.showToast({
          title: toastText,
          icon: '',
          duration: 2000
        })
      }
    })
  },

  confirm3: function () {
    var app = getApp()
    var that = this
    this.setData({
      hiddenmodalput3: true
    })
    wx.request({
      url: 'https://www.mingsonic.xyz/demo/superadmin/removeGroup',
      data: { "groupID": that.data.groupID},
      success(res) {
        wx.showToast({
          title: '解散成功',
          duration: 2000,
          success: function (e) {
            wx.switchTab({
              url: '/pages/group/group',
            })
          }
        })
      }
    })
  },
  confirm4: function () {
    var app = getApp()
    var that = this
    this.setData({
      hiddenmodalput2: true
    })
    wx.request({
      url: 'https://www.mingsonic.xyz/demo/superadmin/removeMember',
      data: { "groupID": that.data.groupID,"userID":app.globalData.userID1 },
      success(res) {
        wx.showToast({
          title: '退出成功',
          duration: 2000,
          success:function(e){
            wx.switchTab({
              url: '/pages/group/group',
            })
          }
        })
      }
    })
  },
  confirm5:function(){
    this.setData({
      hiddenmodalput6:false,
      hiddenmodalput5:true
    })
  },

  confirm6: function () {
    var app = getApp()
    var that = this
    that.cancel()
    console.log(that.data.groupID)
    console.log(that.data.tempID)
    wx.request({
      url: 'https://www.mingsonic.xyz/demo/superadmin/removeMember',
      data: { "groupID": that.data.groupID, "userID": that.data.tempID },
      success(res) {
        wx.showToast({
          title: '移除成功',
          duration: 2000
          
        })
        
      }
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

  panel: function (e) {
    if (e.currentTarget.dataset.index != this.data.showIndex) {
      this.setData({
        showIndex: e.currentTarget.dataset.index
      })
    } else {
      this.setData({
        showIndex: 0
      })
    }
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