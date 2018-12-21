// pages/signIn/signIn.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    signLatitude: 0,
    signLongitude: 0,
    isWifi: 0,
    isLocation: 0,
    SSID: '',
    BSSID: '',
    nowSSID: '无',
    nowBSSID: '',
    nowSignLatitude: 0,
    nowSignLongitude: 0,
    signID: 0,
    signDistance: 0,
    circles: [{
      latitude: 0,
      longitude: 0,
      color: '#FF0000DD',
      fillColor: '#7cb5ec88',
      radius: 0,
      strokeWidth: 1
    }],
    markers: [{
      id: 1,
      latitude: 23.099994,
      longitude: 113.324520,
      name: ''
    }],
    hiddenmodalput: true,
    hiddenmodalput1: true,
    createFace: 'http://img.joyowo.com/formal/cms/banner/2016/12/82e4218da7b49447752f88999915559c.jpg',
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var app = getApp()
    that.setData(
      {
        SSID: options.SSID,
        BSSID: options.BSSID,
        isLocation: options.isLocation,
        isWifi: options.isWifi,
        signLatitude: options.signLatitude,
        signLongitude: options.signLongitude,
        signID: options.signID,
        signDistance: options.signDistance,
        address: options.signPlace,
        nickName: options.nickName,
        userID: options.userID,
        nowUserID: options.userID,
        signTitle: options.signTitle,
        signIntro: options.signIntro,
        signDate: options.signDate,
        signStart: options.signStart,
        signFinish: options.signFinish,
        createTime: options.createTime,
        type: options.type,
        createFace:options.avatarUrl,
        circles: [{
          latitude: options.signLatitude,
          longitude: options.signLongitude,
          color: '#FF0000DD',
          fillColor: '#7cb5ec88',
          radius: parseInt(options.signDistance),
          strokeWidth: 1
        }],
        markers: [{
          id: 1,
          latitude: options.signLatitude,
          longitude: options.signLongitude,
          name: '签到点'
        }],
      }
    )

    if (that.data.isWifi == 1) {

      wx.getConnectedWifi({
        success: function (res) {
          console.log(res.wifi.BSSID)
          console.log(1)
          that.setData(
            {
              nowBSSID: res.wifi.BSSID,
              nowSSID: res.wifi.SSID
            }
          )
        },
        fail: function (res) {
          wx.showToast({
            title: '请接入WIFI',
            icon: "none",
            duration: 800
          })
        }
      })

    }
    if (that.data.isLocation == 1) {
      wx.getLocation({
        type: 'gcj02',
        success: function (res) {
          that.setData(
            {
              nowSignLatitude: res.latitude,
              nowSignLongitude: res.longitude
            },
            console.log(res.latitude),
            console.log(res.longitude)
          )
        },
      })
    }
    wx.request({
      url: 'https://www.mingsonic.xyz/demo/superadmin/getUserInfoBysignID',
      data: { "signID": options.signID },
      success: function (res) {
        that.setData(
          {
            UserInfoBySignIDedList: res.data.UserInfoBySignIDed,
            UserInfoBySignIDingList: res.data.UserInfoBySignIDing
          }
        )
      }
    })

  },
  signIn: function () {
    var that = this
    var app = getApp()
    wx.request({
      url: 'https://www.mingsonic.xyz/demo/superadmin/addSignFlag',
      data: { "signID": that.data.signID, "userID": app.globalData.userID, "SSID": that.data.nowSSID, "BSSID": that.data.nowBSSID, "signLongitude": that.data.nowSignLongitude, "signLatitude": that.data.nowSignLatitude },
      success: function (res) {
        console.log(res)
        if (res.data == 0) {
          wx.showToast({
            title: '签到成功',
            duration: 2000,
            success() {
              wx.switchTab({
                url: '/pages/group/group',
              })
            }
          })
        }
        if(res.data == 4){
          wx.showToast({
            title: '不在指定范围内',
            icon: 'none',
            duration: 2000
          })
        }
        if(res.data == 2){
          wx.showToast({
            title: '不在指定WIFI内',
            icon: 'none',
            duration:2000
          })
        }
        if(res.data == 3){
          wx.showToast({
            title: '不在指定时间段内',
            icon: 'none',
            duration:2000
          })
        }
        if(res.data == 1){
          wx.showToast({
            title: '重复签到',
            icon:'none',
            duration:2000
          })
        }
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