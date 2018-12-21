var app = getApp()
Page({
  data: {
    createFace: 'http://img.joyowo.com/formal/cms/banner/2016/12/82e4218da7b49447752f88999915559c.jpg',
    // detailImg: 'http://img.joyowo.com/formal/cms/banner/2016/12/82e4218da7b49447752f88999915559c.jpg',
    radioItems: [],
    checkboxMax: 15,
    checkboxItems: [],
    progress: 0,
    disabled: false,
    voteAttri:0,
    voteID:0,
    isFaceless:0,
    voteTitle:'',
    voteContent:'',
    choiceNum:[],
    voteComm:''
  },

  addVoteComm: function (e) {

    this.data.voteComm = e.detail.value
    console.log(this.data.voteComm)
  },

  radioChange: function (e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value);
        this.data.choiceNum = e.detail.value
        var radioItems = this.data.radioItems;
        for (var i = 0, len = radioItems.length; i < len; ++i) {
            radioItems[i].checked = radioItems[i].value == e.detail.value;
        }

        this.setData({
            radioItems: radioItems
        });
    },

  checkboxChange: function (e) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value);

        
        this.data.choiceNum=e.detail.value
        let checkboxItems = this.data.checkboxItems;
        let checkboxMax = this.data.checkboxMax;
        
        let values = e.detail.value;
      
        if( checkboxMax < values.length  ) {
            values = values.splice(0, checkboxMax);


            console.log(values)

            for ( let j = 0; j <  checkboxItems.length; j++) {
                checkboxItems[j].checked = false;

                for (let i = 0; i < values.length; i++){
                    if ( checkboxItems[j].value ==  values[i]) {
                        checkboxItems[j].checked = true;
                    }
                }
            }

            console.log(checkboxItems)

        }else {
            for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
                checkboxItems[i].checked = false;

                for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
                    if(checkboxItems[i].value == values[j]){
                    
                        checkboxItems[i].checked = true;
                        break;
                    }
                }
            }
        }

        this.setData({
            checkboxItems: checkboxItems
        });

    },

  upload: function(){
        if(this.data.disabled) return;

        this.setData({
            progress: 0,
            disabled: true
        });
        _next.call(this);
    },

  onLoad:function(options){
    var that = this
    that.setData(
      {voteID:options.voteID,
      voteAttri:options.voteAttri,
      isFaceless:options.isFaceless,
      voteTitle:options.voteTitle,
      voteContent:options.voteContent,
      createFace:options.avatarUrl
      }
    )
  },

  vote: function () {
    var that = this
    var app = getApp()
    var numList=that.data.choiceNum
    var judge = 0;
    for(var i = 0;i<numList.length;i++)
    {wx.request({
      url: 'https://www.mingsonic.xyz/demo/superadmin/vote',
      data: {
        "voteID": that.data.voteID, "userID": app.globalData.userID, "num": numList[i]
      },
      method: 'GET',
      success: function (res) {
        if (res.data == 0) {
          judge++
          if (judge == 1&&that.data.voteComm!='') {
            wx.request({
              url: 'https://www.mingsonic.xyz/demo/superadmin/voteComm',
              data: {
                "voteID": that.data.voteID, "userID": app.globalData.userID, "comm": that.data.voteComm
              },
              success(res) {
                wx.switchTab({
                  url: '/pages/index/index',
                  success(){
                    var toastText = '投票成功';
                    wx.showToast({
                      title: toastText,
                      icon: '',
                      duration: 2000
                    })
                  }
                })
              }
            })
          }
        } else if (res.data == 1) {
          var toastText = '超过时限';
          wx.showToast({
            title: toastText,
            icon: 'none',
            duration: 2000
          })
         
        } else if (res.data == 2) {
          var toastText = '重复投票';
          wx.showToast({
            title: toastText,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })}
  },
  onShow: function (e) {
    var that = this;
    var _list = [];
    wx.request({
      url: 'https://www.mingsonic.xyz/demo/superadmin/queryChoiceByID',
      data: {
        "voteID": that.data.voteID
      },
      method: 'GET',
      success: function (res) {
        var list = res.data.VoteChoice;
        var voteAttri = that.data.voteAttri;
        if (list == null) {
          var toastText = '获取失败';
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000
          })
        } else {
          for (var i = 0; i < list.length; i++) {
            _list.push({ value: list[i].choiceNumber, name: list[i].choice });
          }
          if(voteAttri==1){
          that.setData(
            {
              radioItems: _list
            })} else {
            that.setData(
              {
                checkboxItems: _list
              })
            }
        }
      }
    })
  },
})
