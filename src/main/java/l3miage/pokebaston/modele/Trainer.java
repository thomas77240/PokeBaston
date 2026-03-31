package l3miage.pokebaston.modele;

import java.util.List;

public class Trainer {
    private String name;
    private List<Pokemon> team;
    private int activePokemon;

    public Trainer(String name, List<Pokemon> team, int activePokemon) {
        this.name = name;
        this.team = team;
        this.activePokemon = activePokemon;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Pokemon> getTeam() {
        return team;
    }

    public void setteam(List<Pokemon> team) {
        this.team = team;
    }

    public int getActivePokemon() {
        return activePokemon;
    }

    public void setactivePokemon(int activePokemon) {
        this.activePokemon = activePokemon;
    }

    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("Name : " + name);
        sb.append("Equipe : ");

        for (Pokemon p : team) {
            sb.append(p + ", ");
        }

        sb.append("Numéro du pokémon actif : " + activePokemon);

        return sb.toString();
    }
}
