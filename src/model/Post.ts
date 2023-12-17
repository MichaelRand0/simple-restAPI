import { Model, DataTypes } from 'sequelize'
import {db} from '../db'

class Post extends Model {}

Post.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize: db,
    modelName: 'Post',
    tableName: 'Post',
    timestamps: false,
    freezeTableName: true
})

export default Post