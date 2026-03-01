package l3miage.pokebaston.service;

import l3miage.pokebaston.modele.Move;
import l3miage.pokebaston.modele.Pokemon;

public class BattleRequest {
    
    private Pokemon p1Pokemon;
    private Pokemon p2Pokemon;
    private Move p1Move;
    private Move p2Move;

    public BattleRequest() {
    }
    
    public Pokemon getP1Pokemon() {
        return p1Pokemon;
    }

    public Pokemon getP2Pokemon() {
        return p2Pokemon;
    }

    public Move getP1Move() {
        return p1Move;
    }

    public Move getP2Move() {
        return p2Move;
    }

    public void setP1Pokemon(Pokemon p1Pokemon) {
        this.p1Pokemon = p1Pokemon;
    }

    public void setP2Pokemon(Pokemon p2Pokemon) {
        this.p2Pokemon = p2Pokemon;
    }

    public void setP1Move(Move p1Move) {
        this.p1Move = p1Move;
    }

    public void setP2Move(Move p2Move) {
        this.p2Move = p2Move;
    }

    
}
