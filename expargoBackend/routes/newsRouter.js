import express from 'express';
import {
  createNews,
  getAllNews,
  getNewsById,
  updateNews,
  deleteNews,
} from '../controllers/newsController.js';

// import upload from '../middlewares/multer.js'; // Şəkil yükləmə lazım deyilsə şərhə al

import { adminControlAuth } from '../middleware/authMiddleWare.js'; 

const newsRouter = express.Router();
// 🟢 Bütün xəbərləri gətir
newsRouter.get('/', getAllNews);
// 🟢 Tək xəbəri ID ilə gətir
newsRouter.get('/:id', getNewsById);

// 🔐 Yeni xəbər əlavə et
newsRouter.post('/', adminControlAuth, createNews);

// 🔐 Xəbəri redaktə et
newsRouter.put('/:id', adminControlAuth, updateNews);

// 🔐 Xəbəri sil
newsRouter.delete('/:id', adminControlAuth, deleteNews);

export default newsRouter;
