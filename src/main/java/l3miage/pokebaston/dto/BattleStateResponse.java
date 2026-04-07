package l3miage.pokebaston.dto;

import java.util.ArrayList;
import java.util.List;

import l3miage.pokebaston.modele.Trainer;
import l3miage.pokebaston.modele.BattleGame.Status;

public record BattleStateResponse(
		String gameId,
		int gameLevel,
		Status gameStatus,
		Trainer trainerA,
		Trainer trainerB,
		List<BattleLog> logs,
		String winner) {

	public record BattleLog(
			LogType type,
			String trainer,
			List<String> logs) {

		public BattleLog(LogType type, String trainer, List<String> logs) {
			this.type = type;
			this.trainer = trainer;
			this.logs = logs;
		}

		public void addAnimation() {
			this.logs.add("_ANIMATION_");
		}

		public void add(String log) {
			this.logs.add(log);
		}
	}

	public enum LogType {
		ATTACK, SWITCH, KO, ENDGAME
	};

	public BattleStateResponse(String gameId, int level, Status gameStatus, Trainer trainerA, Trainer trainerB) {
		// Constructeur 1 : Partie en cours sans logs ni gagnant
		this(gameId, level, gameStatus, trainerA, trainerB, new ArrayList<BattleLog>(), null);
	}

	// Constructeur 2 : Partie en cours avec des logs (mais toujours pas de gagnant)
	public BattleStateResponse(String gameId, int level, Status gameStatus, Trainer trainerA, Trainer trainerB,
			List<BattleLog> logs) {
		// On passe les logs reçus, et null pour le winner
		this(gameId, level, gameStatus, trainerA, trainerB, logs, null);
	}
}
