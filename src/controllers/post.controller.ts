import { NextFunction, Request, Response } from 'express'
import Post from '../models/Post'
import { ValidationError } from 'sequelize'
import PostService from '../services/post.service'

class PostController {
  async create(req: any, res: Response, next: NextFunction) {
    try {
      const newPost = await PostService.create(req.body, req.files.img)
      return res.status(200).json(newPost)
    } catch (e: any) {
      next(e)
    }
  }

  async getAll(req: Request, res: Response) {
    const { id } = req.body
    const posts = await Post.findAll(
      id ? { where: { person_id: id } } : undefined
    ).catch((e: ValidationError) => {
      const message = e?.errors?.[0]?.message
      res.status(500).json(message)
    })
    res
      .status(200)
      .json(posts ? posts.filter((post) => post.dataValues.person_id) : posts)
  }

  async getOne(req: Request, res: Response) {
    const { id } = req.params
    const post = await Post.findByPk(id).catch((e: ValidationError) => {
      const message = e?.errors?.[0]?.message
      const type = e?.errors?.[0]?.type
      switch (type) {
        case 'notnull violation':
          res.status(400).json(message)
          break

        default:
          res.status(500).json(message)
          break
      }
    })
    res.status(200).json(post)
  }

  async update(req: Request, res: Response) {
    const newPost = req.body
    try {
      const updatedPost = await Post.update(newPost, {
        where: { id: newPost?.id },
        returning: true,
      })
      return res.status(200).json(updatedPost[1][0])
    } catch (e: any) {
      const type = e.name
      const message = e.message
      switch (type) {
        case 'SequelizeForeignKeyConstraintError':
          res.status(400).json(message)
          break

        default:
          res.status(500).json(message)
          break
      }
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params
    const deletedPost = await Post.destroy({ where: { id } }).catch(
      (e: ValidationError) => {
        const message = e?.errors?.[0]?.message
        const type = e?.errors?.[0]?.type
        switch (type) {
          case 'notnull violation':
            res.status(400).json(message)
            break

          default:
            res.status(500).json(message)
            break
        }
      }
    )
    res
      .status(200)
      .json(
        deletedPost
          ? { message: `Post with id=${id} deleted`, id }
          : 'Post doesnt exists'
      )
  }
}

export default new PostController()
