// pages/pbmenu/pbmenu.js
const db = wx.cloud.database()
let user = getApp()
import {
  multiUpload
} from '../../utils/tools'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typelist: [],
    menu: {
      menuName: "菜谱名称",
      typeId: "菜谱分类",
      fileIds: [],
      avatarUrl:"",
      nickName:"",
      views: "访问数",
      follows: "收藏数",
      desc: "详情",
      status: "( 代表是否删除 1 代表正常、2代表用",
      addtime: "添加时间",
    },
    files: []
  },
  //===================
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },
  selectFile(files) {
    console.log('files', files)
    // 返回false可以阻止某次文件上传
  },
  uplaodFile(files) {
    console.log('upload files', files)
    // 文件上传的函数，返回一个promise
    this.setData({
      files: [
        ...this.data.files,
        files.tempFilePaths[0]
      ]
    })
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          urls: files.tempFilePaths
        })
      }, 1000)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection("type").get().then(res => {
      this.setData({
        typelist: res.data,
      })
    })
    
    this.setData({
      selectFile: this.selectFile.bind(this),
      uplaodFile: this.uplaodFile.bind(this)
    })
    this.setData({
      menu:{
        ...this.data.menu,
        
      }
    })
    
  },
  // 添加图片将图片路径存在data在
  async addFiles() {
    //打开手机相册，选择多张图片，获取临时路径
    var result = await wx.chooseImage({
      count: 9,
    })
    this.setData({
      files: result.tempFilePaths
    })
  },
  //发布
  async form(e) {
    let val = e.detail.value
    var images = await multiUpload(this.data.files);
    images = images.map(item => {
      return item.fileID
    })
    this.setData({
      menu: {
        ...val,
        nickName:user.globalData.userInfo.nickName,
        avatarUrl:user.globalData.userInfo.avatarUrl,
        views: 0,
        follows: 0,
        status: 2,
        addtime: new Date().getTime(),
        fileIds: images
      }
    },()=>{
      db.collection('menu').add({
        data:this.data.menu
      })
      wx.reLaunch({
        url: '/pages/index/index',
      })
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