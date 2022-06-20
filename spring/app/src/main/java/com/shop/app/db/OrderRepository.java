package com.shop.app.db;
import org.springframework.data.jpa.repository.JpaRepository;

import com.shop.app.model.Order;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {


    public List<Order> findByUser(long user);
}

