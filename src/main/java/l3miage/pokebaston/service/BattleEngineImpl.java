package l3miage.pokebaston.service;

import java.text.Normalizer;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import l3miage.pokebaston.dto.PokemonDTO;

import l3miage.pokebaston.modele.BattleGame;
import l3miage.pokebaston.modele.Move;
import l3miage.pokebaston.modele.Pokemon;
import l3miage.pokebaston.modele.Trainer;
import l3miage.pokebaston.dto.BattleStateResponse;
import l3miage.pokebaston.dto.BattleTurnRequest;
import l3miage.pokebaston.dto.BattleTurnRequest.Action;

@Service
public class BattleEngineImpl implements BattleEngine {

    @Autowired
    private BattleService battleService;

    @Autowired
    private PokemonService pokemonService;

    public BattleStateResponse proceedTurn(BattleTurnRequest btr) {

        // If trainer A & trainer B attacks
        if (btr.actionA() == Action.ATTACK && btr.actionB() == Action.ATTACK) {

            BattleGame battle = battleService.getGame(btr.gameId());

            Trainer trainerA = battle.getTrainerA();
            int activePokemonIndexA = trainerA.getActivePokemon();
            List<Pokemon> teamA = trainerA.getTeam();
            Pokemon activePokemonA = teamA.get(activePokemonIndexA);

            Trainer trainerB = battle.getTrainerB();
            int activePokemonIndexB = trainerB.getActivePokemon();
            List<Pokemon> teamB = trainerB.getTeam();
            Pokemon activePokemonB = teamB.get(activePokemonIndexB);

            int moveIndexA = btr.moveTrainerA();
            int moveIndexB = btr.moveTrainerB();

            List<Move> movesA = activePokemonA.getMoves();
            List<Move> movesB = activePokemonB.getMoves();

            Move moveA = movesA.get(moveIndexA);
            Move moveB = movesB.get(moveIndexB);

            List<String> logs = new ArrayList<>();

            // Determine the order of attack based on speed
            if (activePokemonA.getSPE() > activePokemonB.getSPE()) {
                int damageAToB = attack(activePokemonA, activePokemonB, moveA, battle.getLevel());
                logs.add("Trainer A's " + activePokemonA.getName() + " attacks " + activePokemonB.getName() + " with " + moveA.getName() + " for " + damageAToB + " damage!");
                if (activePokemonB.getHP() > 0) {
                    int damageBToA = attack(activePokemonB, activePokemonA, moveB, battle.getLevel());
                    logs.add("Trainer B's " + activePokemonB.getName() + " attacks " + activePokemonA.getName() + " with " + moveB.getName() + " for " + damageBToA + " damage!");
                }
            } else {
                int damageBToA = attack(activePokemonB, activePokemonA, moveB, battle.getLevel());
                logs.add(activePokemonB.getName() + " attacks " + activePokemonA.getName() + " with " + moveB.getName() + " for " + damageBToA + " damage!");
                if (activePokemonA.getHP() > 0) {
                    int damageAToB = attack(activePokemonA, activePokemonB, moveA, battle.getLevel());
                    logs.add("Trainer A's " + activePokemonA.getName() + " attacks " + activePokemonB.getName() + " with " + moveA.getName() + " for " + damageAToB + " damage!");
                }
            }

            // Save the updated game state
            battle.addLogs(logs);
            battleService.saveGame(battle);

            // Create the battle state response
            BattleStateResponse gameState = new BattleStateResponse(btr.gameId(), trainerA, trainerB, logs);

            return gameState;
        }

        // If trainer A attacks and trainer B switches
        if (btr.actionA() == Action.ATTACK && btr.actionB() == Action.SWITCH) {
            BattleGame battle = battleService.getGame(btr.gameId());
            int battleLevel = battle.getLevel();

            Trainer trainerA = battle.getTrainerA();
            int activePokemonIndexA = trainerA.getActivePokemon();
            List<Pokemon> teamA = trainerA.getTeam();
            Pokemon activePokemonA = teamA.get(activePokemonIndexA);

            int moveIndexA = btr.moveTrainerA();
            List<Move> movesA = activePokemonA.getMoves();
            Move moveA = movesA.get(moveIndexA);

            Trainer trainerB = battle.getTrainerB();
            List<Pokemon> teamB = trainerB.getTeam();
            int newPokemonB = btr.newPokemonB();

            Pokemon newActivePokemonB = teamB.get(newPokemonB);

            if (newActivePokemonB.getHP() <= 0) {
                return null;
            }
            else{
                
                List<String> logs = new ArrayList<>();

                logs.add(trainerB.getName() + " switches to " + newActivePokemonB.getName() + "!");
                trainerB.setActivePokemon(newPokemonB);
                
                int damageAToB = attack(activePokemonA, newActivePokemonB, moveA, battleLevel);
                logs.add(activePokemonA.getName() + " attacks " + newActivePokemonB.getName() + " with " + moveA.getName() + " for " + damageAToB + " damage!");

                // Save the updated game state
                battleService.saveGame(battle);

                // Create the battle state response
                BattleStateResponse gameState = new BattleStateResponse(btr.gameId(), trainerA, trainerB, logs);

                return gameState;
            }
        }

        // If trainer A attacks and trainer B switches
        if (btr.actionA() == Action.SWITCH && btr.actionB() == Action.ATTACK) {
            BattleGame battle = battleService.getGame(btr.gameId());
            int battleLevel = battle.getLevel();

            Trainer trainerA = battle.getTrainerA();
            List<Pokemon> teamA = trainerA.getTeam();
            int newPokemonA = btr.newPokemonA();

            Pokemon newActivePokemonA = teamA.get(newPokemonA);

            if (newActivePokemonA.getHP() <= 0) {
                return null;
            }
            else{
                List<String> logs = new ArrayList<>();

                trainerA.setActivePokemon(newPokemonA);
                logs.add(trainerA.getName() + " switches to " + newActivePokemonA.getName() + "!");
                System.out.println(trainerA.getName() + " switches to " + newActivePokemonA.getName() + "!");

                Trainer trainerB = battle.getTrainerB();
                int activePokemonIndexB = trainerB.getActivePokemon();
                List<Pokemon> teamB = trainerB.getTeam();
                Pokemon activePokemonB = teamB.get(activePokemonIndexB);

                int moveIndexB = btr.moveTrainerB();
                List<Move> movesB = activePokemonB.getMoves();
                Move moveB = movesB.get(moveIndexB);

                int damageBToA = attack(activePokemonB, newActivePokemonA, moveB, battleLevel);
                logs.add(activePokemonB.getName() + " attacks " + newActivePokemonA.getName() + " with " + moveB.getName() + " for " + damageBToA + " damage!");

                // Save the updated game state
                battleService.saveGame(battle);

                // Create the battle state response
                BattleStateResponse gameState = new BattleStateResponse(btr.gameId(), trainerA, trainerB, logs);

                return gameState;
            }
        }

        // If both trainers switch
        if (btr.actionA() == Action.SWITCH && btr.actionB() == Action.SWITCH) {
            BattleGame battle = battleService.getGame(btr.gameId());

            Trainer trainerA = battle.getTrainerA();
            List<Pokemon> teamA = trainerA.getTeam();
            int newPokemonA = btr.newPokemonA();

            Pokemon newActivePokemonA = teamA.get(newPokemonA);

            Trainer trainerB = battle.getTrainerB();
            List<Pokemon> teamB = trainerB.getTeam();
            int newPokemonB = btr.newPokemonB();

            Pokemon newActivePokemonB = teamB.get(newPokemonB);

            if (newActivePokemonA.getHP() <= 0 || newActivePokemonB.getHP() <= 0) {
                return null;
            }
            else{
                List<String> logs = new ArrayList<>();

                trainerA.setActivePokemon(newPokemonA);
                logs.add(trainerA.getName() + " switches to " + newActivePokemonA.getName() + "!");
                System.out.println(trainerA.getName() + " switches to " + newActivePokemonA.getName() + "!");

                trainerB.setActivePokemon(newPokemonB);
                logs.add(trainerB.getName() + " switches to " + newActivePokemonB.getName() + "!");
                System.out.println(trainerB.getName() + " switches to " + newActivePokemonB.getName() + "!");

                // Save the updated game state
                battleService.saveGame(battle);

                // Create the battle state response
                BattleStateResponse gameState = new BattleStateResponse(btr.gameId(), trainerA, trainerB, logs);

                return gameState;
            }
        }
        return null;
    }

