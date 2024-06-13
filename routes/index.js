import express from 'express'
import {addCat, getForm, getHome, show} from "../controller/cat.controller.js";

const router = express.Router()

router.post('/addCat', addCat)
router.get("/addCat", getForm)
router.get("/", getHome)
router.get("/cat/:name", show)
export default router