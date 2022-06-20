package com.shop.app.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.shop.app.model.*;
import com.shop.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import com.shop.app.db.UserRepository;
import org.springframework.web.server.ResponseStatusException;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    UserService userService;

    @GetMapping("/get")
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getUsers() {
        return userRepository.findAll();
    }




    @GetMapping(path = { "/userStatus/{email}" })
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public User getByEmail(@PathVariable("email") String email) {

        User user = userRepository.findByEmail(email);
        return user;
    }


    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public void createUser(@RequestBody User user) {
        User response = null;
        response = userRepository.findByEmail(user.getEmail());


        if(response!=null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User exist");
        }
        else userService.saveUser(user);
    }


    @PostMapping("/register")
    public void newUser(@RequestBody User user) throws Exception {

        User response = null;
        response = userRepository.findByEmail(user.getEmail());


        if(response!=null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User exist");
        }
        else userService.saveUser(user);

    }


    @DeleteMapping(path = { "/{id}" })
    @PreAuthorize("hasRole('ADMIN')")
    public User deleteUser(@PathVariable("id") long id) {
        User user = userRepository.getOne(id);

        userRepository.deleteById(id);
        return user;
    }


    @PostMapping(path = { "/setAdminRights" })
    public void setAdminRights(@RequestBody User user)
    {
        user.setStatus("ROLE_ADMIN");
        userRepository.save(user);
    }

}