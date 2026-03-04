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
    private int spa;
    private int spd;

    public Pokemon(String type, String name, int hp, int atk, int def, int spe, int spa, int spd) {
        this.type = type;
        this.name = name;
        this.hp = hp;
        this.atk = atk;
        this.def = def;
        this.spe = spe;
        this.spa = spa;
        this.spd = spd;
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

<<<<<<< HEAD
    public int getSPA() {
        return spa;
    }

    public int getSPD() {
        return spd;
=======
    public void setType(String type){
        this.type = type;
    }

    public void setName(String Name){
        this.name = Name;
>>>>>>> c6e67b4 (:white_check_mark: test(modele): Test du cas nominal d'initiative, ajout des setter nécessaire)
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
        sb.append(name + " (" + type + ") - HP: " + hp + ", ATK: " + atk + ", DEF: " + def + ", SPE: " + spe + ", SPA: " + spa + ", SPD: " + spd + ", MOVES: ");
        
        for (Move move: moves) {
            sb.append(move + ", ");
        }

        return sb.toString();
    }
}
