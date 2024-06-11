import express from "express";
import path from 'node:path';
import fs from 'node:fs'
import {header} from "./utils/header.js";
import router from "./route/index.js";

const server = express();
const port = 8000;

const __dirname = import.meta.dirname
const staticPath = path.join(__dirname, 'public')

const myMiddleware = (req,res,next) => {
  console.log('Hi middleware')
  next()
}

const returnMiddleware = (message) => {
  return (req,res,next) => {
    console.log(message)
    next()
  }
}

server.use(express.static(staticPath))
server.use(express.urlencoded({extended: false}))
server.use(express.json())
server.use(myMiddleware)
server.use(returnMiddleware('returned middleware'))
// server.get('/public/img/exemple.jpg', (req,res) => {
//   res.sendFile(path.join(staticPath, 'exemple.jpg'))
// })
server.use(router)



server.get("*", (req, res) => {
  res.status(404).send(`
    <h1>Not found</h1>
    <div><a href="/">Home</a></div>
  `)
})

server.listen(port, () => {
  console.log(`Listening on port ${port}`)
})