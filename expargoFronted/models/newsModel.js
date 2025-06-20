import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: {
    url: { type: String },    // Şəkilin serverdəki yolu və ya URL-si
    altText: { type: String }, // İstəyə bağlı: alternativ mətn SEO və accessibility üçün
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Yenilənmə tarixini avtomatik yeniləmək üçün middleware
newsSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const newsModel = mongoose.model('News', newsSchema);

export default newsModel;
