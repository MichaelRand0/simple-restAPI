import { UploadedFile } from 'express-fileupload'
import Post from '../models/Post'
import IPost from '../types/Post'
import fileService from './file.service'
import AppError from '../helpers/errorHandler/AppError'

class PostService {
  async create(data: IPost, img: UploadedFile) {
    const { title, content, user_id } = data
    try {
      const fileName = fileService.validateFile(img)
      const newPost = await Post.create({
        title,
        content,
        user_id,
        img: fileName ? fileName : null,
      })
      return newPost
    } catch (e: any) {
      throw new AppError(e?.name, e?.message, e?.code)
    }
  }
  async update(data: IPost) {
    try {
      const updatedPost = await Post.update(data, {
        where: { id: data?.id },
        returning: true,
      })
      return updatedPost[1][0] ? updatedPost[1][0] : 'Post doesnt exists'
    } catch (e: any) {
      throw new AppError(e?.name, e?.message, e?.code)
    }
  }
  async getAll(id?: string) {
    try {
      const posts = await Post.findAll(
        id ? { where: { user_id: id } } : undefined
      )
      return posts
    } catch (e: any) {
      throw new AppError(e?.name, e?.message, e?.code)
    }
  }

  async delete(id: string) {
    try {
      const deletedPost = await Post.destroy({ where: { id } })
      return deletedPost
        ? `Post with id ${id} deleted`
        : `Post with id ${id} doesnt exists`
    } catch (e: any) {
      throw new AppError(e?.name, e?.message, e?.code)
    }
  }

  async getOne(id: string) {
    try {
      const post = await Post.findByPk(id)
      return post ? post : 'Post doesnt exists'
    } catch (e: any) {
      throw new AppError(e?.name, e?.message, e?.code)
    }
  }
}

export default new PostService()
