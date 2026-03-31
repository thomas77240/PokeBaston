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
public class BattleEngineImpl implements BattleEngine {

    @Autowired
    private BattleService battleService;

    public BattleStateResponse proceedTurn(BattleTurnRequest btr) {

        // If trainer A & trainer B attacks
        if (btr.actionA() == Action.ATTACK && btr.actionB() == Action.ATTACK) {

            BattleGame battle = battleService.getGame(btr.gameId());

            Pokemon p1 = battle.getTrainerA().getTeam().get(battle.getTrainerA().getActivePokemon());
            Pokemon p2 = battle.getTrainerB().getTeam().get(battle.getTrainerB().getActivePokemon());

            Move m1 = p1.getMoves().get(btr.moveTrainerA());
            Move m2 = p2.getMoves().get(btr.moveTrainerB());

            List<String> logs = battle.getLogs();

            // Determine the order of attack based on speed
            if (p1.getSPE() > p2.getSPE()) {
                attack(p1, p2, m1, battle.getLevel());
                logs.add(p1.getName() + " use " + m1.getName());
                if (p2.getHP() > 0) {
                    attack(p2, p1, m2, battle.getLevel());
                    logs.add(p2.getName() + " use " + m2.getName());
                }
            } else {
                attack(p2, p1, m2, battle.getLevel());
                logs.add(p2.getName() + " use " + m2.getName());
                if (p1.getHP() > 0) {
                    attack(p1, p2, m1, battle.getLevel());
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

    public void attack(Pokemon attacker, Pokemon target, Move move, int level) {
        int damage = calculateDamage(attacker, target, move, level);
        target.setHP(target.getHP() - damage);
        System.out.println(attacker.getName() + " attacks " + target.getName() + " with " + move.getName() + " for "
                + damage + " damage!");
    }

    public int calculateDamage(Pokemon attacker, Pokemon target, Move move, int level) {

        double baseDamage = 0.;

        if (move.getCategory().equalsIgnoreCase("physical")) {
            baseDamage = ((level * 0.4 + 2) * attacker.getATK() * move.getPower() / target.getDEF() / 50) + 2;
        }
        else if (move.getCategory().equalsIgnoreCase("special")) {
            baseDamage = ((level * 0.4 + 2) * attacker.getSPA() * move.getPower() / target.getSPD() / 50) + 2;
        }
        return (int) baseDamage;
    }
}
