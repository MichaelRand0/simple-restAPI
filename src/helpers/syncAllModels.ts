import Person from "../models/Person"
import Post from "../models/Post"

const syncAllModels = async () => {
    const options = {
        force: true
    }
    await Person.sync(options)
    await Post.sync(options)
}

export default syncAllModels