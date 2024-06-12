import posts from "../data/posts.js";
export const getHome = (req, res) => {
  res.render('home', {
    posts
  })
}

export const getForm = (req,res) => {
  res.render('form')
}

export const addPost = (req, res) => {
  const {title, date} = req.body
  
  if (title.trim() === '' || !title || !date) {
    res.status(403).send('Malformed request')
    return
  }
  
  const post = {
    title: title[0].toUpperCase() + title.substring(1),
    date
  }
  
  posts.push(post)
  res.redirect('/')
}