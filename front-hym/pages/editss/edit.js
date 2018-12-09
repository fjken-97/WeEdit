// components/xing-editor.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //图片上传相关属性，参考wx.uploadFile
    imageUploadUrl: String,
    imageUploadName: String,
    imageUploadHeader: Object,
    imageUploadFormData: Object,
    imageUploadKeyChain: String, //例：'image.url'

    //是否在选择图片后立即上传
    // uploadImageWhenChoose: {
    //   type: Boolean,
    //   value: false,
    // },

    //输入内容
    nodes: Array,
    html: String,

    //内容输出格式，参考rich-text组件，默认为节点列表
    outputType: {
      type: String,
      value: 'html',
    },

    buttonBackgroundColor: {
      type: String,
      value: '#409EFF',
    },

    buttonTextColor: {
      type: String,
      value: '#fff',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    windowHeight: 0,
    nodeList: [],
    textBufferPool: [],
    Editname:"文章标题",
    arc_list: [],
  },
  onLoad: function () {
    var that = this
    //请求接口
    wx.request({
      url: config.service.indexListUrl,//配置文件中定义的首页接口
      data: {
        type: 'xx',
        key: '123456'
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //请求成功后的回调
        if (res.data.code === 1) {
          //赋值
          that.setData({
            arc_list: res.data.list,
          })

        } else {
          console.log("获取失败");
        }
      }

    })
  },
  methods: {
   
    handleSubmit() {
      wx.navigateTo({
        url: '/pages/newedits/newedit',
      })
    },
    handleSubmits() {
      
    }
  }
  

})