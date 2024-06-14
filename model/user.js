import mongoDB from "./index.js";
import crypto from 'node:crypto';
import dotenv from "dotenv";
dotenv.config()

const {CRYPTO_SECRET} = process.env

const userSchema = mongoDB.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

//La methode `pre` de mongoose.Schema permet de mettre en place des middlewares qui s'executent avant l'action précisée
// Ici il est mis en place avant la sauvegarde d'un nouveau User (save)
// Dans la fonction de callback passée `this` fait référence au document créé (le nouveau User)
userSchema.pre('save', function(next){
  //La méthode `isModified()` permet de vérifier si un champ va être modifié
  if (this.isModified("password")) {
    const hasher = crypto.createHmac("sha256", CRYPTO_SECRET)
    this.password = hasher.update(this.password).digest("hex")
  }
  next()
})

export default mongoDB.model('users', userSchema)