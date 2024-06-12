import fs from 'node:fs'
import path from 'node:path'
import user from '../data/user.js';
import crypto from "crypto-js";

const cwd = process.cwd()
const viewPath = path.join(cwd, 'views')

export function getForm(req,res) {
  // const html = fs.readFileSync(path.join(viewPath, 'form.html'), {encoding: "utf8"})
  // res.send(html)
  req.session.counter = 1
  res.render("form", {text: 'Voici mon texte'})
}

export function login(req,res) {
  const {name, password} = req.body
  
  if (!name || name.trim() === "" || !password || password.trim() === "") {
    req.session.auth = false
    console.log('connexion failed')
    res.status(403).send("Malformed request")
    return
  }
  if (name !== user.login || crypto.SHA1(password).toString() !== user.password) {
    req.session.auth = false
    console.log('connexion failed')
    res.status(401).send("Wrong credentials")
    return
  }
  console.log('connexion succeeded')
  req.session.auth = true
  res.redirect('/secure')
}

export function getSecurePage(req, res) {
  const html = fs.readFileSync(path.join(viewPath, 'secure.html'), {encoding: 'utf8'})
  res.send(html)
}

export function logout (req,res) {
  req.session.destroy((err) => {
    if (err) {
      res.redirect('/secure')
      return
    }
    res.redirect("/")
  })
}