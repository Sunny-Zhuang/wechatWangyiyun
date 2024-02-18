
import request from '../utils/request'
Page({

  /**
   * Page initial data
   */
  data: {
    bannerList: [],
    recommendList: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  async onLoad(options) {
    const bannerRes = await request('/banner')
    this.setData({
      bannerList: bannerRes.banners
    })

    const recommendRes = await request('/personalized',{limit: 10})
    this.setData({
      recommendList: recommendRes.result
    })

    //排行榜
    let index= 0;
    let resultList =[]
    while(index<5){
      const topListRes = await request('/toplist/detail',{id: index++})
      console.log(2222,topListRes)
      const topListItemName = topListRes.rewardToplist.name
      let topListItem = {name: topListItemName, tracks: topListRes.rewardToplist.songs}
      resultList.push(topListItem)
      this.setData({
        topList: resultList
      })
      console.log(666,this.data.topList)
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
  toRecommentSong(){
    wx.navigateTo({
      url: '/songPackage/pages/recommendSong/recommendSong',
    })
  }
})