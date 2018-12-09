
Page({

  data: {
    success: false,
    messageName: "调回来的文章名",
    message:"gbfbddjasvvkbnzhvjhjndchhjihchcbnkcvhsvcjskosjhgbkkjhgfkjhgfdsfghjkhgfdsffghjklkjhfdsddfghjklldfsfghjklj"
  },

  staticData: {

  },

  
  bindTextnameBlur: function (e) {
    var that = this;
    that.setData({
      details: e.detail.value
    });
  },

  bindTextmessageBlur: function (e) {
    var that = this;
    that.setData({
      details: e.detail.value
    });
  },

  
  handleSubmit() {
    wx.navigateTo({
      url: '/components/login/login',
    })
  }

})
