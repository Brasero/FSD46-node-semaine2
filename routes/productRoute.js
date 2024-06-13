import express from "express";
import {
  addProduct, deleteProduct,
  getProductForm,
  getProductHome,
  getProductUpdateForm,
  getShopStats,
  showProduct, updateProduct
} from "../controller/product.controller.js";

const router = express.Router()

router.get('/', getProductHome)
router.get('/show/:id', showProduct)
router.get('/stats', getShopStats)
router.get("/add", getProductForm)
router.get("/update/:id", getProductUpdateForm)
router.post('/add', addProduct)
router.post("/update/:id", updateProduct)
router.get('/delete/:id', deleteProduct)

export default router;