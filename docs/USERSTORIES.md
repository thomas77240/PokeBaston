# 📋 Backlog Priorisé : Projet PokeBaston

Ce document recense les besoins fonctionnels classés par priorité (Méthode MoSCoW) pour garantir un développement efficace.

---

## 🔴 PRIORITÉ 1 : Le Cœur du Jeu (Must Have)
*Ce sont les éléments indispensables pour pouvoir lancer une partie et terminer un combat de base.*

### 🛡️ Préparation du Duel
* **En tant que** Joueur, **je veux** pouvoir ajouter jusqu'à 6 Pokémon **afin** de pouvoir lancer la partie.
* **En tant que** Joueur, **je veux** pouvoir affronter un autre joueur **afin** de lancer le combat.
#### 🚨 Gestions des erreurs
* **En tant que** Joueur, **je veux** recevoir un message d'erreur si je tente de lancer un combat avec 0 Pokémon **afin** d'éviter de bloquer le moteur de jeu.

### ⚔️ Système de Combat (Phase d'Action)
* **En tant que** Joueur, **je veux** accéder à un menu d'actions au début de mon tour **afin** de choisir entre attaquer, changer de pokémon ou utiliser un objet.
* **En tant que** Joueur, **je veux** visualiser mes 4 attaques disponibles et en sélectionner une **afin** de lancer une offensive contre l'adversaire.
#### 🚨 Gestions des erreurs
* **En tant que** Système, **je veux** comparer la statistique de vitesse (SPE) des deux Pokémon pour déterminer qui attaque en premier **afin** de garantir l'équité du duel.

### 🧠 Stratégie et Validation
* **En tant que** Joueur, **je veux** pouvoir **"Locker"** une fois que j'ai réalisé l'action **afin** de valider mon tour et passer au tour suivant.

### 💀 Gestion des États et Fin de Partie
* **En tant que** Joueur, **je veux** pouvoir sélectionner un remplaçant immédiatement lorsqu'un de mes pokémon est KO **afin** de poursuivre le combat.
* **En tant que** Joueur, **je veux** qu'un message de victoire s'affiche lorsque l'adversaire n'a plus de pokémon en vie **afin** de confirmer la fin de partie.

---

## 🟠 PRIORITÉ 2 : Fiabilité et Règles Métier (Should Have)
*Éléments nécessaires pour un gameplay fluide, stratégique et sans comportements incohérents.*

### 🛡️ Préparation du Duel (Suite)
#### 🚨 Gestions des erreurs
* **En tant que** Joueur, **je veux** que le système valide mon équipe même si elle contient moins de 6 Pokémons **afin** de pouvoir lancer la partie.
* **En tant que** Joueur, **je veux** pouvoir affronter un adversaire qui possède un nombre de Pokémon différent ou égal du mien **afin** de permettre des combats.
* **En tant que** Joueur, **je veux** ne pouvoir sélectionner qu'un pokemon dans mon équipe **afin** d'éviter les doublons de Pokémon dans une même équipe.

### ⚔️ Système de Combat (Suite)
* **En tant que** Joueur, **je veux** pouvoir consulter la liste des pokémon en réserve **afin** de sélectionner un pokémon valide.

#### 🚨 Gestions des erreurs

* **En tant que** Système, **je veux** que mon attaque soit impossible à cliquer si ses PP sont à zéro **afin** de me forcer à changer de stratégie ou de Pokémon.

### 🧠 Stratégie et Validation (Suite)
#### 🚨 Gestions des erreurs
* **En tant que** joueur, **je veux** voir un indicateur "En attente de l'adversaire" après avoir "Locké" mon tour **afin** de savoir que mon action est enregistrée.
* **En tant que** joueur, **je veux** pouvoir annuler mon choix d'action tant que je n'ai pas cliqué sur "Lock" **afin** de pouvoir corriger une erreur de manipulation.

### 💀 Gestion des États (Suite)
#### 🚨 Gestions des erreurs
* **En tant que** Joueur, **je veux** être bloqué sur l'écran de sélection de réserve tant que je n'ai pas remplacé mon Pokémon KO **afin** de ne pas briser la logique de tour par tour.


### 🔄 Options de changement (Switch)
* **En tant que** Joueur, **je veux** que mon tour soit consommé lorsque je change de Pokémon **afin** que l'adversaire puisse attaquer le Pokémon entrant.

---

## 🟢 PRIORITÉ 3 : Finitions et Bonus (Could Have)
*Options de confort, détails visuels et cas particuliers à traiter si le planning le permet.*

### 🔄 Options de changement (Suite)
* **En tant que** Système, **je veux** empêcher le changement de Pokémon s'il ne reste qu'un Pokémon en vie **afin** d'éviter une boucle infinie dans l'interface.

### 📊 Options de Statistiques et Types
* **En tant que** Système, **je veux** appliquer un multiplicateur de dégâts de 0x (Immunité) si le type de l'attaque ne peut pas toucher le Pokémon adverse.
* **En tant que** Joueur, **je veux** que le calcul des dégâts intègre une légère part d'aléatoire (entre 85% et 100% des dégâts max).

### 🧠 Stratégie et Validation (Historique)
* **En tant que** Joueur, **je veux** pouvoir voir l'historique des actions **afin** d'élaborer des stratégies de jeu.
#### 🚨 Gestions des erreurs
* **En tant que** joueur, **je veux** que l'historique affiche "C'est super efficace" ou "Ce n'est pas très efficace" **afin** de comprendre l'impact des types.

### 💀 Gestion des États (Cas particuliers)
#### 🚨 Gestions des erreurs
* **En tant que** Système, **je veux** déclarer un Match Nul si les deux derniers Pokémon tombent KO durant le même tour.

### 🖥️ Options d'Affichage et Système
* **En tant que** Système, **je veux** voir les statistiques actuelles de mon Pokémon (HP restants / HP max) affichées en chiffres.
* **En tant que** Joueur, **je veux** pouvoir abandonner le combat via un bouton "Quitter" **afin** de terminer la partie proprement.
* **En tant que** Système, **je veux** enregistrer le log complet du combat dans un fichier texte à la fin de la partie.