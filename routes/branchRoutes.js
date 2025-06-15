// routes/branchRoutes.js
import express from 'express';
import {
  getAll,
  create,
  update,
  remove
} from '../controllers/branchController.js';
import { isAdmin, verifyToken } from '../middleware/authMiddleWare.js';

const branchRoutes = express.Router();

// Burada GET route üçün userControlAuth silinir, beləliklə token olmadan işləyir
branchRoutes.get('/', getAll);

// Digər əməliyyatlarda auth qalır
branchRoutes.post('/',verifyToken,isAdmin, create);
branchRoutes.put('/:id', verifyToken,isAdmin, update);
branchRoutes.delete('/:id', verifyToken,isAdmin, remove);

export default branchRoutes;
