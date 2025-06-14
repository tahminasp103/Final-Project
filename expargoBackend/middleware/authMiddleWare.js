import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// İstifadəçi doğrulama middleware — hər giriş tələb olunan route üçün
export const userControlAuth = async (req, res, next) => {
  const token = req.cookies?.jwt;

  if (!token) {
    return res.status(401).json({ message: 'Token tapılmadı. Giriş edin.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.userId).select('-password');

    if (!req.user) {
      return res.status(401).json({ message: 'İstifadəçi tapılmadı' });
    }

    next();
  } catch (error) {
    console.error('JWT yoxlama xətası:', error);
    return res.status(401).json({ message: 'Token yanlışdır və ya vaxtı keçib' });
  }
};

// Admin icazəsi yoxlama middleware (userControlAuth-dan sonra çağırmaq lazımdır)
export const adminControlAuth = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Admin icazəsi tələb olunur' });
  }
};

// Dinamik rola görə icazə yoxlama middleware fabrik funksiyası
export const checkRole = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      return res.status(403).json({ message: `Yalnız ${role} daxil ola bilər` });
    }
  };
};
