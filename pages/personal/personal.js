// pages/personal/personal.js
import request from '../../utils/request'

let startY = 0 
let moveY = 0
let moveDistance = 0
Page({

  /**
   * Page initial data
   */
  data: {
    coverTransform: 'translateY(0rpx)',
    coverTransition:'',
    userInfo: {}
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    //获取登陆的用户信息
    let userInfo = wx.getStorageSync('userInfo')
    if(userInfo){
      this.setData({
        userInfo: JSON.parse(userInfo)
      })
    }
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  },
  handleTouchStart(event){
    this.setData({
      coverTransition:''
    })
    startY = event.touches[0].clientY
  },
  handleTouchMove(event){
    moveY = event.touches[0].clientY
    moveDistance = moveY-startY
    if(moveDistance<=0){
      return
    }
    if(moveDistance>=80){
      moveDistance=80
    }
    this.setData({
      coverTransform: `translateY(${moveDistance}rpx)`
    })
  },
  handleTouchEnd(){
    this.setData({
      coverTransform: 'translateY(0)',
      coverTransition: 'transform 1s linear'
    })
  },
  toLogin(){
    wx.reLaunch({
      url: '../login/login',
    })
  },
  getOpenId(){
    wx.login({
      success: async(res) => {
        console.log('res',res)
        const code = res.code
        const result = await request('/getOpenId',{code})
        console.log('result',result)
      },
    })
  },
})