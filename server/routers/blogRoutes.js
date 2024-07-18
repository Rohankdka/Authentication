import express from 'express'
import { create,read,update,del } from '../controllers/blogController.js'
import { authToken } from '../controllers/authToken.js'

const blogRoutes = express.Router()

blogRoutes.post("/",authToken,create)
blogRoutes.get("/",read)
blogRoutes.put("/",update)
blogRoutes.delete("/:id",del)

export default blogRoutes