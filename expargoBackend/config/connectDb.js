import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MONGO BAĞLANDI: ${connect.connection.host}`);
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

export default connectDB;