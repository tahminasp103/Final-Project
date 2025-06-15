import express from 'express';
import {
  createNews,
  getAllNews,
  getNewsById,
  updateNews,
  deleteNews,
} from '../controllers/newsController.js';

// import upload from '../middlewares/multer.js'; // Şəkil yükləmə lazım deyilsə şərhə al

import { isAdmin, verifyToken } from '../middleware/authMiddleWare.js'; // named import

const newsRouter = express.Router();
// 🟢 Bütün xəbərləri gətir
newsRouter.get('/', getAllNews);
// 🟢 Tək xəbəri ID ilə gətir
newsRouter.get('/:id', getNewsById);

// 🔐 Yeni xəbər əlavə et

newsRouter.post('/', verifyToken,isAdmin, createNews);
newsRouter.put('/:id',verifyToken,isAdmin, updateNews);
newsRouter.delete('/:id',verifyToken,isAdmin, deleteNews);

export default newsRouter;
