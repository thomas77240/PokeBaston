package l3miage.pokebaston.dto;

public record BattleTurnRequest(
                String gameId,
                Action actionA,
                Action actionB,
                Integer moveTrainerA,
                Integer moveTrainerB,
                Integer newPokemonA,
                Integer newPokemonB) {

        public enum Action {
                ATTACK, SWITCH
        };

}