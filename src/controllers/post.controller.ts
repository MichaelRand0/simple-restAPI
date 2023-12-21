import { Request, Response } from 'express'
import Post from '../model/Post'

class PostController {
  async createPost(req: Request, res: Response) {
    const { title, content, person_id } = req.body
    const newPost = await Post.create({ title, content, person_id })
    res.status(200).json(newPost)
  }

  async getPosts(req: Request, res: Response) {
    const {id} = req.body
    const posts = await Post.findAll(id ? {where: {person_id: id}} : undefined)
    res.status(200).json(posts)
  }
}

export default new PostController()
