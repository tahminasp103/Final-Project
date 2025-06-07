import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// OTP yaratmaq üçün funksiya (6 rəqəmli)
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Giriş funksiyası
const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.parolaKontrol(password))) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone: user.phone,
        fin: user.fin,
        isPhoneVerified: user.isPhoneVerified,
      });
    } else {
      res.status(400).json({ message: 'Email ya da parola hatalı' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Qeydiyyat funksiyası
const registerUser = async (req, res) => {
  try {
    const { name, surname, email, phone, fin, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Bu email ilə istifadəçi mövcuddur" });
    }

    const user = await User.create({
      name,
      surname,
      email,
      phone,
      fin,
      password,
    });

    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone: user.phone,
        fin: user.fin,
        isPhoneVerified: user.isPhoneVerified,
      });
    } else {
      res.status(400).json({ message: "İstifadəçi əlavə olunmadı" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Çıxış funksiyası
const logoutUser = async (req, res) => {
  try {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: 'Çıxış edildi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Profil məlumatlarını gətir
const getUserProfile = async (req, res) => {
  try {
    if (req.user) {
      res.json({
        _id: req.user._id,
        name: req.user.name,
        surname: req.user.surname,
        email: req.user.email,
        phone: req.user.phone,
        fin: req.user.fin,
        isPhoneVerified: req.user.isPhoneVerified,
      });
    } else {
      res.status(404).json({ message: 'İstifadəçi tapılmadı' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Profil məlumatlarını yenilə
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.surname = req.body.surname || user.surname;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      user.fin = req.body.fin || user.fin;

      if (req.body.password) {
        user.password = req.body.password;
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
    } else {
      res.status(404).json({ message: 'İstifadəçi tapılmadı' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Bütün istifadəçiləri al
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// İstifadəçini sil
const deleteUsers = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'İstifadəçi tapılmadı' });
    }
    res.json({ message: `İstifadəçi silindi: ${userId}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ OTP göndər
const sendOtpToPhone = async (req, res) => {
  try {
    const { phone } = req.body;

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: "İstifadəçi tapılmadı" });
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 dəqiqəlik

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    // Əslində SMS API ilə göndərilməlidir (Twilio və s.)
    console.log(`OTP kod: ${otp} -> nömrəyə: ${phone}`);

    res.status(200).json({ message: "OTP göndərildi" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ OTP-ni yoxla
const verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({ message: "İstifadəçi tapılmadı" });
    }

    if (
      user.otp !== otp ||
      !user.otpExpires ||
      user.otpExpires < new Date()
    ) {
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

// Exportlar
export {
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
