import express from 'express';
import {
  createOrder,
  getOrdersByUser,
  getAllOrders,
  updateOrderStatus,
  getOrderByNumber
} from '../controllers/orderController.js';
import { userControlAuth } from '../middleware/authMiddleWare.js';

const router = express.Router();

// İstifadəçi sifarişi yaradır
router.post('/', userControlAuth, createOrder);

// İstifadəçinin sifarişləri
router.get('/my-orders', userControlAuth, getOrdersByUser);

// Admin bütün sifarişləri görür
router.get('/', userControlAuth, getAllOrders);

// Admin status dəyişir
router.patch('/:id', userControlAuth, updateOrderStatus);

// Sifariş nömrəsi ilə axtarış (rəqəmli orderNumber)
router.get('/number/:orderNumber', userControlAuth, getOrderByNumber);

export default router;
