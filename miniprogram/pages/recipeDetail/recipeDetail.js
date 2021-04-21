// pages/recipeDetail/recipeDetail.js
import {
  getById,
  get,
  add,
  del,
  edit
} from '../../utils/db'
const user = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menu: {},
    week: ["一", "二", "三", "四", "五", "六", "天"],
    day: 0,
    follow: {
      addtime: "",
      img: "/static/index/tj1.png",
      concern: '已关注',
      menuId: ""
    },
    img: "/static/index/tj.png",
    concern: '未关注',
    isFollow:false,
    delid:"",
    addid:""
  },
  //关注
  guanzhu() {
    if(!this.data.isFollow){
      this.setData({
        img: this.data.follow.img,
        concern: this.data.follow.concern,
        isFollow:true,
        follow:{
          ...this.data.follow,
          addtime:new Date().getTime()
        }
      })
      this.addfollow()
    }else{
      this.delfollow()
    }
    
    
  },
  //添加关注
  async addfollow(){
    let res=await add("follow",this.data.follow)
    this.setData({
      id:res._id
    })
    this.editone(this.data.menu._id,{follows:this.data.menu.follows+1})

  },
  //取消关注
  async delfollow(){
    await del('follow',this.data.id)
    this.setData({
      img:'/static/index/tj.png',
      concern: '未关注',
      isFollow:false
    })
    this.editone(this.data.menu._id,{follows:this.data.menu.follows+1})
  },
  //获取数据
  async getone(id) {
    let res = await getById("menu", id)
    console.log(res)
    this.setData({
      menu: res.data
    }, () => {
      this.times()
      this.editone(id,{views:this.data.menu.views + 1})
    })
  },
  //修改数据
  async editone(id,_data) {
      await edit("menu",id,_data)
  },
  
  async getfollow(id){
    let res= await get("follow",{menuId:id,_openid:user.globalData.openid})
    this.setData({
      id:res.data[0]?res.data[0]._id:"",
      isFollow:Boolean(res.data.length) 
    },()=>{console.log(this.data.id)})
    if(res.data.length){
      this.setData({
        concern:this.data.follow.concern,
        img:this.data.follow.img
      })
    } 
  },
  
  times() {
    let time = new Date(this.data.menu.addtime)
    let day = time.getDay()
    this.setData({
      day: day
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getone(options.id)
    this.setData({
      follow:{
        ...this.data.follow,
        menuId:options.id
      }
    })
    this.getfollow(options.id)
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