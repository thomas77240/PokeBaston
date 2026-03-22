package l3miage.pokebaston.repositories;

import java.util.List;
import l3miage.pokebaston.dto.MoveDTO;

public interface IMoveRepository {
    List<MoveDTO> findAll();
    MoveDTO findById(int id);
}