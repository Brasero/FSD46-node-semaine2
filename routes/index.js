import express from 'express'
import {getForm, getSecurePage, login, logout} from "../controller/user.controller.js";
import authMiddleware from '../middleware/auth.js';

const router = express.Router()

router.get('/', getForm)
router.post('/login', login)
router.get('/secure', authMiddleware, getSecurePage)
router.get('/logout', authMiddleware, logout)

export default router