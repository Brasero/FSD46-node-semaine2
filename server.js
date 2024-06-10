import express from "express";
import path from 'node:path';


const server = express();
const port = 8000;

const __dirname = import.meta.dirname
const staticPath = path.join(__dirname, 'public')

server.use(express.static(staticPath))
// server.get('/public/img/exemple.jpg', (req,res) => {
//   res.sendFile(path.join(staticPath, 'exemple.jpg'))
// })

server.get('/', (req,res) => {
  res.send(`
    <h1>Welcome</h1>
    <div><a href="/user/Paul">/user/Paul</a></div>
    <div><a href="/query?search=banana&limit=5">/query?search=banana&limit=5</a></div>
    
    <img src="/img/exemple.jpg" alt="img"/>
  `)
})


server.get("/user/:name", (req, res) => {
  const {name} = req.params
  
  res.send(`
    <div>User is ${name}</div>
    <a href="/" >Home</a>
  `)
})

server.get('/query', (req, res) => {
  const {search, limit} = req.query
  res.send(`
    <h1>Search</h1>
    <div>You're looking for ${search}, ${limit} times</div>
    <a href="/">Home</a>
  `)
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