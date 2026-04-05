package l3miage.pokebaston.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.HashSet;
import java.util.Set;

import l3miage.pokebaston.modele.BattleGame;
import l3miage.pokebaston.dto.BattleActiveGamesResponse;
import l3miage.pokebaston.dto.BattleStartRequest;
import l3miage.pokebaston.dto.BattleStateResponse;
import l3miage.pokebaston.dto.BattleTurnRequest;
import l3miage.pokebaston.service.BattleEngine;
import l3miage.pokebaston.service.BattleService;
import l3miage.pokebaston.service.PokemonService;

@RestController
@RequestMapping("/api/battle")
public class BattleController {

    @Autowired
    private BattleEngine battleEngine;

    @Autowired
    private BattleService battleService;

    @Autowired
    private PokemonService pokemonService;

    @PostMapping(value = "/start")
    public BattleStateResponse startGame(@RequestBody BattleStartRequest request) {
        validateTeam(request.trainerA().pokemons());
        validateTeam(request.trainerB().pokemons());

        BattleGame battle = battleService.createGame(request.trainerA().name(), request.trainerA().pokemons(),
                request.trainerB().name(), request.trainerB().pokemons(), request.level());

        BattleStateResponse response = new BattleStateResponse(battle.getId(), battle.getLevel(), battle.getStatus(), battle.getTrainerA(), battle.getTrainerB());
        return response;
    }

    private void validateTeam(List<BattleStartRequest.Player.PokemonId> pokemons) {
        if (pokemons.size() > 6) {
            throw new IllegalArgumentException("Une équipe ne peut pas avoir plus de 6 Pokémon.");
        }
        Set<Integer> pokemonIds = new HashSet<>();
        for (BattleStartRequest.Player.PokemonId pokemon : pokemons) {
            if (!pokemonIds.add(pokemon.id())) {
                throw new IllegalArgumentException("Un Pokémon ne peut pas être présent plusieurs fois dans la même équipe.");
            }
            if (pokemon.movesIds().size() > 4) {
                throw new IllegalArgumentException("Un Pokémon ne peut pas avoir plus de 4 attaques.");
            }
            Set<Integer> moveIds = new HashSet<>();
            for (Integer moveId : pokemon.movesIds()) {
                if (!moveIds.add(moveId)) {
                    throw new IllegalArgumentException("Une attaque ne peut pas être présente plusieurs fois sur le même Pokémon.");
                }
                if (!pokemonService.getPokemonById(pokemon.id()).moves().contains(moveId)) {
                    throw new IllegalArgumentException("L'attaque avec l'ID " + moveId + " n'existe pas pour le Pokémon avec l'ID " + pokemon.id() + ".");
                }
            }
        }
    }

    @PostMapping(value = "/turn")
    public BattleStateResponse proceedTurn(@RequestBody BattleTurnRequest request) {         
        return battleEngine.proceedTurn(request);
    }

    @GetMapping(value = "/activegames")
    public BattleActiveGamesResponse activeGames() {
        return battleService.activeGames();
    }

    @GetMapping(value = "/gamestate/{gameId}")
    public BattleStateResponse gameState(@PathVariable String gameId) {
        return battleService.gameState(gameId);
    }
}
