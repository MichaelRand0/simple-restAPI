import User from "../models/User"
import Post from "../models/Post"

const syncAllModels = async () => {
    const options = {
        force: true
    }
    await User.sync(options)
    await Post.sync(options)
}

export default syncAllModels