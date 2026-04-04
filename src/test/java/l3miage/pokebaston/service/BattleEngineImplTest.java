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
import static org.mockito.ArgumentMatchers.any;
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

    @BeforeEach
    void setUp() {
        // 1. Initialisation de Move (Ordre : name, type, category, power, powerPoints, accuracy)
        charge = new Move("Charge", "Normal", "physical", 40, 35, 100);

        // 2. Initialisation des Pokémon (Ordre : type, name, hp, atk, def, spe, spa, spd)
        pika = new Pokemon(
            new ArrayList<>(List.of("Électrik")), 
            "Pikachu", 
            100, 50, 40, 90, 50, 40
        );
        pika.setMoves(new ArrayList<>(List.of(charge)));

        carapuce = new Pokemon(
            new ArrayList<>(List.of("Eau")), 
            "Carapuce", 
            100, 45, 65, 45, 50, 60
        );
        carapuce.setMoves(new ArrayList<>(List.of(charge)));
    }

    @Test
    void testAttack() {
        
    PokemonDTO.StatsDTO stats = new PokemonDTO.StatsDTO(40, 40, 40, 40, 40, 40);
    PokemonDTO.ResistanceDTO res = new PokemonDTO.ResistanceDTO(
        1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 
        1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f
    );
    
    // On crée le DTO que le service est censé renvoyer
    // L'ID doit correspondre à celui de carapuce (0 par défaut avec ton constructeur actuel)
    PokemonDTO carapuceDto = new PokemonDTO(0, "Carapuce", stats, List.of("Eau"), res, List.of(1));
    when(pokemonService.getPokemonById(anyInt())).thenReturn(carapuceDto);
        
        int initialHP = carapuce.getHP();
        List<String> logs = new ArrayList<>();
        
        // Exécution de l'attaque via le moteur
        battleEngine.attack(pika, carapuce, charge, 50, logs);

        int postHp = carapuce.getHP();

        assertTrue(postHp < initialHP, "Les PV devraient avoir baissé (Attaque inflige des dégâts)");
        assertFalse(logs.isEmpty(), "La liste de logs ne devrait pas être vide");
        assertTrue(logs.get(0).contains("Pikachu"), "Le log devrait mentionner Pikachu");
    }

    @Test
void testCalculateDamage() {

    // 0. On ajoute une liste pour les logs
    List<String> logs = new ArrayList<>();
    // 1. On prépare un Move de type Électrik
    Move tonnerre = new Move("Tonnerre", "Électrik", "special", 90, 15, 100);
    
    // 2. On prépare les stats (hp, atk, def, spa, spd, spe)
    PokemonDTO.StatsDTO stats = new PokemonDTO.StatsDTO(40, 40, 40, 50, 40, 90);
    
    // 3. On prépare les résistances (toutes à 1.0f pour un test neutre)
    // Note : On utilise 1.0f car ce sont des float dans ton Record
    PokemonDTO.ResistanceDTO res = new PokemonDTO.ResistanceDTO(
        1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 
        1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f
    );
    
    
    PokemonDTO fakeDto = new PokemonDTO(
        0, 
        "Carapuce", 
        stats, 
        List.of("Eau"), 
        res, 
        List.of(1, 2) // Liste d'IDs de moves bidon
    );

    // Mock du service
    when(pokemonService.getPokemonById(anyInt())).thenReturn(fakeDto);

    // Calcul
    int damage = battleEngine.calculateDamage(pika, carapuce, tonnerre, 50, logs);

    // Vérification
    assertTrue(damage > 0, "Les dégâts devraient être calculés");
}

    @Test
    void testProceedTurn() {
        // GIVEN
        Trainer tA = new Trainer("Sacha", new ArrayList<>(List.of(pika)), 0);
        Trainer tB = new Trainer("Regis", new ArrayList<>(List.of(carapuce)), 0);
        BattleGame game = new BattleGame(tA, tB, 50);

        when(battleService.getGame(anyString())).thenReturn(game);
        
        // On réutilise le DTO de Carapuce pour les résistances lors de l'attaque
        PokemonDTO.StatsDTO stats = new PokemonDTO.StatsDTO(40, 40, 40, 40, 40, 40);
        PokemonDTO.ResistanceDTO res = new PokemonDTO.ResistanceDTO(
            1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 
            1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f
        );
        PokemonDTO targetDto = new PokemonDTO(0, "Target", stats, List.of("Eau"), res, List.of(1));
        
        when(pokemonService.getPokemonById(anyInt())).thenReturn(targetDto);

        // WHEN
        // Respect de l'ordre du Record : gameId, actionA, actionB, moveA, moveB, newPkmnA, newPkmnB
        BattleTurnRequest btr = new BattleTurnRequest(
            "test-game",                     // gameId
            BattleTurnRequest.Action.ATTACK, // actionA
            BattleTurnRequest.Action.ATTACK, // actionB
            0,                               // moveTrainerA (index du move)
            0,                               // moveTrainerB (index du move)
            0,                               // newPokemonA (pas utilisé si ATTACK, mais requis)
            0                                // newPokemonB (pas utilisé si ATTACK, mais requis)
        );

        BattleStateResponse response = battleEngine.proceedTurn(btr);

        
        assertNotNull(response, "La réponse ne doit pas être nulle");
    assertFalse(response.logs().isEmpty(), "Il devrait y avoir des logs de combat");

    // On récupère le premier bloc de logs (BattleLog)
    BattleLog firstTurnBlock = response.logs().get(0);

    // On vérifie que Pikachu (le plus rapide) est mentionné dans ce premier bloc
    boolean pikachuFound = firstTurnBlock.logs().stream()
            .anyMatch(msg -> msg.contains("Pikachu"));

    assertTrue(pikachuFound, "Pikachu (SPE 90) devrait avoir attaqué dans le premier bloc de logs");
    
    // Optionnel : Vérifier que Carapuce a bien perdu des HP
    assertTrue(game.getTrainerB().getTeam().get(0).getHP() < 100, "Carapuce aurait dû perdre des PV");
}
}