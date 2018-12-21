// pages/viewer/viewer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textId: undefined,
    contentId: undefined,
    textTitle: '',
    textAuthorId: '',
    textDate: '',
    contentList: [],
    commentList: [],
    contentAbout: '',
    changeInfo: '',
    animationData: "",
    showModalStatus: false,
    address: "",
    commentId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    this.setData({
      textId: options.textId,
      nickName:options.nickName
    });
    if (options.textId == undefined) {
      return;
    }
    wx.request({
      url: 'https://www.mingsonic.xyz/demo/weedit/gettextheadbyid',
      data: {
        "textId": options.textId
      },
      method: 'GET',
      success: function(res) {
        var text = res.data.text;
        if (text == undefined) {
          var text = '获取数据失败' + res.data.errMsg;
          wx.showToast({
            title: text,
            icon: '',
            duration: 2000
          });
        } else {
          that.setData({
            textAuthorId: text.textAuthorId,
            textDate: text.textDate,
            textTitle: text.textTitle
          })
          wx.request({
            url: 'https://www.mingsonic.xyz/demo/weedit/listtextcontent',
            data: {
              "textId": options.textId
            },
            method: 'GET',
            header: {
              'Content-Type': 'application/json'
            },
            success: function(res) {
              var list = res.data.contentList;
              if (list != null) {
                that.setData({
                  contentList: list
                })
              }
              console.log(res.data)
            }
          })
          wx.request({
            url: 'https://www.mingsonic.xyz/demo/weedit/listtextcomment',
            data: {
              "textId": options.textId,
            },
            method: 'GET',
            header: {
              'Content-Type': 'application/json'
            },
            success: function(res) {
              var list = res.data.commentList;
              if (list != null) {
                that.setData({
                  commentList: list
                })
              }
              console.log(res.data)
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

  },

  showModal: function(e) {
    // var contentId = e.currentTarget.dataset.contentid
    // var contentIndex = e.currentTarget.dataset.index
    this.setData({
      contentAbout: e.currentTarget.dataset.content,
      contentId: e.currentTarget.dataset.contentid
    });
    // 显示遮罩层  
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 20)
    // },//myview 为点击控件的bindtap 应用时写在对应控件中就好
    // myview: function () {
    //   if (this.data.showModalStatus) {
    //     this.hideModal();
    //   } else {
    //     this.showModal();
    //   }
  },

  hideModal: function() {
    // 隐藏遮罩层  
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 20)
  },

  click_cancel: function() {
    console.log("点击取消");
    this.hideModal();
  },

  click_ok: function() {
    var that = this;
    var app = getApp();
    wx.request({
      url: 'https://www.mingsonic.xyz/demo/weedit/addtextcomment',
      data: {
        "commentContent": that.data.changeInfo,
        "textId": that.data.textId,
        "contentId": that.data.contentId,
        "commentEditorId": app.globalData.userID
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
      }
    })
    this.hideModal();
    this.onLoad();
  },
  input_content: function(e) {
    this.setData({
      changeInfo: e.detail.value
    });
    var that = this;
  },
  applyChange:function(e){
    var that = this;
    wx.request({
      url: 'https://www.mingsonic.xyz/demo/weedit/modifycontent',
      data: {
        "contentId": e.currentTarget.dataset.contentid,
        "contentAbout": e.currentTarget.dataset.content,
        "textId": e.currentTarget.dataset.textid
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  }
})