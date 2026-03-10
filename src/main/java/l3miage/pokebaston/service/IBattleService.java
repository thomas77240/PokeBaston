package l3miage.pokebaston.service;

import l3miage.pokebaston.modele.BattleGame;
import l3miage.pokebaston.modele.Move;
import l3miage.pokebaston.modele.Pokemon;

import java.util.List;

import l3miage.pokebaston.dto.BattleStartResponse;
import l3miage.pokebaston.dto.BattleTurnResponse;

public interface IBattleService {
    BattleGame createGame(String nameA, List<Integer> teamA, String nameB, List<Integer> teamB, int level);

    BattleGame getGame(String gameId);
}
