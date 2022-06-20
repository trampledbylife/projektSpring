import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/Order';
import { Product } from 'src/app/model/Product';
import { Stats } from 'src/app/model/Stats';
import { HttpClientService } from 'src/app/service/http-client.service';
//import * as CanvasJS from 'src/app/canvasjs.min'

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  orders: Order[];
  products: Product[];
  stats: Stats[];
  one: Stats;
  total_solded: number;
  total_solded_month: number;
  currentDate: Date;
  day:number;
  month:number;
  year:number;
  txt: string;
  size: number;
 
  constructor(private httpClientService: HttpClientService) { }

  ngOnInit(): void {

    this.orders = [];
    this.stats = [];
    this.one = new Stats();

    this.httpClientService.getAllOrders().subscribe(

      response => this.usersOrders(response)
    );

  
    this.total_solded = 0;

    let data = localStorage.getItem('products');
    if (data !== null) {
      this.products = JSON.parse(data);
    } else {
      this.products = [];
    }


    for (let item of this.products) {

      this.total_solded += item.solded; 
    
    }

    for (let item of this.products) {

      item.precOfSales = Math.round((item.solded / this.total_solded)*100);

    }

    this.currentDate = new Date;
    this.day = this.currentDate.getDate();
    this.month = this.currentDate.getMonth()+1;
    this.year = this.currentDate.getFullYear();
    

    
  
  }


  //ile dany miesiac ma dni
  daysInMonth(month,year) {
   
    return new Date(year, month, 0).getDate();
  
  };

  
 
  usersOrders(response: Order[]) {
    this.orders = response;

    for (let item of this.orders) {

      
     

      var splited = item.order_date.split("-",3);

      this.one = new Stats();
      this.one.day =+ splited[2];
      this.one.month =+ splited[1];
      this.one.year =+ splited[0];
      this.one.value = 1;

      this.size = 0;


      if(this.stats.length == 0)
      {
        this.stats.push(this.one);
      }
      else{

            for (let data of this.stats){
              if(data.day==this.one.day && data.month==this.one.month && data.year==this.one.year){
                data.value = data.value + 1;
                  break;
                
              }
              else{
                this.size = this.size + 1;
              }
          }


          if(this.size == this.stats.length)
          {
            this.stats.push(this.one);
          }

      }

      this.total_solded_month = 0;
      for (let data of this.stats){
        if(this.month == data.month) this.total_solded_month += data.value; 
      }

      for (let data of this.stats) {

        data.percentageVal = Math.round(( data.value/ this.total_solded_month)*100);
  
      }
      
    }
  }

 

}
