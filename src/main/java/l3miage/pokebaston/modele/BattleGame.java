package l3miage.pokebaston.modele;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class BattleGame {
    private final String id;
    private final Trainer trainerA;
    private final Trainer trainerB;
    private final List<String> logs;
    private boolean isFinished;
    private int level;

    public BattleGame(Trainer trainerA, Trainer trainerB, int level) {
        this.id = UUID.randomUUID().toString();
        this.trainerA = trainerA;
        this.trainerB = trainerB;
        this.logs = new ArrayList<>();
        this.isFinished = false;
        this.level = level;
        this.logs.add("Le combat commence entre " + trainerA.getName() + " et " + trainerB.getName());
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public void addLogs(List<String> logs) {
        this.logs.addAll(logs);
    }

    public String getId() {
        return id;
    }

    public Trainer getTrainerA() {
        return trainerA;
    }

    public Trainer getTrainerB() {
        return trainerB;
    }

    public List<String> getLogs() {
        return logs;
    }

    public boolean isFinished() {
        return isFinished;
    }

    public void setFinished(boolean isFinished) {
        this.isFinished = isFinished;
    }

    public String toString() {
        return "BattleGame [id=" + id + ", trainerA=" + trainerA.getName() + ", trainerB=" + trainerB.getName()
                + ", isFinished=" + isFinished + "]";
    }
}