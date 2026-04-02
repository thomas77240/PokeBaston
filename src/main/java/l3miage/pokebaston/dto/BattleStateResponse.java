package l3miage.pokebaston.dto;

import java.util.ArrayList;
import java.util.List;

import l3miage.pokebaston.modele.Trainer;

public record BattleStateResponse(
		String gameId,
		Trainer trainerA,
		Trainer trainerB,
		List<BattleLog> logs) {

		public record BattleLog(
			LogType type,
			List<String> logs	
		) {

			public BattleLog(LogType type, List<String> logs) {
				this.type = type;
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
			ATTACK, SWITCH, KO
		};

	public BattleStateResponse(String gameId, Trainer trainerA, Trainer trainerB) {
		// On appelle le constructeur principal du record avec 'this'
		// en lui passant une nouvelle ArrayList vide pour les logs
		this(gameId, trainerA, trainerB, new ArrayList<BattleLog>());
	}
}
