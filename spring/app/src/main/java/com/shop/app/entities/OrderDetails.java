package com.shop.app.entities;

import javax.persistence.*;

@Entity
@Table(name = "order_details")
public class OrderDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //AUTO
    @Column(name = "order_details_id")
    private long order_details_id;

    @Column(name = "order_id")
    private long orderID;

    @Column(name = "product_id")
    private long product_id;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "cost")
    private double cost;

    public long getOrder_details_id() {
        return order_details_id;
    }

    public void setOrder_details_id(long order_details_id) {
        this.order_details_id = order_details_id;
    }

    public long getOrder_id() {
        return orderID;
    }

    public void setOrder_id(long order_id) {
        this.orderID = order_id;
    }

    public long getProduct_id() {
        return product_id;
    }

    public void setProduct_id(long product_id) {
        this.product_id = product_id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }
}