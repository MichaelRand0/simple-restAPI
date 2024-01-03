import { Sequelize, DataTypes } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const db = new Sequelize(process.env.POSTGRES_DB ?? 'home_db', process.env.POSTGRES_USER ?? 'postgres', process.env.POSTGRES_PASSWORD ?? 'rand', {
  host: process.env.POSTGRES_HOST ?? 'postgres',
  dialect: 'postgres',
  port: Number(process.env.DB_PORT ?? 5432)
})

async function connectDB() {
  try {
    await db.authenticate()
    console.log('✅ Connection to DB has been established successfully.')
  } catch (error:any) {
    console.error('Unable to connect to the database:', error?.message)
  }
}

export { connectDB, db, Sequelize, DataTypes }
