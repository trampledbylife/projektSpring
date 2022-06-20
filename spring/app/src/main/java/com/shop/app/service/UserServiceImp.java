package com.shop.app.service;

import com.shop.app.db.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.shop.app.model.User;


@Service
public class UserServiceImp implements UserService {

    @Autowired
    BCryptPasswordEncoder encoder;
    @Autowired
    UserRepository userRepository;

    @Override
    public void saveUser(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        user.setStatus("ROLE_USER");
        userRepository.save(user);
    }

}
