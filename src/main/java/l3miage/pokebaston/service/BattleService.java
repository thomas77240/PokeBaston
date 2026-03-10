package l3miage.pokebaston.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import l3miage.pokebaston.dto.BattleStartResponse;
import l3miage.pokebaston.dto.BattleStartResponse;
import l3miage.pokebaston.modele.BattleGame;
import l3miage.pokebaston.modele.Pokemon;
import l3miage.pokebaston.modele.Trainer;

@Service
public class BattleService implements IBattleService {
    private final Map<String, BattleGame> activeGames = new ConcurrentHashMap<>();

    @Autowired
    private IPokemonService pokemonService;

    // public BattleGame createGame(String nameA, List<Integer> teamA, String nameB,
    // List<Integer> teamB, int level) {
    public BattleGame createGame(String nameA, List<Integer> teamA, String nameB, List<Integer> teamB, int level) {
        List<Pokemon> pokemonsA = new ArrayList<Pokemon>();
        for (Integer index : teamA) {
            Pokemon p = new Pokemon(pokemonService.getPokemonById(index));
            pokemonsA.add(p);
        }

        List<Pokemon> pokemonsB = new ArrayList<Pokemon>();
        for (Integer index : teamB) {
            Pokemon p = new Pokemon(pokemonService.getPokemonById(index));
            pokemonsB.add(p);
        }

        Trainer t1 = new Trainer(nameA, pokemonsA, 0);
        Trainer t2 = new Trainer(nameB, pokemonsB, 0);

        BattleGame game = new BattleGame(t1, t2);
        activeGames.put(game.getId(), game);

        return game;
    }

    public BattleGame getGame(String gameId) {
        BattleGame game = activeGames.get(gameId);
        return game;
    }
}
