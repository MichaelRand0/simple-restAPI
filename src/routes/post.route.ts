import express from 'express'
import postController from '../controllers/post.controller'
import authMiddleware from '../middlewares/auth.middleware'

const {Router} = express

const router = Router()

router.post('/post', authMiddleware.validate('USER'), postController.create)
router.get('/post', postController.getAll)
router.get('/post/:id', postController.getOne)
router.put('/post', authMiddleware.validate('USER'), postController.update)
router.delete('/post/:id', authMiddleware.validate('USER'), postController.delete)

export default router