import { DataTypes, Model } from 'sequelize'
import {db} from '../db'
import Post from './Post'
import IUser from '../types/User'

class User extends Model<IUser> {}

User.init(
  {
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^[a-zA-Z0-9]+$/
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        is: /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%@&? "]).*$/
      }
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: 'User',
    tableName: 'User',
    timestamps: false,
  }
)

User.hasOne(Post, {
  foreignKey: 'user_id'
})

export default User
