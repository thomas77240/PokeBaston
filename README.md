# ⚡ PokeBaston

## 📋 Présentation du projet
**PokeBaston** est une application web simulant un duel entre deux dresseurs Pokémon. Ce projet universitaire est réalisé par une équipe de **5 étudiants**.

---

## 🔗 Liens Utiles

- **[INSTALLATION](docs/INSTALLATION.md)** - Instructions détaillées sur l'installation
- **[USER STORIES](docs/USERSTORIES.md)** - Description des User Stories
- **[CONVENTION COMMITS](docs/CONVENTION.md)** - Notre convention de commits utilisé
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
| **Utiliser un objet** | Dans la limite des stocks disponibles (offre plusieurs types de bonus). |
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
* **Puissance de base**
* **Type** (Élémentaire)
* **Distance** (Physique ou Spéciale)
* **Utilisation** (Nombre de PP)

### Définition des objets
Un objet se définit par :
* **Nom**
* **Effet**
* **Puissance**

---

## 🛠️ Architecture technique

### Structure du backend (Java / Spring Boot)
- **Architecture en couches** :
  - `controllers/` : Expose les endpoints REST (API pokémons, moteur de combat, test)
  - `service/` : Logique métier (moteur de combat, gestion des pokémons)
  - `repositories/` : Accès aux données (chargement du pokédex depuis un fichier JSON)
  - `modele/` : Modèles métiers (Pokémon, Attaque, Objet)
  - `dto/` : Objets de transfert pour l'API
  - `exceptions/` : Gestion centralisée des erreurs (404, erreurs serveur)
- **Swagger / OpenAPI** : Documentation interactive de l’API accessible en dev (`/docs`)
- **Données** :
  - Les pokémons sont chargés depuis `src/main/resources/data/pokemons.json` au démarrage
  - Pas de base de données relationnelle, persistance en mémoire

### Structure du frontend (React + Vite)
- **Frontend** dans le dossier `frontend/` (TypeScript, React, Vite)
- Buildé et servi automatiquement par le backend Spring Boot (copie dans `static/`)

---

## 📦 Dépendances principales (backend)

| Dépendance | Version | Rôle |
|---|---|---|
| spring-boot-starter-webmvc | 4.0.3 | Serveur web, endpoints REST |
| springdoc-openapi-starter-webmvc-ui | 2.8.5 | Documentation Swagger/OpenAPI |
| frontend-maven-plugin | 1.15.4 | Build et intégration du frontend |
| jackson-databind | - | Sérialisation JSON |

---

## ⚙️ Configuration

- **application.properties** :
```properties
spring.application.name=pokebaston
springdoc.swagger-ui.path=/docs
spring.profiles.active=dev
```
- **Données** : `src/main/resources/data/pokemons.json`
- **Swagger** : http://localhost:8080/docs (profil non-prod)

---

## 🌐 API REST (extraits)

| Méthode | Route | Description |
|---|---|---|
| GET | /api/pokemons | Liste tous les pokémons |
| GET | /api/pokemons/{id} | Détail d’un pokémon |
| GET | /api/pokemons/search?type={type} | Recherche par type |
| POST | /api/battle/turn | Calcul d’un tour de combat |
| GET | /api/test | Endpoint de test |

---

## 🔒 Gestion des erreurs
- **404** : Pokémon non trouvé → message explicite
- **500** : Erreur serveur → message générique
- Gestion centralisée via `GlobalExceptionHandler`

---

## 🧩 Bonnes pratiques & évolutions possibles
- **Découplage** : Respect du pattern Controller/Service/Repository
- **Extensibilité** : Ajout facile de nouveaux types de données ou endpoints
- **Sécurité** : (non implémentée) Peut être ajoutée via Spring Security
- **Persistance** : Passage possible à une base de données relationnelle (Spring Data JPA)
- **Tests** : Couverture unitaire et d’intégration possible via JUnit/Spring Test