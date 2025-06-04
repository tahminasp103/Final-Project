import express, { json, urlencoded } from 'express'
import cors from 'cors'
import { configDotenv } from 'dotenv'
import { connectDb } from './config/Config.js'
import basketRouter from './router/basketRouter.js'
import productRouter from './router/productRouter.js'
configDotenv()
connectDb()
const app = express()
app.use(cors(''))
app.use(express.json())
app.use(json())
app.use(urlencoded({extended:true}))
app.use('/basket',basketRouter)
app.use('/product',productRouter)
const PORT = 5013
app.listen(PORT,()=>{
  console.log(`Backend ${PORT} cu portda isleyir`);
})