import express from "express";
import userRoutes from "./userRoutes.js";
import adminRoutes from "./adminRoutes.js";
import formRoutes from './formRoutes.js';
import kittenRoutes from "./kittenRoutes.js";

const router = express.Router()

router.use("/", kittenRoutes)
router.use('/user', userRoutes)
router.use('/admin', adminRoutes)
router.use("/form", formRoutes)

export default router