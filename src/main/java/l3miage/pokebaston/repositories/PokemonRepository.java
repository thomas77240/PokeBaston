package l3miage.pokebaston.repositories;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.core.io.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.annotation.PostConstruct;
import l3miage.pokebaston.dto.PokemonDTO;

@Repository
public class PokemonRepository {
    private final Map<Integer, PokemonDTO> pokedex = new ConcurrentHashMap<>();

    @Value("classpath:data/pokemons.json")
    private Resource pokemonFile;

    @PostConstruct
    public void init() {
        try {
            ObjectMapper mapper = new ObjectMapper();
            try (InputStream inputStream = pokemonFile.getInputStream()) {
                TypeReference<List<PokemonDTO>> typeReference = new TypeReference<>() {};
                List<PokemonDTO> list = mapper.readValue(inputStream, typeReference);
                
                list.forEach(p -> pokedex.put(p.id, p));
            }
        } catch (IOException e) {
            System.err.println("JSON not found !");
            e.printStackTrace();
        }
    }
    
    public List<PokemonDTO> findAll() {
        return new ArrayList<>(pokedex.values());
    }

    public PokemonDTO findById(int id) {
        return pokedex.get(id);
    }

    public List<PokemonDTO> findByType(String type) {
        return pokedex.values().stream()
                .filter(p -> p.types.stream()
                        .anyMatch(t -> t.name.equalsIgnoreCase(type)))
                .toList();
    }
}