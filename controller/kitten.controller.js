import path from "node:path";
import fs from "node:fs";
import {header} from "../utils/header.js";

const cwd = process.cwd()

const viewPath = path.join(cwd, 'view')
const dataPath = path.join(cwd, "public", 'data')

const nav = fs.readFileSync(path.join(viewPath, "_nav.html"), {encoding: 'utf8'})
const footer = fs.readFileSync(path.join(viewPath, '_footer.html'), {encoding: "utf8"})


export const getKitten = (req, res) => {
  const {id} = req.params
  
  const filePath = path.join(dataPath, `${id}.json`)
  
  if (isNaN(parseInt(id)) || !fs.existsSync(filePath)) {
    res.status(404).send("Not Found")
    return
  }
  
  const data = fs.readFileSync(filePath, {encoding: 'utf8'})
  const kitten = JSON.parse(data)
  
  const image = kitten.image.startsWith('http') ? kitten.image : `/img/${kitten.image}`
  
  const html = header('/css/kitten.css') + nav + `
    <div class="container">
        <img src='${image}' alt="kitten" />
        <h3>${kitten.name}</h3>
        <small>${kitten.age} years</small>
        <p>${kitten.description}</p>
    </div>
  ` + footer
  
  res.send(html)
  
}

export const getKittens = (req,res) => {
  const data = fs.readFileSync(path.join(dataPath, 'kittens.json'), {encoding: "utf8"})
  const kittens = JSON.parse(data)
  
  
  let list = "<ul>"
  
  kittens.forEach(kitten => {
    const image = kitten.image.startsWith("https") ? kitten.image : `/img/${kitten.image}`
    list += `
        <li>
         <img src="${image}" alt="kitten" />
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
}

export const getKittenForm = (req,res) => {
  const {error} = req.query
  
  let html = header('') + nav + `
     <div class="container">
     ${(error && error.trim() !== "") && `<div className={"error"}>${error}</div>` }
      <form action="/add" method="post">
        Nom : <input type="text" name="name" placeholder="Nyan"><br>
        Age : <input type="number" name="age" placeholder="2" min="0"><br>
        Photo : <input type="text" name="image" placeholder="https://placekitten.com/489/640"><br>
        Description : <input type="text" name="description" placeholder="Super Nyan cat …"><br>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  ` + footer;
  
  res.send(html);
}

export const addKitten = (req, res) => {
  const {name, age, image, description} = req.body
  
  if (name.trim() === "" || age.trim() === "" || image.trim() === '' || description.trim() === "") {
    const error = "Please, complete all the inputs."
    res.redirect(`/add?error=${encodeURIComponent(error)}`)
    return
  }
  
  if (isNaN(parseInt(age)) || parseInt(age) <= 0) {
    const error = "The kitten has to be born"
    res.redirect(`/add?error=${encodeURIComponent(error)}`)
    return
  }
  
  if (!image.startsWith('https://placekitten.com')) {
    const error = 'Please, fill a valid image url form placekitten API.'
    res.redirect(`/add?error=${encodeURIComponent(error)}`)
    return
  }
  
  const kittens = JSON.parse(fs.readFileSync(path.join(dataPath, 'kittens.json'), {encoding: 'utf8'}));
  const lastId = Math.max(...kittens.map(kitten => kitten.id))
  const ID = lastId + 1;
  const newKitten = {
    id: ID,
    name,
    age: parseInt(age),
    image,
    description
  }
  kittens.push(newKitten);
  
  try {
    
    //Ecrase le fichier kittens.json avec les nouvelles données.
    fs.writeFileSync(path.join(dataPath, "kittens.json"), JSON.stringify(kittens, null, 2), "utf8")
    
    //Créer et écrit le fichier avec le nouveau kitten
    const newFilePath = path.join(dataPath, `${ID}.json`)
    fs.writeFileSync(newFilePath, JSON.stringify(newKitten, null, 2), 'utf8');
  } catch (e) {
    res.status(500).send(`An error occurred : ${e.message}`)
    return
  }
  
  res.redirect('/');
}