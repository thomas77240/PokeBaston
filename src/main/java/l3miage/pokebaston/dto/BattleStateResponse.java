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
		List<BattleLog> logs) {

		public record BattleLog(
			LogType type,
			String trainer,
			List<String> logs	
		) {

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
		// On appelle le constructeur principal du record avec 'this'
		// en lui passant une nouvelle ArrayList vide pour les logs
		this(gameId, level, gameStatus, trainerA, trainerB, new ArrayList<BattleLog>());
	}
}
