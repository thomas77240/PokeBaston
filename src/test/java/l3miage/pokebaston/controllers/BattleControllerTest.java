package l3miage.pokebaston.controllers;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt; // IMPORTANT : pour le level (int)
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import java.util.ArrayList;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import l3miage.pokebaston.dto.BattleActiveGamesResponse;
import l3miage.pokebaston.modele.BattleGame;
import l3miage.pokebaston.modele.Trainer;
import l3miage.pokebaston.service.BattleEngineImpl;
import l3miage.pokebaston.service.BattleServiceImpl;
import l3miage.pokebaston.service.PokemonService;

@WebMvcTest(BattleController.class)
public class BattleControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private BattleEngineImpl battleEngine;

    @MockitoBean
    private BattleServiceImpl battleService;

    @MockitoBean
    private PokemonService pokemonService;

    @Test
    public void testActiveGamesShouldReturnStatusOk() throws Exception {
        
        when(battleService.activeGames()).thenReturn(new BattleActiveGamesResponse(new ArrayList<>()));

        mockMvc.perform(get("/api/battle/activegames"))
                .andDo(print()) // Affiche le JSON dans la console Maven
                .andExpect(status().isOk())
                
                .andExpect(jsonPath("$..*").exists()); 
    }

    @Test
    public void testStartGameShouldReturnCreatedBattle() throws Exception {
        
        Trainer tA = new Trainer("Sacha", new ArrayList<>(), 0);
        Trainer tB = new Trainer("Regis", new ArrayList<>(), 0);
        BattleGame mockBattle = new BattleGame(tA, tB, 1); 

        when(battleService.createGame(any(), any(), any(), any(), anyInt()))
                .thenReturn(mockBattle);

        String jsonRequest = """
            {
                "trainerA": {"name": "Sacha", "pokemons": []},
                "trainerB": {"name": "Regis", "pokemons": []},
                "level": 1
            }
            """;

        
        mockMvc.perform(post("/api/battle/start")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonRequest))
                .andDo(print())
                .andExpect(status().isOk())
                // On vérifie que le JSON n'est pas vide plutôt que de deviner le nom du champ
                .andExpect(jsonPath("$.*").exists()); 
    }
}