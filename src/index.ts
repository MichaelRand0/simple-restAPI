import express from 'express'
import pkg from 'pg'
import userRouter from './routes/user.route'
import postRouter from './routes/post.route'

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

client.connect()

app.listen(PORT, () => console.log(`App working on PORT: ${PORT}`))

app.use('/api', userRouter)
app.use('/api', postRouter)
