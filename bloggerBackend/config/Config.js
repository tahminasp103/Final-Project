import mongoose from "mongoose";
export const connectDb = async()=>{
    const connect = mongoose.connect(process.env.URL)
}