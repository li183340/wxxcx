// pages/pbmenutype/pbmenutype.js
const db= wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    showadd:false,
    showedit:false,
    valueadd:"",
    valueedit:"",
    id:""
  },
  //添加
  addShow(){
    this.setData({
      showadd:true
    })
  },
  addint(e){
    this.setData({
      valueadd:e.detail.value
    })
  },
  add(){
    db.collection("type").add({
      data:{"typeName":this.data.valueadd}
    })
    this.setData({
      showadd:false,
      valueadd:""
    },()=>{this.get()})
  },

//修改
editShow(e){
  this.setData({
    showedit:true,
    id:e.target.id
  })
  db.collection("type").doc(e.target.id).get().then(res=>{
    console.log(res)
        this.setData({
          valueedit:res.data.typeName
        })
  })
},
editint(e){
  this.setData({
    valueedit:e.detail.value
  })
},
edit(){
  db.collection("type").doc(this.data.id).update({
    data:{typeName:this.data.valueedit}
  }).then(res=>{
    this.setData({
      valueedit:"",
      id:"",
      showedit:false
    },()=>{this.get()})
    })
},
del(e){
  db.collection("type").doc(e.target.id).remove()
  this.get()
},
//获取列表
get(){
  db.collection("type").get().then(res=>{
    this.setData({
      list:res.data
    })
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.get()
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