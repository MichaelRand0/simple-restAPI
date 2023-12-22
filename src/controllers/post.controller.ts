import { Request, Response } from 'express'
import Post from '../model/Post'
import { Error, ValidationError } from 'sequelize'

class PostController {
  async create(req: Request, res: Response) {
    const { title, content, person_id } = req.body
    const newPost = await Post.create({ title, content, person_id }).catch(
      (e: ValidationError) => {
        const message = e?.errors?.[0]?.message
        const type = e?.errors?.[0]?.type
        switch (type) {
          case 'notnull violation':
            res.status(401).json(message)
            break

          default:
            res.status(500).json(message)
            break
        }
      }
    )
    res.status(200).json(newPost)
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
          res.status(401).json(message)
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
          res.status(401).json(message)
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
            res.status(401).json(message)
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
