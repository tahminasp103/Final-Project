// controllers/newsController.js
import newsModel from '../models/newsModel.js';

// ✅ Xəbər yarat (POST /api/news)
export const createNews = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file?.path;

    if (!title || !content) {
      return res.status(400).json({ message: 'Başlıq və məzmun tələb olunur' });
    }

    const news = new newsModel({ title, content, image });
    await news.save();

    res.status(201).json(news);
  } catch (err) {
    res.status(500).json({ message: 'Xəbər yaradılmadı', error: err.message });
  }
};

// ✅ Bütün xəbərləri al (GET /api/news)
export const getAllNews = async (req, res) => {
  try {
    const newsList = await newsModel.find().sort({ createdAt: -1 });
    res.json(newsList);
  } catch (err) {
    res.status(500).json({ message: 'Xəbərləri gətirmək olmadı', error: err.message });
  }
};

// ✅ Tək xəbəri al (GET /api/news/:id)
export const getNewsById = async (req, res) => {
  try {
    const news = await newsModel.findById(req.params.id);
    if (!news) return res.status(404).json({ message: 'Xəbər tapılmadı' });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: 'Xəbəri gətirmək olmadı', error: err.message });
  }
};

// ✅ Xəbəri sil (DELETE /api/news/:id)
export const deleteNews = async (req, res) => {
  try {
    const news = await newsModel.findByIdAndDelete(req.params.id);
    if (!news) return res.status(404).json({ message: 'Xəbər tapılmadı' });
    res.json({ message: 'Xəbər silindi' });
  } catch (err) {
    res.status(500).json({ message: 'Silinmə zamanı xəta baş verdi', error: err.message });
  }
};

// ✅ Xəbəri redaktə et (PUT /api/news/:id)
export const updateNews = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file?.path;

    const updatedFields = { title, content };
    if (image) updatedFields.image = image;

    const updatedNews = await newsModel.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );

    if (!updatedNews) return res.status(404).json({ message: 'Xəbər tapılmadı' });

    res.json(updatedNews);
  } catch (err) {
    res.status(500).json({ message: 'Redaktə zamanı xəta baş verdi', error: err.message });
  }
};
