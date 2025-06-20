import Message from '../models/messageModel.js';

export const sendMessage = async (req, res) => {
  const { email, text } = req.body;

  if (!email || !text) {
    return res.status(400).json({ message: "Email və mesaj tələb olunur" });
  }

  try {
    const message = await Message.create({ email, text });
    res.status(201).json({ message: "Mesaj göndərildi", data: message });
  } catch (error) {
    res.status(500).json({ message: "Xəta baş verdi", error: error.message });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Mesajlar alınmadı", error: error.message });
  }
};
