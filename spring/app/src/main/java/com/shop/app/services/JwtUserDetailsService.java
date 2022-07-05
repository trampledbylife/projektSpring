package com.shop.app.services;

import java.util.*;

import com.shop.app.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        com.shop.app.entities.User user = userRepository.findByEmail(username);

        if (user != null) {
            Set<GrantedAuthority> list = new HashSet<>();
            list.add(new SimpleGrantedAuthority(user.getStatus()));
            return new User(user.getEmail(), user.getPassword(), list);
        } else {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
    }
}