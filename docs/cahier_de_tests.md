# Cahier de Tests - Projet PokeBaston

**Auteur :** Doryan

## Environnement de Test

### Backend (Spring Boot)
La stratégie de test backend repose sur l'isolation des composants via le mocking et la validation des endpoints REST.
- **Framework :** JUnit 5
- **Mocking :** Mockito (pour les services et repositories)
- **Intégration Web :** MockMvc (pour tester les contrôleurs sans démarrer un serveur complet)
- **Contexte :** @SpringBootTest pour les tests d'intégration de contexte.

### Frontend (React)
La stratégie de test frontend se concentre sur le rendu des composants, l'interaction utilisateur et la gestion d'état.
- **Framework :** Vitest
- **Utilitaires :** React Testing Library (pour les interactions utilisateur)
- **Mocking :** vi.mock (pour les stores Zustand, les dépendances externes et les assets)
- **Gestion du temps :** Fake Timers (pour tester les délais d'animation/navigation)

---

## Partie 1 : Tests Backend (API & Logique Métier)

| ID Test | Fonctionnalité ciblée | Classe/Méthode de test | Résultat Attendu | Statut |
| :--- | :--- | :--- | :--- | :--- |
| T-B01 | Initialisation Repository | `MoveRepositoryTest.testInit_Success` | Repository peuplé, `findById` retourne l'objet | Automatisé |
| T-B02 | Recherche Pokémon par type | `PokemonRepositoryTest.testFindByType_Success` | Liste filtrée correctement | Automatisé |
| T-B03 | Calcul des dégâts | `BattleEngineImplTest.testCalculateDamage` | Valeur de dégâts > 0 | Automatisé |
| T-B04 | Déroulement d'un tour | `BattleEngineImplTest.testProceedTurn` | Logs générés, PV de la cible réduits | Automatisé |
| T-B05 | Récupération attaque (Succès) | `MoveServiceImplTest.testGetMoveById_Success` | `MoveDTO` retourné avec données correctes | Automatisé |
| T-B06 | Récupération attaque (Échec) | `MoveServiceImplTest.testGetMoveById_NotFound` | `MoveNotFoundException` levée | Automatisé |
| T-B07 | Création de partie | `BattleServiceImplTest.testCreateGame` | `BattleGame` initialisé, stats calculées | Automatisé |
| T-B08 | API Liste des parties | `BattleControllerTest.testActiveGames` | HTTP 200, JSON valide | Automatisé |
| T-B09 | API Démarrage partie | `BattleControllerTest.testStartGame` | HTTP 200, JSON de réponse non vide | Automatisé |
| T-B10 | API Liste Pokémon | `PokemonControllerTest.testGetAll` | HTTP 200, structure JSON correcte | Automatisé |
| T-B11 | Chargement Contexte | `SpringReactApplicationTests.contextLoads` | Contexte Spring chargé sans erreur | Automatisé |

---

## Partie 2 : Tests Frontend (Interface & Composants)

| ID Test | Composant/Page testé | Fichier de test associé | Comportement UI Attendu | Statut |
| :--- | :--- | :--- | :--- | :--- |
| T-F01 | Modal | `Modal.test.tsx` | Ouverture/Fermeture, blocage scroll, touche Escape | Automatisé |
| T-F02 | Menu Dresseur | `TrainerMenu.test.tsx` | Navigation entre vues (Équipe/Attaques) | Automatisé |
| T-F03 | Vue Attaques | `AttacksView.test.tsx` | Affichage détails au survol, délai de retour | Automatisé |
| T-F04 | Vue Équipe | `TeamView.test.tsx` | Identification actif, désactivation KO, couleurs PV | Automatisé |
| T-F05 | Carte Pokémon | `SelectedPokemonCard.test.tsx` | Affichage info, clic suppression, stop propagation | Automatisé |
| T-F06 | Groupe Radio | `RadioGroup.test.tsx` | Sélection correcte, attributs HTML, classes CSS | Automatisé |
| T-F07 | Carte Statut | `ActivePokemonStatusCard.test.tsx` | Affichage PV, classe rouge si < 20%, animation | Automatisé |
| T-F08 | Bouton UI | `Button.test.tsx` | Rendu texte, clic, variantes, état désactivé | Automatisé |
| T-F09 | Scène de combat | `Stage.test.tsx` | Affichage Pokémon, gestion logs, absence dresseur | Automatisé |
| T-F10 | Modal Overview | `PokemonOverviewModal.test.tsx` | Sélection attaques (max 4), validation, détails | Automatisé |
