package com.shop.app.dto;

import javax.persistence.Column;

public class ProductDto {
    private Long id;

    private String name;

    private String description;

    private String price;

    private byte[] picByte;

    private String category;

    private Integer quantity;

    private Integer solded;
}
