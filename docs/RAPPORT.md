# 📝 Synthèse de Projet : Simulateur PokeBaston

**Équipe :**  
**Date de rendu :** [14/04/2026]  
**Dépôt Git :** [[Lien vers le repo](https://github.com/PokeBaston/PokeBaston/tree/main)]  

---

## 1. Synthèse du projet et Répartition des rôles
**Le but du jeu :** PokeBaston est un simulateur de combats Pokémon au tour par tour (basé sur la Génération 1). L'objectif est de recréer fidèlement les mécaniques de duel : sélection d'une équipe de 6 Pokémon maximum, gestion des statistiques (HP, Vitesse, Attaque) et calcul des faiblesses/résistances élémentaires. Le combat se termine lorsqu'un joueur n'a plus de Pokémon en état de se battre.

---

## 2. Lien entre la théorie et la pratique
Ce projet nous a permis de mettre en application plusieurs concepts vus en cours :
* **Programmation Orientée Objet (POO) :** 
* **Gestion de Projet Agile :** Découpage du projet en "User Stories" pour se concentrer sur le besoin utilisateur (ex: pouvoir changer de Pokémon) plutôt que sur la pure technique.
* **Versionnement (Git) :** Utilisation de branches séparées pour le développement afin de ne pas casser le code principal (Master/Main), et utilisation des *Pull Requests* pour valider le code.
* **Algorithmique :** 

---

## 3. Organisation mise en place
Pour mener à bien ce projet et pallier notre retard (deadline à 2 semaines), nous avons structuré notre équipe de 5 personnes de manière classique et agile, avec des rôles bien définis :

* **Thomas (Product Owner / Rédacteur Technique) :** En charge de la vision métier. J'ai rédigé l'ensemble des spécifications (User Stories, Critères d'acceptation, gestion des erreurs) et priorisé le Backlog pour guider les développeurs sur ce qu'ils devaient coder en priorité.
* **Thibault (Chef de Projet) :** En charge du pilotage global. Il a réalisé le cahier des charges, planifié les étapes via un diagramme de Gantt, et s'occupe de la validation finale des livrables pour s'assurer qu'on respecte les consignes du module.
* **Mike et Rayen (Développeurs Front/Back) :** Pôle purement technique. Ils sont chargés de l'implémentation du code, de la création de l'interface graphique et du développement du moteur de jeu (logique de combat, tours, calcul des dégâts).
* **Doryan (Responsable Qualité / QA) :** Prise en charge des tests et de la qualité du code. Il vérifie que les User Stories développées par Mike et Rayen fonctionnent sans bugs, et vient en renfort sur le développement technique si besoin.

**Méthodes de travail :**
Pour collaborer efficacement, nous avons mis en place :
1. **Un versionnement strict (Git) :** Les développeurs travaillent sur des branches séparées (ex: `dev-mike`, `create_game/front`) pour ne pas casser la branche principale.
2. **La méthode MoSCoW :** Face au manque de temps, le Product Owner et le Chef de projet ont priorisé les tâches en 3 niveaux (Priorité 1 "Vital", Priorité 2 "Important", Priorité 3 "Bonus") pour assurer un rendu fonctionnel le jour de la soutenance.

---

## 4. Problèmes rencontrés et solutions trouvées
* **Problème 1 : Abandon du système d'objets (Inventaire)**
    * *Description :* Initialement, nous avions prévu une gestion des objets consommables (potions, soins). Cependant, l'équipe de développement s'est rendu compte que l'implémentation de l'inventaire et son lien avec les statistiques en plein combat demandaient trop de temps par rapport à notre deadline.
    * *Solution :* L'équipe a décidé conjointement de retirer cette fonctionnalité du périmètre. J'ai donc supprimé les User Stories associées pour que les développeurs puissent se concentrer à 100% sur la stabilité des mécaniques vitales (attaques et changements de Pokémon).

* **Problème 2 : Synchronisation du travail et gestion du code**
    * *Description :* Avec plusieurs développeurs travaillant en même temps (Mike, Rayen, Doryan), nous avons rencontré des difficultés pour fusionner le code, ce qui a causé quelques conflits sur Git.
    * *Solution :* Nous avons instauré une règle stricte : utilisation de branches séparées (ex: `dev-mike`) et obligation de passer par des *Pull Requests* validées avant d'intégrer quoi que ce soit sur la branche principale.

---

## 5. Points perfectibles, restes à faire et non solutionnés
Étant donné nos contraintes de temps, nous avons dû faire des compromis. Voici ce qu'il reste à améliorer ou implémenter :

* **Points non solutionnés (Déscopés) :** * Le système d'inventaire et l'utilisation d'objets en combat.

* **Points perfectibles :**
    * **Mode Solo (Joueur contre Ordinateur) :** Le jeu actuel est un affrontement 1v1 local. De base, nous voulions intégrer un mode où le joueur affronte l'ordinateur, avec des actions générées de manière aléatoire. C'est un point perfectible majeur : implémenter cet adversaire aléatoire dans un premier temps, puis le faire évoluer vers une véritable algorithmique capable de calculer les faiblesses de type.
---

## 6. Retours personnels sur le module
Ce module a été extrêmement formateur, particulièrement sur la notion de "Scope Creep" (la tendance à vouloir ajouter trop de fonctionnalités). 
En concevant le simulateur, nous avons réalisé qu'un jeu d'apparence simple comme Pokémon cache en réalité une logique de conditions et d'états très complexe (gestion des KO, vérification des PP, calculs de dégâts). Le principal apprentissage a été d'accepter de réduire la voilure techniquement pour garantir un rendu propre et fonctionnel dans les temps impartis.

Thomas :  

Doryan :  

Rayen :  

Thibault :  

Mike :