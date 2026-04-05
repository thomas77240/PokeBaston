package l3miage.pokebaston.service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import l3miage.pokebaston.dto.PokemonDTO;
import l3miage.pokebaston.dto.BattleStateResponse.BattleLog;
import l3miage.pokebaston.dto.BattleStateResponse.LogType;
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
        BattleGame battle = battleService.getGame(btr.gameId());
        Trainer trainerA = battle.getTrainerA();
        Trainer trainerB = battle.getTrainerB();

        if (battle.isFinished()) {
            throw new IllegalArgumentException("La partie est terminée.");
        }

        Pokemon activeA = trainerA.getTeam().get(trainerA.getActivePokemon());
        Pokemon activeB = trainerB.getTeam().get(trainerB.getActivePokemon());
        List<BattleLog> battleLogs = new ArrayList<>();


        if (battle.isWaitingForTrainerToSwitch()) {
            if (activeA.getHP() <= 0) {
                if (btr.actionA() != Action.SWITCH || btr.newPokemonA() == null) {
                    throw new IllegalArgumentException("Le Pokémon de " + trainerA.getName() + " est KO, il doit choisir de le remplacer.");
                }
                validateTrainerTurn(trainerA, btr.actionA(), btr.newPokemonA());
                executeSwitch(trainerA, btr.newPokemonA(), "A", battleLogs);
            } else if (activeB.getHP() <= 0) {
                if (btr.actionB() != Action.SWITCH || btr.newPokemonB() == null) {
                    throw new IllegalArgumentException("Le Pokémon de " + trainerB.getName() + " est KO, il doit choisir de le remplacer.");
                }
                validateTrainerTurn(trainerB, btr.actionB(), btr.newPokemonB());
                executeSwitch(trainerB, btr.newPokemonB(), "B", battleLogs);
            }
            
            battle.setWaitingForTrainerToSwitch(false);
            battleService.saveGame(battle);
            
            return new BattleStateResponse(battle.getId(), battle.getLevel(), trainerA, trainerB, battleLogs);
        }

        validateTrainerTurn(trainerA, btr.actionA(), btr.newPokemonA());
        validateTrainerTurn(trainerB, btr.actionB(), btr.newPokemonB());

        if (btr.actionA() == Action.SWITCH) {
            executeSwitch(trainerA, btr.newPokemonA(), "A", battleLogs);
        }
        if (btr.actionB() == Action.SWITCH) {
            executeSwitch(trainerB, btr.newPokemonB(), "B", battleLogs);
        }

        boolean aAttacks = btr.actionA() == Action.ATTACK;
        boolean bAttacks = btr.actionB() == Action.ATTACK;

        activeA = trainerA.getTeam().get(trainerA.getActivePokemon());
        activeB = trainerB.getTeam().get(trainerB.getActivePokemon());

        if (aAttacks && bAttacks) {
            if (activeA.getSPE() > activeB.getSPE()) {
                executeAttackSequence(battle, activeA, activeB, btr.moveTrainerA(), battle.getLevel(), "A", "B", battleLogs);
                if (activeB.getHP() > 0) {
                    executeAttackSequence(battle, activeB, activeA, btr.moveTrainerB(), battle.getLevel(), "B", "A", battleLogs);
                }
            } else {
                executeAttackSequence(battle, activeB, activeA, btr.moveTrainerB(), battle.getLevel(), "B", "A", battleLogs);
                if (activeA.getHP() > 0) {
                    executeAttackSequence(battle, activeA, activeB, btr.moveTrainerA(), battle.getLevel(), "A", "B", battleLogs);
                }
            }
        } else if (aAttacks) {
            executeAttackSequence(battle, activeA, activeB, btr.moveTrainerA(), battle.getLevel(), "A", "B", battleLogs);
        } else if (bAttacks) {
            executeAttackSequence(battle, activeB, activeA, btr.moveTrainerB(), battle.getLevel(), "B", "A", battleLogs);
        }

        if (!hasAlivePokemon(trainerA)) {
            battle.setFinished(true);
            List<String> defeatLogs = new ArrayList<>();
            defeatLogs.add(trainerA.getName() + " n'a plus de Pokémon en état de combattre.");
            battleLogs.add(new BattleLog(LogType.ENDGAME, "A", defeatLogs));
        }
        if (!hasAlivePokemon(trainerB)) {
            battle.setFinished(true);
            List<String> defeatLogs = new ArrayList<>();
            defeatLogs.add(trainerB.getName() + " n'a plus de Pokémon en état de combattre.");
            battleLogs.add(new BattleLog(LogType.ENDGAME, "B", defeatLogs));
        }

        battleService.saveGame(battle);
        return new BattleStateResponse(battle.getId(), battle.getLevel(), trainerA, trainerB, battleLogs);
    }


    private boolean validateTrainerTurn(Trainer trainer, Action action, Integer newPokemonIndex) {
        Pokemon activePokemon = trainer.getTeam().get(trainer.getActivePokemon());

        if (activePokemon.getHP() <= 0) {
            return action == Action.SWITCH && canSwitchTo(trainer, newPokemonIndex);
        }

        if (action == Action.SWITCH) {
            return canSwitchTo(trainer, newPokemonIndex);
        }

        return true;
    }

    private boolean canSwitchTo(Trainer trainer, Integer newPokemonIndex) {
        if (newPokemonIndex == null) {
            return false;
        }
        if (newPokemonIndex == trainer.getActivePokemon()) {
            return false;
        }
        if (newPokemonIndex < 0 || newPokemonIndex >= trainer.getTeam().size()) {
            return false;
        }
        Pokemon newPokemon = trainer.getTeam().get(newPokemonIndex);
        return newPokemon.getHP() > 0;
    }

    private boolean hasAlivePokemon(Trainer trainer) {
        for (Pokemon pokemon : trainer.getTeam()) {
            if (pokemon.getHP() > 0) {
                return true;
            }
        }
        return false;
    }

    private void executeSwitch(Trainer trainer, int newPokemonIndex, String trainerLetter, List<BattleLog> battleLogs) {
        if (newPokemonIndex == trainer.getActivePokemon()) {
            throw new IllegalArgumentException("Impossible de changer avec le Pokémon déjà actif.");
        }

        Pokemon currentPokemon = trainer.getTeam().get(trainer.getActivePokemon());
        Pokemon newPokemon = trainer.getTeam().get(newPokemonIndex);

        List<String> switchLogs = new ArrayList<>();
        switchLogs.add(currentPokemon.getName() + " repose-toi !");
        
        BattleLog log = new BattleLog(LogType.SWITCH, trainerLetter, switchLogs);
        log.addAnimation();
        log.add(newPokemon.getName() + " entre en jeu !");
        battleLogs.add(log);

        trainer.setActivePokemon(newPokemonIndex);
    }

    private void executeAttackSequence(BattleGame battle, Pokemon attacker, Pokemon target, int moveIndex, int level, String attackerLetter, String targetLetter, List<BattleLog> battleLogs) {
        if (battle.isWaitingForTrainerToSwitch()) {
            throw new IllegalArgumentException("Impossible d'attaquer, un des dresseurs doit changer de Pokémon.");
        }

        Move move = attacker.getMoves().get(moveIndex);

        if (move.getPowerPoints() <= 0) {
            List<String> noPPLogs = new ArrayList<>();
            noPPLogs.add(attacker.getName() + " utilise " + move.getName() + " mais n'a plus de PP !");
            battleLogs.add(new BattleLog(LogType.ATTACK, attackerLetter, noPPLogs));
            return;
        }
        move.setPowerPoints(move.getPowerPoints() - 1);

        List<String> logs = new ArrayList<>();
        
        logs.add(attacker.getName() + " utilise " + move.getName() + " !");
        logs.add("_ANIMATION_");

        attack(attacker, target, move, level, logs);
        battleLogs.add(new BattleLog(LogType.ATTACK, attackerLetter, logs));

        if (target.getHP() <= 0) {
            target.setHP(0);
            battle.setWaitingForTrainerToSwitch(true);
            List<String> faintLogs = new ArrayList<>();
            faintLogs.add(target.getName() + " est KO !");
            BattleLog faintLog = new BattleLog(LogType.KO, targetLetter, faintLogs);
            faintLog.addAnimation();
            battleLogs.add(faintLog);
        }
    }


    public void attack(Pokemon attacker, Pokemon target, Move move, int level, List<String> logs) {
        if (!moveHits(move)) {
            logs.add(attacker.getName() + " utilise " + move.getName() + " mais rate sa cible !");
            return;
        }
        int damage = calculateDamage(attacker, target, move, level, logs);
        target.setHP(target.getHP() - damage);
    }

    private boolean moveHits(Move move) {
        int accuracy = move.getAccuracy();
        if (accuracy >= 100) return true;
        return ThreadLocalRandom.current().nextInt(1, 101) <= accuracy;
    }

    public int calculateDamage(Pokemon attacker, Pokemon target, Move move, int level, List<String> logs) {
        double baseDamage = calculateBaseDamage(attacker, target, move, level);
        double effectiveness = getResistanceMultiplier(target, move.getType());
        
        System.out.println("Base damage: " + baseDamage + ", Effectiveness: " + effectiveness);
        
        double range = 0.85 + ThreadLocalRandom.current().nextDouble() * 0.15;
        double stabMultiplier = isSTAB(attacker, move) ? 1.5 : 1.0;

        if (effectiveness > 1) {
            logs.add("C'est super efficace !");
        } else if (effectiveness < 1 && effectiveness > 0) {
            logs.add("Ce n'est pas très efficace...");
        } else if (effectiveness == 0) {
            logs.add("Ça n'affecte pas du tout " + target.getName() + " !");
        }

        return (int) (baseDamage * stabMultiplier * effectiveness * range);
    }

    private double calculateBaseDamage(Pokemon attacker, Pokemon target, Move move, int level) {
        if ("physical".equalsIgnoreCase(move.getCategory())) {
            return ((level * 0.4 + 2) * attacker.getATK() * move.getPower() / target.getDEF() / 50) + 2;
        } else if ("special".equalsIgnoreCase(move.getCategory())) {
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