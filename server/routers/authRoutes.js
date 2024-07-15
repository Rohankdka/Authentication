import express from 'express'

import { loginUser, registerUser } from '../controllers/authController.js'


const authRoutes = express.Router()

authRoutes.post('/register',registerUser)
authRoutes.post('/login',loginUser)

export default authRoutes
