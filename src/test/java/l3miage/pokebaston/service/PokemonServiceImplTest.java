package l3miage.pokebaston.service;

import l3miage.pokebaston.dto.PokemonDTO;
import l3miage.pokebaston.exceptions.PokemonNotFoundException;
import l3miage.pokebaston.repositories.PokemonRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PokemonServiceImplTest {

    @Mock
    private PokemonRepository pokemonRepository;

    @InjectMocks
    private PokemonServiceImpl pokemonService;

    private PokemonDTO pika;

    @BeforeEach
    void setUp() {
        // On prépare un DTO réutilisable (id, name, stats, types, resistances, moves)
        pika = new PokemonDTO(
                25, 
                "Pikachu", 
                new PokemonDTO.StatsDTO(35, 55, 40, 50, 50, 90),
                List.of("Électrik"), 
                null, // On peut mettre null pour les résistances si on ne les teste pas ici
                List.of(1, 2)
        );
    }

    @Test
    void testGetPokemonById_Success() {
        // GIVEN
        when(pokemonRepository.findById(25)).thenReturn(pika);

        // WHEN
        PokemonDTO result = pokemonService.getPokemonById(25);

        // THEN
        assertNotNull(result);
        assertEquals("Pikachu", result.name());
        verify(pokemonRepository, times(1)).findById(25);
    }

    @Test
    void testGetPokemonById_NotFound_ThrowsException() {
        // GIVEN
        when(pokemonRepository.findById(999)).thenReturn(null);

        // WHEN & THEN
        PokemonNotFoundException exception = assertThrows(PokemonNotFoundException.class, () -> {
            pokemonService.getPokemonById(999);
        });

        assertTrue(exception.getMessage().contains("999"));
    }

    @Test
    void testGetPokemonsByType_Success() {
        // GIVEN
        when(pokemonRepository.findByType("Électrik")).thenReturn(List.of(pika));

        // WHEN
        List<PokemonDTO> result = pokemonService.getPokemonsByType("Électrik");

        // THEN
        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
        assertEquals("Pikachu", result.get(0).name());
    }

    @Test
    void testGetPokemonsByType_EmptyList_ThrowsException() {
        // GIVEN
        when(pokemonRepository.findByType("Inconnu")).thenReturn(Collections.emptyList());

        // WHEN & THEN
        assertThrows(PokemonNotFoundException.class, () -> {
            pokemonService.getPokemonsByType("Inconnu");
        });
    }
}