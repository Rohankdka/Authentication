import express from 'express'
import { create,read,update,del } from '../controllers/blogController.js'
import { authToken } from '../controllers/authToken.js'

const blogRoutes = express.Router()

blogRoutes.post("/blog",authToken,create)
blogRoutes.get("/blog",read)
blogRoutes.put("/blog",update)
blogRoutes.delete("/blog/:id",del)

export default blogRoutes