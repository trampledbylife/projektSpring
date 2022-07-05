package com.shop.app.repositories;

import com.shop.app.entities.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Payment findByPaymentID(long paymentID);
}
