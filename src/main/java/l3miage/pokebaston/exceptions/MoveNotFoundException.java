package l3miage.pokebaston.exceptions;

public class MoveNotFoundException extends RuntimeException {
    public MoveNotFoundException(String message) {
        super(message);
    }
}