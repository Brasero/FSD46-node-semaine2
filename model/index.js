import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const {MONGO_URL} = process.env

const mongoDB = await mongoose.connect(MONGO_URL)
console.log("Connected to mongoDB")

export default mongoDB