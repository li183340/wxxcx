// pages/personal/personal.js
import {get, getById} from "../../utils/db"
const db = wx.cloud.database()
const users = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user:"",
    show:true,
    menulist:[],
    typelist:[],
    active:"1",
    followlist:[]
  },
  //登陆
 async login(e){
   await this.setData({
      user:users.globalData.userInfo,
      show:false
    })
    db.collection('menu').where({_openid:users.globalData.openid}).get().then(res=>{
      this.setData({
        menulist:res.data
      })
    })
    db.collection('type').get().then(res=>{
      this.setData({
        typelist:res.data
      })
    })
    
  },
  
//跳转到pbmenu
  pbmenu(){
    wx.navigateTo({
      url: '/pages/pbmenu/pbmenu',
    })
  },
  // 选项卡
  click(e){
    this.setData({
      active:e.target.id
    })
  },

  fbcpfl(){
    wx.navigateTo({
      url: '/pages/pbmenutype/pbmenutype',
    })
  },

  look(){
    
  },
  //关注
  async getfollow(){
    let menuid=[]
    let list=[]
    let res = await get("follow",{_openid:users.globalData.openid})
   res.data.forEach(item=>{
      menuid.push(item.menuId)
    })
    console.log(res)
    for(let i=0;i<menuid.length;i++){
        let result = await getById("menu",menuid[i])
        list.push(result.data)
    }
    await this.setData({
        followlist:list
    })
  },

  toDetail(e){
    wx.navigateTo({
      url: '/pages/recipeDetail/recipeDetail?id='+e.currentTarget.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getfollow()
    
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