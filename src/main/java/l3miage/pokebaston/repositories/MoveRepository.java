package l3miage.pokebaston.repositories;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import l3miage.pokebaston.dto.MoveDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class MoveRepository implements IMoveRepository {

    private final Map<Integer, MoveDTO> moves = new ConcurrentHashMap<>();

    @Value("classpath:data/moves.json")
    private Resource movesFile;

    @PostConstruct
    public void init() {
        try {
            ObjectMapper mapper = new ObjectMapper();
            try (InputStream inputStream = movesFile.getInputStream()) {
                List<MoveDTO> list = mapper.readValue(inputStream, new TypeReference<List<MoveDTO>>() {});
                list.forEach(m -> moves.put(m.id(), m));
            }
        } catch (IOException e) {
            System.err.println("Erreur : Impossible de charger moves.json");
            e.printStackTrace();
        }
    }

    @Override
    public List<MoveDTO> findAll() {
        return new ArrayList<>(moves.values());
    }

    @Override
    public MoveDTO findById(int id) {
        return moves.get(id);
    }
}