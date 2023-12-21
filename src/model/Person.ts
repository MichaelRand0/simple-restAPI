import { DataTypes, Model } from 'sequelize'
import {db} from '../db'
import Post from './Post'
import IPerson from '../types/Person'

class Person extends Model<IPerson> {}

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
    modelName: 'person',
    tableName: 'person',
    timestamps: false,
  }
)

Person.hasOne(Post, {
  foreignKey: 'person_id'
})

export default Person
