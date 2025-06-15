// routes/paymentRoutes.js
import express from 'express';
const paymenRoutes = express.Router();

let userBalance = {
  'user123': 0 // burda user ID olacaq, frontend auth varsa ordan gələcək
};

paymenRoutes.post('/fake-payment', (req, res) => {
  const { cardNumber, name, expiry, cvc, amount, userId } = req.body;

  // Kart məlumatlarının sadə yoxlanması
  if (
    !cardNumber || cardNumber.length !== 16 ||
    !name || name.length < 2 ||
    !expiry || !/^\d{2}\/\d{2}$/.test(expiry) ||
    !cvc || cvc.length !== 3 ||
    !amount || isNaN(amount)
  ) {
    return res.status(400).json({ message: 'Kart məlumatları düzgün deyil' });
  }

  // Əgər yoxlama keçərsə, balans artırılır
  userBalance[userId] = (userBalance[userId] || 0) + parseFloat(amount);

  return res.status(200).json({
    message: 'Balans uğurla artırıldı',
    newBalance: userBalance[userId]
  });
});

paymenRoutes.get('/balance/:userId', (req, res) => {
  const { userId } = req.params;
  const balance = userBalance[userId] || 0;
  res.json({ balance });
});

export default paymenRoutes;
