package l3miage.pokebaston.service;

import l3miage.pokebaston.modele.Move;
import l3miage.pokebaston.modele.Pokemon;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;



public class BattleEngineTest {
    private BattleEngine battleEngine;
    private Pokemon p1;
    private Pokemon p2;
    private Move m1;
    private Move m2;

    

    private Pokemon createPokemon(String type, String name, int hp, int atk, int def, int spe){
        Pokemon pokemon = new Pokemon(type,name, hp, atk, def, spe);
            pokemon.setType(type);
            pokemon.setName(name);
            pokemon.setHP(hp);
            pokemon.setATK(atk);
            pokemon.setDEF(def);
            pokemon.setSPE(spe);
            return pokemon;
    }

    private Move createMoves(String name, String type, int power){
        Move m = new Move(name, type, power);
        m.setName(name);
        m.setType(type);
        m.setPower(power);
        return m; 
    }

    @BeforeEach
    /**
     * Initialisation avant chaque tests
     *  */ 
    void setUp(){
        battleEngine = new BattleEngine();
        p1 = createPokemon("foudre", "Pikachu", 100 ,50 ,40 , 100);
        p2 = createPokemon("feu", "Salameche", 100 ,40 ,30 , 80);
        m1 = createMoves("fatal foudre", "foudre", 20);
        m2 = createMoves("flammeche", "feu", 20);
    }
    /**
    * Test du cas nominal : le pokemon le plus rapide attaque en premier. le second riposte. les deux survivent 
    */
    @Test
    @DisplayName("Test : Pikachu (plus rapide) attaque en premier, salameche (plus lent) attaque ensuite")
    void TestP1Attackfirst(){
        //Execution du premier tour
        BattleReport report = battleEngine.oneTurn(p1, p2, m1, m2);
        
        // verifications des logs, qui attaque en premier
        String logs = report.getLogs().toString();
        int IndexP1 = logs.indexOf(p1.getName().toString() + " use "  + m1.getName());
        int IndexP2 = logs.indexOf(p2.getName().toString() + " use " + m2.getName());

        assertTrue(IndexP1 != -1, "le log doit contenir l'attaque de " + m1.getName());
        assertTrue(IndexP2 != -1, "le log doit contenir l'attaque de" + m2.getName());
        assertTrue(IndexP1 < IndexP2, p1.getName()+ "doit attaquer avant" + p2.getName());
   
    }

    @Test
    @DisplayName("les deux pokemons attaquent chacun leur tour, les points de vie ont bien été enlevé a chacun a la fin du tour")
    void TestDmgAtEnd()
    {
        battleEngine.oneTurn(p1, p2, m1, m2);
        assertEquals(60, p2.getHP(), "les Hp de p2 devrait être reduits de 40");
        assertEquals(80, p1.getHP(), "les Hp de p1 devrait être reduit de 20");

    }
}
