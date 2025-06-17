import Order from '../models/orderModel.js';

export const createOrder = async (req, res) => {
  const {
    orders,      // array of items
    productTotal,
    cargoTotal,
    bankFee,
    grandTotal,
    currency,
  } = req.body;

  if (!Array.isArray(orders) || orders.length === 0) {
    return res.status(400).json({ message: "Orders array is required and can't be empty" });
  }

  const createdDocs = [];
  for (const item of orders) {
    const {
      productLink,
      quantity,
      size,
      color,
      internalCargo,
      productPrice,
      note,
    } = item;

    if (!productLink || !quantity || !productPrice) {
      return res.status(400).json({ message: "Lazımi sahələr boş ola bilməz" });
    }

    const order = new Order({
      user: req.user._id,
      productLink,
      quantity,
      size,
      color,
      internalCargo,
      productPrice,
      note,
      bankFee,
      totalPrice: grandTotal,
      currency,
    });
    createdDocs.push(await order.save());
  }

  res.status(201).json({ message: 'Sifarişlər uğurla yaradıldı', orders: createdDocs });
};
