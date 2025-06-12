import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUsers,
  sendOtpToPhone,
  verifyOtp,
  // adminLogin,
  adminLogin,
} from '../controllers/userController.js';
import { adminControlAuth, checkRole, userControlAuth } from '../middleware/authMiddleWare.js';

const router = express.Router();
router.post('/admin/login', adminLogin);
router.post('/login', authUser);
router.post('/register', registerUser);
// router.post('/admin/login', adminLogin);
router.post('/logout', logoutUser);

router.get('/profile', userControlAuth, getUserProfile);
router.put('/profile', userControlAuth, updateUserProfile);
router.get('/profile', userControlAuth, (req, res) => {
  res.json(req.user);
});

router.get('/admin', userControlAuth, adminControlAuth, (req, res) => {
  res.json({ message: 'Admin panelə xoş gəldiniz' });
});

router.get('/manager', userControlAuth, checkRole('manager'), (req, res) => {
  res.json({ message: 'Manager paneli' });
});
router.get('/', userControlAuth, getAllUsers);
router.delete('/:id', userControlAuth, deleteUsers);

router.post('/send-otp', sendOtpToPhone);
router.post('/verify-otp', verifyOtp);

export default router;
