import mongoose from "./index.js";

const productSchema = mongoose.Schema({
  sale: Boolean,
  price: Number,
  society: String,
  qty: Number,
  size: {
    h: Number,
    w: Number,
    uom: String
  },
  year: Number
})

export default mongoose.model('products', productSchema)