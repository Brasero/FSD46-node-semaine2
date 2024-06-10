import express from "express";

const server = express();
const port = 8000;

server.get("/", (req, res) => {
  
  // Pour récupérerer les entêtes de requetes
  req.header("Authorization");
  const headers = req.headers["Authorization"]
  
  res.set("Content-type", "text/plain").status(200).send("hello")
})

server.get("/home", (req,res) => {
  res.send('Home')
})

server.post("/", (req, res) => {
  res.send('Form received')
})

server.get('/word/gr+s', (req,res) => {
  res.send("match string pattern")
})

server.get(/\/gr+s/,(req,res) => {
  res.send("match regex")
})

server.get("/user/:id/:name", (req, res) => {
  const id = req.params.id
  const name = req.params.name
  const query = req.query
  
  console.log(query)
  
  res.send(`User id : ${id}, ${name}`)
  
})



server.listen(port, () => {
  console.log(`Listening on port ${port}`)
})