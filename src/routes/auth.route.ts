import express from 'express'
import authController from '../controllers/auth.controller'

const {Router} = express

const router = Router()

router.post('/login', authController.login)
router.post('/register', authController.register)
router.post('/register/admin', authController.registerAdmin)
router.post('/refresh', authController.refresh)

export default router