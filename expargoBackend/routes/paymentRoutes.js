import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import paymentController from '../controllers/paymentController.js';

dotenv.config();
const paymentRouter = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Kart yoxlama (Stripe PaymentMethod yaratmaqla)
paymentRouter.post('/check-card', async (req, res) => {
  const { cardNumber, expiry, cvc } = req.body;

  try {
    const [exp_month, exp_year_suffix] = expiry.split('/');
    const exp_year = 2000 + parseInt(exp_year_suffix, 10);

    await stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: cardNumber,
        exp_month: parseInt(exp_month, 10),
        exp_year: exp_year,
        cvc: cvc,
      },
    });

    res.status(200).json({ exists: true, message: 'Kart təsdiqləndi' });
  } catch (error) {
    res.status(400).json({ exists: false, message: error.message });
  }
});

// Balans artırmaq üçün "fake" payment (backenddə balans artırır)
paymentRouter.post('/fake', paymentController.fakePayment);

// İstəsən, real Stripe Payment Intent yaratmaq (frontenddə Stripe SDK ilə işləmək üçün)
paymentRouter.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // sentlərdə
      currency: currency || 'usd',
      payment_method_types: ['card'],
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Stripe payment error:', error);
    res.status(500).send({ error: 'Payment creation failed' });
  }
});

export default paymentRouter;
