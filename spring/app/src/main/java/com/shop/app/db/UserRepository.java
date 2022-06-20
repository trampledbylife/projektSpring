package com.shop.app.db;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shop.app.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    public User findByEmail(String email);
}