package l3miage.pokebaston.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    record User(int id, String pseudo, String email) {
    }

    @GetMapping(value = "/api/test")
    public User getUser() {
        return new User(1, "DevNinja", "test@gmail.com");
    }
}