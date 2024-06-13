import mongoose from './index.js';

const cat = mongoose.Schema({
  name: String,
  age: Number,
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

export default mongoose.model("cat", cat)