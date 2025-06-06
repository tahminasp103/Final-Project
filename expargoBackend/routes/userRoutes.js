import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUsers
} from '../controllers/userController.js';
import { userControlAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);

router.route('/profile')
  .get(userControlAuth, getUserProfile)
  .put(userControlAuth, updateUserProfile);

router.get('/all', userControlAuth, getAllUsers);
router.delete('/all/:id', userControlAuth, deleteUsers);

export default router;
