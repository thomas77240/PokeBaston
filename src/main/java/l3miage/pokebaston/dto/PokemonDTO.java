package l3miage.pokebaston.dto;

import java.util.List;

public record PokemonDTO(
                int id,
                String name,
                StatsDTO stats,
                List<String> types,
                ResistanceDTO resistances) {
        public record StatsDTO(
                        int hp,
                        int atk,
                        int def,
                        int spa,
                        int spd,
                        int spe) {
        }

        public record ResistanceDTO(
                        float normal,
                        float combat,
                        float vol,
                        float poison,
                        float sol,
                        float roche,
                        float insecte,
                        float spectre,
                        float acier,
                        float feu,
                        float eau,
                        float plante,
                        float électrik,
                        float psy,
                        float glace,
                        float dragon,
                        float ténèbres,
                        float fée) {
        }
}