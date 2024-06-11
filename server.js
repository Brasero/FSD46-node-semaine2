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

server.all("*", (req, res) => {
  if (req.session.counter) {
    req.session.counter++
  } else {
    req.session.counter = 1
  }
  
  console.log(req.session.counter)
  
  // Reset de la session et des infos qu'elle contient
  req.session.regenerate((err) => {
    console.log(err)
  })
  
  // Détruit la session et toutes les infos qu'elle contient
  req.session.destroy((err) => {
    console.log(err)
  })
  
  res.send(`
    <code>
      <a href="/">/</a><br>
      <a href="/app">/app</a><br>
      <a href="/app/Julian">/app/Julian</a><br>
      <a href="/app/Driss?lang=ca">/app/Driss?lang=ca</a><br>
      <br>
      <form action="/app/create" method="post">
        <input type="text" name="name" placeholder="name" size="5" />
        <button type="submit">POST /app/create</button>
      </form>
    </code>
  `)
})

server.listen(port, () => {
  console.log(`Listening on port ${port}`)
})