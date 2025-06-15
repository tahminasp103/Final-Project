// controllers/orderController.js
import Order from '../models/orderModel.js';

export const createOrder = async (req, res) => {
  const {
    productLink,
    quantity,
    size,
    color,
    internalCargo,
    productPrice,
    note,
  } = req.body;

  const bankFee = ((productPrice + internalCargo) * 0.02).toFixed(2); // misal üçün 2% bank xərci
  const totalPrice = (productPrice * quantity + internalCargo + parseFloat(bankFee)).toFixed(2);

  const order = new Order({
    user: req.user.id,
    productLink,
    quantity,
    size,
    color,
    internalCargo,
    productPrice,
    note,
    bankFee,
    totalPrice,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
};
