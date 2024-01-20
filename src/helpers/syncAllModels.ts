import User from "../models/User"
import Post from "../models/Post"

const syncAllModels = async () => {
    const options = {
        force: false
    }
    await User.sync(options)
    await Post.sync(options)
}

export default syncAllModels



// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZXMiOlsiVVNFUiJdLCJpc1JlZnJlc2giOnRydWUsImlhdCI6MTcwNTI0MDQ4NSwiZXhwIjoxNzA3ODMyNDg1fQ.kqhw1uRh1AOfGaurHIJF61zHcP2tgq3opv-g1xzZriY