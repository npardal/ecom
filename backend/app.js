import express from "express"; 
const app = express(); 
import dotenv from 'dotenv'; 

dotenv.config({path: "backend/config/config.env"}); 


//Import all routess
import productRoutes from './routes/products.js'

app.use("/api", productRoutes)

app.listen(process.env.PORT, () => {
    console.log('Environment Variable NODE_ENV:', process.env.NODE_ENV);
    console.log(
        `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
    ; 
}); 