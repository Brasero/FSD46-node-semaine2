import express from "express";
// import {Router} from 'express';
import {userHome, getUserById} from "../controller/user.controller.js";


const router = express.Router()

router.get('/', userHome)
router.get("/user/:id", getUserById)

export default router;