import { NextFunction, Request, Response } from 'express'
import Post from '../models/Post'
import { ValidationError } from 'sequelize'
import PostService from '../services/post.service'
import postService from '../services/post.service'

class PostController {
  async create(req: any, res: Response, next: NextFunction) {
    try {
      const newPost = await PostService.create(req.body, req.files.img)
      return res.status(200).json(newPost)
    } catch (e: any) {
      next(e)
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    const { id } = req.body
    try {
      const posts = await postService.getAll(id)
      return res.status(200).json(posts)
    } catch (e) {
      next(e)
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const post = await PostService.getOne(id)
      res.status(200).json(post)
    } catch (e) {
      next(e)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const newPost = req.body
    try {
      const updatedPost = await PostService.update(newPost)
      return res.status(200).json(updatedPost)
    } catch (e: any) {
      next(e)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const deletedPost = await PostService.delete(id)
      return res.status(200).json(deletedPost)
    } catch (e) {
      next(e)
    }
  }
}

export default new PostController()
