import { Router } from 'express'
import { login, me, recovery, register } from '../controllers/auth/authController.js'
import checkAuth from '../utils/checkAuth.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/recovery', recovery)
router.get('/me', checkAuth, me)

export default router
