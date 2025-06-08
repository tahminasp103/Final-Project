// routes/branchRoutes.js
import express from 'express';
import {
  getAll,
  create,
  update,
  remove
} from '../controllers/branchController.js';
import { userControlAuth } from '../middleware/authMiddleWare.js';

const router = express.Router();

// Burada GET route üçün userControlAuth silinir, beləliklə token olmadan işləyir
router.get('/', getAll);

// Digər əməliyyatlarda auth qalır
router.post('/', userControlAuth, create);
router.put('/:id', userControlAuth, update);
router.delete('/:id', userControlAuth, remove);

export default router;
