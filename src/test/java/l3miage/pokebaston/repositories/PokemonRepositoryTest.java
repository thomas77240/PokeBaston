package l3miage.pokebaston.repositories;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import l3miage.pokebaston.dto.PokemonDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.core.io.Resource;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.List;
import java.lang.reflect.Field;

class PokemonRepositoryTest {

    private PokemonRepositoryImpl repository;
    private Resource mockResource;

    @BeforeEach
    void setUp() throws Exception {
        repository = new PokemonRepositoryImpl();
        mockResource = mock(Resource.class);
        
        // Injection par réflexion du mock dans le champ privé 'pokemonFile'
        Field field = PokemonRepositoryImpl.class.getDeclaredField("pokemonFile");
        field.setAccessible(true);
        field.set(repository, mockResource);

        // Simulation d'un JSON valide pour initialiser le repository
        // Adapte le JSON selon la structure de ton PokemonDTO (id, name, types...)
        String json = """
            [
                { "id": 1, "name": "Bulbizarre", "types": ["Plante", "Poison"] },
                { "id": 4, "name": "Salamèche", "types": ["Feu"] }
            ]
            """;
        InputStream is = new ByteArrayInputStream(json.getBytes());
        when(mockResource.getInputStream()).thenReturn(is);
        
        repository.init();
    }

    @Test
    void testFindByType_Success() {
        // Test de la recherche par type (insensible à la casse)
        List<PokemonDTO> result = repository.findByType("FEU");
        
        assertEquals(1, result.size());
        assertEquals("Salamèche", result.get(0).name());
    }

    @Test
    void testFindByType_MultipleResults() {
        // Si plusieurs Pokémon ont le même type
        List<PokemonDTO> result = repository.findByType("Plante");
        assertFalse(result.isEmpty());
    }

    @Test
    void testFindByType_NoMatch() {
        // Recherche d'un type inexistant
        List<PokemonDTO> result = repository.findByType("Dragon");
        assertTrue(result.isEmpty(), "La liste devrait être vide pour un type inexistant");
    }

    @Test
    void testFindById_Success() {
        PokemonDTO p = repository.findById(1);
        assertNotNull(p);
        assertEquals("Bulbizarre", p.name());
    }
}
