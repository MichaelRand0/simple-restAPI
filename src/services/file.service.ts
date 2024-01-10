import getFileFormat from '../helpers/getFileFormat'
import * as uuid from 'uuid'
import * as path from 'path'
import * as fs from 'fs'
import { UploadedFile } from 'express-fileupload'
import AppError from '../helpers/errorHandler/AppError'

class FileService {
  getFileName(file: UploadedFile) {
    return `${uuid.v4()}.${getFileFormat(file.name)}`
  }

  checkFileFormat(file: UploadedFile) {
    const availableFormats = {
      png: 'png',
      jpeg: 'jpeg',
      jpg: 'jpg',
      webp: 'webp',
    }
    const format = getFileFormat(file.name)
    if (availableFormats[format]) {
      return file.name
    } else {
      throw new AppError(
        'format error',
        `Img format ${format} is prohibited`,
        400
      )
    }
  }

  checkFileSize(file: UploadedFile) {
    const allowedSize = 2000000
    if (file.size > allowedSize) {
      throw new AppError('size error', 'The image size is too large', 400)
    }
    return file
  }

  validateFile(file: UploadedFile) {
    const checkedSizeFile = this.checkFileSize(file)
    const filename = this.checkFileFormat(checkedSizeFile)
    return filename
  }

  saveFile(file: UploadedFile) {
    try {
      const fileName = this.validateFile(file)
      if (fileName) {
        const folderName = path.resolve('static')
        const newFileName = this.getFileName(file)
        if (!fs.existsSync(folderName)) {
          fs.mkdirSync(folderName)
        }
        const filePath = path.resolve('static', newFileName)
        file.mv(filePath)
        return newFileName
      }
    } catch (e: any) {
      throw new AppError(e?.name, e?.message, e?.code)
    }
  }
}

export default new FileService()
