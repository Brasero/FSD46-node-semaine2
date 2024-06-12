import express from "express";
import path from 'node:path';
import session from 'express-session';
import routes from "./routes/index.js";
import cors from 'cors';
import MongoStore from "connect-mongo";

const server = express();
const port = 8000;

const __dirname = import.meta.dirname
const staticPath = path.join(__dirname, 'public')

server.set('view engine', "pug")
//server.set('views', path.join(__dirname, "view")) // par default -> ./views
// À utiliser uniquement si vos vues ne sont pas à la racine du projet dans un dossier "views"

// Le middleware de cors prendra un objet avec la propriété origin qui liste les origins autorisées.
server.use(cors({
  origin: [
    "http://localhost:8888",
    "http://127.0.0.1:8888"
  ]
}))

server.use(session({
  name: "test",
  secret: "simple",
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({mongoUrl: 'mongodb://localhost:27017/user'})
}))
server.use(express.static(staticPath))
server.use(express.urlencoded({extended: false}))
server.use(routes)


server.listen(port, () => {
  console.log(`Listening on port ${port}`)
})