import express from 'express';
import { sendMessage, getAllMessages } from '../controllers/messageController.js';
import Message from '../models/messageModel.js';

const router = express.Router();

router.post('/', sendMessage); // istifadəçi mesaj göndərir
router.get('/', getAllMessages); // admin mesajları görmək üçün
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Xəta baş verdi' });
  }
});
export default router;
