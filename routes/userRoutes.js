import express from "express";
import {connectUser, createUser, getDashboard, getHome, getLoginForm, logout} from "../controller/user.controller.js";
import {authMiddleware} from "./middleware/auth.js";

const router = express.Router()

router.get("/", getHome)
router.post('/signin', createUser)
router.get('/login', getLoginForm)
router.post('/login', connectUser)
router.get("/dashboard", authMiddleware, getDashboard)
router.get('/logout', authMiddleware, logout)

export default router