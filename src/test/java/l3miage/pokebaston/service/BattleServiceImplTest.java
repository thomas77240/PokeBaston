package l3miage.pokebaston.service;

import l3miage.pokebaston.dto.BattleActiveGamesResponse;
import l3miage.pokebaston.dto.BattleStartRequest.Player.PokemonId;
import l3miage.pokebaston.dto.MoveDTO;
import l3miage.pokebaston.dto.PokemonDTO;
import l3miage.pokebaston.modele.BattleGame;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class BattleServiceImplTest {

    @Mock
    private PokemonService pokemonService;

    @Mock
    private MoveService moveService;

    @InjectMocks
    private BattleServiceImpl battleService;

    private PokemonDTO pikaDto;
    private MoveDTO chargeDto;

    @BeforeEach
    void setUp() {
        // Préparation d'un Pokémon DTO
        PokemonDTO.StatsDTO stats = new PokemonDTO.StatsDTO(35, 55, 40, 50, 50, 90);
        pikaDto = new PokemonDTO(25, "Pikachu", stats, List.of("Électrik"), null, List.of(1));
        
        // Préparation d'une attaque DTO
        chargeDto = new MoveDTO(1, "Charge", "Normal", "physical", 40, 100, 35);
    }

    @Test
    void testCreateGame_ShouldInitializeBattleCorrectly() {
        // GIVEN
        String nameA = "Sacha";
        String nameB = "Regis";
        int level = 50;

        // On définit une équipe de 1 seul Pokémon (ID 25) avec 1 attaque (ID 1)
        PokemonId pId = new PokemonId(25, List.of(1));
        List<PokemonId> team = List.of(pId);

        when(pokemonService.getPokemonById(25)).thenReturn(pikaDto);
        when(moveService.getMoveById(1)).thenReturn(chargeDto);

        // WHEN
        BattleGame game = battleService.createGame(nameA, team, nameB, team, level);

        // THEN
        assertNotNull(game);
        assertNotNull(game.getId());
        assertEquals("Sacha", game.getTrainerA().getName());
        assertEquals("Regis", game.getTrainerB().getName());
        
        // Vérification du calcul de stats (Pokemon constructor logic)
        // hp = stats.hp()*2*level/100 + 10 + level -> 35*2*50/100 + 10 + 50 = 35 + 10 + 50 = 95
        assertEquals(95, game.getTrainerA().getTeam().get(0).getHP());
        
        // Vérification que le jeu est stocké
        assertEquals(game, battleService.getGame(game.getId()));
    }

    @Test
    void testActiveGames_ShouldReturnSummary() {
        
        // On crée manuellement une partie pour remplir la map (en appelant createGame par exemple)
        PokemonId pId = new PokemonId(25, List.of(1));
        when(pokemonService.getPokemonById(25)).thenReturn(pikaDto);
        when(moveService.getMoveById(1)).thenReturn(chargeDto);
        battleService.createGame("Sacha", List.of(pId), "Regis", List.of(pId), 50);

        
        BattleActiveGamesResponse response = battleService.activeGames();

        
        assertNotNull(response);
        assertFalse(response.activeGames().isEmpty());
        assertEquals(1, response.activeGames().size());
        assertEquals("Sacha", response.activeGames().get(0).playerA());
    }

    @Test
    void testGameState_NotFound_ReturnsNull() {
        
        var response = battleService.gameState("invalid-id");

        
        assertNull(response);
    }
}
