import getFileFormat from '../helpers/getFileFormat'
import * as uuid from 'uuid'
import * as path from 'path'
import * as fs from 'fs'
import { UploadedFile } from 'express-fileupload'

class FileService {
  saveFile(file: UploadedFile) {
    try {
      const fileName = `${uuid.v4()}.${getFileFormat(file.name)}`
      const folderName = path.resolve('static')
      if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName)
      }
      const filePath = path.resolve('static', fileName)
      file.mv(filePath)
      return fileName
    } catch (e: any) {
      console.error('save file error:', e)
      return e
    }
  }
}

export default new FileService()
