## 01 Exercice : Logger

Vous allez partir du squelette d'application `/simple_00/` (faites une copie du dossier et renommez-le en `/01_logger/`).

Vous devez dans cet exercice créer 2 fonctions middleware :

- Une fonction pour incrémenter un compteur de requête, et stocker ce compteur dans l'objet de requête pour le middleware suivant
- Une fonction affichant un message de log dans la console pour chaque requête sous la forme suivante :
```
<COUNTER>) <METHOD> <PATH> <QUERY|BODY>
```

Créez un fichier `./middlewares.js` à la racine qui exportera vos 2 fonctions. Les fonctions devront être importées et utilisées comme middlewares dans `server.js`

Veillez à placer les middlewares dans le bon ordre pour que l'affichage fonctionne correctement.

> Pour tester votre logger, vous pouvez utiliser une route Express « globale » :
> ```js
> app.all("*", (req, res) => {
>   res.send(`
>     <code>
>       <a href="/">/</a><br>
>       …
>     </code>
>   `);
> });
> ```

# Annexes

- [Using middlewares](https://expressjs.com/en/guide/using-middleware.html)
- [Writing Middlewares](https://expressjs.com/en/guide/writing-middleware.html)