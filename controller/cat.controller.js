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
  const nameFilter = new RegExp(name, 'i')
  CatModel.findOne({name: nameFilter})
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

export function deleteCat(req,res) {
  // /cat/delete/:id
  const {id} = req.params
  
  CatModel.findByIdAndDelete(id).then(() => {
    res.redirect('/')
  })
  // == CatModel.deleteOne({_id: id})
}

export function getCatUpdateForm(req,res) {
  // /cat/update/:id
  const {id} = req.params
  
  CatModel.findById(id).then((cat) => {
    res.render("cat/updateForm", {cat})
  })
    .catch((err) => {
    console.log(err)
    res.status(404).send("Ressource not found")
  })
}

export function updateCat(req,res) {
  const {id} = req.params
  const {name, age} = req.body
  
  if (!name || name.trim() === "" || !age || isNaN(parseInt(age))) {
    res.status(403).send("Malformed request")
    return
  }
  
  //CatModel.updateOne({_id: id}, {name, age}) ==
  
  CatModel.findByIdAndUpdate(id, {name, age}).then(() => {
    res.redirect('/')
  }).catch(() => {
    res.status(500).send('Error')
  })
}