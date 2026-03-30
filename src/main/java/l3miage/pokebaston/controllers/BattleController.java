package l3miage.pokebaston.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import l3miage.pokebaston.modele.BattleGame;
import l3miage.pokebaston.dto.BattleActiveGamesResponse;
import l3miage.pokebaston.dto.BattleStartRequest;
import l3miage.pokebaston.dto.BattleStateResponse;
import l3miage.pokebaston.dto.BattleTurnRequest;
import l3miage.pokebaston.service.BattleEngine;
import l3miage.pokebaston.service.BattleService;

@RestController
@RequestMapping("/api/battle")
public class BattleController {

    // Renvoyer un battle statut avec tout l'état de la game.
    // Etat de la game => quel round, historique des attaques/moves/objets
    // Trainer1 trainer2,
    // Trainer => Liste Pokémon, Liste d'objets, Pseudo
    // Pokemon => Attaques, tous les attributs de base et actuels / mort ou pas
    // Attaques => nb utilisations restantes, tous les attributs
    // Objets => nb utilisations restances/qté, tous les attributs

    @Autowired
    private BattleEngine battleEngine;

    @Autowired
    private BattleService battleService;

    @PostMapping(value = "/start")
    public BattleStateResponse startGame(@RequestBody BattleStartRequest request) {
        BattleGame battle = battleService.createGame(request.trainerA().name(), request.trainerA().pokemons(),
                request.trainerB().name(), request.trainerB().pokemons(), request.level());

        BattleStateResponse response = new BattleStateResponse(battle.getId(), battle.getTrainerA(), battle.getTrainerB());
        return response;
    }

    @PostMapping(value = "/turn")
    public BattleStateResponse proceedTurn(@RequestBody BattleTurnRequest request) {         
        return battleEngine.proceedTurn(request);
    }

    @GetMapping(value = "/activegames")
    public BattleActiveGamesResponse activeGames() {
        return battleService.activeGames();
    }
}
