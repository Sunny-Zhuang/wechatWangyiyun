// pages/songDetail/songDetail.js
import PubSub from 'pubsub-js'
// import moment from 'moment'

Page({

  /**
   * Page initial data
   */
  data: {
    isPlay: false,
    currentTime: '00.00', //实时事件
    durationTiem: '00:00', //总时长
    barWidth: 0
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    this.backgroundAudioManager = wx.getBackgroundAudioManager()
    console.log('options',options.musicId)
    this.backgroundAudioManager.onPlay(()=>{
      this.setData({
        isPlay:true
      })
    })
    this.backgroundAudioManager.onPause(()=>{
      console.log('onPause')
      this.setData({
        isPlay:false
      })
    })
    this.backgroundAudioManager.onTimeUpdate(()=>{
      console.log(111111,this.backgroundAudioManager.currentTime)
      this.setData({
        currentTime: this.backgroundAudioManager.currentTime,
        barWidth:  this.backgroundAudioManager.currentTime / 200  * 450
      })
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
    // 点击播放/暂停的回调
  handleMusicPlay(){
    let isPlay = !this.data.isPlay;
    // // 修改是否播放的状态
    // this.setData({
    //   isPlay
    // })
    
    let {musicId, musicLink} = this.data;
    // this.backgroundAudioManager.onPlay(()=>{
    //   this.setData({
    //     isPlay:true
    //   })
    // })
    // this.backgroundAudioManager.onPause(()=>{
    //   console.log('onPause')
    //   this.setData({
    //     isPlay:false
    //   })
    // })
    this.musicControl(isPlay);
  },
  musicControl(isPlay){
    if(isPlay){
      const time = 232320
      // const durationTiem = moment(time).format('mm:ss')
      // this.setData({
      //   durationTiem
      // })
      this.backgroundAudioManager.src='http://m7.music.126.net/20240213120711/5f72e0208411428ccc3d4a1a8cd4078b/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3'
      this.backgroundAudioManager.title='aha'
    }else{
      this.backgroundAudioManager.pause()
    }
    this.setData({
      isPlay: isPlay
    })
  },
  handleSwitch(event){
    const type = event.currentTarget.id
    console.log('handleswitch',type)
    this.backgroundAudioManager.stop()
    PubSub.subscribe('musicId',(msg,musicId)=>{
      console.log('songdetail', musicId)
      this.musicControl(true)
      PubSub.unsubscribe('musicId')
    })
    PubSub.publish('switchType', type)
  }
})