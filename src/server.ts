import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import productRoutes from "./routes/productRoutes";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    console.error('MONGODB_URI no definido');
    process.exit(1);
}
const app = express();
app.use(express.json()); 
app.use('/api/products', productRoutes);
mongoose.connect(MONGODB_URI).then(() => {
    console.log('Conexión exitosa!');
}).catch((error)=> 
{
    console.error('Conexión fallida:',error);
    process.exit();
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});