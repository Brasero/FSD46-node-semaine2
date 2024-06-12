import express from "express";
import path from 'node:path';
import session from 'express-session';
import routes from "./routes/index.js";

const server = express();
const port = 8000;

const __dirname = import.meta.dirname
const staticPath = path.join(__dirname, 'public')

server.set('view engine', "pug")
//server.set('views', path.join(__dirname, "view")) // par default -> ./views
// À utiliser uniquement si vos vues ne sont pas à la racine du projet dans un dossier "views"

server.use(session({
  name: "test",
  secret: "simple",
  resave: false,
  saveUninitialized: true
}))
server.use(express.static(staticPath))
server.use(express.urlencoded({extended: false}))
server.use(routes)


server.listen(port, () => {
  console.log(`Listening on port ${port}`)
})