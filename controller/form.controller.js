import fs from 'node:fs'
import path from 'node:path'

const __dirname = import.meta.dirname

const viewPath = path.join(__dirname, '..', "view")

export const formHome = (req, res) => {
  const form = fs.readFileSync(path.join(viewPath, 'form.html'), {encoding: "utf-8"})
  res.send(form)
}

export const submitForm = (req, res) => {
  const {firstName, lastName} = req.body
  
  if (!firstName || !lastName) {
    res.status(403).send("Malformed request")
    return
  }
  
  
  
  res.send(`Form received with data : ${lastName}, ${firstName}`)
}