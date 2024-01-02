import { UploadedFile } from 'express-fileupload'
import Post from '../models/Post'
import IPost from '../types/Post'
import fileService from './file.service'
import AppError from '../helpers/errorHandler/AppError'

class PostService {
  async create(data: IPost, img: UploadedFile) {
    const { title, content, person_id } = data
    try {
      const fileName = fileService.validateFile(img)
      const newPost = await Post.create({ title, content, person_id, img: fileName ? fileName : null })
      return newPost
    } catch (e: any) {
      const {handleError} = AppError
      handleError(e)
    }
  }
  async update(data: IPost) {
    try {
      const updatedPost = await Post.update(data, {
        where: { id: data?.id },
        returning: true,
      })
      return updatedPost
    } catch (e: any) {
      const message = e.message
      throw new Error(message)
    }
  }
}

export default new PostService()
