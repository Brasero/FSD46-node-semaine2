import express from 'express'
import catRoutes from "./catRoutes.js";
import productRoute from "./productRoute.js";

const router = express.Router()

router.use('/', catRoutes)
router.use('/shop', productRoute)

export default router