import { Model, DataTypes } from 'sequelize'
import {db} from '../db'
import IPost from '../types/Post'

class Post extends Model<IPost> {}

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
    modelName: 'post',
    tableName: 'post',
    timestamps: false,
    freezeTableName: true
})

export default Post