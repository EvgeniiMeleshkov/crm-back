import { Router } from 'express'
import { create } from '../controllers/ticket/ticketController.js'
import checkAuth from '../utils/checkAuth.js'

const router = Router()

router.post('/create', checkAuth, create)
// router.post('/login', login)
// router.post('/recovery', recovery)
// router.get('/read', checkAuth, read)

export default router
