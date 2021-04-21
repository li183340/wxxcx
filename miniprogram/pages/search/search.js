// pages/search/search.js
import {
  get
} from '../../utils/db'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',

  },
  int(e) {
    this.data.value = e.detail.value
  },

  //搜索
  search() {
    let value = this.data.value
    let arr = wx.getStorageSync('keyword') || []
    let index = arr.findIndex(item => {
      return item == value
    })
    if (index != -1) {
      arr.splice(index, 1)
    }
    arr.unshift(value)
    wx.setStorageSync('keyword', arr)
    if (!this.data.value) {
      wx.showToast({
        title: "你没有输入内容哦！",
        icon: 'none',
        duration: 2500
      })
    } else {
      wx.navigateTo({
        url: '/pages/recipelist/recipelist?value=' + this.data.value,
      })
    }
  },
  


  /**
   * 生命周期函数--监听页面加载
   */

  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var arr = wx.getStorageSync('keyword') || []
    this.setData({
      arr
    })
    console.log(this.data.arr)
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