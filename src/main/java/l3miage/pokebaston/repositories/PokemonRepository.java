package l3miage.pokebaston.repositories;

import java.util.List;
import l3miage.pokebaston.dto.PokemonDTO;

public interface PokemonRepository {
    List<PokemonDTO> findAll();
    PokemonDTO findById(int id);
    List<PokemonDTO> findByType(String type);
}