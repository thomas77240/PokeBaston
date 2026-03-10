package l3miage.pokebaston.dto;

import java.util.List;

import l3miage.pokebaston.modele.Pokemon;
import l3miage.pokebaston.modele.Trainer;

public record BattleStartResponse(
		String gameId,
		Trainer trainerA,
		Trainer trainerB) {
}
