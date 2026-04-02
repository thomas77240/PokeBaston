package l3miage.pokebaston.controllers;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import l3miage.pokebaston.dto.PokemonDTO;
import l3miage.pokebaston.service.IPokemonService;

@WebMvcTest(PokemonController.class)
public class PokemonControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private IPokemonService pokemonService;

    
    private final PokemonDTO.StatsDTO defaultStats = new PokemonDTO.StatsDTO(10, 10, 10, 10, 10, 10);
    private final PokemonDTO.ResistanceDTO defaultRes = new PokemonDTO.ResistanceDTO(
        1f, 1f, 1f, 1f, 1f, 1f, 1f, 1f, 1f, 1f, 1f, 1f, 1f, 1f, 1f, 1f, 1f, 1f
    );

    @Test
    public void testGetAllShouldReturnList() throws Exception {
        // On crée un Pikachu avec TOUS les paramètres de ton record
        PokemonDTO pikachu = new PokemonDTO(25, "Pikachu", defaultStats, List.of("Electrik"), defaultRes, List.of(1, 2));
        
        when(pokemonService.getAllPokemons()).thenReturn(List.of(pikachu));

        mockMvc.perform(get("/api/pokemons"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Pikachu"))
                .andExpect(jsonPath("$[0].stats.hp").value(10));
    }

    @Test
    public void testGetByIdShouldReturnPokemon() throws Exception {
        PokemonDTO charmander = new PokemonDTO(4, "Charmander", defaultStats, List.of("Feu"), defaultRes, List.of(3));
        
        when(pokemonService.getPokemonById(4)).thenReturn(charmander);

        mockMvc.perform(get("/api/pokemons/4"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Charmander"))
                .andExpect(jsonPath("$.types[0]").value("Feu"));
    }
}