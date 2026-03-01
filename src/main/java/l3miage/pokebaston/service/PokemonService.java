package l3miage.pokebaston.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import l3miage.pokebaston.dto.PokemonDTO;
import l3miage.pokebaston.repositories.PokemonRepository;

@Service
public class PokemonService {
    @Autowired
    private PokemonRepository pokemonRepository;

    public List<PokemonDTO> getAllPokemons() {
        return pokemonRepository.findAll();
    }

    public PokemonDTO getPokemonById(int id) {
        PokemonDTO pokemon = pokemonRepository.findById(id);
        if (pokemon == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Pokémon non trouvé");
        }
        return pokemon;
    }

    public List<PokemonDTO> getPokemonsByType(String type) {
        return pokemonRepository.findByType(type);
    }
}