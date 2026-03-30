package l3miage.pokebaston.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import l3miage.pokebaston.dto.PokemonDTO;
import l3miage.pokebaston.service.PokemonService;

@RestController
@RequestMapping("/api/pokemons")
public class PokemonController {

    @Autowired
    private PokemonService pokemonService;

    @GetMapping
    public List<PokemonDTO> getAll() {
        return pokemonService.getAllPokemons();
    }

    @GetMapping("/{id}")
    public PokemonDTO getById(@PathVariable int id) {
        return pokemonService.getPokemonById(id);
    }

    @GetMapping("/search")
    public List<PokemonDTO> getByType(@RequestParam String type) {
        return pokemonService.getPokemonsByType(type);
}
}