import { Component, OnInit } from '@angular/core';
import { Order } from '../model/Order';
import { HttpClientService } from '../service/http-client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../model/user';
import { OrderDetails } from '../model/OrderDetails';
import { Product } from '../model/Product';
import { Address } from '../model/Address';
import { Payment } from '../model/Payment';

@Component({
  selector: 'app-summarypage',
  templateUrl: './summarypage.component.html',
  styleUrls: ['./summarypage.component.css']
})
export class SummarypageComponent implements OnInit {

  orders: Order[];
  products: Product[];
  //str: string;

  selectedOrder: Order;
  action: string;

  constructor(private httpClientService: HttpClientService,
    private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    let data = localStorage.getItem('products');
    if (data !== null) {
      this.products = JSON.parse(data);
    } else {
      this.products = [];
    }

    //this.str = this.products[0].name;

    this.httpClientService.getOrders(sessionStorage.getItem('id')).subscribe(

      response => this.userOrders(response)
    );

    
    this.activatedRoute.queryParams.subscribe(
      (params) => {
        this.action = params['action'];
        const selectedOrder = params['order_id'];
        if (selectedOrder) {
          this.selectedOrder = this.orders.find(order => order.order_id === +selectedOrder);
        }
      }
    );
  }

 

  userOrders(response: Order[]) {

    this.orders = response;
    

//pobiera lsite porduktow dla zamowien
    for (let item of this.orders) {
      
        this.httpClientService.getOrderDetails(item.order_id).subscribe(
          
          response => this.getDetails(response, item)
        );        

    }


//pobiera adresy dostaw
    for (let item of this.orders) {
      
      this.httpClientService.getAddress(item.shipping_address_id).subscribe(
        
        response => this.getAddres(response, item)
      );        

    }


//pobiera status platnosci
    for (let item of this.orders) {
      
      this.httpClientService.getPaymentStatus(item.payment_id).subscribe(
        
        response => this.getPayment(response, item)
      );        

    }
  }


  getPayment(response: Payment, item: Order) {

    item.payment = response;
    
  }


  getAddres(response: Address, item: Order) {

    item.address = response;
  }


  getDetails(response: OrderDetails[], item: Order) {
            
    item.order_details = response;
  }


  viewOrderDetails(order_id: number) {
    this.router.navigate(['account','summary'], {queryParams : {order_id, action: 'view'}});
  }

}
