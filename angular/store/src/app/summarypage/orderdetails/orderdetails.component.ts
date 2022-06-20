import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/model/Order';
import { Address } from 'src/app/model/Address';
import { Product } from 'src/app/model/Product';
import { HttpClientService } from 'src/app/service/http-client.service';
import { Payment } from 'src/app/model/Payment';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {

  @Input()
  order: Order;
  
  address: Address;
  products: Product[];
  //payment: Payment;
  
  constructor(private httpClientService: HttpClientService) { }

  ngOnInit(): void {


    let data = localStorage.getItem('products');
    if (data !== null) {
      this.products = JSON.parse(data);
    } else {
      this.products = [];
    }

   /* this.httpClientService.getPaymentStatus(this.order.payment_id).subscribe(
        
      response => this.getPayment(response)
    );  */
  
  }
  /*getPayment(response: Payment) {

    this.payment = response;
    
  }*/




}
