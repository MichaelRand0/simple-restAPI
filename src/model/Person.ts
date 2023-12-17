import { DataTypes, Model } from 'sequelize'
import {db} from '../db'
import Post from './Post'

class Person extends Model {}

Person.init(
  {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'Person',
    tableName: 'Person',
    timestamps: false,
  }
)

Person.hasOne(Post)

export default Person
