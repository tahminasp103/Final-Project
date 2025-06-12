import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/connectDb.js';
import userRouter from './routes/userRoutes.js';
import { adminLogin } from './controllers/userController.js';
import branchRoutes from './routes/branchRoutes.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use('/api/branches', branchRoutes);
// Logger middleware - hər sorğunu konsola yazır, routerlardan əvvəl
app.use((req, res, next) => {
    console.log(`Request geldi: ${req.method} ${req.url}`);
    next();
});

// Digər user routes
app.use('/api/users', userRouter);

connectDB();

const PORT = process.env.PORT || 7777;
app.listen(PORT, () => console.log(`Server ${PORT}-ci portda işləyir`));