    public int attack(Pokemon attacker, Pokemon target, Move move, int level) {
        if (!moveHits(move)) {
            System.out.println(attacker.getName() + " attacks " + target.getName() + " with " + move.getName() + " but misses!");
            return 0;
        }
        int damage = calculateDamage(attacker, target, move, level);
        target.setHP(target.getHP() - damage);
        System.out.println(attacker.getName() + " attacks " + target.getName() + " with " + move.getName() + " for "
                + damage + " damage!");
        return damage;
    }

    private boolean moveHits(Move move) {
        int accuracy = move.getAccuracy();
        if (accuracy >= 100) {
            return true;
        }
        int roll = ThreadLocalRandom.current().nextInt(1, 101);
        return roll <= accuracy;
    }

    public int calculateDamage(Pokemon attacker, Pokemon target, Move move, int level) {
        double baseDamage = calculateBaseDamage(attacker, target, move, level);
        double effectiveness = getResistanceMultiplier(target, move.getType());
        System.out.println("Base damage: " + baseDamage + ", Effectiveness: " + effectiveness);
        System.out.println("Move type: " + move.getType());
        double range = 0.85 + ThreadLocalRandom.current().nextDouble() * 0.15;
        double stabMultiplier = isSTAB(attacker, move) ? 1.5 : 1.0;


        double totalDamage = baseDamage * stabMultiplier * effectiveness * range;
        return (int) totalDamage;
    }

