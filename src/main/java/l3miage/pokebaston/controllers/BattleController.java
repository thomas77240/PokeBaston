package l3miage.pokebaston.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import l3miage.pokebaston.modele.BattleGame;
import l3miage.pokebaston.modele.Move;
import l3miage.pokebaston.modele.Pokemon;
import l3miage.pokebaston.dto.BattleTurnResponse;
import l3miage.pokebaston.dto.BattleStartRequest;
import l3miage.pokebaston.dto.BattleStartResponse;
import l3miage.pokebaston.dto.BattleTurnRequest;
import l3miage.pokebaston.service.IBattleEngine;
import l3miage.pokebaston.service.IBattleService;

@RestController
@RequestMapping("/api/battle")
public class BattleController {

    @Autowired
    private IBattleEngine battleEngine;

    @Autowired
    private IBattleService battleService;

    @PostMapping(value = "/turn") // renvoyer le statut de la game pour
    public BattleTurnResponse startTurn(@RequestBody BattleTurnRequest request) {

        // Renvoyer un battle statut avec tout l'état de la game.
        // Etat de la game => quel round, historique des attaques/moves/objets
        // Trainer1 trainer2,
        // Trainer => Liste Pokémon, Liste d'objets, Pseudo
        // Pokemon => Attaques, tous les attributs de base et actuels / mort ou pas
        // Attaques => nb utilisations restantes, tous les attributs
        // Objets => nb utilisations restances/qté, tous les attributs

        Pokemon p1 = request.p1Pokemon();
        Pokemon p2 = request.p2Pokemon();

        Move m1 = request.p1Move();
        Move m2 = request.p2Move();

        return battleEngine.oneTurn(p1, p2, m1, m2);
    }

    @PostMapping(value = "/start")
    public BattleStartResponse startGame(@RequestBody BattleStartRequest request) {
        BattleGame battle = battleService.createGame(request.trainerA().name(), request.trainerA().pokemonIds(),
                request.trainerB().name(), request.trainerB().pokemonIds(), request.level());

        BattleStartResponse response = new BattleStartResponse(battle.getId(), battle.getTrainerA(),
                battle.getTrainerB());
        return response;
    }

}
