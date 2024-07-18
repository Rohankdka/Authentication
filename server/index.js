import express, { urlencoded } from 'express';
import db from './db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routers/authRoutes.js';
import blogRoutes from './routers/blogRoutes.js';
import cookieparser from 'cookie-parser'

dotenv.config()


const app = express();

app.use(express.json())
app.use(urlencoded({extended: true}))
app.use(cors())
app.use(cookieparser())


app.use('/',authRoutes)
app.use('/',blogRoutes)





const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`server connected on the ${PORT}`)
})



