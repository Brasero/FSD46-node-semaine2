import express from "express";
import {getProductHome, getShopStats, showProduct} from "../controller/product.controller.js";

const router = express.Router()

router.get('/', getProductHome)
router.get('/show/:id', showProduct)
router.get('/stats', getShopStats)

export default router;