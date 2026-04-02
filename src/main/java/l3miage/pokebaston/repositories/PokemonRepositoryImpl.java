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
public class PokemonRepositoryImpl implements PokemonRepository {
    private final Map<Integer, PokemonDTO> pokedex = new ConcurrentHashMap<>();

    @Value("classpath:data/pokemons.json") // Assure-toi que c'est le nouveau fichier reformatté
    private Resource pokemonFile;

    @PostConstruct
    public void init() {
        try {
            ObjectMapper mapper = new ObjectMapper();
            try (InputStream inputStream = pokemonFile.getInputStream()) {
                // Jackson va mapper automatiquement le nouveau JSON vers le Record
                List<PokemonDTO> list = mapper.readValue(inputStream, new TypeReference<List<PokemonDTO>>() {});

                list.forEach(p -> pokedex.put(p.id(), p));
            }
        } catch (IOException e) {
            System.err.println("Erreur lors de la lecture du JSON !");
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
                // C'est ici que ça change : t est directement un String maintenant
                .filter(p -> p.types().stream()
                        .anyMatch(t -> t.equalsIgnoreCase(type)))
                .toList();
    }
}