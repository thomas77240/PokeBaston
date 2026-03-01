package l3miage.pokebaston.service;

import java.util.ArrayList;
import java.util.List;

import l3miage.pokebaston.modele.Pokemon;

public class BattleReport {
    
    private List<String> logs;
    private Pokemon p1Pokemon;
    private Pokemon p2Pokemon;

    public BattleReport(Pokemon p1Pokemon, Pokemon p2Pokemon) {
        this.logs = new ArrayList<String>();
        this.p1Pokemon = p1Pokemon;
        this.p2Pokemon = p2Pokemon;
    }

    public List<String> getLogs() {
        return logs;
    }

    public Pokemon getP1Pokemon() {
        return p1Pokemon;
    }

    public Pokemon getP2Pokemon() {
        return p2Pokemon;
    }

    public void setLogs(List<String> logs) {
        this.logs = logs;
    }

    public void setP1Pokemon(Pokemon p1Pokemon) {
        this.p1Pokemon = p1Pokemon;
    }

    public void setP2Pokemon(Pokemon p2Pokemon) {
        this.p2Pokemon = p2Pokemon;
    }

    public void addLogs(String log) {
        this.logs.add(log);
    }
    
}
