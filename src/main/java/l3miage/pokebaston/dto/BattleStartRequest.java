package l3miage.pokebaston.dto;

import java.util.List;

public record BattleStartRequest(
		int level,
		Player trainerA,
		Player trainerB) {

	public record Player(
			String name,
			List<PokemonId> pokemons) {

		public record PokemonId(
				Integer id,
				List<Integer> movesIds) {
		}
	}
}
