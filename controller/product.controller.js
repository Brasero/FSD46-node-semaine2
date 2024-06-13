import Products from "../model/product.js";

export function getProductHome (req,res) {
  
  Products.find({}, {_id: 1, society: 1, qty: 1})
    .then((products) => {
      res.render("shop/all", {products})
  }).catch((err) => {
    console.error(err)
    res.status(404).send("Ressources not found")
  })
  
}

export function showProduct(req,res) {
  // /shop/show/:id
  const {id} = req.params
  
  Products.findById(id)
    .then((product) => {
      res.render('shop/show', {prod: product})
    }).catch((err) => {
      console.error(err)
      res.status(404).send('Ressource not found')
  })
}

export function getShopStats(req,res) {
  Products.find().countDocuments()
    .then((nProduct) => {
      res.render("shop/stats", {n: nProduct})
    }).catch((err) => {
    console.error(err)
    res.status(404).send('Ressource not found')
  })
}