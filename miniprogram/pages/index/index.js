import {get,getById} from '../../utils/db'
const db = wx.cloud.database()
Page({
  data:{
    menulist:[],
    week:["一","二","三","四","五","六","天"],
    day:[],
    page:0,
    pageSize:5,
    value:''
  },

  onLoad(){
    let {page,pageSize}=this.data
    this.getlist(page,pageSize)
  },
  //触底加载
  onReachBottom(){
    this.data.page+=1;
    let pageSize = this.data.pageSize;
    this.getlist(this.data.page,pageSize)
  },
  //获取列表
  async getlist(page,pageSize){
    let res = await db.collection('menu').skip(page*pageSize).limit(pageSize).get()
    
    this.setData({
      menulist:this.data.menulist.concat(res.data)
    })
    for(let i =0;i<this.data.menulist.length;i++){
        this.times(this.data.menulist[i].addtime)
    }
  },
  //比大小
  bi(a,b){
    return a.views-b.views
  },
  //点击到详情
  click(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/recipeDetail/recipeDetail?id='+e.currentTarget.id,
    })
  },
  times(addtime){
    let time = new Date(addtime)
    let day = time.getDay()
      this.setData({
        day:[
          ...this.data.day,
          day
        ]
      })
  },
//到分类
  topmt(){
    wx.navigateTo({
      url: '/pages/typelist/typelist',
    })
  },
  //到菜谱里
  toreclist(){
    wx.navigateTo({
      url: '/pages/recipelist/recipelist?id=7498b5fe5f43b7bc003b348910fb4dbf',
    })
  },

  int(e){
    this.data.value = e.detail.value
  },
  search(){
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
  }
})
