import { DataTypes, Model } from 'sequelize'
import {db} from '../db'
import Post from './Post'
import IPerson from '../types/Person'

class Person extends Model<IPerson> {}

Person.init(
  {
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^[a-z-A-Z-0-9]+$/,
        min: 6,
        max: 100
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        is: /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%@&? "]).*$/,
        min: 6,
        max: 200
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
    modelName: 'person',
    tableName: 'person',
    timestamps: false,
  }
)

Person.hasOne(Post, {
  foreignKey: 'person_id'
})

export default Person
