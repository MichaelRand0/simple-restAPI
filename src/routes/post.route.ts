import express from 'express'
import postController from '../controllers/post.controller'


const {Router} = express

const router = Router()

router.post('/post', postController.create)
router.get('/post', postController.getAll)
router.get('/post/:id', postController.getOne)
router.put('/post', postController.update)
router.delete('/post/:id', postController.delete)

export default router