package com.shop.app.db;

import com.shop.app.model.Address;
import com.shop.app.model.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long> {


    public Address findByShippingID(long shippingID);
}
