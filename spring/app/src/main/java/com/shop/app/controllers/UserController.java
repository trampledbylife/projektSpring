package com.shop.app.controllers;

import java.util.List;
import java.util.stream.Collectors;

import com.shop.app.dto.UserDto;
import com.shop.app.entities.*;
import com.shop.app.services.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.shop.app.repositories.UserRepository;
import org.springframework.web.server.ResponseStatusException;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    UserService userService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping("/get")
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserDto> getUsers() {
        final var users = userService.getAllUsers();
        return users.stream().map(user -> modelMapper.map(user, UserDto.class)).collect(Collectors.toList());
    }

    @GetMapping(path = { "/userStatus/{email}" })
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public User getByEmail(@PathVariable("email") String email) {
        return  userRepository.findByEmail(email);
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public void createUser(@RequestBody User user) {
        final var response = userRepository.findByEmail(user.getEmail());

        if(response!=null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User exist");
        }
        else userService.saveUser(user);
    }

    @PostMapping("/register")
    public void newUser(@RequestBody User user) throws Exception {
        final var response = userRepository.findByEmail(user.getEmail());

        if(response!=null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User exist");
        }
        else userService.saveUser(user);
    }

    @DeleteMapping(path = { "/{id}" })
    @PreAuthorize("hasRole('ADMIN')")
    public User deleteUser(@PathVariable("id") long id) {
        final var user = userRepository.getOne(id);
        userRepository.deleteById(id);
        return user;
    }

    @PostMapping(path = { "/setAdminRights" })
    public void setAdminRights(@RequestBody User user) {
        user.setStatus("ROLE_ADMIN");
        userRepository.save(user);
    }
}