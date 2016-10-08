
var douban = require('../../libraries/douban.js')
Page({
  data: {
    title: '',
    loading: true,
    movie: {},
    movieType: 'in_theaters',
    range: 25
  },
  onLoad (params) {
    this.data.range = params.range || this.data.range;
    var start = parseInt(Math.random()*(this.data.range-1)+1);

    this.data.movieType = params.movieType || this.data.movieType;
    douban.find(this.data.movieType, start, 1)
      .then(
            d => this.setData({titls: d.subjects[0].title, movie: d.subjects[0], loading: false})
      )
      .catch(e => {
        this.setData({ title: '获取数据异常', movie: {}, loading: false })
        console.error(e)
      })
  },

  onReady () {
    wx.setNavigationBarTitle({ title: this.data.title + ' « 电影 « 豆瓣' })
  }

})
