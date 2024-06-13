import express from "express";
import {addCat, deleteCat, getCatUpdateForm, getForm, getHome, show, updateCat} from "../controller/cat.controller.js";

const router = express.Router()

router.post('/addCat', addCat)
router.get("/addCat", getForm)
router.get("/", getHome)
router.get("/cat/:name", show)
router.get('/cat/delete/:id', deleteCat)
router.get("/cat/update/:id", getCatUpdateForm)
router.post('/cat/update/:id', updateCat)
export default router