import express, { urlencoded } from 'express';
import db from './db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routers/authRoutes.js';

dotenv.config()


const app = express();

app.use(express.json())
app.use(urlencoded({extended: true}))
app.use(cors())


app.use('/',authRoutes)





const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`server connected on the ${PORT}`)
})



