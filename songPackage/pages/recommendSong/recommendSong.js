// pages/recommendSong/recommendSong.js
import PubSub from 'pubsub-js'

Page({

  /**
   * Page initial data
   */
  data: {
    recommendList: [],
    index: 0
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    const userInfo = wx.getStorageSync('userInfo')
    console.log('userInfo',userInfo)
    if(!userInfo){
      wx.showToast({
        title: '请先登陆',
        icon: 'none',
        success:()=>{
          wx.reLaunch({
            url: '/pages/login',
          })
        }
      })
    }
    this.getRecommendList()
    // 订阅songdetail信息
    PubSub.subscribe('switchType',(msg,type)=>{
      console.log('subscribe', type)
      let {index, recommendList} =this.data
      if(type&&type=='pre'){
        index-=1
      }
      if(type&&type=='next'){
        index+=1
      }
      this.setData({
        index
      })
      let musicId = recommendList[index].id
      console.log('recomend id',musicId)
      PubSub.publish('musicId',musicId)
    })
    
  },

  getRecommendList(){
    this.setData({
      recommendList:[
        {image:'http://p1.music.126.net/yQoWQ0yB1VWOEdVHmOyvRw==/109951169045046104.jpg',
        name:'失余年',
        id: 1,
        musicUrl:'http://m7.music.126.net/20240211225530/ee2f8705d41628220ab77ab8e69233b4/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3'
      },
      {image:'http://p1.music.126.net/yQoWQ0yB1VWOEdVHmOyvRw==/109951169045046104.jpg',
        name:'失余年',
        id: 2,
        musicUrl:'http://m7.music.126.net/20240211225530/ee2f8705d41628220ab77ab8e69233b4/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3'
      },
      {image:'http://p2.music.126.net/w1hmKxr764OrEgrCeatPRQ==/109951164351553684.jpg',
        name:'少年歌行_片头曲',
        id: 3,
        musicUrl:'http://m7.music.126.net/20240211225530/ee2f8705d41628220ab77ab8e69233b4/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3'
      },
      {image:'http://p1.music.126.net/yQoWQ0yB1VWOEdVHmOyvRw==/109951169045046104.jpg',
        name:'失余年',
        id: 4
      },
      {image:'http://p1.music.126.net/yQoWQ0yB1VWOEdVHmOyvRw==/109951169045046104.jpg',
        name:'失余年',
        id: 5
      },
      {image:'http://p2.music.126.net/w1hmKxr764OrEgrCeatPRQ==/109951164351553684.jpg',
        name:'少年歌行_片头曲',
        id: 6
      },
      {image:'http://p1.music.126.net/yQoWQ0yB1VWOEdVHmOyvRw==/109951169045046104.jpg',
        name:'失余年',
        id: 7
      },
      {image:'http://p1.music.126.net/yQoWQ0yB1VWOEdVHmOyvRw==/109951169045046104.jpg',
        name:'失余年',
        id: 8
      },
      {image:'http://p2.music.126.net/w1hmKxr764OrEgrCeatPRQ==/109951164351553684.jpg',
        name:'少年歌行_片头曲',
        id: 9
      },
      ]
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

  },
  navigateToDetail(event){
    const song = event.currentTarget.dataset.song
    const musicId = event.currentTarget.dataset.musicid
    console.log(8888,event.currentTarget.id)
    this.setData({
      index: Number(event.currentTarget.id)
    })
    console.log('todetail',event.currentTarget.dataset.musicid)
    wx.navigateTo({
      url: '/songPackage/pages/songDetail/songDetail?musicId='+musicId,
      fail:(err)=>{
        console.log(err)
      }
    })
  },
})