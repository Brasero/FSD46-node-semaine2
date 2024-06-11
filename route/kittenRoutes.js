import express from "express";
import {addKitten, getKitten, getKittenForm, getKittens} from "../controller/kitten.controller.js";

const router = express.Router()

router.get("/kitten/:id", getKitten)
router.get('/', getKittens)
router.get('/add', getKittenForm)
router.post('/add', addKitten)

export default router;