package l3miage.pokebaston.dto;

import java.util.List;

public record BattleStartRequest(
		int level,
		Trainer trainerA,
		Trainer trainerB) {

	public record Trainer(
			String name,
			List<Integer> pokemonIds) {
	}
}
