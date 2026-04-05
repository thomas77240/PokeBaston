package l3miage.pokebaston.modele;

import java.util.UUID;

public class BattleGame {
    private final String id;
    private final Trainer trainerA;
    private final Trainer trainerB;
    private boolean isWaitingForTrainerToSwitch;
    private boolean isFinished;
    private int level;

    public BattleGame(Trainer trainerA, Trainer trainerB, int level) {
        this.id = UUID.randomUUID().toString();
        this.trainerA = trainerA;
        this.trainerB = trainerB;
        this.isWaitingForTrainerToSwitch = false;
        this.isFinished = false;
        this.level = level;
    }

    public boolean isWaitingForTrainerToSwitch() {
        return isWaitingForTrainerToSwitch;
    }

    public void setWaitingForTrainerToSwitch(boolean isWaitingForTrainerToSwitch) {
        this.isWaitingForTrainerToSwitch = isWaitingForTrainerToSwitch;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
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

    public boolean isFinished() {
        return isFinished;
    }

    public void setFinished(boolean isFinished) {
        this.isFinished = isFinished;
    }

    public String toString() {
        return "BattleGame [id=" + id + ", level=" + level + ", trainerA=" + trainerA.getName() + ", trainerB=" + trainerB.getName()
                + ", isFinished=" + isFinished + ", isWaitingForTrainerToSwitch=" + isWaitingForTrainerToSwitch + "]";
    }
}