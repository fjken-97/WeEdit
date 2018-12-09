Page({
    data: {
        optionList: [
            {
                icon: ''
            },
            {
                icon: ''
            }
        ],

        showAddBtn: 1,

        date: "2018-9-30",
        time: "12:00",

        voteType: ['多选', '单选'],
        userGroup:[],
        voteTypeIndex: 1,
        isChecked:1,
        files: [],
        voteTitle:"2",
        voteContent:"1",
        groupID:0,
        groupIndex:0


    },
    
  onLoad:function(e){
    var that = this
    var app = getApp()
  that.setData(
    {
      userGroup:app.globalData.group,
      groupID: app.globalData.group[0].groupID
    },
    )
  },
    showTopTips: function(){
        var that = this;
        this.setData({
            showTopTips: true
        });
        setTimeout(function(){
            that.setData({
                showTopTips: false
            });
        }, 3000);
    },
    bindVoteTypeChange: function (e){
        this.setData({
            voteTypeIndex: e.detail.value
        })
    },

  bindGroupChange: function (e) {
    var that = this
    this.setData({
      groupID: that.data.userGroup[e.detail.value].groupID,
      groupIndex:e.detail.value
    })
    console.log(that.data.userGroup[e.detail.value].groupID)
  },

    bindTimeChange: function (e) {
        this.setData({
            time: e.detail.value
        })
    },
  listenerSwitch: function (e) {
    if (e.detail.value) {
      this.setData({
        isChecked: 1
      })
    }
    else {
      this.setData({
        isChecked: 0
      })
    }
  },
    bindDateChange: function (e) {
        this.setData({
            date: e.detail.value
        })
    },
    recordValue: function (e){
        let _optionList = this.data.optionList;
        let _index = e.target.dataset.index;
        let value = e.detail.value;
        _optionList[_index].value = value;

        this.setData({optionList: _optionList});

    },
    addOption: function (e){
        let _optionList = this.data.optionList;

        _optionList.push({icon: '/image/common/5.png'})
        this.setData({optionList: _optionList});

        // 选项大于15个后移除添加按钮
        if(_optionList.length >= 15) { 
            this.setData({showAddBtn: 0});
        }

        // 更新投票选项
       // this.updateVoteType();

    },
    delOption: function (e){
        let _index = e.target.dataset.index;
        let _optionList = this.data.optionList;

        _optionList.splice(_index, 1);

        this.setData({optionList: _optionList});

        // 更新投票选项
        //this.updateVoteType();

    },
    chooseImage: function (e) {
        var that = this;
        wx.chooseImage({
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            count: 1, // 最多可以选择的图片张数
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                that.setData({
                    files: that.data.files.concat(res.tempFilePaths)
                });
            }
        })
    },
    previewImage: function(e){
        wx.previewImage({
            current: e.currentTarget.id, // 当前显示图片的http链接
            urls: this.data.files // 需要预览的图片http链接列表
        })
    },

    addVoteContent:function(e){
      
        this.data.voteContent=e.detail.value
     
    },

  addVoteTitle: function (e) {
   
      this.data.voteTitle=e.detail.value
    
  },

  launchVote: function (e) {
    var that = this;
    var app = getApp()
    wx.request({
      url: 'http://127.0.0.1:8082/demo/superadmin/launchVote',
      data: {
        "userID": app.globalData.userID, "deadLine": that.data.date + " " + that.data.time, "isFaceless":      that.data.isChecked, "voteAttri": that.data.voteTypeIndex, "groupID": that.data.groupID, "voteTitle":that.data.voteTitle, "voteContent": that.data.voteContent
      },
      method: 'GET',
      success: function (res)
       {
        if(res.data!=null){
          for (var i = 0; i < that.data.optionList.length; i++) {
            wx.request({
              url: 'http://127.0.0.1:8082/demo/superadmin/addChoice',
              data: {
                "voteID": res.data, "choice": that.data.optionList[i].value, "num": i + 1
              },
              method: 'GET',
              success(res){
                console.log(res.data)
              }
            })
          }
        }
        var toastText = '发起投票成功';
        wx.showToast({
          title: toastText,
          icon: '',
          duration: 2000
        })
       }
      
    })
 
    }
});