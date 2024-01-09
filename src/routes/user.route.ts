import express from 'express'
import userController from '../controllers/user.controller'
import authMiddleware from '../middlewares/auth.middleware'

const {Router} = express

const router = Router()

// router.post('/user', userController.create)
router.get('/user', authMiddleware.validate(), userController.getAll)
router.get('/user/:id', userController.getOne)
router.put('/user', userController.update)
router.delete('/user/:id', userController.delete)

export default router