import express from 'express'
import {addPost, getForm, getHome} from "../controller/post.controller.js";

const router = express.Router()

router.get('/', getHome)
router.get('/add', getForm)
router.post('/add', addPost)
router.get('/data', (req,res) => {
  res.send('CORS OK')
})
export default router