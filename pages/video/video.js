// pages/video/video.js
import request from '../../utils/request'
Page({

  /**
   * Page initial data
   */
  data: {
    videoGroupList: [],
    navId: '',
    videoList: [],
    videoId: '',
    videoUpdateTimeList: [],
    isTriggered: false, //下啦刷新是否被处罚
  },

  toSearchPage(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  handleTimeUpdate(event){
    const videoTimeObj = {vid: event.currentTarget.id, currentTime: event.detail.currentTime}
    const { videoUpdateTimeList }=this.data
    console.log(343434,videoTimeObj,videoUpdateTimeList)
    const findIndex = videoUpdateTimeList?.findIndex(item=>{return item.vid==videoTimeObj.vid
    })
    console.log(565656,findIndex)
    if(findIndex>=0){
      videoUpdateTimeList[findIndex].currentTime = videoTimeObj.currentTime
    }else{
      videoUpdateTimeList.push(videoTimeObj)
      this.setData({
        videoUpdateTimeList
      })
    }
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    this.getVideoGroupList()
  },

  async getVideoGroupList(){
    console.log(2222)
    const res = await request('/video/group/list')
    console.log(888,res)
    this.setData({
      getVideoGroupList: res.data.slice(0,14),
      navId: res.data[0].id
    })
    this.getVideoGroup()
  },

  async getVideoGroup(){
    const res = await request('/video/group/list')
    wx.hideToast()
    console.log(9999,res)
    this.setData({
      isTriggered: false,
      videoList: [
        {url: 'http://vodkgeyttp8.vod.126.net/cloudmusic/7778/core/a924/367a4ee549eefe2c0766616b3b5a6078.mp4?wsSecret=3ff36d17385e88899130f7b07f5acfa0&wsTime=1707263862',id:1,image: 'https://p1.music.126.net/oQAa0mlQw5LKA-Z54IOp3g==/19008357021060580.jpg'},
        {url: 'http://vodkgeyttp8.vod.126.net/cloudmusic/7778/core/a924/367a4ee549eefe2c0766616b3b5a6078.mp4?wsSecret=3ff36d17385e88899130f7b07f5acfa0&wsTime=1707263862',id:2, image:'https://p1.music.126.net/wVmyNS6b_0Nn-y6AX8UbpQ==/109951166952686384.jpg'},
        {url: 'http://vodkgeyttp8.vod.126.net/cloudmusic/7778/core/a924/367a4ee549eefe2c0766616b3b5a6078.mp4?wsSecret=3ff36d17385e88899130f7b07f5acfa0&wsTime=1707263862',id:3, image:'https://p1.music.126.net/wVmyNS6b_0Nn-y6AX8UbpQ==/109951166952686384.jpg'}
      ]
    })
  },

  changeNav(event){
    const id = event.currentTarget.id
    this.setData({
      navId: id*1
    })
    wx.showToast({
      title: 'loading',
    })
    this.getVideoGroup()
  },
  handlePlay(event){
    //获取现在的视频id
    const vid = event.currentTarget.id
    console.log(1212,vid)
    //获取实力
    this.vid !== vid && this.videoContext && this.videoContext.stop()
    this.vid = vid
    this.setData({
      videoId: vid
    })
    console.log(2323,this.data.videoId)
    this.videoContext = wx.createVideoContext(vid)
    //跳到指定位置
    const { videoUpdateTimeList }=this.data
    const findItem = videoUpdateTimeList?.find(item=>{return item.vid==vid
    })
    console.log(1111,findItem)
    if(findItem){
      this.videoContext.seek(findItem.currentTime)
    }
    // 自动播放
    this.videoContext.play()
  },

  handleEnd(){
    console.log('end')
  },

  //处理下拉刷新
  handleRefresh(){
    this.getVideoGroup()
  },

  //上啦到底部
  handleToLower(){
    // 可以进行分页逻辑处理，前端分野或后端分野
    console.log('to lower')
    const mocklist = [
      {url: 'http://vodkgeyttp8.vod.126.net/cloudmusic/7778/core/a924/367a4ee549eefe2c0766616b3b5a6078.mp4?wsSecret=3ff36d17385e88899130f7b07f5acfa0&wsTime=1707263862',id:1,image: 'https://p1.music.126.net/oQAa0mlQw5LKA-Z54IOp3g==/19008357021060580.jpg'},
      {url: 'http://vodkgeyttp8.vod.126.net/cloudmusic/7778/core/a924/367a4ee549eefe2c0766616b3b5a6078.mp4?wsSecret=3ff36d17385e88899130f7b07f5acfa0&wsTime=1707263862',id:2, image:'https://p1.music.126.net/wVmyNS6b_0Nn-y6AX8UbpQ==/109951166952686384.jpg'},
      {url: 'http://vodkgeyttp8.vod.126.net/cloudmusic/7778/core/a924/367a4ee549eefe2c0766616b3b5a6078.mp4?wsSecret=3ff36d17385e88899130f7b07f5acfa0&wsTime=1707263862',id:3, image:'https://p1.music.126.net/wVmyNS6b_0Nn-y6AX8UbpQ==/109951166952686384.jpg'}
    ]
    let videoList = this.data.videoList
    videoList.push(...mocklist)
    this.setData({
      videoList: videoList
    })
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

  }
})