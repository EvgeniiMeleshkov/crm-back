import { Router } from 'express'
import { getCustomers } from '../controllers/user/userController.js'
import checkAuth from '../utils/checkAuth.js'

const router = Router()

router.get('/customers', checkAuth, getCustomers)

export default router
