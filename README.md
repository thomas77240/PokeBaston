# ⚡ PokeBaston

## 📋 Présentation du projet
**PokeBaston** est une application web simulant un duel entre deux dresseurs Pokémon. Ce projet universitaire est réalisé par une équipe de **5 étudiants**.

---

## 🔗 Liens Utiles

- **[INSTALLATION](docs/INSTALLATION.md)** - Instructions détaillées sur l'installation
- **[USER STORIES](docs/USERSTORIES.md)** - Description des User Stories
- **[CONVENTION COMMITS](docs/CONVENTION.md)** - Notre convention de commits utilisé
- **[CAHIER DE TESTS](docs/TESTS.md)** - Cahier de tests
- **[RAPPORT](docs/docs/RAPPORT.md)** - Rapport de fin de projet 

---

## 🎮 Contexte du jeu
Chaque dresseur doit choisir **6 Pokémon** parmi les 151 présents dans la première génération.

### Déroulement du combat
À l'issue de ce choix, les joueurs envoient un Pokémon chacun dans l'arène. Le premier joueur qui n'a plus de Pokémon a perdu le match.

* **Ordre d'attaque :** Le Pokémon avec la statistique de **vitesse** la plus élevée (en respectant les règles de priorité) commence.
* **Système de jeu :** Le combat se déroule au tour par tour. 
* **Interface :** Un message texte informe les deux joueurs de chaque action réalisée.

### Actions possibles (1 seule par tour)
| Action | Détails |
| :--- | :--- |
| **Changer de Pokémon** | Impossible de choisir un Pokémon qui n'a plus de PV. |
| **Attaquer** | La notion de **supériorité des types** est prise en compte (ex: Eau > Feu). |

---

## 📊 Caractéristiques techniques

### Définition d'un Pokémon
Un Pokémon se définit par les statistiques suivantes :
* ❤️ **Points de vie (PV)**
* ⚔️ **Attaque** / 🛡️ **Défense**
* ✨ **Attaque Spéciale** / 🌀 **Défense Spéciale**
* ⚡ **Vitesse**

### Définition d'une attaque
Chaque capacité possède :
* 💥 **Puissance de base**
* 🔮 **Type** (Élémentaire)
* 🏹 **Distance** (Physique ou Spéciale)
* 🔋 **Utilisation** (Nombre de PP)

---

## 🧮 Calcul des dégâts

Lorsqu'un Pokémon décide d'attaquer, le système procède en plusieurs étapes pour déterminer le résultat de l'action.

### 1. Vérification de la précision
Avant de calculer les dégâts, le jeu vérifie si l'attaque réussit. Un nombre aléatoire entre 1 et 100 est généré. Si ce nombre est inférieur ou égal à la statistique de **Précision** de l'attaque, celle-ci touche sa cible. Sinon, l'attaque échoue.

### 2. Calcul des dégâts de base
Si l'attaque réussit, le moteur de combat calcule les dégâts bruts en fonction de la distance de l'attaque :
* **Attaque Physique :** Utilise l'**Attaque** du lanceur et la **Défense** de la cible.
* **Attaque Spéciale :** Utilise l'**Attaque Spéciale** du lanceur et la **Défense Spéciale** de la cible.

La formule mathématique utilisée par le moteur est la suivante :
$$\text{Dégâts de base} = \left( \frac{(\text{Niveau} \times 0.4 + 2) \times \text{Attaque} \times \text{Puissance}}{\text{Défense} \times 50} \right) + 2$$
*(Note : Les variables d'Attaque et de Défense sont remplacées par leurs équivalents Spéciaux selon la catégorie de la capacité).*

### 3. Application des multiplicateurs
Une fois ces dégâts de base définis, plusieurs facteurs de multiplication sont appliqués pour obtenir les dégâts finaux :

* **L'Efficacité des types (Résistances/Faiblesses) :** Défini par le tableau des types (*Super efficace* > 1, *Pas très efficace* < 1, ou *Immunité* = 0). L'interface informe les joueurs du résultat de cette efficacité.
* **Le STAB (Same Type Attack Bonus) :** Un multiplicateur de **1.5x** est accordé si le type de la capacité utilisée correspond à l'un des types du Pokémon lanceur (sinon, le multiplicateur est de 1.0x).
* **Le Facteur Aléatoire (Range) :** Pour ajouter du dynamisme au combat, les dégâts sont multipliés par une valeur aléatoire comprise entre **0.85 et 1.00**.

La formule finale est donc :
$$\text{Dégâts finaux} = \text{Dégâts de base} \times \text{STAB} \times \text{Efficacité} \times \text{Aléatoire}$$
