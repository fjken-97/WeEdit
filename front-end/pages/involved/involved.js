var _app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
   
      userInfo: null,
      hiddenmodalput1: true,
      hiddenmodalput2: true,
      tempNickName: '',
      tempSelfIntro:'',
      nickName: '',
      selfIntro: '',
      
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var app = getApp()
    wx.request({
      url: 'https://www.mingsonic.xyz/demo/superadmin/getUserInfoByID',
      data: { "userID": app.globalData.userID },
      success(res) {
        that.setData({
          nickName: res.data.UserInfoByID.nickName,
          selfIntro: res.data.UserInfoByID.selfIntro,
          userInfo: app.globalData.userInfo
        }
        )
      }
    })

  },
  cancel1: function () {
    this.setData({
      hiddenmodalput1: true
    });
  },

  cancel2: function () {
    this.setData({
      hiddenmodalput2: true
    });
  },
  introChange: function (e) {
    this.setData({
      tempSelfIntro: e.detail.value
    })
  },
  nameChange: function (e) {
    this.setData({
      tempNickName: e.detail.value
    })
  },

  modalinput1: function () {
    this.setData({
      hiddenmodalput1: !this.data.hiddenmodalput1
    })
  },

  modalinput2: function () {
    this.setData({
      hiddenmodalput2: !this.data.hiddenmodalput2
    })
  },
  confirm2: function () {
    var app = getApp()
    var that = this
    this.setData({
      hiddenmodalput2: true
    })
    wx.request({
      url: 'https://www.mingsonic.xyz/demo/superadmin/updateSelfIntro',
      data: { "userID": app.globalData.userID, "selfIntro": that.data.tempSelfIntro },
      success() {
        var toastText = '修改成功';
        that.setData(
          {
            selfIntro: that.data.tempSelfIntro
          }
        )
        wx.showToast({
          title: toastText,
          icon: '',
          duration: 2000
        })
      }
    })
  },
  confirm1: function () {
    var app = getApp()
    var that = this
    this.setData({
      hiddenmodalput1: true
    })
    console.log(that.data.tempNickName)
    wx.request({
      url: 'https://www.mingsonic.xyz/demo/superadmin/updateNickName',
      data: { "userID": app.globalData.userID, "nickName": that.data.tempNickName },
      success() {
        var toastText = '修改成功';
        that.setData(
          {
            nickName: that.data.tempNickName
          }
        )
        wx.showToast({
          title: toastText,
          icon: '',
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
    let that = this
    var app = getApp()
      that.setData({
        userInfo: app.globalData.userInfo
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
