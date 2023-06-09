import { Router } from 'express'
import { create, read } from '../controllers/project/projectController.js'
import checkAuth from '../utils/checkAuth.js'

const router = Router()

router.post('/create', checkAuth, create)
// router.post('/login', login)
// router.post('/recovery', recovery)
router.get('/read', checkAuth, read)

export default router
