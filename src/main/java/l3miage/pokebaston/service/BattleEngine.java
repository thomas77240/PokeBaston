package l3miage.pokebaston.service;

import org.springframework.stereotype.Service;

import l3miage.pokebaston.modele.Move;
import l3miage.pokebaston.modele.Pokemon;


@Service
public class BattleEngine {
    public BattleReport oneTurn(Pokemon p1, Pokemon p2, Move m1, Move m2) {

        BattleReport turn_state = new BattleReport(p1, p2);

        // Determine the order of attack based on speed
        if (p1.getSPE() > p2.getSPE()) {
            attack(p1, p2, m1);
            turn_state.addLogs(p1.getName() + " use " + m1.getName());
            if (p2.getHP() > 0) {
                attack(p2, p1, m2);
                turn_state.addLogs(p2.getName() + " use " + m2.getName());
            }
        } else {
            attack(p2, p1, m2);
            turn_state.addLogs(p2.getName() + " use " + m2.getName());
            if (p1.getHP() > 0) {
                attack(p1, p2, m1);
                turn_state.addLogs(p1.getName() + " use " + m1.getName());
            }
        }

        System.out.println(turn_state.getLogs());
        return turn_state;
    }

    private void attack(Pokemon attacker, Pokemon defender, Move move) {
        int damage = calculateDamage(attacker, defender, move);
        defender.setHP(defender.getHP() - damage);
        System.out.println(attacker.getName() + " attacks " + defender.getName() + " with " + move.getName() + " for " + damage + " damage!");
    }

    private int calculateDamage(Pokemon attacker, Pokemon defender, Move move) {
        // Simple damage calculation: (ATK - DEF) + move power
        int baseDamage = Math.max(0, attacker.getATK() - defender.getDEF());
        return baseDamage + move.getPower();
    }
}
