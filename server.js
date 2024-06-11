import express from "express";
import path from 'node:path';
import session from 'express-session';
import {counterMiddleware, loggerMiddleware} from "./middleware.js";

const server = express();
const port = 8000;

const __dirname = import.meta.dirname
const staticPath = path.join(__dirname, 'public')

server.use(session({
  name: "test",
  secret: "simple",
  resave: false,
  saveUninitialized: true
}))
server.use(express.static(staticPath))
server.use(express.urlencoded({extended: false}))

server.get("/", (req, res) => {
  if (req.session.counter) {
    req.session.counter++
  } else {
    req.session.counter = 1;
  }
  
  if (req.session.counter >= 10){
    res.redirect("/check")
    return
  }
  
  res.send({page: "/", counter: req.session.counter})
})

server.get('/check', (req, res) => {
  res.send(`
    page: /check
    counter: ${req.session.counter}
    <a href="/delete">Retry</a>
  `)
})

server.get('/delete', (req, res) => {
  req.session.regenerate(() => {})
  res.redirect('/')
})

server.listen(port, () => {
  console.log(`Listening on port ${port}`)
})