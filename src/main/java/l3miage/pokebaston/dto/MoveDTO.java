package l3miage.pokebaston.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record MoveDTO(
    int id,
    String name,
    String type,
    String category,
    int power,
    int accuracy,
    @JsonProperty("PP") int pp // garde la majuscule
) {}