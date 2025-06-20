import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // login olan user
  productLink: { type: String, required: true },
  quantity: { type: Number, required: true },
  size: { type: String },
  color: { type: String },
  internalCargo: { type: Number },
  productPrice: { type: Number },
  note: { type: String },
  totalPrice: { type: Number },
  bankFee: { type: Number },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;