import Stripe from 'stripe';
import User from '../models/userModel.js';
import Payment from '../models/paymentModel.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const addBalance = async (req, res) => {
  const { userId, amount, currency, paymentMethodId } = req.body;

  if (!userId || !amount || !currency || !paymentMethodId) {
    return res.status(400).json({ message: 'Zəruri sahələr çatışmır' });
  }

  try {
    // Stripe PaymentIntent yaradılır və təsdiq edilir
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: paymentMethodId,
      confirm: true,
    });

    if (paymentIntent.status === 'succeeded') {
      // İstifadəçi tapılır
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'İstifadəçi tapılmadı' });
      }
      // Balans artırılır
      user.balance += amount / 100;  // sent -> dollar (və ya digər valyuta vahidi)
      await user.save();

      // Ödəniş məlumatları DB-yə yazılır
      const payment = new Payment({
        user: user._id,
        amount,
        currency,
        paymentIntentId: paymentIntent.id,
        status: paymentIntent.status,
      });
      await payment.save();

      return res.status(200).json({ message: 'Balans artırıldı', balance: user.balance });
    }

    return res.status(400).json({ message: 'Ödəniş uğursuz oldu' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
