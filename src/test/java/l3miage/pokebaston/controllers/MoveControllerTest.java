package l3miage.pokebaston.controllers;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import l3miage.pokebaston.dto.MoveDTO;
import l3miage.pokebaston.service.MoveServiceImpl;

@WebMvcTest(MoveController.class)
public class MoveControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean 
    private MoveServiceImpl moveService;

    @Test
    public void testGetAllMoves() throws Exception {
        
        // id, name, type, category, power, accuracy, pp
        MoveDTO move1 = new MoveDTO(1, "Charge", "Normal", "Physique", 40, 100, 35);
        MoveDTO move2 = new MoveDTO(2, "Vive-Attaque", "Normal", "Physique", 40, 100, 30);
        
        when(moveService.getAllMoves()).thenReturn(List.of(move1, move2));

        mockMvc.perform(get("/api/moves"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].name").value("Charge"))
                .andExpect(jsonPath("$[0].PP").value(35)); // On vérifie le @JsonProperty("PP")
    }

    @Test
    public void testGetMoveById() throws Exception {
        // Idem ici : 7 arguments requis
        MoveDTO move = new MoveDTO(10, "Tonnerre", "Electrik", "Spécial", 90, 100, 15);
        
        when(moveService.getMoveById(10)).thenReturn(move);

        mockMvc.perform(get("/api/moves/10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(10))
                .andExpect(jsonPath("$.category").value("Spécial"));
    }
}