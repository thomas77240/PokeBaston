package l3miage.pokebaston.dto;

import java.util.ArrayList;
import java.util.List;

public record BattleActiveGamesResponse(List<ActiveGameInfo> activeGames) {

    public BattleActiveGamesResponse() {
        this(new ArrayList<>());
    }

    public record ActiveGameInfo(
            String gameId, 
            int gameLevel,
            String playerA, 
            String playerB
    ) {}
}