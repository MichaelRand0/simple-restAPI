import { Sequelize, DataTypes } from 'sequelize'

const db = new Sequelize('home_db', 'postgres', 'rand', {
  host: 'localhost',
  dialect: 'postgres',
  port: 8080
})

async function connectDB() {
  try {
    await db.authenticate()
    console.log('✅ Connection to DB has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

export { connectDB, db, Sequelize, DataTypes }
