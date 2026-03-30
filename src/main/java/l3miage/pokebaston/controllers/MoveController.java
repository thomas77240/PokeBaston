package l3miage.pokebaston.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import l3miage.pokebaston.dto.MoveDTO;
import l3miage.pokebaston.service.MoveService;

@RestController
@RequestMapping("/api/moves")
public class MoveController {

    @Autowired
    private MoveService moveService;

    @GetMapping
    public List<MoveDTO> getAll() {
        return moveService.getAllMoves();
    }

    @GetMapping("/{id}")
    public MoveDTO getById(@PathVariable int id) {
        return moveService.getMoveById(id);
    }
}