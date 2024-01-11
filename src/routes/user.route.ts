import express from 'express'
import userController from '../controllers/user.controller'
import authMiddleware from '../middlewares/auth.middleware'

const {Router} = express

const router = Router()

// router.post('/user', userController.create)
router.get('/user', userController.getAll)
router.get('/user/:id', userController.getOne)
router.put('/user', authMiddleware.validate('USER'), userController.update)
router.delete('/user', authMiddleware.validate('USER'), userController.delete)
router.delete('/user/:id', authMiddleware.validate('ADMIN'), userController.deleteByPk)

export default router