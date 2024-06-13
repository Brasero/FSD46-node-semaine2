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

export function getProductForm(req,res) {
  res.render("shop/add")
}

export function getProductUpdateForm(req,res) {
  const {id} = req.params
  
  Products.findById(id).then((product) => {
    res.render("shop/update", {product})
  }).catch(() => {
    res.status(404).send("Ressource not found")
  })
}
const checkFiel = (field) => {
  return field.trim() === ""
}
export function addProduct(req,res) {
  
  const {society,qty,w,h,uom,price,year, sale} = req.body
  
  if(checkFiel(society) || checkFiel(qty) || checkFiel(w) || checkFiel(h) || checkFiel(uom) || checkFiel(price) || checkFiel(year)) {
    res.status(403).send('Malformed request')
    return
  }
  
  const product = new Products({
    society,
    qty,
    price: parseFloat(price),
    year: parseInt(year),
    sale: sale === "on",
    size: {
      h: parseFloat(h),
      w: parseFloat(w),
      uom
    }
  })
  
  product.save().then(() => {
    req.session.message = {
      class: "alert-success",
      text: `Product ${society} created`
    }
    res.redirect("/shop")
  })
}

export function updateProduct(req,res) {
  const {id} = req.params
  
  const {society,qty,w,h,uom,price,year, sale} = req.body
  console.log(sale)
  
  if(checkFiel(society) || checkFiel(qty) || checkFiel(w) || checkFiel(h) || checkFiel(uom) || checkFiel(price) || checkFiel(year)) {
    res.status(403).send('Malformed request')
    return
  }
  
  Products.findByIdAndUpdate(id, {
    society,
    qty,
    price: parseFloat(price),
    year: parseInt(year),
    sale: sale === "on",
    size: {
      h: parseFloat(h),
      w: parseFloat(w),
      uom
    }
  }).then(() => {
    req.session.message = {
      class: "alert-success",
      text: `Product ${society} updated`
    }
    res.redirect("/shop"+req.url)
  })
}

export function deleteProduct(req,res) {
  const {id} = req.params
  
  Products.findByIdAndDelete(id).then(() => {
    req.session.message = {
      class: "alert-success",
      text: `Product deleted`
    }
    res.redirect('/shop')
  })
}