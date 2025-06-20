import express from 'express';
import Stripe from 'stripe';
import userModel from '../models/userModel.js'; // sənin user modeli
import { userControlAuth } from '../middleware/authMiddleWare.js'; // token yoxlama middleware

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/', userControlAuth, async (req, res) => {
  const { userId, amount, paymentMethodId, currency } = req.body;
console.log('Payment request:', req.body);
  if (!userId || !amount || !paymentMethodId || !currency) {
    return res.status(400).json({ message: 'userId, amount, paymentMethodId və currency tələb olunur' });
  }

  try {
    // Stripe üçün məbləği sent-ə çeviririk
    const amountInCents = Math.round(amount * 100);

    // Payment Intent yaradılır
const paymentIntent = await stripe.paymentIntents.create({
  amount,
  currency,
  automatic_payment_methods: {
    enabled: true,
    allow_redirects: 'never',  // BUNU əlavə edirsən
  },
});

    // İstifadəçini tapırıq və balansını yeniləyirik
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'İstifadəçi tapılmadı' });
    }

    user.balance = (user.balance || 0) + amount;
    await user.save();

    // Uğurlu cavab
    return res.json({
      message: 'Ödəniş uğurla tamamlandı',
      balance: user.balance,
      amount,
    });

  } catch (error) {
    console.error('Stripe xətası:', error);
    return res.status(500).json({ message: error.message });
  }
});

export default router;
