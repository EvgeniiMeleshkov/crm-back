import { Router } from 'express'
import { create, read } from '../controllers/message/messageController.js'
import checkAuth from '../utils/checkAuth.js'

const router = Router()

router.post('/create', checkAuth, create)
// router.post('/login', login)
// router.post('/recovery', recovery)
router.post('/read', checkAuth, read)

export default router
