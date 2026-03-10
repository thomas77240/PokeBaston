package l3miage.pokebaston.dto;

import java.util.ArrayList;
import java.util.List;
import l3miage.pokebaston.modele.Pokemon;

public record BattleTurnResponse(
                List<String> logs,
                Pokemon p1Pokemon,
                Pokemon p2Pokemon) {

        public BattleTurnResponse(Pokemon p1Pokemon, Pokemon p2Pokemon) {
                // On appelle le constructeur principal du record avec 'this'
                // en lui passant une nouvelle ArrayList vide pour les logs
                this(new ArrayList<>(), p1Pokemon, p2Pokemon);
        }

        public void addLogs(String log) {
                this.logs.add(log);
        }
}