package l3miage.pokebaston.service;

import l3miage.pokebaston.modele.Move;
import l3miage.pokebaston.modele.Pokemon;
import l3miage.pokebaston.dto.BattleStateResponse;
import l3miage.pokebaston.dto.BattleTurnRequest;

public interface IBattleEngine {
    BattleStateResponse proceedTurn(BattleTurnRequest btr);

    void attack(Pokemon attacker, Pokemon defender, Move move);

    int calculateDamage(Pokemon attacker, Pokemon defender, Move move);
}
