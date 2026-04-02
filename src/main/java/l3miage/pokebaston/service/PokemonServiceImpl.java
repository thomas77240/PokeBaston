package l3miage.pokebaston.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import l3miage.pokebaston.dto.PokemonDTO;
import l3miage.pokebaston.exceptions.PokemonNotFoundException;
import l3miage.pokebaston.repositories.PokemonRepository;

@Service
public class PokemonServiceImpl implements PokemonService {
    @Autowired
    private PokemonRepository pokemonRepository;

    public List<PokemonDTO> getAllPokemons() {
        return pokemonRepository.findAll();
    }

    public PokemonDTO getPokemonById(int id) {
        PokemonDTO pokemon = pokemonRepository.findById(id);
        if (pokemon == null) {
            throw new PokemonNotFoundException("Le Pokémon avec l'id: " + id + " n'existe pas.");
        }
        return pokemon;
    }

    public List<PokemonDTO> getPokemonsByType(String type) {
        List<PokemonDTO> list = pokemonRepository.findByType(type);
        if (list.isEmpty()) {
            throw new PokemonNotFoundException("Aucun Pokémon trouvé pour le type " + type + ".");
        }
        return list;
    }
}