import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from '../service/http-client.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-cartpage',
  templateUrl: './cartpage.component.html',
  styleUrls: ['./cartpage.component.css']
})
export class CartpageComponent implements OnInit {

  cartProducts: any;


  amount: number;

  constructor(private router: Router, private httpClientService: HttpClientService) { }

  ngOnInit() {
    
    //odczytuje z localstorage cart
    let data = localStorage.getItem('cart');
    if (data !== null) {
      this.cartProducts = JSON.parse(data);
    } else {
      this.cartProducts = [];
    }

 
    this.amount= 0;
    for (let item of this.cartProducts) {
      this.amount = this.amount + item.inCart * item.price;
    }
  }

  updateCartData(cartData) {
    this.cartProducts = cartData;
  }


  emptyCart() {
    this.cartProducts = [];
    localStorage.clear();
    this.amount = 0;
  }

 
  completeOrder() {
    this.router.navigate(['cart/shipment']);
  }

}
