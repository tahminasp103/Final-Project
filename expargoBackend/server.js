// server.js
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/connectDb.js';
import userRouter from './routes/userRoutes.js';
import branchRouter from './routes/branchRoutes.js';
import newsRouter from './routes/newsRouter.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // Yalnız bu originə icazə verilir
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Cookies və ya Authorization başlıqları göndərmək üçün
}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
connectDB();

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use('/api/users', userRouter);
app.use('/api/branches', branchRouter);
app.use('/api/news' , newsRouter)

app.listen(PORT, () => console.log(`Server ${PORT}-ci portda işləyir`));
