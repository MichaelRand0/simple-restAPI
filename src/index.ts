import express from 'express'
import { connectDB, db } from './db'
import Person from './model/Person'
import syncAllModels from './helpers/syncAllModels'
import postRouter from './routes/post.route'
import userRouter from './routes/user.route'

// const { Client } = pkg

// const config = {
//   user: 'postgres',
//   host: 'localhost',
//   database: 'home_db',
//   password: 'rand',
//   port: 8080,
// }

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

// const client = new Client(config)

// client.connect()

// app.listen(PORT, () => console.log(`App working on PORT: ${PORT}`))

app.use('/api', userRouter)
app.use('/api', postRouter)
