package com.shop.app.dto;

import javax.persistence.Column;

public class OrderDetailsDto {
    private long order_details_id;

    private long orderID;

    private long product_id;

    private int quantity;

    private double cost;
}
