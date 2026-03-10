package l3miage.pokebaston.modele;

import java.util.List;

public class Trainer {
    private String name;
    private List<Pokemon> equipPokemons;
    private int isActivePokemon;

    public Trainer(String name, List<Pokemon> equipPokemons, int isActivePokemon) {
        this.name = name;
        this.equipPokemons = equipPokemons;
        this.isActivePokemon = isActivePokemon;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Pokemon> getEquipPokemons() {
        return equipPokemons;
    }

    public void setEquipPokemons(List<Pokemon> equipPokemons) {
        this.equipPokemons = equipPokemons;
    }

    public int getIsActivePokemon() {
        return isActivePokemon;
    }

    public void setIsActivePokemon(int isActivePokemon) {
        this.isActivePokemon = isActivePokemon;
    }

    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("Name : " + name);
        sb.append("Equipe : ");

        for (Pokemon p : equipPokemons) {
            sb.append(p + ", ");
        }

        sb.append("Numéro du pokémon actif : " + isActivePokemon);

        return sb.toString();
    }
}
