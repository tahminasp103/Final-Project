import basketModel from "../model/basketModel.js"

const getBasket = async(req,res)=>{
   const basket = await basketModel.find()
   res.json(basket)
}
const postBasket = async(req,res)=>{
    const newBasket = req.body
    await basketModel.create(newBasket)
    res.json(newBasket)
}
const deleteBasket = async(req,res)=>{
    const {id}=req.params
    await basketModel.findByIdAndDelete(id)
    res.json('mehsul ugurla silindi')
}
export {getBasket,postBasket,deleteBasket}