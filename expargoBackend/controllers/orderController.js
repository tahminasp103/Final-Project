import { customAlphabet } from 'nanoid';
import Order from '../models/orderModel.js';

const nanoid = customAlphabet('0123456789', 6);

// Yeni sifariş yaratmaq
export const createOrder = async (req, res) => {
  const { orders, grandTotal, bankFee, currency } = req.body;

  if (!Array.isArray(orders) || orders.length === 0) {
    return res.status(400).json({ message: "Orders array is required" });
  }

  try {
    const created = [];
    for (const item of orders) {
      const ord = new Order({
        user: req.user._id,
        productLink: item.productLink,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        internalCargo: item.internalCargo,
        productPrice: item.productPrice,
        note: item.note,
        bankFee,
        totalPrice: grandTotal,
        currency,
      });
      await ord.save();  // orderNumber avtomatik yaradılır pre('save') hook ilə
      created.push(ord);
    }
    res.status(201).json({ message: 'Yaradıldı', orders: created });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Cari istifadəçinin sifarişlərini gətir
export const getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Sifarişlər alınmadı', error: error.message });
  }
};

// Admin: bütün sifarişləri gətir
export const getAllOrders = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Yalnız adminə icazə var' });
  }
  try {
    const orders = await Order
      .find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Sifarişlər alınmadı', error: error.message });
  }
};

// Admin: status yeniləmək
export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Yalnız adminə icazə var' });
  }

  try {
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: 'Sifariş tapılmadı' });

    if (status) order.status = status;

    await order.save();
    res.json({ message: 'Sifariş yeniləndi', order });
  } catch (error) {
    res.status(500).json({ message: 'Yeniləmə mümkün olmadı', error: error.message });
  }
};

// Sifariş nömrəsi ilə sifarişi gətir (istifadəçi üçün)
export const getOrderByNumber = async (req, res) => {
  const { orderNumber } = req.params;
  try {
    const order = await Order
      .findOne({ orderNumber, user: req.user?._id })
      .populate('user', 'name email');
    if (!order) return res.status(404).json({ message: 'Sifariş tapılmadı' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
