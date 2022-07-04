package com.shop.app.controller;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import com.shop.app.db.*;
import com.shop.app.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "order")
public class OrderController {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDetailsRepository orderDetailsRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private PaymentRepository paymentRepository;


    @PostMapping("/makeOrder")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public void makeOrder(@RequestBody Response response) throws IOException, ParseException {

        Address address = response.getAddress();
        List<OrderDetails> orders = response.getOrderDetails();

        final var address_id = addressRepository.save(address).getShipping_address_id();
        Order order = new Order();

        Payment payment = new Payment();
        payment.setPayment_status("order paid");

        final var payment_id = paymentRepository.save(payment).getPayment_id();
        double total_cost = 0;

        for (OrderDetails orderDetails : orders) {
            total_cost += orderDetails.getCost();
        }

        payment.setAmount(total_cost);
        order.setShipping_address_id(address_id);
        order.setAuth_user_id(address.getUser_id());
        order.setOrder_status("in progress");
        order.setPayment_id(payment_id);
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date date = new Date();
        format.format(date);
        order.setOrder_date(format.format(date));

        Calendar c = Calendar.getInstance();
        c.setTime(date);
        c.add(Calendar.DATE, 3);
        date = c.getTime();

        order.setShipment_date(format.format(date));

        final var order_id = orderRepository.save(order).getOrder_id();

        for (OrderDetails orderDetails : orders) {
            orderDetails.setOrder_id(order_id);
            orderDetailsRepository.save(orderDetails);
        }

        //zmiejszeie ilosc produktów w bazie o ilosc zamowionych

        Product product = new Product();
        for (OrderDetails orderDetails : orders) {
            product = productRepository.getOne(orderDetails.getProduct_id());
            product.setQuantity(product.getQuantity() - orderDetails.getQuantity());

            int solded = 0;
            solded = product.getSolded();

            product.setSolded(solded + orderDetails.getQuantity());

            productRepository.save(product);
        }
    }

    @GetMapping(path = { "/getOrderID/{user_id}" })
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public List<Order> getByID(@PathVariable("user_id") long user_id) {
        return orderRepository.findByUser(user_id);
    }

    @GetMapping("/getAllOrders")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @GetMapping(path = { "/getOrderDetails/{order_id}" })
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public List<OrderDetails> getOrderDetails(@PathVariable("order_id") long order_id) {
        return orderDetailsRepository.findByOrderID(order_id);
    }

    @GetMapping(path = { "/getShippingAddress/{order_id}" })
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public Address getShippingAddress(@PathVariable("order_id") long order_id) {
        return addressRepository.findByShippingID(order_id);
    }

    @GetMapping(path = { "/getPaymentStatus/{payment_id}" })
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public Payment getPaymentStatus(@PathVariable("payment_id") long payment_id) {
        return paymentRepository.findByPaymentID(payment_id);
    }

    @PostMapping(path = { "/setOrderStatus" })
    @PreAuthorize("hasRole('ADMIN')")
    public void setOrderStatus(@RequestBody Order order) {
        orderRepository.save(order);
    }
}