    private double calculateBaseDamage(Pokemon attacker, Pokemon target, Move move, int level) {
        if (move.getCategory().equalsIgnoreCase("physical")) {
            return ((level * 0.4 + 2) * attacker.getATK() * move.getPower() / target.getDEF() / 50) + 2;
        } else if (move.getCategory().equalsIgnoreCase("special")) {
            return ((level * 0.4 + 2) * attacker.getSPA() * move.getPower() / target.getSPD() / 50) + 2;
        }
        return 0;
    }

    private boolean isSTAB(Pokemon pokemon, Move move) {
        List<String> types = pokemon.getType();
        String moveType = move.getType();
        for (String type : types) {
            if (type.equalsIgnoreCase(moveType)) {
                return true;
            }
        }
        return false;
    }

    private double getResistanceMultiplier(Pokemon target, String moveType) {
        PokemonDTO.ResistanceDTO resistances = pokemonService.getPokemonById(target.getId()).resistances();
        if (resistances == null || moveType == null) {
            return 1.0;
        }
        return getResistanceValue(resistances, moveType);
    }

    private double getResistanceValue(PokemonDTO.ResistanceDTO resistances, String moveType) {
        switch (moveType) {
            case "Normal":
                return resistances.normal();
            case "Combat":
                return resistances.combat();
            case "Vol":
                return resistances.vol();
            case "Poison":
                return resistances.poison();
            case "Sol":
                return resistances.sol();
            case "Roche":
                return resistances.roche();
            case "Insecte":
                return resistances.insecte();
            case "Spectre":
                return resistances.spectre();
            case "Acier":
                return resistances.acier();
            case "Feu":
                return resistances.feu();
            case "Eau":
                return resistances.eau();
            case "Plante":
                return resistances.plante();
            case "Électrik":
                return resistances.électrik();
            case "Psy":
                return resistances.psy();
            case "Glace":
                return resistances.glace();
            case "Dragon":
                return resistances.dragon();
            case "Ténèbres":
                return resistances.ténèbres();
            case "Fée":
                return resistances.fée();
            default:
                return 1.0;
        }
    }
}
