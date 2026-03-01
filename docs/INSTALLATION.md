# Installation Guide

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

