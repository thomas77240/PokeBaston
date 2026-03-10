package l3miage.pokebaston.modele;

import java.util.ArrayList;
import java.util.List;

import l3miage.pokebaston.dto.PokemonDTO;

public class Pokemon {

    private List<String> types;
    private String name;
    private int hp;
    private int atk;
    private int def;
    private int spe;
    private List<Move> moves;
    private int spa;
    private int spd;

    public Pokemon(List<String> type, String name, int hp, int atk, int def, int spe, int spa, int spd) {
        this.types = type;
        this.name = name;
        this.hp = hp;
        this.atk = atk;
        this.def = def;
        this.spe = spe;
        this.spa = spa;
        this.spd = spd;
    }

    public Pokemon(PokemonDTO p) {
        this.types = p.types();
        this.name = p.name();
        this.hp = p.stats().hp();
        this.atk = p.stats().atk();
        this.def = p.stats().def();
        this.spe = p.stats().spe();
        this.spa = p.stats().spa();
        this.spd = p.stats().spd();
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
