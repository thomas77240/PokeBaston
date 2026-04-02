package l3miage.pokebaston.service;

import l3miage.pokebaston.modele.BattleGame;

import java.util.List;

import l3miage.pokebaston.dto.BattleActiveGamesResponse;
import l3miage.pokebaston.dto.BattleStateResponse;
import l3miage.pokebaston.dto.BattleStartRequest.Player.PokemonId;

public interface BattleService {
    BattleGame createGame(String nameA, List<PokemonId> teamA, String nameB, List<PokemonId> teamB, int level);

    BattleGame getGame(String gameId);

    void saveGame(BattleGame game);
    
    BattleActiveGamesResponse activeGames();

    BattleStateResponse gameState(String gameId);
}
