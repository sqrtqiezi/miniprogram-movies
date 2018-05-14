//index.js
const config = require('../../config')

Page({
  data: {
    movie: null
  },

  onLoad: function() {
    wx.request({
      url: config.service.randomUrl,
      success: ({ data }) => {
        console.log(data)
        const movie = {
          ...data.data
        }
        this.setData({ movie })
      }
    })
  }
})
