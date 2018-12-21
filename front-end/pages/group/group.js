// pages/group/group.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    group: [],
    hiddenmodalput: true,
    hiddenmodalput1: true,
    hiddenmodalput2: true,
    groupName: '',
    groupIntro: '',
    groupSecret: '',
    groupSecret1: '',
    groupID: '',
    groupID1: '',
    tempGroupID: '',
    icon60: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAeFBMVEUAwAD///+U5ZTc9twOww7G8MYwzDCH4YcfyR9x23Hw+/DY9dhm2WZG0kbT9NP0/PTL8sux7LFe115T1VM+zz7i+OIXxhes6qxr2mvA8MCe6J6M4oz6/frr+us5zjn2/fa67rqB4IF13XWn6ad83nxa1loqyirn+eccHxx4AAAC/klEQVRo3u2W2ZKiQBBF8wpCNSCyLwri7v//4bRIFVXoTBBB+DAReV5sG6lTXDITiGEYhmEYhmEYhmEYhmEY5v9i5fsZGRx9PyGDne8f6K9cfd+mKXe1yNG/0CcqYE86AkBMBh66f20deBc7wA/1WFiTwvSEpBMA2JJOBsSLxe/4QEEaJRrASP8EVF8Q74GbmevKg0saa0B8QbwBdjRyADYxIhqxAZ++IKYtciPXLQVG+imw+oo4Bu56rjEJ4GYsvPmKOAB+xlz7L5aevqUXuePWVhvWJ4eWiwUQ67mK51qPj4dFDMlRLBZTqF3SDvmr4BwtkECu5gHWPkmDfQh02WLxXuvbvC8ku8F57GsI5e0CmUwLz1kq3kD17R1In5816rGvQ5VMk5FEtIiWislTffuDpl/k/PzscdQsv8r9qWq4LRWX6tQYtTxvI3XyrwdyQxChXioOngH3dLgOFjk0all56XRi/wDFQrGQU3Os5t0wJu1GNtNKHdPqYaGYQuRDfbfDf26AGLYSyGS3ZAK4S8XuoAlxGSdYMKwqZKM9XJMtyqXi7HX/CiAZS6d8bSVUz5J36mEMFDTlAFQzxOT1dzLRljjB6+++ejFqka+mXIe6F59mw22OuOw1F4T6lg/9VjL1rLDoI9Xzl1MSYDNHnPQnt3D1EE7PrXjye/3pVpr1Z45hMUdcACc5NVQI0bOdS1WA0wuz73e7/5TNqBPhQXPEFGJNV2zNqWI7QKBd2Gn6AiBko02zuAOXeWIXjV0jNqdKegaE/kJQ6Bfs4aju04lMLkA2T5wBSYPKDGF3RKhFYEa6A1L1LG2yacmsaZ6YPOSAMKNsO+N5dNTfkc5Aqe26uxHpx7ZirvgCwJpWq/lmX1hA7LyabQ34tt5RiJKXSwQ+0KU0V5xg+hZrd4Bn1n4EID+WkQdgLfRNtvil9SPfwy+WQ7PFBWQz6dGWZBLkeJFXZGCfLUjCgGgqXo5TuSu3cugdcTv/HjqnBTEMwzAMwzAMwzAMwzAMw/zf/AFbXiOA6frlMAAAAABJRU5ErkJggg=='
,

  },


  nameChange: function(e) {
    this.setData({
      groupName: e.detail.value
    })
  },

  NumChange: function(e) {
    this.setData({
      groupNum: e.detail.value
    })
  },
  secretChange: function(e) {
    this.setData({
      groupSecret: e.detail.value
    })
  },
  secretChange1: function(e) {
    this.setData({
      groupSecret1: e.detail.value
    })
  },
  groupIDChange1: function(e) {
    this.setData({
      groupID1: e.detail.value
    })
  },
  cancel1: function() {
    this.setData({
      hiddenmodalput1: true
    });
  },
  cancel2: function() {
    this.setData({
      hiddenmodalput2: true
    });
  },


  introChange: function(e) {
    this.setData({
      groupIntro: e.detail.value
    })
  },

  modalinput2: function(e) {
    this.setData({
      hiddenmodalput2: !this.data.hiddenmodalput2,
      tempGroupID: e.currentTarget.id
    })
    console.log(e)
  },
  modalinput1: function() {
    this.setData({
      hiddenmodalput1: !this.data.hiddenmodalput1
    })
  },

  modalinput: function() {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //取消按钮  
  cancel: function() {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认  
  confirm: function() {
    var app = getApp()
    var that = this
    this.setData({
      hiddenmodalput: true
    })
    wx.request({
      url: 'https://www.mingsonic.xyz/demo/superadmin/addGroup',
      data: {
        "userID": app.globalData.userID,
        "groupName": that.data.groupName,
        "groupIntro": that.data.groupIntro,
        "groupSecret": that.data.groupSecret
      },
      success() {
        var toastText = '创建小组成功';
        that.onLoad()
        wx.showToast({
          title: toastText,
          icon: '',
          duration: 2000
        })
      }
    })
  },
  confirm1: function() {
    var app = getApp()
    var that = this
    this.setData({
      hiddenmodalput1: true
    })
    wx.request({
      url: 'https://www.mingsonic.xyz/demo/superadmin/addMemberByJudge',
      data: {
        "groupID": that.data.tempGroupID,
        "userID": app.globalData.userID,
        "groupSecret": that.data.groupSecret1
      },
      success(res) {
        that.onLoad()
      }

    })
  },
  confirm2: function() {
    var app = getApp()
    var that = this
    this.setData({
      hiddenmodalput2: true
    })
    wx.request({
      url: 'https://www.mingsonic.xyz/demo/superadmin/removeGroup',
      data: {
        "groupID": that.data.tempGroupID
      },
      success(res) {
        wx.showToast({
          title: '删除成功',
          duration: 2000
        })
        that.onLoad()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var app = getApp()
    wx.request({
      url: 'https://www.mingsonic.xyz/demo/superadmin/getGroupByUserID',
      data: {
        "userID": app.globalData.userID
      },
      method: 'GET',
      success: function(res) {
        that.setData({
          group: res.data.GroupInfoByUserID
        })


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
    var that = this
    var app = getApp()
    that.setData({
      group: app.globalData.group,
      userID: app.globalData.userID
    })
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