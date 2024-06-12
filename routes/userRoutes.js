import express from "express";
import {getForm, login} from "../controller/user.controller.js";

const router = express.Router()

router.get('/', getForm)
router.post('/login', login)

export default router