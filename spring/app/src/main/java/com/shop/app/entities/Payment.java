package com.shop.app.entities;

import javax.persistence.*;

@Entity
@Table(name = "payment")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //AUTO
    @Column(name = "payment_id")
    private long paymentID;

    @Column(name = "payment_status")
    private String payment_status;

    @Column(name = "amount")
    private double amount;

    public long getPayment_id() {
        return paymentID;
    }

    public void setPayment_id(long payment_id) {
        this.paymentID = payment_id;
    }

    public String getPayment_status() {
        return payment_status;
    }

    public void setPayment_status(String payment_status) {
        this.payment_status = payment_status;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
}