import express from 'express'
import pkg from 'pg'
import userRouter from './routes/user.route.js'
import postRouter from './routes/post.route.js'

const { Client } = pkg

const config = {
  user: 'postgres',
  host: 'localhost',
  database: 'home_db',
  password: 'rand',
  port: 8080,
}

const PORT = 8000

const app = express()

app.use(express.json())

const client = new Client(config)

await client.connect()

app.listen(PORT, () => console.log(`App working on PORT: ${PORT}`))

app.use('/api', userRouter)
app.use('/api', postRouter)
