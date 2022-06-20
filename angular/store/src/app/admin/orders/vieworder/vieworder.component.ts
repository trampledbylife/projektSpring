import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/model/Order';
import { Address } from 'src/app/model/Address';
import { HttpClientService } from 'src/app/service/http-client.service';
import { Product } from 'src/app/model/Product';

@Component({
  selector: 'app-vieworder',
  templateUrl: './vieworder.component.html',
  styleUrls: ['./vieworder.component.css']
})
export class VieworderComponent implements OnInit {

  @Input()
  order: Order;
  address: Address;
  products: Product[];
  
  constructor(private httpClientService: HttpClientService) { }

  ngOnInit(): void {


    let data = localStorage.getItem('products');
    if (data !== null) {
      this.products = JSON.parse(data);
    } else {
      this.products = [];
    }

  }


  setOrder(){
    this.order.order_status = "order sended";
    this.httpClientService.setStatus(this.order).subscribe(
    
    );
  }
}
