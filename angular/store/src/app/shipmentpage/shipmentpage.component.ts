import { Component, OnInit } from '@angular/core';
import { Address } from '../model/Address';
import { HttpClientService } from '../service/http-client.service';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { Order } from '../model/Order';
import {  OrderDetails } from '../model/OrderDetails';

@Component({
  selector: 'app-shipmentpage',
  templateUrl: './shipmentpage.component.html',
  styleUrls: ['./shipmentpage.component.css']
})
export class ShipmentpageComponent implements OnInit {

  address: Address;
  user: User;
  orders: Order[];
  size: number;
  cartProducts: any;

  products: OrderDetails[];
  product: OrderDetails;

  constructor(private httpClientService: HttpClientService,
    private router: Router) { }

  ngOnInit(): void {

    //this.product = new OrderDetails();
    this.products = [];
    let data = localStorage.getItem('cart');
    if (data !== null) {
      this.cartProducts = JSON.parse(data);
    } else {
      this.cartProducts = [];
    }

    
   
    for (let item of this.cartProducts) {
      this.product = new OrderDetails();
      this.product.product_id = item.id;
      this.product.quantity = item.inCart;
      this.product.cost = item.inCart * item.price;

      this.products.push(this.product);
     
    }

    this.address = new Address();
    this.user = new User();

    this.httpClientService.getByEmail(sessionStorage.getItem('username')).subscribe(

      response => this.userStatus(response)
    );

  }

  userStatus(response: User) {

    this.user = response;
    this.address.user_id = this.user.id;
  }

  execute() {
   


    this.httpClientService.addAll(this.address, this.products).subscribe();

    localStorage.removeItem('cart');
    this.router.navigate(['']);


    this.httpClientService.getOrders(this.address.user_id).subscribe(

      response => this.userOrders(response)
    );


  }


  userOrders(response: Order[]) {

    this.orders = response;
  
  }

}
