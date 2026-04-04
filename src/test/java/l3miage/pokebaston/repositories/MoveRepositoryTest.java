package l3miage.pokebaston.repositories;
import static org.mockito.Mockito.*; // Pour mock(), when(), verify()
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.core.io.Resource;
import java.io.ByteArrayInputStream;
import java.io.InputStream;

public class MoveRepositoryTest {

    private MoveRepositoryImpl repository;
    private Resource mockResource;

    @BeforeEach
    void setUp() throws Exception{
        repository = new MoveRepositoryImpl();
        mockResource = mock(Resource.class);

        // On injecte manuellement le mock dans le champ privé via la réflexion 
        // ou en ajoutant un setter/constructeur dans ton code original.
        java.lang.reflect.Field field = MoveRepositoryImpl.class.getDeclaredField("movesFile");
        field.setAccessible(true);
        field.set(repository, mockResource);
    }

    @Test
    void testInit_Success() throws Exception {
        // Préparation d'un JSON de test
        String json = "[{\"id\": 1, \"name\":\"Charge\"}]";
        InputStream is = new ByteArrayInputStream(json.getBytes());
        when(mockResource.getInputStream()).thenReturn(is);

        //action
        repository.init();

        //verification
        assertNotNull(repository.findById(1));
        assertEquals(1, repository.findAll().size());
    }

    @Test
    void testFindById_NotFound(){
        // la map est vide ou inexistant
        assertNull(repository.findById(999));
    }
    
}
