# 📋 User Stories : Projet PokeBaston

> Ce document recense les besoins fonctionnels du projet sous l'angle utilisateur (Dresseur).

---

### 🛡️ Préparation du Duel
* **En tant que** Joueur, **je veux** pouvoir ajouter jusqu'à 6 Pokémon **afin** de pouvoir lancer la partie.
* **En tant que** Joueur, **je veux** pouvoir affronter un autre joueur **afin** de lancer le combat.

#### 🚨 Gestions des erreurs
* **En tant que** Joueur, **je veux** que le système valide mon équipe même si elle contient moins de 6 Pokémons **afin** de pouvoir lancer la partie.

* **En tant que** Joueur, **je veux** recevoir un message d'erreur si je tente de lancer un combat avec 0 Pokémon **afin** d'éviter de bloquer le moteur de jeu.

* **En tant que** Joueur, **je veux** pouvoir affronter un adversaire qui possède un nombre de Pokémon différent ou égal du mien **afin** de permettre des combats.

* **En tant que** Joueur, **je veux** ne pouvoir séléctionner qu'un pokemon dans mon équipe **afin** d'éviter les doublons de Pokémon dans une même équipe.
---

### ⚔️ Système de Combat (Phase d'Action)
* **En tant que** Joueur, **je veux** accéder à un menu d'actions au début de mon tour **afin** de choisir entre attaquer, changer de pokémon ou utiliser un objet.
* **En tant que** Joueur, **je veux** visualiser mes 4 attaques disponibles et en sélectionner une **afin** de lancer une offensive contre l'adversaire.
* **En tant que** Joueur, **je veux** pouvoir consulter la liste des pokémon en réserve **afin** de sélectionner un pokémon valide.
* **En tant que** Joueur, **je veux** visualiser mon inventaire d'objet **afin** d'utiliser un consommable sur le pokémon séléctionné.

#### 🚨 Gestions des erreurs

* **En tant que** Système, **je veux** exécuter les changements de Pokémon et les utilisations d'objets avant les attaque **afin** de respecter la chronologie stratégique. 

* **En tant que** Système, **je veux** comparer la statistique de vitesse (SPE) des deux Pokémon pour déterminer qui attaque en premier **afin** de garantir l'équité du duel.

* **En tant que** Système, **je veux** que mon attaque soit impossible à cliquer si ses PP sont à zero **afin** de me forcer à changer de stratégie ou de Pokémon.
---

### 🧠 Stratégie et Validation
* **En tant que** Joueur, **je veux** pouvoir voir l'historique des actions **afin** d'élaborer des stratégies de jeu.
* **En tant que** Joueur, **je veux** pouvoir **"Locker"** une fois que j'ai réalisé l'action **afin** de valider mon tour et passer au tour suivant.

#### 🚨 Gestions des erreurs

* **En tant que** joueur, **je veux** voir un indicateur "En attente de l'adversaire" après avoir "Locké" mon tour **afin** de savoir que mon action est enregistrée et que le jeu n'est pas planté.

* **En tant que** joueur, **je veux** pouvoir annuler mon choix d'action tant que je n'ai pas cliqué sur "Lock" **afin de** pouvoir corriger une erreur de manipulation. 

* **En tant que** joueur, **je veux** que l'historique affiche "C'est super efficace" ou "Ce n'est pas très efficace" **afin** de comprendre l'impact des types sur mes dégats.

---

### 💀 Gestion des États et Fin de Partie
* **En tant que** Joueur, **je veux** pouvoir sélectionner un remplaçant immédiatement lorsqu'un de mes pokémon est KO **afin** de poursuivre le combat.
* **En tant que** Joueur, **je veux** qu'un message de victoire s'affiche lorsque l'adversaire n'a plus de pokémon en vie **afin** de confirmer la fin de partie.

#### 🚨 Gestions des erreurs

* **En tant que** Joueur, **je veux** être bloqué sur l'écran de séection de réserve tant que je n'ai pas remplacé mon Pokémon KO **afin** de ne pas briser la logique de tour par tour.

* **En tant que** Système, **je veux** déclarer un Match Nul si les deux derniers Pokémon tombent KO durant le même tour **afin** de gérer proprement la fin de partie.

### 🎒 Options avancées des Objets
* **En tant que** Joueur, **je veux** que le soin d'une potion ne dépasse pas le maximum de HP du Pokémon **afin** d'éviter d'avoir des points de vie incohérents.

* **En tant que** Joueur, **je veux** que l'objet soit consommé et dispairaisse de mon inventaire après utilisation **afin** de ne pas pouvoir me soigner à l'infini.

* **En tant que** Joueur, **je veux** recevoir un message d'erreur si je tente de mettre une potion sur un Pokémon déjà KO **afin** de respecter les règles de réanimations (si on n'a pas d'objet "Rappel")

### 🔄 Options de changement (Switch)

* **En tant que** Joueur, **je veux** que mon tour soit consommé lorsque je change de Pokémon **afin** que l'adversaire puisse attaqué le Pokémon sur le terrain.

* **En tant que** Système, **je veux** empêcher le changement de Pokémon s'il reste qu'un Pokémon en vie **afin** d'éviter une boucle infinie dans l'interface

### 📊 Options de Statistiques et Types

* **En tant que** Système, **je veux** appliquer un multiplicateur de dégâts de 0x (Immunité) si le type de l'attaque ne peut pas toucher le Pokémon adverse **afin** de respecter les immunités (ex: Normal vs Spectre)

* **En tant que** Joueur, **je veux** que le calcul des dégats intègre une légère part d'aléatoire (entre 85% et 100% des dégâts max) **afin** de rendre les combats moins prévisibles

### 🖥️ Options d'Affichage et Système

* **En tant que** Système, **je veux** voir les statistiques actuelles de mon Pokémon (HP restants / HP max) affichées en chiffres **afin** de calculer précisément ma survie

* **En tant que** Joueur, **je veux** pouvoir abandonner le combat via un bouton "Quitter" **afin** de terminer la partie sans fermer l'application

* **En tant que** Système, **je veux** enregistrer le log complet du combat dans un fichier texte à la fin de la partie **afin** de pouvoir le consulter plus tard
---