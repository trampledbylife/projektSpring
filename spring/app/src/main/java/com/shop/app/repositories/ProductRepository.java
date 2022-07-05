package com.shop.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shop.app.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}