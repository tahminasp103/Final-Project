import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUsers,
  adminLogin,
  updateUserBalance,
} from '../controllers/userController.js';
import { adminControlAuth, checkRole, userControlAuth, verifyToken } from '../middleware/authMiddleWare.js';
const router = express.Router();

router.patch('/:id/balance', verifyToken, updateUserBalance);
router.post('/admin/login', adminLogin);
router.post('/login', authUser);
router.post('/register', registerUser);
// router.post('/admin/login', adminLogin);
router.post('/logout', logoutUser);

router.get('/profile', userControlAuth, getUserProfile);
router.put('/profile', userControlAuth, updateUserProfile);
router.get('/profile', userControlAuth, (req, res) => {
  // req.user içində balans da var
  res.json({ user: req.user, balance: req.user.balance });
});

router.get('/admin', userControlAuth, adminControlAuth, (req, res) => {
  res.json({ message: 'Admin panelə xoş gəldiniz' });
});

router.get('/manager', userControlAuth, checkRole('manager'), (req, res) => {
  res.json({ message: 'Manager paneli' });
});
router.get('/', userControlAuth, getAllUsers);
router.delete('/:id', userControlAuth, deleteUsers);



export default router;
