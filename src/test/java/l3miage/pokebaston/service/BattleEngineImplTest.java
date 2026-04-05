package l3miage.pokebaston.service;

import l3miage.pokebaston.dto.BattleTurnRequest;
import l3miage.pokebaston.dto.BattleStateResponse;
import l3miage.pokebaston.dto.BattleStateResponse.BattleLog;
import l3miage.pokebaston.dto.PokemonDTO;
import l3miage.pokebaston.modele.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@SpringBootTest
public class BattleEngineImplTest {

    @Autowired
    private BattleEngineImpl battleEngine;

    @MockitoBean
    private BattleService battleService;

    @MockitoBean
    private PokemonService pokemonService;

    private Pokemon pika;
    private Pokemon carapuce;
    private Move charge;
    private Move tonnerre;

    @BeforeEach
void setUp() {
    
    charge = new Move("Charge", "Normal", "physical", 40, 35, 35, 100);
    tonnerre = new Move("Tonnerre", "Électrik", "special", 90, 15, 15, 100);

    pika = new Pokemon(
        new ArrayList<>(List.of("Électrik")), 
        "Pikachu", 100, 50, 40, 90, 50, 40
    );
    pika.setMoves(new ArrayList<>(List.of(charge, tonnerre)));

    carapuce = new Pokemon(
        new ArrayList<>(List.of("Eau")), 
        "Carapuce", 100, 45, 65, 45, 50, 60
    );
    carapuce.setMoves(new ArrayList<>(List.of(charge)));
}

    @Test
void testAttack() {
     //On simule une faiblesse (2.0f) pour être SÛR d'avoir un log "Efficace"
    PokemonDTO.ResistanceDTO res = new PokemonDTO.ResistanceDTO(
        2.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 
        1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f
    );
    PokemonDTO carapuceDto = new PokemonDTO(0, "Carapuce", null, List.of("Eau"), res, List.of(1));
    when(pokemonService.getPokemonById(anyInt())).thenReturn(carapuceDto);
    
    List<String> logs = new ArrayList<>();
    
    
    battleEngine.attack(pika, carapuce, charge, 50, logs);

    
    assertTrue(carapuce.getHP() < 100, "Les PV doivent baisser car la catégorie est 'physical'");
    assertFalse(logs.isEmpty(), "La liste ne doit pas être vide car l'efficacité est de 2.0");
}

    @Test
    void testCalculateDamage() {
        List<String> logs = new ArrayList<>();
        PokemonDTO.StatsDTO stats = new PokemonDTO.StatsDTO(40, 40, 40, 50, 40, 90);
        PokemonDTO.ResistanceDTO res = new PokemonDTO.ResistanceDTO(
            1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 
            1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f
        );
        
        PokemonDTO fakeDto = new PokemonDTO(0, "Carapuce", stats, List.of("Eau"), res, List.of(1, 2));
        when(pokemonService.getPokemonById(anyInt())).thenReturn(fakeDto);

        int damage = battleEngine.calculateDamage(pika, carapuce, tonnerre, 50, logs);

        assertTrue(damage > 0);
    }

    @Test
    void testProceedTurn() {
        Trainer tA = new Trainer("Sacha", new ArrayList<>(List.of(pika)), 0);
        Trainer tB = new Trainer("Regis", new ArrayList<>(List.of(carapuce)), 0);
        BattleGame game = new BattleGame(tA, tB, 50);

        when(battleService.getGame(anyString())).thenReturn(game);
        
        PokemonDTO.StatsDTO stats = new PokemonDTO.StatsDTO(40, 40, 40, 40, 40, 40);
        PokemonDTO.ResistanceDTO res = new PokemonDTO.ResistanceDTO(
            1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 
            1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f
        );
        PokemonDTO targetDto = new PokemonDTO(0, "Target", stats, List.of("Eau"), res, List.of(1));
        
        when(pokemonService.getPokemonById(anyInt())).thenReturn(targetDto);

        BattleTurnRequest btr = new BattleTurnRequest(
            "test-game",
            BattleTurnRequest.Action.ATTACK,
            BattleTurnRequest.Action.ATTACK,
            1, // Tonnerre
            0, // Charge
            0,
            0
        );

        BattleStateResponse response = battleEngine.proceedTurn(btr);

        assertNotNull(response);
        assertFalse(response.logs().isEmpty());

        BattleLog firstTurnBlock = response.logs().get(0);
        boolean pikachuFound = firstTurnBlock.logs().stream()
                .anyMatch(msg -> msg.contains("Pikachu"));

        assertTrue(pikachuFound);
        assertTrue(game.getTrainerB().getTeam().get(0).getHP() < 100);
    }
}