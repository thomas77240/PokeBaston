package l3miage.pokebaston.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import l3miage.pokebaston.modele.BattleGame;
import l3miage.pokebaston.modele.Move;
import l3miage.pokebaston.modele.Pokemon;
import l3miage.pokebaston.dto.BattleStateResponse;
import l3miage.pokebaston.dto.BattleTurnRequest;
import l3miage.pokebaston.dto.BattleTurnRequest.Action;

@Service
public class BattleEngine implements IBattleEngine {

    @Autowired
    private IBattleService battleService;

    public BattleStateResponse proceedTurn(BattleTurnRequest btr) {

        // If trainer A & trainer B attacks
        if (btr.actionA() == Action.ATTACK && btr.actionB() == Action.ATTACK) {

            BattleGame battle = battleService.getGame(btr.gameId());

            Pokemon p1 = battle.getTrainerA().getEquipPokemons().get(battle.getTrainerA().getIsActivePokemon());
            Pokemon p2 = battle.getTrainerB().getEquipPokemons().get(battle.getTrainerB().getIsActivePokemon());

            Move m1 = p1.getMoves().get(btr.moveTrainerA());
            Move m2 = p2.getMoves().get(btr.moveTrainerB());

            List<String> logs = battle.getLogs();

            // Determine the order of attack based on speed
            if (p1.getSPE() > p2.getSPE()) {
                attack(p1, p2, m1);
                logs.add(p1.getName() + " use " + m1.getName());
                if (p2.getHP() > 0) {
                    attack(p2, p1, m2);
                    logs.add(p2.getName() + " use " + m2.getName());
                }
            } else {
                attack(p2, p1, m2);
                logs.add(p2.getName() + " use " + m2.getName());
                if (p1.getHP() > 0) {
                    attack(p1, p2, m1);
                    logs.add(p1.getName() + " use " + m1.getName());
                }
            }

            // Save the updated game state
            battle.addLogs(logs);
            battleService.saveGame(battle);

            // Create the battle state response
            BattleStateResponse gameState = new BattleStateResponse(btr.gameId(), battle.getTrainerA(), battle.getTrainerB(), logs);

            return gameState;
        }

        return null;
    }

    public void attack(Pokemon attacker, Pokemon defender, Move move) {
        int damage = calculateDamage(attacker, defender, move);
        defender.setHP(defender.getHP() - damage);
        System.out.println(attacker.getName() + " attacks " + defender.getName() + " with " + move.getName() + " for "
                + damage + " damage!");
    }

    public int calculateDamage(Pokemon attacker, Pokemon defender, Move move) {
        // Simple damage calculation: (ATK - DEF) + move power
        int baseDamage = Math.max(0, attacker.getATK() - defender.getDEF());
        return baseDamage + move.getPower();
    }
}
