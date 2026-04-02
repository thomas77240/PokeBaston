package l3miage.pokebaston.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import l3miage.pokebaston.dto.MoveDTO;
import l3miage.pokebaston.exceptions.MoveNotFoundException;
import l3miage.pokebaston.repositories.MoveRepository;

@Service
public class MoveServiceImpl implements MoveService {

    @Autowired
    private MoveRepository moveRepository;

    @Override
    public List<MoveDTO> getAllMoves() {
        return moveRepository.findAll();
    }

    @Override
    public MoveDTO getMoveById(int id) {
        MoveDTO move = moveRepository.findById(id);
        if (move == null) {
            throw new MoveNotFoundException("Attaque introuvable avec l'id : " + id);
        }
        return move;
    }
}