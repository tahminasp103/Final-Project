import productModel from "../model/productModel.js"

const getProduct = async(req,res)=>{
   const product = await productModel.find()
   res.json(product)
}
const postProduct = async(req,res)=>{
    const newProduct = req.body
    await productModel.create(newProduct)
    res.json(newProduct)
}
const deleteProduct = async(req,res)=>{
    const {id}=req.params
    await productModel.findByIdAndDelete(id)
    res.json('mehsul ugurla silindi')
}
export {getProduct,postProduct,deleteProduct}