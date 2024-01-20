import { NextFunction, Request, Response } from 'express'
import PostService from '../services/post.service'
import postService from '../services/post.service'
import decodeToken from '../helpers/decodeToken'
import AppError from '../helpers/errorHandler/AppError'

class PostController {
  async create(req: Request, res: Response, next: NextFunction) {
    const token = req?.headers?.authorization?.split(' ')?.[1] ?? ''
    const decoded = decodeToken(token)
    try {
      const newPost = await PostService.create(
        { ...req.body, user_id: decoded?.id },
        req?.files?.img
      )
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
    const token = req?.headers?.authorization?.split(' ')?.[1] ?? ''
    const user = decodeToken(token)
    const postData = await PostService.getOne(newPost.id)
    try {
      if(user.role !== 'ADMIN' && user?.id !== postData?.dataValues?.user_id) {
        throw new AppError('updatePostPermissions', 'You dont have permissions to update this post', 403)
      }
      const updatedPost = await PostService.update({
        ...newPost,
        user_id: postData?.dataValues?.user_id,
      })
      return res.status(200).json(updatedPost)
    } catch (e: any) {
      next(e)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const { id: userId } = decodeToken(
      req?.headers?.authorization?.split(' ')?.[1] ?? ''
    )
    try {
      const deletedPost = await PostService.delete(id, userId)
      return res.status(200).json(deletedPost)
    } catch (e) {
      next(e)
    }
  }
}

export default new PostController()
