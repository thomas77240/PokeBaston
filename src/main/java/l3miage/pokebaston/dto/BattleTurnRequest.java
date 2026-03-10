package l3miage.pokebaston.dto;

import l3miage.pokebaston.modele.Move;
import l3miage.pokebaston.modele.Pokemon;

import l3miage.pokebaston.modele.Move;
import l3miage.pokebaston.modele.Pokemon;

public record BattleTurnRequest(
        Pokemon p1Pokemon,
        Pokemon p2Pokemon,
        Move p1Move,
        Move p2Move) {
}
