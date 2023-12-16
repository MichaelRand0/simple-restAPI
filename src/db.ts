import pkg from 'pg'

const { Pool } = pkg

const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'home_db',
  password: 'rand',
  port: 8080,
})

export default db