export const userHome = (req,res) => {
  res.send('User list')
}

export const getUserById = (req,res) => {
  res.send(`User ${req.params.id}`)
}