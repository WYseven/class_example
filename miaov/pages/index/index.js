//index.js
//获取应用实例
const app = getApp();
const url = 'https://api.douban.com/v2/movie/top250';

Page({
  data:{
    text:"loading...",
    hidden:false
  },
  tapHandle:function (){
    console.log( this );  
  },
  onLoad:function (){
    var _this = this;
    //请求地址
    wx.request({
      url:url,
      header:{
        'Content-Type': 'application/json'
      },
      success:function (data){
          _this.setData({text:data.data.title,hidden:true});
      }
    })
  }
})



/*var app = getApp()
Page({
  data: {
    motto: 'Hello miaov3',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
  	//调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
      that.update()
    })
  }
})*/
