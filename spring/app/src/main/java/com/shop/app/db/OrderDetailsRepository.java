package com.shop.app.db;

import com.shop.app.model.Order;
import com.shop.app.model.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Long> {


    public List<OrderDetails> findByOrderID(long orderID);
}
