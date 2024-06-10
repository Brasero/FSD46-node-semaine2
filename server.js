import express from "express";

const server = express();
const port = 8000;


server.get('/', (req,res) => {
  res.send(`
    <h1>Welcome</h1>
    <div><a href="/user/Paul">/user/Paul</a></div>
    <div><a href="/query?search=banana&limit=5">/query?search=banana&limit=5</a></div>
    
    <img src="https://picsum.photos/200/300" alt="img"/>
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