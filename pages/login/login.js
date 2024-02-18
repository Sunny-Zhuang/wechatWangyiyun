// pages/login/login.js
import request from '../../utils/request'

Page({

  /**
   * Page initial data
   */
  data: {
    phone: '',
    password: ''
  },

  handleInput(event){
    this.setData({
      [event.currentTarget.id] :event.detail.value
    })
  },

  async login(){
    //获取表单的值
    const {phone, password} = this.data
    //前端验证
    if(!phone){
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      },
      )
      return;
    }
    const phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/
    if(!phoneReg.test(phone)){
      wx.showToast({
        title: '手机号格式不对',
        icon: 'none'
      },
      )
      return;
    }
    if(!password){
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      },
      )
      return;
    }

    //后段验证
    const res = await request('/login/cellphone',{phone,captcha: 890893},'POST')
    console.log(666,res)
    if(res.code === 200){
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      },
      )
    }else if(res.code === 400){
      wx.showToast({
        title: '手机号错误',
        icon: 'none'
      },
      )
    }else if(res.code === 502){
      wx.showToast({
        title: '密码错误',
        icon: 'none'
      },
      )
    }else{
      wx.showToast({
        title: '登陆失败',
        icon: 'none'
      },
      )
      wx.setStorageSync('userInfo', JSON.stringify({
        desc: 'aaaa',
        nickname:'sunny'
      }))
      wx.switchTab({
        url: '../personal/personal',
      })
    }
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {

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