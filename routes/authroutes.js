import express from 'express'
import { RegisterUser, LoginUser } from '../controller/authController.js'

const router = express.Router()

router.post('/registerUser',RegisterUser)
router.post('/loginUser', LoginUser)

export default router