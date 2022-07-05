package com.shop.app.entities;

import javax.persistence.*;

@Entity
@Table(name = "order_completed")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //AUTO
    @Column(name = "order_completed_id")
    private long order_id;

    @Column(name = "auth_user_id")
    private long user;

    @Column(name = "order_date")
    private String order_date;

    @Column(name = "shipment_date")
    private String shipment_date;

    @Column(name = "shipping_address_id")
    private long shipping_address_id;

    @Column(name = "payment_id")
    private long payment_id;

    @Column(name = "order_status")
    private String order_status;

    public long getShipping_address_id() {
        return shipping_address_id;
    }

    public void setShipping_address_id(long shipping_address_id) {
        this.shipping_address_id = shipping_address_id;
    }

    public long getOrder_id() {
        return order_id;
    }

    public void setOrder_id(long order_id) {
        this.order_id = order_id;
    }

    public String getOrder_date() {
        return order_date;
    }

    public void setOrder_date(String order_date) {
        this.order_date = order_date;
    }

    public String getShipment_date() {
        return shipment_date;
    }

    public void setShipment_date(String shipment_date) {
        this.shipment_date = shipment_date;
    }

    public long getAuth_user_id() {
        return user;
    }

    public void setAuth_user_id(long auth_user_id) {
        this.user = auth_user_id;
    }

    public long getPayment_id() {
        return payment_id;
    }

    public void setPayment_id(long payment_id) {
        this.payment_id = payment_id;
    }

    public String getOrder_status() {
        return order_status;
    }

    public void setOrder_status(String order_status) {
        this.order_status = order_status;
    }

}
