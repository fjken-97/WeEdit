//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this
    // 登录

    wx.login({
      success: function (res) {
       
        that.globalData.code = res.code;//登录凭证
        if (that.globalData.code) {
          //2、调用获取用户信息接口
          // 查看是否授权
          wx.getUserInfo({
            success: function (res) {
              that.globalData.encryptedData = res.encryptedData
              that.globalData.iv = res.iv
              console.log('[INFO] app.js/ ', { encryptedData: res.encryptedData, iv: res.iv, code: that.globalData.code })
              //3.请求自己的服务器，解密用户信息 获取unionId等加密信息
              wx.request({
                url: 'https://www.mingsonic.xyz/demo/superadmin/decodeUserInfo',//自己的服务接口地址
                method: 'get',
                header: {
                  "Content-Type": "applciation/json"
                },
                data: { encryptedData: res.encryptedData, iv: res.iv, code: that.globalData.code },
                success: function (data) {

                  //4.解密成功后 获取自己服务器返回的结果
                  if (data.data.status == 1) {
                    var userInfos = data.data.userInfo;
                    that.globalData.openId = userInfos.openId;
                    that.globalData.userID = userInfos.openId;
                    console.log(that.globalData.userID);
                    console.log('[INFO] app.js/ userInfo:', userInfos)
                    wx.request({
                      url: 'https://www.mingsonic.xyz/demo/superadmin/getGroupByUserID',
                      data: {
                        "userID": that.globalData.userID
                      },
                      method: 'GET',
                      success: function (res) {

                        that.globalData.group = res.data.GroupInfoByUserID

                      }
                    })
                  } else {
                    console.log('[INFO] app.js/ 解密失败')
                  }
                },
                fail: function () {
                  console.log('[INFO] app.js/ 系统错误')
                }
              })
            },
            fail: function () {
              console.log('[INFO] app.js/ 获取用户信息失败')
            }
          })
        } else {
          console.log('[INFO] app.js/ 获取用户登录态失败！' + r.errMsg)
        }
      },
      fail: function () {
        console.log('[INFO] app.js/ 登陆失败')
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    userID:'osh2p5bbzxei-0vp8MTdHotyIYuQ',
    group:[],
    encryptedData:'',
    iv:'',
    code:'',
    openId:'',

  }
})