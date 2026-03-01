package l3miage.pokebaston.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import l3miage.pokebaston.modele.Move;
import l3miage.pokebaston.modele.Pokemon;
import l3miage.pokebaston.service.BattleEngine;
import l3miage.pokebaston.service.BattleReport;
import l3miage.pokebaston.service.BattleRequest;

@RestController
@RequestMapping("/api/battle")
public class BattleController {
    
    @Autowired
    private BattleEngine battleEngine;

    @PostMapping(value = "/start") //renvoyer le statut de la game pour 
    public BattleReport startBattle(@RequestBody BattleRequest request) {

        // Renvoyer un battle statut avec tout l'état de la game. 
        // Etat de la game => quel round, historique des attaques/moves/objets 
        // Trainer1 trainer2, 
        // Trainer => Liste Pokémon, Liste d'objets, Pseudo
        // Pokemon => Attaques, tous les attributs de base et actuels / mort ou pas
        // Attaques => nb utilisations restantes, tous les attributs
        // Objets => nb utilisations restances/qté, tous les attributs


        Pokemon p1 = request.getP1Pokemon();
        Pokemon p2 = request.getP2Pokemon();

        Move m1 = request.getP1Move();
        Move m2 = request.getP2Move();

        return battleEngine.oneTurn(p1, p2, m1, m2);
    }

}
