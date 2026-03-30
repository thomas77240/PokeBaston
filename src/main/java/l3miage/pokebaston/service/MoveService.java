package l3miage.pokebaston.service;

import java.util.List;
import l3miage.pokebaston.dto.MoveDTO;

public interface MoveService {
    List<MoveDTO> getAllMoves();
    MoveDTO getMoveById(int id);
}