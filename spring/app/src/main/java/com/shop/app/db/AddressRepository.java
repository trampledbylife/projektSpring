package com.shop.app.db;

import com.shop.app.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
    Address findByShippingID(long shippingID);
}
