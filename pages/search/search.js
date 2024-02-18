// pages/search/search.js
import request from '../../utils/request'

Page({
  
  /**
   * Page initial data
   */
  data: {
    placeholderContent: '',
    hotList: [],
    searchContent: '',
    searchList: [],
    historyList: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    this.getInitialContent()
    this.getStorageHistory()
  },
  getStorageHistory(){
    const historyList = wx.getStorageSync('history')
    console.log('historyList',historyList)
    if(historyList){
      this.setData({
        historyList: historyList
      })
    }
  },

  async getInitialContent(){
    const res = await request('/search/default')
    const resList = await request('/search/hot/detail')
    console.log('resList',resList)
    this.setData({
      placeholderContent: res.data.showKeyword,
      hotList: resList.data
    })
  },
  handleInputChange(event){
    this.setData({
      searchContent: event.detail.value.trim()
    })
    // 防抖
    console.log(1111,this.timeout)
    if(this.timeout){
      clearTimeout(this.timeout)
    }
    this.timeout= setTimeout(() => {
      this.getSearchResult()
    }, 200);
    console.log(2222,this.timeout)
   
  },

  async getSearchResult(){
    if(!this.data.searchContent){
      this.setData({
        searchList: []
      })
      return
    }
    const res = await request('/search',{keywords: this.data.searchContent, limit: 10})
    console.log('getSearchResult',res)
    const newHistoryList = this.data.historyList
    const historyIndex = newHistoryList.indexOf(this.data.searchContent)
    console.log('historyIndex',historyIndex)
    if(historyIndex!=-1){
      newHistoryList.splice(historyIndex,1)
    }
    newHistoryList.unshift(this.data.searchContent)

    this.setData({
      searchList: res.result.songs,
      historyList: newHistoryList
    })
    wx.setStorageSync('history', this.data.historyList)
  },

  deleteShowHistory(){
    wx.showModal({
      content: '确认取消吗',
      complete: (res) => {
        console.log('showModal',res)
        if (res.confirm) {
          this.setData({
            historyList: []
          })
          wx.removeStorageSync('history')
        }
  
      }
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