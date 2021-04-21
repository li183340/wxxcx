// pages/recipelist/recipelist.js
import {
  get
} from '../../utils/db'
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    week: ["一", "二", "三", "四", "五", "六", "天"],
    day: [],
    xin1: [],
    xin2: [],
    Xin1: [],
    Xin2: [],
    show:true
  },

  times(addtime) {
    let time = new Date(addtime)
    let day = time.getDay()
    this.setData({
      day: [
        ...this.data.day,
        day
      ]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.value) {
      this.getlist(options.value)
    } 
    if(options.id){
      this.getlistid(options.id)
    }
    
  },
  async getlistid(id) {
    let res = await get('menu', {
      typeId: id
    })
    this.setData({
      list: res.data,
      show:false
    })
    this.star()
  },
  async getlist(value) {
    let res = await db.collection('menu').where({
      menuName: db.RegExp({
        regexp: value,
        options: 'i',
      })
    }).get()
    this.setData({
      list: res.data,
      show:false
    })
    this.star()
  },

  //星级
  star() {
    for (let i = 0; i < this.data.list.length; i++) {
      this.times(this.data.list[i].addtime)
      let follows = this.data.list[i].follows
      if (follows / 3 < 1) {
        this.setData({
          xin1: [
            ...this.data.xin1,
            []
          ],
          xin2: [
            ...this.data.xin2,
            [1, 2, 3, 4, 5]
          ]
        })
      } else if (follows / 3 >= 1 && follows / 3 < 2) {
        this.setData({
          xin1: [
            ...this.data.xin1,
            [1]
          ],
          xin2: [
            ...this.data.xin2,
            [1, 2, 3, 4]
          ]
        })
      } else if (follows / 3 >= 2 && follows / 3 < 3) {
        this.setData({
          xin1: [
            ...this.data.xin1,
            [1, 2]
          ],
          xin2: [
            ...this.data.xin2,
            [1, 2, 3]
          ]
        })
      } else if (follows / 3 >= 3 && follows / 3 < 4) {
        this.setData({
          xin1: [
            ...this.data.xin1,
            [1, 2, 3]
          ],
          xin2: [
            ...this.data.xin2,
            [1, 2]
          ]
        })
      } else if (follows / 3 >= 4 && follows / 3 < 5) {
        this.setData({
          xin1: [
            ...this.data.xin1,
            [1, 2, 3, 4]
          ],
          xin2: [
            ...this.data.xin2,
            [1]
          ]
        })
      } else {
        this.setData({
          xin1: [
            ...this.data.xin1,
            [1, 2, 3, 4, 5]
          ],
          xin2: [
            ...this.data.xin2,
            []
          ]
        })
      }
    }
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