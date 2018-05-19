// pages/add-comment/add-comment.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    movie: null,
    type: 0,
    content: '',
    audio_url: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { type } = options
    this.setData({ type })

    wx.getStorage({
      key: 'movie',
      success: (res) => {
        this.setData({
          movie: res.data
        })
      }
    })
  },

  handleContentChange(event) {
    this.setData({
      content: event.detail.value
    })
  },

  handleFormSubmit() {
    setTimeout(() => {
      const { type, content } = this.data
      wx.setStorage({
        key: 'content',
        data: content,
        success: () => {
          wx.navigateTo({
            url: `/pages/preview-comment/preview-comment?type=${type}`
          })
        }
      })
    }, 200)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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