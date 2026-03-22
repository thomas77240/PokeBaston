package l3miage.pokebaston.repositories;

import java.util.List;
import l3miage.pokebaston.dto.PokemonDTO;

public interface IPokemonRepository {
    List<PokemonDTO> findAll();
    PokemonDTO findById(int id);
    List<PokemonDTO> findByType(String type);
}