package l3miage.pokebaston.dto;

import l3miage.pokebaston.modele.Move;
import l3miage.pokebaston.modele.Pokemon;


public record BattleTurnRequest(
        String gameId,
        Action actionA,
        Action actionB,
        Integer moveTrainerA,
        Integer moveTrainerB,
        Integer changementPokemonA,
        Integer changementPokemonB) {

        public enum Action {
                ATTACK, CHANGE_POKEMON
        };

}