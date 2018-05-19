// pages/comment/comment.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
const app = getApp()

let innerAudioContext

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: null,
    comment: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id } = options
    qcloud.request({
      url: config.service.getComment(id),
      success: ({ data }) => {
        const { movie, comment } = data.data
        this.setData({ movie, comment })

        if (comment.type == 1) {
          this.initInnerAudioContext()
        }
      }
    })
  },

  handleFavorite() {
    const { comment } = this.data
    app.checkSession({
      success: () => {
        qcloud.request({
          method: 'POST',
          url: config.service.favorite(comment.id),
          success: () => {
            wx.showToast({
              title: '收藏成功'
            })
          }
        })
      },
      fail: () => {
        console.log('fail.....')
        wx.switchTab({
          url: '/pages/user/user'
        })
      }
    })
  },

  initInnerAudioContext() {
    innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = false

    innerAudioContext.onPlay(() => {
      console.log('开始播放')
      this.setData({ isPlaying: true })
    })

    innerAudioContext.onStop(() => {
      console.log('播放停止')
      this.setData({ isPlaying: false })
    })

    innerAudioContext.onEnded(() => {
      console.log('播放结束');
      this.setData({ isPlaying: false });
    });

    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
      wx.showToast({
        icon: 'none',
        title: '播放异常'
      })
      this.setData({ isPlaying: false })
    })
  },

  handlePlay() {
    const { isPlaying } = this.data

    if (!isPlaying) {
      innerAudioContext.src = this.data.comment.content
      innerAudioContext.play()
    }
  },

  handleAddComment() {
    const { movie } = this.data

    app.checkSession({
      success: () => {
        wx.showActionSheet({
          itemList: ['文字', '音频'],
          success: (res) => {
            wx.setStorage({
              key: 'movie',
              data: movie,
              success: () => {
                wx.navigateTo({
                  url: `/pages/add-comment/add-comment?type=${res.tapIndex}`
                })
              }
            })
          },
          fail: function(res) {
            console.log(res.errMsg)
          }
        })
      },
      fail: () => {
        console.log('fail.....')
        wx.switchTab({
          url: '/pages/user/user'
        })
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