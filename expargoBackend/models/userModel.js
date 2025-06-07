import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Ad daxil edilməlidir'],
      match: [/^[A-Za-zƏəÖöÜüĞğÇçŞşİı\s]+$/, 'Ad yalnız hərflərdən ibarət olmalıdır'],
    },
    surname: {
      type: String,
      required: [true, 'Soyad daxil edilməlidir'],
      match: [/^[A-Za-zƏəÖöÜüĞğÇçŞşİı\s]+$/, 'Soyad yalnız hərflərdən ibarət olmalıdır'],
    },
    email: {
      type: String,
      required: [true, 'Email daxil edilməlidir'],
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Nömrə daxil edilməlidir'],
      unique: true,
      match: [/^\d{9}$/, 'Nömrə düzgün formatda deyil (9 rəqəm)'],
    },
    fin: {
      type: String,
      required: [true, 'FİN kod daxil edilməlidir'],
      unique: true,
      minlength: [7, 'FİN kodu 7 simvol olmalıdır'],
      maxlength: [7, 'FİN kodu 7 simvol olmalıdır'],
    },
    password: {
      type: String,
      required: [true, 'Şifrə daxil edilməlidir'],
    },

    // 🔐 OTP və təsdiqləmə sahələri
    otp: {
      type: String,
    },
    otpExpires: {
      type: Date,
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Şifrəni DB-yə yazmadan əvvəl hash-lə
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Parolanın düzgünlüyünü yoxlayan method
userSchema.methods.parolaKontrol = async function (girilenParola) {
  return await bcrypt.compare(girilenParola, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
