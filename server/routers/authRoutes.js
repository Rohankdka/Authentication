import express from 'express'

import { loginUser, registerUser} from '../controllers/authController.js'
import { create,read,update,del } from '../controllers/blogController.js'


const authRoutes = express.Router()

authRoutes.post('/register',registerUser)
authRoutes.post('/login',loginUser)
authRoutes.post("/",create)
authRoutes.get("/",read)
authRoutes.put("/",update)
authRoutes.delete("/:id",del)


export default authRoutes
