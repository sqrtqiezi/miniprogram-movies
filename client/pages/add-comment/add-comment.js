// pages/add-comment/add-comment.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')

let recorderManager

Page({
  /**
   * 页面的初始数据
   */
  data: {
    movie: null,
    type: 0,
    content: '',
    isRecording: false
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

    if (!recorderManager) {
      this.initInnerAudioContext()
    }
  },

  handleContentChange(event) {
    this.setData({
      content: event.detail.value
    })
  },

  initInnerAudioContext() {
    recorderManager = wx.getRecorderManager()

    recorderManager.onStart(() => {
      console.log('recorder start')
      this.setData({ isRecording: true })
    })

    recorderManager.onStop((res) => {
      console.log('recorder stop', res)
      const { tempFilePath } = res
      setTimeout(() => {
        this.upload(tempFilePath)
      }, 1000);
      this.setData({ isRecording: false })
    })
  },

  handleRecord() {
    const options = {
      duration: 60000,        // 录音默认长度一分钟
      sampleRate: 44100,      // 采样率
      numberOfChannels: 1,    // 录音通道数
      encodeBitRate: 192000,  // 编码码率
      format: 'mp3'
    }
    
    if (this.data.isRecording) {
      recorderManager.stop()
      this.setData({ isRecording: false })
    } else {
      recorderManager.start(options)
      this.setData({ isRecording: true })
    }
  },

  upload(filePath) {
    console.log('file path', filePath);
    wx.showLoading({
      title: '录音上传中...',
    })
    wx.uploadFile({
      url: config.service.uploadUrl, //仅为示例，非真实的接口地址
      filePath,
      name: 'file',
      success: res => {
        let { code, data } = JSON.parse(res.data);
        console.log(data)
        wx.setStorage({
          key: 'content',
          data: data.imgUrl,
          success: () => {
            wx.navigateTo({
              url: `/pages/preview-comment/preview-comment?type=${this.data.type}`
            })
          }
        })
      },
      fail: () => {
        wx.showToast({
          icon: 'none',
          title: '录音上传失败'
        });
      },
      complete: () => {
        wx.hideLoading();
      }
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