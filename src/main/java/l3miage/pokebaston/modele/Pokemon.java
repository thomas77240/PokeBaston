package l3miage.pokebaston.modele;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import l3miage.pokebaston.dto.PokemonDTO;

@JsonPropertyOrder({"id", "name", "type", "HP", "ATK", "DEF", "SPA", "SPD", "SPE", "baseStats", "moves"})
public class Pokemon {

    private int id;
    private String name;
    private List<String> types;
    private int hp;
    private int atk;
    private int def;
    private int spa;
    private int spd;
    private int spe;
    private BaseStats baseStats;
    private List<Move> moves;

    public record BaseStats(
        @JsonProperty("HP") int hp,
        @JsonProperty("ATK") int atk,
        @JsonProperty("DEF") int def,
        @JsonProperty("SPA") int spa,
        @JsonProperty("SPD") int spd,
        @JsonProperty("SPE") int spe) {
    }

    public Pokemon(List<String> type, String name, int hp, int atk, int def, int spe, int spa, int spd) {
        this.types = type;
        this.name = name;
        this.hp = hp;
        this.atk = atk;
        this.def = def;
        this.spe = spe;
        this.spa = spa;
        this.spd = spd;
        this.baseStats = new BaseStats(hp, atk, def, spe, spa, spd);
    }

    public Pokemon(PokemonDTO p, int level) {

        int hp = p.stats().hp()*2*level/100 + 10 + level;
        int atk = p.stats().atk()*2*level/100 + 5;
        int def = p.stats().def()*2*level/100 + 5;
        int spe = p.stats().spe()*2*level/100 + 5;
        int spa = p.stats().spa()*2*level/100 + 5;
        int spd = p.stats().spd()*2*level/100 + 5;

        this.id = p.id();
        this.types = p.types();
        this.name = p.name();
        this.hp = hp;
        this.atk = atk;
        this.def = def;
        this.spe = spe;
        this.spa = spa;
        this.spd = spd;
        this.moves = new ArrayList<Move>();
        this.baseStats = new BaseStats(hp, atk, def, spa, spd, spe);
    }

    public BaseStats getBaseStats() {
        return baseStats;
    }

    public void setBaseStats(BaseStats baseStats) {
        this.baseStats = baseStats;
    }

    public int getId() {
        return id;
    }

    public List<String> getType() {
        return types;
    }

    public String getName() {
        return name;
    }

    public int getHP() {
        return hp;
    }

    public int getATK() {
        return atk;
    }

    public int getDEF() {
        return def;
    }

    public int getSPE() {
        return spe;
    }

    public List<Move> getMoves() {
        return moves;
    }

    public int getSPA() {
        return spa;
    }

    public int getSPD() {
        return spd;
    }

    public void setHP(int hp) {
        this.hp = hp;
    }

    public void setATK(int atk) {
        this.atk = atk;
    }

    public void setDEF(int def) {
        this.def = def;
    }

    public void setSPE(int spe) {
        this.spe = spe;
    }

    public void setMoves(List<Move> moves) {
        this.moves = moves;
    }

    public void setSPA(int spa) {
        this.spa = spa;
    }

    public void setSPD(int spd) {
        this.spd = spd;
    }

    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(name + " (" + String.join(", ", types) + ") - HP: " + hp + ", ATK: " + atk + ", DEF: " + def
                + ", SPE: " + spe + ", SPA: "
                + spa + ", SPD: " + spd + ", MOVES: ");

        for (Move move : moves) {
            sb.append(move + ", ");
        }

        return sb.toString();
    }
}
