package l3miage.pokebaston.repositories;

import java.util.List;
import l3miage.pokebaston.dto.MoveDTO;

public interface MoveRepository {
    List<MoveDTO> findAll();
    MoveDTO findById(int id);
}