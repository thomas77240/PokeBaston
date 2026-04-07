package l3miage.pokebaston.modele;

import java.util.UUID;

public class BattleGame {
    private final String id;
    private final Trainer trainerA;
    private final Trainer trainerB;
    private int level;
    private Status status;
    private String winner;

    public enum Status {
        WAITING_FOR_TURN,
        WAITING_FOR_A_TO_SWITCH,
        WAITING_FOR_B_TO_SWITCH,
        FINISHED
    }

    public BattleGame(Trainer trainerA, Trainer trainerB, int level) {
        this.id = UUID.randomUUID().toString();
        this.trainerA = trainerA;
        this.trainerB = trainerB;
        this.status = Status.WAITING_FOR_TURN;
        this.level = level;
    }

    public boolean isWaitingForTrainerToSwitch() {
        return status == Status.WAITING_FOR_A_TO_SWITCH || status == Status.WAITING_FOR_B_TO_SWITCH;
    }

    public void setWaitingForTrainerToSwitch(boolean isWaitingForTrainerToSwitch) {
        if (isWaitingForTrainerToSwitch) {
            this.status = Status.WAITING_FOR_A_TO_SWITCH;
        } else {
            this.status = Status.WAITING_FOR_TURN;
        }
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
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
        return status == Status.FINISHED;
    }

    public void setFinished(boolean isFinished) {
        if (isFinished) {
            this.status = Status.FINISHED;
        }
    }

    public String getWinner() {
        return winner;
    }

    public void setWinner(String winner) {
        this.winner = winner;
    }

    public String toString() {
        return "BattleGame [id=" + id + ", level=" + level + ", trainerA=" + trainerA.getName()
                + ", trainerB=" + trainerB.getName() + ", status=" + status + "]";
    }
}