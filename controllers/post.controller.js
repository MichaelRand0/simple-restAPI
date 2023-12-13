import db from '../db.js'

class PostController {
  async createPost(req, res) {
    const { title, content, user_id } = req.body
    await db
      .query(
        'INSERT INTO post (title, content, user_id) values ($1, $2, $3) RETURNING *',
        [title, content, user_id]
      )
      .catch((err) => {
        if(err.code === '23503') {
            res.status(400).json({
                status: 400,
                message: `Пользователя с id ${user_id} не существует`
            })
        }
      })
      .then((queryRes) => {
        res.status(200).json(queryRes?.rows?.[0])
      })
  }

  async getPostsByUser(req, res) {
    const id = req.query.id
    const bdRes = await db.query('SELECT * FROM post WHERE user_id = ($1)', [
      id,
    ])
    res.status(200).json(bdRes.rows[0])
  }
}

export default new PostController()
