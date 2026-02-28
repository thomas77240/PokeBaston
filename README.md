# PokeBaston

## Presentation du projet
Pokebaston est une applicaton web simulant un duel entre deux dresseurs Pokemon.C'est un projet universitaire composé de 5 étudiants.

## Inclus
 - ViteJS
    - TailwindCSS
    - ReactJS
    - React Router DOM
- Spring Boot
    - SpringMVC

## 📋 Pré-requis
* **Java 17** ou supérieur
* **Node.js 22** ou supérieur
* **Maven** (inclus via le wrapper `./mvnw`)
---
## 💻 Mode Développement (Hot Reload)
En développement, nous lançons le backend et le frontend séparément pour profiter du rechargement à chaud (HMR).
### Option 1 : Lancement Unifié (Recommandé)
Lancez les deux environnements dans un seul terminal :

```bash
npm i
npm run dev
```

Frontend : http://localhost:5173 (Utilisez cette URL pour naviguer)
Backend API : http://localhost:8080

### Option 2 : Lancement Manuel (Deux terminaux)
1. Terminal 1 (Backend) :

    ```bash
    .\mvnw spring-boot:run
    ```
2. Terminal 2 (Frontend) :

    ```bash
    cd frontend
    npm run dev
    ```
**Note** : Les appels API commençant par /api sont automatiquement redirigés vers le port configuré dans le proxy dans vite.config.ts.

### Swagger
Le mode développement inclus une **documentation Swagger** de l'API accessible depuis http://localhost:8000/docs.

---

## 🏗️ Mode Production (Build & Déploiement)
Le projet est configuré pour générer un seul fichier exécutable (.jar) contenant à la fois l'API et le frontend compilé.

### 1. Générer le Build
À la racine du projet :

```Bash
npm run build
```
ou 
```Bash
.\mvnw clean package
```
Cette commande va :
- Installer Node.js et NPM localement (dans target/).
- Compiler le projet React (npm run build).
- Copier les fichiers statiques dans src/main/resources/static.
- Créer le JAR final.

### 2. Lancer l'application
Le fichier généré se trouve dans le dossier target/.

```Bash
java -jar target/mon-projet-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod
```
ou
```Bash
npm run start
```

L'application complète est accessible sur http://localhost:8080.

---
## 🛠️ Dépannage & Commandes Utiles

|Commande | Description |
| :--------------- |:---------------|
|npm run dev| Lance tout l'environnement de dev.|
|npm run build|Nettoie et génère le JAR de production.|
|npm run start|Lance le JAR de production généré avec le profile de production.|
|.\mvnw clean|Supprime le dossier target (utile en cas de cache corrompu).|

---

## Contexte
Chaque dresseurs doit choisir 6 pokemon parmi les 151 présent dans ceux de la premiere genération.
A l'issue de ce choix les joueurs choisissent un pokemon chacun pour le combat dans l'arene, le premier joueur qui n'a plus de pokémon a perdu le match.
### detail du combat
a l'issue du choix des joueurs, un pokemon est placé dans l'arene, le pokemon avec les statistques de vitesse les plus élevées et aussi en respectant les regles de priorité commence le combat qui se deroule au tour par tour. un message texte informe les deux joueurs de l'action realisé par chaque joueurs a le choix d'attaquer, de changer de pokemon, choisir un objet offrant plusiuers type de bonus.

Sur un tour, le joueur peut faire une et une seule des actions suivantes :
* Changer de pokemon
  * Il ne peut pas changer avec un pokemon qui n'a plus de PVs.     
* Utiliser un objet
  * Dans la limite de ses stocks   
* Attaquer avec le Pokemon actif.
  *  La notion de superiorité des types est a prendre en compte (par exemple un pokemon de type eau a un avantage face a un pokemon de type feu)
### defintions d'un pokemon
un pokemon se defint par:
* des point de vies
* des statistiques d'attaques
* des statistiques de defense
* des statistiques de vitesse
* la statistique de son attaque speciale
* la statistiques de sa defense speciale

### defintions d'une attaque
se defini par 
* Une puissance de base
* Un type
* Distance (Phyisique ou Spéciale)
* un nombre d'utilisation

### definition des objets
un objet se defini par :
* Un nom
* Un effet
* Une puissance

