import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // .env faylını yükləyir

const connectDB = async () => {
     console.log('🔌 MongoDB-ə qoşulmağa çalışıram...');
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MONGO BAĞLANDI: ${connect.connection.host}`);
    } catch (error) {
        console.error('MongoDB Bağlantı Xətası:', error);
        process.exit(1);
    }
};

export default connectDB;
