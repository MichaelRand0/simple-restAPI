import Person from "../model/Person"
import Post from "../model/Post"

const syncAllModels = async () => {
    const options = {
        force: false
    }
    await Person.sync(options)
    await Post.sync(options)
}

export default syncAllModels