import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
dotenv.config()

const {JWT_SECRET} = process.env

export function authMiddleware(req,res,next) {
  const {token} = req.session
  if (!token) {
    req.session.auth = false
    res.redirect("/login")
    return
  }
  jwt.verify(token, JWT_SECRET, {algorithm: "HS256"}, (err, decode) => {
    if (err || decode === null || decode === undefined) {
      req.session.auth = false
      res.redirect('/login')
      return
    }
    req.user = decode.user
    req.session.auth = true
    next()
  })
}