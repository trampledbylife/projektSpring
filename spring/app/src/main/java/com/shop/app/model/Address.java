package com.shop.app.model;
import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "shipping_address")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //AUTO
    @Column(name = "shipping_address_id")
    private long shippingID;

    @Column(name = "name")
    private String name;

    @Column(name = "surname")
    private String surname;

    @Column(name = "phone")
    private String phone;

    @Column(name = "street")
    private String street;

    @Column(name = "house_number")
    private String house_number;

    @Column(name = "city")
    private String city;

    @Column(name = "postal_code")
    private String postal_code;

    private long user_id;

    public long getUser_id() {
        return user_id;
    }

    public void setUser_id(long user_id) {
        this.user_id = user_id;
    }

    public long getShipping_address_id() {
        return shippingID;
    }

    public void setShipping_address_id(long shipping_address_id) {
        this.shippingID = shipping_address_id;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getHouse_number() {
        return house_number;
    }

    public void setHouse_number(String house_number) {
        this.house_number = house_number;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPostal_code() {
        return postal_code;
    }

    public void setPostal_code(String postal_code) {
        this.postal_code = postal_code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

}