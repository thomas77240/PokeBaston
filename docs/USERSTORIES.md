# 📋 User Stories : Projet PokeBaston

> Ce document recense les besoins fonctionnels du projet sous l'angle utilisateur (Dresseur).

---

### 🛡️ Préparation du Duel
* **En tant que** Joueur, **je veux** pouvoir ajouter jusqu'à 6 Pokémon **afin** de pouvoir lancer la partie.
* **En tant que** Joueur, **je veux** pouvoir affronter un autre joueur **afin** de lancer le combat.

#### 🚨 Gestions des erreurs
* **En tant que** Joueur, **je veux** que le système valide mon équipe même si elle contient moins de 6 Pokémons **afin** de pouvoir lancer la partie.

* **En tant que** Joueur, **je veux** recevoir un message d'erreur si je tent de lancer un combat avec 0 Pokémon **afin** d'éviter de bloquer le moteur de jeu.

* **En tant que** Joueur, **je veux** pouvoir affronter un adversaire qui possède un nombre de Pokémon différent ou égal du mien **afin** de permettre des combats.

* **En tant que** Joueur, **je veux** ne pouvoir séléctionner qu'un pokemon dans mon équipe **afin** d'éviter les doublons de Pokémon dans une même équipe
---

### ⚔️ Système de Combat (Phase d'Action)
* **En tant que** Joueur, **je veux** accéder à un menu d'actions au début de mon tour **afin** de choisir entre attaquer, changer de pokémon ou utiliser un objet.
* **En tant que** Joueur, **je veux** visualiser mes 4 attaques disponibles et en sélectionner une **afin** de lancer une offensive contre l'adversaire.
* **En tant que** Joueur, **je veux** pouvoir consulter la liste des pokémon en réserve **afin** de sélectionner un pokémon valide.
* **En tant que** Joueur, **je veux** visualiser mon inventaire d'objet **afin** d'utiliser un consommable sur le pokémon sélectionné.

#### 🚨 Gestions des erreurs

* **En tant que** Système, **je veux** exécuter les changements de Pokémon et les utilisations d'objets avant les attaque **afin** de respecter la chronologie stratégique. 

* **En tant que** Système, **je veux** comparer la statistique de vitesse (SPE) des deux Pokémon pour déterminer qui attaque en premier **afin** de garantir l'équité du duel.

* **En tant que** Système, **je veux** que mon attaque soit impossible à cliquer si ses PP sont à zero **afin** de me forcer à changer de stratégie ou de Pokémon.
---

### 🧠 Stratégie et Validation
* **En tant que** Joueur, **je veux** pouvoir voir l'historique des actions **afin** d'élaborer des stratégies de jeu.
* **En tant que** Joueur, **je veux** pouvoir **"Locker"** une fois que j'ai réalisé l'action **afin** de valider mon tour et passer au tour suivant.

---

### 💀 Gestion des États et Fin de Partie
* **En tant que** Joueur, **je veux** pouvoir sélectionner un remplaçant immédiatement lorsqu'un de mes pokémon est KO **afin** de poursuivre le combat.
* **En tant que** Joueur, **je veux** qu'un message de victoire s'affiche lorsque l'adversaire n'a plus de pokémon en vie **afin** de confirmer la fin de partie.

---