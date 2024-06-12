import express from 'express'
import {getHome} from "../controller/post.controller.js";

const router = express.Router()

router.get('/', getHome)
export default router