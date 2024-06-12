# 02 Exercice counter redirection


## Vous allez créez une petite application en utilisant les sessions.
Toutes les réponses se feront en JSON.

Créez un compteur à chaque fois que l'on visite la page / (racine de l'app). 

Ajoutez +1 au compteur.

Une fois que le compteur arrive à 10 on redirigera l'utilisateur sur une page affichant le résultat (JSON).

Gestion de la redirection en Express :

    res.redirect('/check')

Une route delete permettra de remettre à jour le compteur, 

elle redirigera l'utilisateur sur la page d'accueil une fois le compteur remis à 0.