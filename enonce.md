## 02 Exercice :  Hello Express

Prenez un instant pour tester l'ensemble des fonctionnalités vues dans votre projet `02_hello_express` :

- Ajoutez une route d'accueil affichant un titre HTML et une image de votre choix
- Ajoutez une route utilisant un **paramètre dynamique** et affichez-les en HTML
- Ajoutez une route utilisant des **paramètres de requête** (query string) et affichez-les en HTML
- Ajoutez une route pour gérer les erreurs 404 et renvoyez une réponse avec le status HTTP 404

> Note : Pour envoyer du HTML, nous allons pour l'instant le faire manuellement :
> ```js
> res.send(`
>   <h1>Hello ${fistname}</h1>
>   <p>Bienvenue sur ma page Express</p>
> `);
> ```
> Nous utiliserons plus tard un **moteur de templating** pour plus de flexibilité.