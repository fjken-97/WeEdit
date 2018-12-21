Page({

  data: {
    address: "2~100个字",
    times: "00:00",
    dates: "2018-10-01",
    groupID: 0,
    groupIndex: 0,
    userGroup: [],
  },

  staticData: {

  },

  onShareAppMessage: function() {
    return {
      title: '通知',
      path: '/pages/publish/publish'
    }
  },


  handleContactChange(e) {
    console.log(e.detail.value)
  },
  handleAddressClick() {
    console.log("address");
  },
  handleMessageChange(e) {
    this.staticData.message = e.detail.value;
  },

  handlethingsChange: function(e) {
    this.staticData.things = e.detail.value;
  },



  bindDateChange: function(e) {
    this.setData({

      dates: e.detail.value
    })

  },


  bindTimeChange(e) {
    this.setData({

      times: e.detail.value
    })

  },
  onLoad: function(e) {
    var that = this
    var app = getApp()
    that.setData({
      userGroup: app.globalData.group,
      groupID: app.globalData.group[0].groupID
    }, )
  },
  bindGroupChange: function(e) {
    var that = this
    this.setData({
      groupID: that.data.userGroup[e.detail.value].groupID,
      groupIndex: e.detail.value
    })
    console.log(that.data.userGroup[e.detail.value].groupID)
  },

  handleSubmit() {

    if (!this.staticData.message) {
      wx.showToast({
        title: "请填写事件名",
        icon: 'none',
        duration: 2000
      })
      return;
    }

    if (!this.staticData.things) {
      wx.showToast({
        title: "请填写事件描述",
        icon: 'none',
        duration: 2000
      })
      return;
    }
    var app = getApp()
    var that = this
    wx.request({
      url: 'https://www.mingsonic.xyz/demo/superadmin/launchNotice',
      data: {
        "noticeSponsor": app.globalData.userID,
        "noticeTitle": that.staticData.message,
        "noticeText": that.staticData.things,
        "deadLine": that.data.dates + " " + that.data.times,
        "groupID": that.data.groupID
      },
      success(res) {
        wx.switchTab({
          url: '/pages/index/index',
          success() {
            wx.showToast({
              title: '发布通知成功',
              icon: '',
              duration: 2000
            })
          }
        })
      }
    })

  },





})