import User from "../model/user.js";
import crypto from "crypto"
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
import Flash from "../utils/flash.js";
dotenv.config()

const {CRYPTO_SECRET, JWT_SECRET} = process.env
const flasher = new Flash()
export function getHome(req,res) {
  res.render('user/signin', {title: "Student | Inscription"})
}

const isValid = (field) => {
  return (field.trim() !== "" && field)
}

export function createUser(req,res) {
  const {firstName, lastName, email, password, confirmPassword} = req.body
  const labels = {
    firstName: "Nom",
    lastName: "Prénom",
    email: "Email",
    password: "Mot de passe",
    confirmPassword: "Confirmez mot de passe"
  }
  if(!isValid(firstName) || !isValid(lastName) || !isValid(email) || !isValid(password) || !isValid(confirmPassword)) {
    Object.keys(req.body).forEach(key => {
      if(!isValid(req.body[key])) {
        flasher.addMessage(labels[key], "alert-danger", "Merci de remplir le champ comme attendu.")
      }
    })
    req.session.flashs = flasher.getMessages()
    res.redirect('/')
    return
  }
  
  if(password.trim() !== confirmPassword.trim()) {
    flasher.addMessage("Vos mot de passe posent soucis", "alert-danger", "Vos mot de passe ne corréspondent pas.")
    req.session.flashs = flasher.getMessages()
    res.redirect("/")
    return
  }
  
  User.findOne({email: email}).then(
    (user) => {
      if(user) {
        flasher.addMessage("L'utilisateur existe déjà", "alert-danger", "L'adresse e-mail utilisée est déjà connu par notre sérvice, merci de vous connécter")
        req.session.flashs = flasher.getMessages()
        res.status(501).send('User already exist')
        return
      }
      const newUser = new User({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password: password.trim()
      })
      newUser.save().then(
        () => {
          flasher.addMessage("Utilisateur crée", "alert-success", "Vous pouvez maintenant vous connécter avec l'adresse et le mot de passe utilisé lors de l'inscription.")
          req.session.flashs = flasher.getMessages()
          res.redirect('/login')
        },
        () => {
          flasher.addMessage("Erreur", "alert-danger", "Une erreur est survenue lors de votre inscription merci de d'essayer plus tard.")
          req.session.flashs = flasher.getMessages()
        }
      ).catch(() => {
        res.redirect("/")
      })
    }
  )
}
export function getLoginForm(req,res) {
  res.render('user/login', {title: "Students | Connexion"})
}

export function connectUser(req,res) {
  const {email, password} = req.body
  
  if (!isValid(email) || !isValid(password)) {
    flasher.addMessage("Erreur", "alert-danger", "Merci de remplir tout les champs.")
    req.session.flashs = flasher.getMessages()
    res.redirect('/login')
    return
  }
  User.findOne({email: email}).then(
    (user) => {
      if(!user) {
        flasher.addMessage('Erreur', "alert-danger", "Utilisateur inconnu")
        req.session.flashs = flasher.getMessages()
        res.redirect("/login")
        return
      }
      const hasher = crypto.createHmac("sha256", CRYPTO_SECRET)
      const hash = hasher.update(password).digest("hex")
      if (hash !== user.password) {
        flasher.addMessage("Erreur", "alert-danger", "Le mot de passe ne correspond pas.")
        req.session.flashs = flasher.getMessages()
        res.redirect("/login")
        return
      }
      req.session.token= jwt.sign({user}, JWT_SECRET, {expiresIn: "24h"})
      flasher.addMessage("Bravo", "alert-success", "Connexion reussie.")
      req.session.flashs = flasher.getMessages()
      res.redirect("/dashboard")
    },
    (reason) => {
      return reason
    }
  ).catch((err) => {
    flasher.addMessage("Erreur", "alert-danger", "Une erreur s'est produite lors de la connexion")
    req.session.flashs = flasher.getMessages()
    res.redirect('/login')
  })
}

export function getDashboard(req,res) {
  const {user} = req
  res.render("user/dashboard", {title: "Dashboard", user, auth: true})
}

export function logout(req,res) {
  req.session.destroy()
  res.redirect('/')
}