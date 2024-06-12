## 05 Exercice : Kittens post

Reprenez le projet **04 Kittens controller** et ajoutez la fonctionnalité permettant d'ajouter un nouveau chaton dans la liste.

Vous déclarerez 2 nouvelles routes (et leur contrôleur associé) dans le routeur "kittens" :

- `/add` pour afficher le formulaire
- `/add` pour récupérer les données du formulaire

Vous devrez lors de l'ajout d'un chaton créer le fichier `<id>.json` et mettre à jour le fichier `kittens.json`. Utilisez le module `fs` de Node.js pour cela)

**📢 Point important !**

Sachant que nous n'avons pas encore vu comment uploader des images avec Express, vous utiliserez un simple champs texte pour les photos de chats, et le service "https://placekitten.com/" dans votre formulaire d'ajout.

Vous pourrez ensuite adapter l'affichage avec une simple condition, par exemple :

```js
  const kittenImage = kitten.image.startsWith("http")
    ? kitten.image
    : `/images/${kitten.image}`;
    
  res.send(`
    …
    <img src="${kittenImage}" alt="Photo de ${kitten.name}" >
    …
  `);
```