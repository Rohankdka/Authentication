import express from 'express'
import { create,read,update,del, re } from '../controllers/blogController.js'
import { authToken } from '../controllers/authToken.js'

const blogRoutes = express.Router()

blogRoutes.post("/",authToken,create)
blogRoutes.get("/",read)
blogRoutes.put("/:id",authToken,update)
blogRoutes.delete("/:id",authToken,del)
blogRoutes.get('/read',authToken,re)

export default blogRoutes