package com.shop.app.repositories;

import com.shop.app.entities.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
    Address findByShippingID(long shippingID);
}
