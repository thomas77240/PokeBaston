package l3miage.pokebaston.modele;

import l3miage.pokebaston.dto.MoveDTO;

public class Move {
    private String name;
    private String type;
    private String category;
    private int power;
    private int powerPoints;

    public Move(String name, String type, String category, int power, int powerPoints) {
        this.name = name;
        this.type = type;
        this.category = category;
        this.power = power;
        this.powerPoints = powerPoints;
    }

    public Move(MoveDTO m) {
        this.name = m.name();
        this.type = m.type();
        this.power = m.power();
        this.powerPoints = m.pp();
        this.category = m.category();
    }

    public String getName() {
        return name;
    }

    public String getType() {
        return type;
    }

    public int getPower() {
        return power;
    }

    public int getpowerPoints() {
        return powerPoints;
    }

    public void setpowerPoints(int powerPoints) {
        this.powerPoints = powerPoints;
    }

    public String toString() {
        return name + " (" + type + ", Power: " + power + ")";
    }
}
