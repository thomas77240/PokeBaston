package l3miage.pokebaston.dto;

import java.util.List;


public class PokemonDTO {
    public int id;
    public String name;
    public String image;
    public String sprite;
    public StatsDTO stats;
    public List<TypeDTO> types;
    public List<ResistanceDTO> resistances;

    public static class StatsDTO {
        public int hp;
        public int atk;
        public int def;
        public int spa;
        public int spd;
        public int spe;
    }

    public static class TypeDTO {
        public String name;
    }

    public static class ResistanceDTO {
        public String name;
        public double damage_multiplier;
        public String damage_relation;
    }
}