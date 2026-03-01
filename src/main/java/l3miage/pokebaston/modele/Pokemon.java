package l3miage.pokebaston.modele;

import java.util.List;

public class Pokemon {

    private String type;
    private String name;
    private int hp;
    private int atk;
    private int def;
    private int spe;
    private List<Move> moves;
    // private int spa;
    // private int spd;

    public Pokemon(String type, String name, int hp, int atk, int def, int spe) {
        this.type = type;
        this.name = name;
        this.hp = hp;
        this.atk = atk;
        this.def = def;
        this.spe = spe;
    }

    public String getType() {
        return type;
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

    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(name + " (" + type + ") - HP: " + hp + ", ATK: " + atk + ", DEF: " + def + ", SPE: " + spe + ", MOVES: ");
        
        for (Move move: moves) {
            sb.append(move + ", ");
        }

        return sb.toString();
    }
}
