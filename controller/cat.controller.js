import CatModel from '../model/cat.js'

export function addCat(req, res) {
  const {name, age} = req.body
  
  if (!name || !age || name.trim() === '' || isNaN(parseInt(age))) {
    res.status(403).send("Malformed request")
    return
  }
  
  const newCat = new CatModel({
    name,
    age: parseInt(age)
  });
  newCat.save()
    .then(() => {
      res.redirect('/')
    })
}

export function getHome(req, res) {
  CatModel.find()
    .then((cats) => {
      res.render('cat/home', {cats})
    })
}

export function getForm(req, res) {
  res.render("cat/form")
}

export function show(req, res) {
  const {name} = req.params
  CatModel.findOne({name: name})
    .then((cat) => {
        if (!cat) {
          res.status(404).send("Ressource not found")
          return
        }
        res.render('cat/show', {cat})
      },
      (reason) => {
        console.log(reason)
        res.status(404).send("Ressource not found")
      })
    .catch((err) => {
    console.log(err)
    res.status(404).send("Ressource not found")
  })
  
}