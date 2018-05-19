const DB = require('../utils/db')

module.exports = {
  create: async ctx => {
    const { userinfo } = ctx.state.$wxInfo
    const body = ctx.request.body
    const comment = {
      open_id: userinfo.openId,
      movie_id: body.movie_id,
      content: body.content,
      type: body.type
    }
    await DB.query('INSERT INTO comments SET ?', comment)
    ctx.state.data = {}
  },

  list: async ctx => {
    const id = +ctx.params.id
    const comments = await DB.query('SELECT a.user_info, b.* FROM cSessionInfo a, comments b where a.open_id = b.open_id and b.movie_id = ? ORDER BY id DESC', [id])
    ctx.state.data = comments
  },

  show: async ctx => {
    const id = +ctx.params.id
    const comment = (await DB.query('SELECT * FROM comments WHERE id = ?', [id]))[0]
    const movie = (await DB.query('SELECT * FROM movies WHERE id = ?', [comment.movie_id]))[0]
    ctx.state.data = { movie, comment }
  },

  favorite: async ctx => {
    const { userinfo } = ctx.state.$wxInfo
    const id = +ctx.params.id
    const favorites = await DB.query('SELECT * FROM favorites WHERE comment_id = ? AND open_id = ?', [id, userinfo.openId])
    if (favorites.length === 0) {
      await DB.query('INSERT INTO favorites SET ?', { comment_id: id, open_id: userinfo.openId })
    }
    ctx.state.data = {}
  },

  favorites: async ctx => {
    const { userinfo } = ctx.state.$wxInfo
    const comments = await DB.query('SELECT d.id, d.type, d.content, b.cover, b.title, c.user_info FROM favorites a, movies b, cSessionInfo c, comments d WHERE a.open_id = c.open_id and a.comment_id = d.id and d.movie_id = b.id and c.open_id = ?', [userinfo.openId])
    ctx.state.data = comments
  }
}