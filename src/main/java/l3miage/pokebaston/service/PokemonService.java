package l3miage.pokebaston.service;

import java.util.List;
import l3miage.pokebaston.dto.PokemonDTO;

public interface PokemonService {
    List<PokemonDTO> getAllPokemons();
    PokemonDTO getPokemonById(int id);
    List<PokemonDTO> getPokemonsByType(String type);
}