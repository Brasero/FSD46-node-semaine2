import posts from "../data/posts.js";
export const getHome = (req, res) => {
  res.render('home', {
    posts
  })
}