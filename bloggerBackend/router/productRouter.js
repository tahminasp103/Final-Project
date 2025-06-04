import express from 'express'
import { deleteProduct, getProduct, postProduct } from '../controller/productController.js'
const productRouter = express.Router()
productRouter.route('/')
.get(getProduct)
.post(postProduct)
productRouter.route('/:id')
.delete(deleteProduct)
export default productRouter