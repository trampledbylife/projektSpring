package com.shop.app.dto;

import javax.persistence.Column;

public class OrderDto {
    private long order_id;

    private long user;

    private String order_date;

    private String shipment_date;

    private long shipping_address_id;

    private long payment_id;

    private String order_status;
}
