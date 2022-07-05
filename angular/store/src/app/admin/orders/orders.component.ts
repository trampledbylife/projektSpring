import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'src/app/service/http-client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/model/Order';
import { Address } from 'src/app/model/Address';
import { OrderDetails } from 'src/app/model/OrderDetails';
import { Payment } from 'src/app/model/Payment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[];
  selectedOrder: Order;
  action: string;

  constructor(private httpClientService: HttpClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.httpClientService.getAllOrders().subscribe(
      response => this.usersOrders(response)
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

  usersOrders(response: Order[]) {
    this.orders = response;

    for (let item of this.orders) {
      this.httpClientService.getAddress(item.shipping_address_id).subscribe(
        response => this.getAddres(response, item)
      );
    }


    for (let item of this.orders) {
      this.httpClientService.getOrderDetails(item.order_id).subscribe(
        response => this.getDetails(response, item)
      );
    }


    for (let item of this.orders) {
      this.httpClientService.getPaymentStatus(item.payment_id).subscribe(
        response => this.getPayment(response, item)
      );
    }
  }

  getDetails(response: OrderDetails[], item: Order) {
    item.order_details = response;
  }

  getAddres(response: Address, item: Order) {
    item.address = response;
  }

  getPayment(response: Payment, item: Order) {
    item.payment = response;
  }

  viewOrderDetails(order_id: number) {
    this.router.navigate(['admin', 'orders'], { queryParams: { order_id, action: 'view' } });
  }
}
