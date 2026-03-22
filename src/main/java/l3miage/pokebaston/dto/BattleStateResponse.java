package l3miage.pokebaston.dto;

import java.util.ArrayList;
import java.util.List;

import l3miage.pokebaston.modele.Pokemon;
import l3miage.pokebaston.modele.Trainer;

public record BattleStateResponse(
		String gameId,
		Trainer trainerA,
		Trainer trainerB,
		List<String> logs) {

		public BattleStateResponse(String gameId, Trainer trainerA, Trainer trainerB) {
			// On appelle le constructeur principal du record avec 'this'
			// en lui passant une nouvelle ArrayList vide pour les logs
			this(gameId, trainerA, trainerB, new ArrayList<>());
        }
}
