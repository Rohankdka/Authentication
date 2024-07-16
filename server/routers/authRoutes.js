import express from 'express'

import { create, del, loginUser, read, registerUser, update } from '../controllers/authController.js'


const authRoutes = express.Router()

authRoutes.post('/register',registerUser)
authRoutes.post('/login',loginUser)
authRoutes.post("/",create)
authRoutes.get("/",read)
authRoutes.put("/",update)
authRoutes.delete("/:id",del)


export default authRoutes
