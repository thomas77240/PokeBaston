package l3miage.pokebaston.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import l3miage.pokebaston.dto.BattleActiveGamesResponse;
import l3miage.pokebaston.dto.BattleStateResponse;
import l3miage.pokebaston.dto.BattleStartRequest.Player.PokemonId;
import l3miage.pokebaston.modele.BattleGame;
import l3miage.pokebaston.modele.Move;
import l3miage.pokebaston.modele.Pokemon;
import l3miage.pokebaston.modele.Trainer;

@Service
public class BattleService implements IBattleService {
    private final Map<String, BattleGame> activeGames = new ConcurrentHashMap<>();

    @Autowired
    private IPokemonService pokemonService;

    @Autowired
    private IMoveService moveService;

    public BattleGame createGame(String nameA, List<PokemonId> teamA, String nameB, List<PokemonId> teamB, int level) {
        List<Pokemon> pokemonsA = new ArrayList<Pokemon>();

        for (PokemonId pokemonId : teamA) {
            Pokemon p = new Pokemon(pokemonService.getPokemonById(pokemonId.id()));

            List<Move> moves = new ArrayList<Move>();
            for (Integer moveId : pokemonId.movesIds()) {
                Move m = new Move(moveService.getMoveById(moveId));
                moves.add(m);
            }
            p.setMoves(moves);
            pokemonsA.add(p);
        }

        List<Pokemon> pokemonsB = new ArrayList<Pokemon>();

        for (PokemonId pokemonId : teamB) {
            Pokemon p = new Pokemon(pokemonService.getPokemonById(pokemonId.id()));

            List<Move> moves = new ArrayList<Move>();
            for (Integer moveId : pokemonId.movesIds()) {
                Move m = new Move(moveService.getMoveById(moveId));
                moves.add(m);
            }
            p.setMoves(moves);
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

    public void saveGame(BattleGame game) {
        activeGames.put(game.getId(), game);
    }

    public BattleActiveGamesResponse activeGames() {
        if (activeGames.isEmpty()) {
            return new BattleActiveGamesResponse();
        }

        List<BattleActiveGamesResponse.ActiveGameInfo> activeGameInfos = new ArrayList<>();
        activeGames.forEach((id, game) -> {
            activeGameInfos.add(new BattleActiveGamesResponse.ActiveGameInfo(id, game.getTrainerA().getName(), game.getTrainerB().getName()));
        });

        return new BattleActiveGamesResponse(activeGameInfos);
    }
}
