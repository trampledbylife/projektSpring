package com.shop.app.services;

import com.shop.app.entities.User;

import java.util.List;

public interface UserService {
    void saveUser(User user);

    List<User> getAllUsers();
}
