import express from 'express';
import { createOrder } from '../controllers/orderController.js';
import { userControlAuth } from '../middleware/authMiddleWare.js';

const router = express.Router();

router.post('/', userControlAuth, createOrder); // token yoxlanacaq və sifariş yaradılacaq

export default router;
