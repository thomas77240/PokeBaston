package l3miage.pokebaston.modele;

public class Move {
    private String name;
    private String type;
    private int power;
    // private int uses;

    public Move(String name, String type, int power) {
        this.name = name;
        this.type = type;
        this.power = power;
        // this.uses = uses;
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

    public void setPower(int power){
        this.power = power;
    }

    public void setName(String name){
        this.name = name;
    }

    public void setType(String type){
        this.type = type;
    }

    // public int getUses() {
    //     return uses;
    // }

    // public void setUses(int uses) {
    //     this.uses = uses;
    // }

    public String toString() {
        return name + " (" + type + ", Power: " + power + ")";
    }
}
