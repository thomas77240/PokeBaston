package l3miage.pokebaston.modele;

public class Object {
    private String effect;
    private int power;

    public Object(String effect, int power) {
        this.effect = effect;
        this.power = power;
    }

    public String getEffect() {
        return effect;
    }

    public int getPower() {
        return power;
    }

    public void setEffect(String effect) {
        this.effect = effect;
    }

    public void setPower(int power) {
        this.power = power;
    }

    public String toString() {
        return effect + " (Power: " + power + ")";
    }
}