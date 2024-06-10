import express from "express";
import path from 'node:path';
import fs from 'node:fs'
import {header} from "./utils/header.js";
import router from "./route/index.js";

const server = express();
const port = 8000;

const __dirname = import.meta.dirname
const staticPath = path.join(__dirname, 'public')
const dataPath = path.join(staticPath, 'data')
const viewPath = path.join(__dirname, 'view')

server.use(express.static(staticPath))
server.use(express.urlencoded({extended: false}))
server.use(express.json())
// server.get('/public/img/exemple.jpg', (req,res) => {
//   res.sendFile(path.join(staticPath, 'exemple.jpg'))
// })

const nav = fs.readFileSync(path.join(viewPath, "_nav.html"), {encoding: 'utf8'})
const footer = fs.readFileSync(path.join(viewPath, '_footer.html'), {encoding: "utf8"})

server.use(router)
server.get('/', (req,res) => {
  const data = fs.readFileSync(path.join(dataPath, 'kittens.json'), {encoding: "utf8"})
  const kittens = JSON.parse(data)
  
  let list = "<ul>"
  
  kittens.forEach(kitten => {
    list += `
        <li>
         <img src="/img/${kitten.image}" alt="kitten" />
         <a href="/kitten/${kitten.id}">${kitten.name}</a>
        </li>
    `
  })
  
  list += '</ul>'
  
  const html = header('/css/home.css') + nav + `
    <body>
        <div class="container">
            ${list}
        </div>
    </body>
  ` + footer
  
  res.send(html)
})

server.get("/kitten/:id", (req, res) => {
  const {id} = req.params
  
  const filePath = path.join(dataPath, `${id}.json`)
  
  if (isNaN(parseInt(id)) || !fs.existsSync(filePath)) {
    res.status(404).send("Not Found")
    return
  }
  
  const data = fs.readFileSync(filePath, {encoding: 'utf8'})
  const kitten = JSON.parse(data)
  
  const html = header('/css/kitten.css') + nav + `
    <div class="container">
        <img src="/img/${kitten.image}" alt="kitten" />
        <h3>${kitten.name}</h3>
        <small>${kitten.age} years</small>
        <p>${kitten.description}</p>
    </div>
  ` + footer
  
  res.send(html)
  
})

server.get("*", (req, res) => {
  res.status(404).send(`
    <h1>Not found</h1>
    <div><a href="/">Home</a></div>
  `)
})

server.listen(port, () => {
  console.log(`Listening on port ${port}`)
})