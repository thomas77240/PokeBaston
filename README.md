# PokeBaston

## Presentation du projet
Pokebaston est une applicaton web simulant un duel entre deux dresseurs de pokemon.
c'est un projet universitaire composé de 5 etudiants 


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
* 
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

