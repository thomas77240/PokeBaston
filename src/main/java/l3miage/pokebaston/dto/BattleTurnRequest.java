package l3miage.pokebaston.dto;

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