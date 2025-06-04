import mongoose from "mongoose";
export const productSchema = mongoose.Schema({
    image:{type:String},
    title:{type:String},
    price:{type:String},
} , {timestamps:true})
const productModel = mongoose.model('products',productSchema)
export default productModel