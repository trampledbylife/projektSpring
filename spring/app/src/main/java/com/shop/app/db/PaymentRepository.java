package com.shop.app.db;

import com.shop.app.model.Address;
import com.shop.app.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    public Payment findByPaymentID(long paymentID);
}
