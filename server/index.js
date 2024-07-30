import express, { urlencoded } from 'express';
import db from './db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routers/authRoutes.js';
import blogRoutes from './routers/blogRoutes.js';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import path from 'path';

dotenv.config();

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}));
app.use(cookieParser());

// Set static folder
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

app.use('/', authRoutes);
app.use('/', blogRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server connected on port ${PORT}`);
});
