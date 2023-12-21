import express from 'express'
import postController from '../controllers/post.controller'


const {Router} = express

const router = Router()

router.post('/post', postController.createPost)
router.get('/post', postController.getPosts)

export default router