package l3miage.pokebaston.modele;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import l3miage.pokebaston.dto.MoveDTO;

@JsonPropertyOrder({"name", "type", "category", "power", "powerPoints", "maxPowerPoints", "accuracy"})
public class Move {
    private String name;
    private String type;
    private String category;
    private int power;
    private int powerPoints;
    private int maxPowerPoints;
    private int accuracy;

    public Move(String name, String type, String category, int power, int powerPoints, int maxPowerPoints, int accuracy) {
        this.name = name;
        this.type = type;
        this.category = category;
        this.power = power;
        this.powerPoints = powerPoints;
        this.maxPowerPoints = maxPowerPoints;
        this.accuracy = accuracy;
    }

    public Move(MoveDTO m) {
        this.name = m.name();
        this.type = m.type();
        this.power = m.power();
        this.powerPoints = m.pp();
        this.maxPowerPoints = m.pp();
        this.category = m.category();
        this.accuracy = m.accuracy();
    }

    public int getMaxPowerPoints() {
        return maxPowerPoints;
    }

    public void setMaxPowerPoints(int maxPowerPoints) {
        this.maxPowerPoints = maxPowerPoints;
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

    public int getAccuracy() {
        return accuracy;
    }

    public String getCategory() {
        return category;
    }

    public int getPowerPoints() {
        return powerPoints;
    }

    public void setPowerPoints(int powerPoints) {
        this.powerPoints = powerPoints;
    }

    public String toString() {
        return name + " (" + type + ", Puissance: " + power + ", PP: " + powerPoints + "/" + maxPowerPoints + ", Précision: " + accuracy + "%, Catégorie: " + category + ")";
    }
}
