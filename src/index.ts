import express from 'express'
import { connectDB, db } from './db'
import syncAllModels from './helpers/syncAllModels'
import postRouter from './routes/post.route'
import userRouter from './routes/user.route'
import fileUpload from 'express-fileupload'

const PORT = 8000

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
