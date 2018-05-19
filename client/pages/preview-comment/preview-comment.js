// pages/preview-comment/preview-comment.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: null,
    content: '',
    type: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { type } = options
    this.setData({ type })

    wx.getStorage({
      key: 'movie',
      success: res => {
        this.setData({ movie: res.data })
        wx.getStorage({
          key: 'content',
          success: res => {
            this.setData({ content: res.data })
          }
        })
      }
    })
  },

  handleRedit() {
    wx.navigateBack()
  },

  handleCommentSubmit() {
    const { type, content, movie } = this.data

    qcloud.request({
      url: config.service.addCommetUrl,
      method: 'POST',
      data: {
        type, content,
        movie_id: movie.id,
      },
      success: (res) => {
        console.log(res)
        wx.showToast({
          title: '发布成功',
          success: () => {
            setTimeout(() => {
              wx.navigateTo({
                url: `/pages/comments/comments?id=${movie.id}`
              })
            }, 1000)
          }
        })
      },
      fail: (error) => {
        console.log(error)
      }
    })
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