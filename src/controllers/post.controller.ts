import { Request, Response } from 'express'
import Post from '../model/Post'

class PostController {
  async create(req: Request, res: Response) {
    const { title, content, person_id } = req.body
    const newPost = await Post.create({ title, content, person_id })
    res.status(200).json(newPost)
  }

  async getAll(req: Request, res: Response) {
    const { id } = req.body
    const posts = await Post.findAll(
      id ? { where: { person_id: id } } : undefined
    )
    res.status(200).json(posts)
  }

  async getOne(req: Request, res: Response) {
    const { id } = req.params
    const post = await Post.findByPk(id)
    res.status(200).json(post)
  }

  async update(req: Request, res: Response) {
    const newPost = req.body
    const updatedPost = await Post.update(newPost, {
      where: { id: newPost.id },
      returning: true,
    })
    res.status(200).json(updatedPost[1][0])
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params
    await Post.destroy({ where: { id } })
    res.status(200).json({ message: `Post with id=${id} deleted`, id })
  }
}

export default new PostController()
