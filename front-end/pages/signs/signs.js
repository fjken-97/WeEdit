Page({
 
  data: {
    address: "请点击选择进行定位",
    success: false,
    dates: '点击设置日期',
    // datess: '点击设置结束日期',
    times: '点击设置开始时间',
    timess: '点击设置结束时间',
    index: 0,
    BSSID: '1',
    SSID: '1',
    latitude: '1',
    longitude: '1',
    groupID: 0,
    groupIndex: 0,
    userGroup: [],
    hiddenName: true

  },
  staticData: {
    isWifi: 0,
    isLocation: 0,
    miaoshu: '1',
    thingsnime: '无',
    distance: 0,

  },

  onLoad: function(e) {
    var that = this
    var app = getApp()
    that.setData({
      userGroup: app.globalData.group,
      groupID: app.globalData.group[0].groupID
    }, )
  },

  clickMe: function(e) {
    this.setData({
      hiddenName: false
    })
  },

  clickMe2: function(e) {
    this.setData({
      hiddenName: true
    })
  },


  bindGroupChange: function(e) {
    var that = this
    this.setData({
      groupID: that.data.userGroup[e.detail.value].groupID,
      groupIndex: e.detail.value
    })
    console.log(that.data.userGroup[e.detail.value].groupID)
  },
  handleAddressClick() {
    wx.chooseLocation({
      success: this.handleChooseLocationSucc.bind(this)

    })
  },
  handleChooseLocationSucc(res) {
    this.setData({
      address: res.address,
      latitude: res.latitude,
      longitude: res.longitude
    });
    Object.assign(this.staticData, {
      latitude: res.latitude,
      longitude: res.longitude
    })
    console.log(res.latitude)
    console.log(this.data.latitude)
  },

  handleTypeChange(e) {
    
    var that = this;
    
    if (e.detail.value == 1) {
      wx.getConnectedWifi({
        success: function(res) {
          // console.log(res.wifi.BSSID)
          // console.log(1)
          that.setData({
            BSSID: res.wifi.BSSID,
            SSID: res.wifi.SSID
          })
          that.setData({
            isWifi:1
          })
        },
        fail: function(res) {
          wx.showToast({
            title: '请接入WIFI',
            icon: "none",
            duration: 800
          })
          // 
          that.setData({
            isWifi: 0
          })
        }
      })
    }

  },
  handleLocationChange: function(e) {
    this.setData({isLocation : e.detail.value})
  },

  handlethingsnameChange(e) {
    this.staticData.thingsname = e.detail.value;
  },

  handlemaioshuChange(e) {
    this.staticData.miaoshu = e.detail.value;
  },

  handledistanceChange(e) {
    this.staticData.distance = e.detail.value;
  },

  bindTimeChange: function(e) {
    this.setData({
      times: e.detail.value
    })
  },

  bindTimesChange: function(e) {
    this.setData({
      timess: e.detail.value
    })
  },

  bindDateChange: function(e) {
    this.setData({
      dates: e.detail.value
    })
  },

  bindDatesChange: function(e) {
    this.setData({
      datess: e.detail.value,
    })
  },

  handleSubmit() {
    var that = this;
    if (!this.data.hiddenName && (this.data.address === "请点击选择进行定位" || !this.data.address)) {
      wx.showToast({
        title: '请选择地址',
        icon: "",
        duration: 800
      })
      return;
    }

    if (!this.staticData.thingsname) {
      wx.showToast({
        title: '请填写事件名',
        icon: "",
        duration: 800
      })
      return;
    }

    if (!this.data.hiddenName && !this.staticData.distance) {
      wx.showToast({
        title: '请填写签到范围',
        icon: "",
        duration: 800
      })
      return;


    }

    if (this.data.dates === "点击设置开始日期" || !this.data.dates) {
      wx.showToast({
        title: '请设置开始日期',
        icon: "",
        duration: 800
      })
      return;
    }


    if (this.data.times === "点击设置开始时间" || !this.data.times) {
      wx.showToast({
        title: '请设置开始时间',
        icon: "",
        duration: 800
      })
      return;
    }

    if (this.data.timess === "点击设置结束时间" || !this.data.timess) {
      wx.showToast({
        title: '请设置结束时间',
        icon: "",
        duration: 800
      })
      return;
    }

    if (this.data.times > this.data.timess) {
      wx.showToast({
        title: '请核对时间',
        icon: "",
        duration: 800
      })
      return;
    }

    if (this.data.dates > this.data.datess) {
      wx.showToast({
        title: '请核对日期',
        icon: "loading",
        duration: 800
      })
      return;
    }


    var app = getApp();
    wx.request({
      url: 'https://www.mingsonic.xyz/demo/superadmin/addSignInfo',
      data: {
        "signTitle": this.staticData.thingsname,
        "signIntro": this.staticData.miaoshu,
        "signDate": that.data.dates,
        "signStart": that.data.times,
        "signFinish": that.data.timess,
        "signLongitude": that.data.longitude,
        "signLatitude": that.data.latitude,
        "signDistance": that.staticData.distance,
        "groupID": that.data.groupID,
        "userID": app.globalData.userID,
        "BSSID": that.data.BSSID,
        "SSID": that.data.SSID,
        "signPlace": that.data.address,
        "isWifi": that.data.isWifi,
        "isLocation": that.data.isLocation
      },
      method: "GET",
      success: function(e) {
        console.log(e)
        wx.switchTab({
          url: '/pages/index/index',
          success() {
            wx.showToast({
              title: '发起签到成功',
              icon: '',
              duration: 2000
            })
          }
        })

      }
    })
  },
  handleSubmitSucc(res) {
    if (res.data && res.data.ret) {
      this.setData({
        success: true
      })
    }
  },


  handleBackTap() {
    wx.navigateBack()
  }

})