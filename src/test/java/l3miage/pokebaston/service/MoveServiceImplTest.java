package l3miage.pokebaston.service;

import l3miage.pokebaston.dto.MoveDTO;
import l3miage.pokebaston.exceptions.MoveNotFoundException;
import l3miage.pokebaston.repositories.MoveRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class MoveServiceImplTest {

    @Mock
    private MoveRepository moveRepository; // On simule le repo

    @InjectMocks
    private MoveServiceImpl moveService; // On injecte le mock dans le service

    @Test
    void testGetMoveById_Success() {
        // GIVEN
        int moveId = 1;
        MoveDTO expectedMove = new MoveDTO(1, "Charge", "Normal", "physical", 40, 100, 35);
        when(moveRepository.findById(moveId)).thenReturn(expectedMove);

        // WHEN
        MoveDTO result = moveService.getMoveById(moveId);

        // THEN
        assertNotNull(result);
        assertEquals("Charge", result.name());
        verify(moveRepository, times(1)).findById(moveId);
    }

    @Test
    void testGetMoveById_NotFound_ShouldThrowException() {
        // GIVEN
        int unknownId = 999;
        when(moveRepository.findById(unknownId)).thenReturn(null);

        // WHEN & THEN
        assertThrows(MoveNotFoundException.class, () -> {
            moveService.getMoveById(unknownId);
        });
        
        verify(moveRepository, times(1)).findById(unknownId);
    }

    @Test
    void testGetAllMoves_ShouldReturnList() {
        // GIVEN
        List<MoveDTO> mockList = List.of(
            new MoveDTO(1, "Charge", "Normal", "physical", 40, 100, 35),
            new MoveDTO(2, "Tonnerre", "Électrik", "special", 90, 100, 15)
        );
        when(moveRepository.findAll()).thenReturn(mockList);

        // WHEN
        List<MoveDTO> result = moveService.getAllMoves();

        // THEN
        assertEquals(2, result.size());
        assertEquals("Tonnerre", result.get(1).name());
    }
}