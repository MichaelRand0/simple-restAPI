import express, { NextFunction, Request, Response } from 'express'
import { connectDB } from './db'
import syncAllModels from './helpers/syncAllModels'
import postRouter from './routes/post.route'
import userRouter from './routes/user.route'
import fileUpload from 'express-fileupload'
import AppError from './helpers/errorHandler/AppError'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.SERVER_PORT ?? 8000

const app = express()

app.listen(PORT, async () => {
  console.log('🚀Server started Successfully')
  await connectDB()
  await syncAllModels().then((res) => {
    console.log('✅Synced database successfully...')
  })
})

app.use(express.json())
app.use(express.static('static'))
app.use(fileUpload({}))

app.use('/api', userRouter)
app.use('/api', postRouter)

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  // console.log('ERROR:', err)
  res.status(err.httpCode).json({ ...err, message: err.message })
  next()
})
