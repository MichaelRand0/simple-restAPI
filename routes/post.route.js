import express from 'express'
import postController from '../controllers/post.controller.js'


const {Router} = express

const router = new Router()

router.post('/post', postController.createPost)
router.get('/post', postController.getPostsByUser)

export default router