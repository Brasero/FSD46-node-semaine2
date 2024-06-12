import express from 'express'
import {addPost, getForm, getHome} from "../controller/post.controller.js";
import userRoutes from "./userRoutes.js";

const router = express.Router()

router.get('/', getHome)
router.get('/add', getForm)
router.post('/add', addPost)
router.get('/data', (req,res) => {
  res.send('CORS OK')
})

router.use('/user', userRoutes)
export default router