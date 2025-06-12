import bcrypt from 'bcryptjs';
import userModel from '../models/userModel.js';
import generateToken from "../utils/generateToken.js";
import jwt from 'jsonwebtoken';
// OTP yaratmaq üçün funksiya (6 rəqəmli)
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// 7 rəqəmli unikal ID yaratmaq üçün
const generate7DigitId = () => {
  return Math.floor(1000000 + Math.random() * 9000000).toString();
};
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'İstifadəçi tapılmadı' });
    }

   if (user.role !== 'admin') {
  return res.status(403).json({ message: 'Bu hissəyə yalnız admin giriş edə bilər' });
}
console.log('Gələn şifrə:', password);
console.log('DB-də saxlanılan hash:', user.password);
const isMatch = await bcrypt.compare(password, user.password);
console.log('Şifrə uyğunluğu:', isMatch);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Şifrə yanlışdır' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Serverdə xəta baş verdi' });
  }
};


// Giriş funksiyası
const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id, user.role);

    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        customId: user.customId,
      }
    });
  } else {
    res.status(401).json({ message: 'Email və ya şifrə yalnışdır' });
  }
};

const registerUser = async (req, res) => {
  const { name, surname, email, phone, fin, password } = req.body;
  try {
    if (await userModel.exists({ $or: [{ email }, { phone }, { fin }] })) {
      return res.status(400).json({ message: 'Email, telefon və ya FİN artıq mövcuddur' });
    }

    let customId;
    do {
      customId = Math.floor(1000000 + Math.random() * 9000000).toString();
    } while (await userModel.exists({ customId }));

    const newUser = await userModel.create({
      name, surname, email, phone, fin,
      password: await bcrypt.hash(password, 10),
      customId
    });

    generateToken(res, newUser._id, newUser.role);

    res.status(201).json({
      user: {
        _id: newUser._id,
        customId: newUser.customId,
        name: newUser.name,
        surname: newUser.surname,
        email: newUser.email,
        phone: newUser.phone,
        fin: newUser.fin,
        isPhoneVerified: newUser.isPhoneVerified,
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Çıxış funksiyası
const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Çıxış edildi' });
};

// Profil məlumatlarını gətir
const getUserProfile = async (req, res) => {
  try {
    if (!req.user) return res.status(404).json({ message: 'İstifadəçi tapılmadı' });

    res.json({
      _id: req.user._id,
      customId: req.user.customId,
      name: req.user.name,
      surname: req.user.surname,
      email: req.user.email,
      phone: req.user.phone,
      fin: req.user.fin,
      isPhoneVerified: req.user.isPhoneVerified,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Profil məlumatlarını yenilə
const updateUserProfile = async (req, res) => {
  const { name, surname, email, phone, fin, password } = req.body;
  try {
    const user = await userModel.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'İstifadəçi tapılmadı' });

    // Yeni məlumatları yeniləyirik
    user.name = name || user.name;
    user.surname = surname || user.surname;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.fin = fin || user.fin;

    if (password) {
      user.password = await bcrypt.hash(password, 10); // Yeni şifrəni hash edirik
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      surname: updatedUser.surname,
      email: updatedUser.email,
      phone: updatedUser.phone,
      fin: updatedUser.fin,
      isPhoneVerified: updatedUser.isPhoneVerified,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Bütün istifadəçiləri al
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// İstifadəçini sil
const deleteUsers = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ message: 'İstifadəçi tapılmadı' });
    res.json({ message: `İstifadəçi silindi: ${id}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// OTP göndər
const sendOtpToPhone = async (req, res) => {
  const { phone } = req.body;
  try {
    const user = await userModel.findOne({ phone });
    if (!user) return res.status(404).json({ message: "İstifadəçi tapılmadı" });

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 dəqiqəlik

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    // Burada SMS göndərmə kodu əlavə oluna bilər (Twilio və s.)
    console.log(`OTP kod: ${otp} -> nömrəyə: ${phone}`);

    res.status(200).json({ message: "OTP göndərildi" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// OTP-ni yoxla
const verifyOtp = async (req, res) => {
  const { phone, otp } = req.body;
  try {
    const user = await userModel.findOne({ phone });
    if (!user) return res.status(404).json({ message: "İstifadəçi tapılmadı" });

    if (user.otp !== otp || !user.otpExpires || user.otpExpires < new Date()) {
      return res.status(400).json({ message: "OTP düzgün deyil və ya vaxtı bitib" });
    }

    user.isPhoneVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ message: "Nömrə təsdiqləndi" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  generate7DigitId,
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUsers,
  sendOtpToPhone,
  verifyOtp,
};
