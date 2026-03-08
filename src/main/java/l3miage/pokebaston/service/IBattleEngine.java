package l3miage.pokebaston.service;

import l3miage.pokebaston.modele.Move;
import l3miage.pokebaston.modele.Pokemon;

public interface IBattleEngine {
    BattleReport oneTurn(Pokemon p1, Pokemon p2, Move m1, Move m2);
    void attack(Pokemon attacker, Pokemon defender, Move move);
    int calculateDamage(Pokemon attacker, Pokemon defender, Move move);
}
