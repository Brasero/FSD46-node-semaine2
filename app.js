import express from "express"
import dotenv from 'dotenv'
import session from 'express-session'
import MongoStore from "connect-mongo";
import path from 'node:path'
import routes from "./routes/index.js";

dotenv.config()

const __dirname = import.meta.dirname
const staticPath = path.join(__dirname, 'public')

const {APP_HOST, APP_PORT, SESSION_SECRET, MONGO_URL} = process.env
const app = express()
app.set('view engine', "pug")

app.use(session({
  name: "student",
  secret: SESSION_SECRET,
  saveUninitialized: false,
  resave: true,
  store: MongoStore.create({mongoUrl: MONGO_URL})
}))

app.use(function(req,res,next) {
  res.locals.auth = req.session.auth
  next()
})

app.use(function(req,res,next) {
  res.locals.flashs = req.session.flashs
  req.session.flashs = null
  next()
})

app.use(express.static(staticPath))
app.use(express.urlencoded({extended: false}))
app.use(routes)

app.listen(APP_PORT, APP_HOST, () => {
  console.log(`App running on http://${APP_HOST}:${APP_PORT}`)
})