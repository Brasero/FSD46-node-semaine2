import express from 'express'
import {formHome, submitForm} from "../controller/form.controller.js";

const router = express.Router()

router.get('/', formHome)
router.post('/', submitForm)

export default router