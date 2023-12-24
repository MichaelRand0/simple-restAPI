import getFileFormat from '../helpers/getFileFormat'
import * as uuid from 'uuid'
import * as path from 'path'
import * as fs from 'fs'
import { UploadedFile } from 'express-fileupload'

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
      throw new Error(`Img format is prohibited`)
    }
  }

  checkFileSize(file: UploadedFile) {
    const allowedSize = 2000000
    if (file.size > allowedSize) {
      throw new Error(
        'The image size is too large'
      )
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
        if (!fs.existsSync(folderName)) {
          fs.mkdirSync(folderName)
        }
        const filePath = path.resolve('static', fileName)
        file.mv(filePath)
        return `File ${fileName} successfully saved`
      } else {
        return fileName
      }
    } catch (e: any) {
      console.error('save file error:', e)
      return e?.message
    }
  }
}

export default new FileService()
