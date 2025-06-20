import bcrypt from 'bcryptjs';
import userModel from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

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

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Şifrə yanlışdır' });
    }

    const token = generateToken(res, user._id, user.role);  // Düzgün çağırış

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
         balance: user.balance || 0,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Serverdə xəta baş verdi' });
  }
};

// Giriş funksiyası
export const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(res, user._id, user.role);  // Düzgün çağırış

      res.status(200).json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          customId: user.customId,
          balance: user.balance || 0,
        },
        token,
      });
    } else {
      res.status(401).json({ message: 'Email və ya şifrə yalnışdır' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Serverdə xəta baş verdi' });
  }
};

export const updateUserBalance = async (req, res) => {
  const userId = req.params.id;
  const { amount } = req.body;

  try {
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "İstifadəçi tapılmadı" });

    user.balance = (user.balance || 0) + amount;
    await user.save();

    res.status(200).json({ message: "Balans uğurla yeniləndi", balance: user.balance });
  } catch (error) {
    console.error('Balans yeniləmə xətası:', error);
    res.status(500).json({ message: "Server xətası" });
  }
};

export const registerUser = async (req, res) => {
  const { name, surname, email, phone, fin, password } = req.body;
  try {
    if (await userModel.exists({ $or: [{ email }, { phone }, { fin }] })) {
      return res.status(400).json({ message: 'Email, telefon və ya FİN artıq mövcuddur' });
    }

    let customId;
    do {
      customId = generate7DigitId();
    } while (await userModel.exists({ customId }));

    const newUser = await userModel.create({
      name,
      surname,
      email,
      phone,
      fin,
      password: await bcrypt.hash(password, 10),
      customId,
          balance:  0,
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
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Çıxış edildi' });
};

export const getUserProfile = async (req, res) => {
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
      balance: req.user.balance || 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  const { name, surname, email, phone, fin, password } = req.body;
  try {
    const user = await userModel.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'İstifadəçi tapılmadı' });

    user.name = name || user.name;
    user.surname = surname || user.surname;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.fin = fin || user.fin;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
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

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUsers = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ message: 'İstifadəçi tapılmadı' });
    res.json({ message: `İstifadəçi silindi: ${id}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// OTP funksiyaları
export const sendOtpToPhone = async (req, res) => {
  const { phone } = req.body;
  try {
    const user = await userModel.findOne({ phone });
    if (!user) return res.status(404).json({ message: 'İstifadəçi tapılmadı' });

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    // SMS göndərmə kodu əlavə et
    console.log(`OTP kod: ${otp} -> nömrəyə: ${phone}`);

    res.status(200).json({ message: 'OTP göndərildi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  const { phone, otp } = req.body;
  try {
    const user = await userModel.findOne({ phone });
    if (!user) return res.status(404).json({ message: 'İstifadəçi tapılmadı' });

    if (user.otp !== otp || !user.otpExpires || user.otpExpires < new Date()) {
      return res.status(400).json({ message: 'OTP düzgün deyil və ya vaxtı bitib' });
    }

    user.isPhoneVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ message: 'Nömrə təsdiqləndi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
