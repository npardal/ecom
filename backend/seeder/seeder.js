//Populating mongodb with initial data 
import mongoose from "mongoose"
import Product from "../models/product.js"
import products from "./data.js"
const seedProducts = async () => {
    try{
        await mongoose.connect("mongodb://localhost:27017/ecom")
        await Product.deleteMany(); 
        await Product.insertMany(products)
        process.exit(); 

    }catch(error){
        console.log(error.message)
        process.exit(); 
    }
}

seedProducts();