import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/Order';
import { Product } from 'src/app/model/Product';
import { Stats } from 'src/app/model/Stats';
import { HttpClientService } from 'src/app/service/http-client.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public orders_amount = [];
  public labels = [];
  public pieChartLabels = [];
  public pieChartData = [];
  public pieChartType = 'pie';

  orders: Order[];
  products: Product[];
  stats: Stats[];
  one: Stats;
  total_sold: number;
  total_sold_month: number;
  currentDate: Date;
  day: number;
  month: number;
  year: number;
  txt: string;
  size: number;
  constructor(private httpClientService: HttpClientService) { }

  ngOnInit(): void {
    this.orders = [];
    this.stats = [];
    this.one = new Stats();

    this.total_sold = 0;

    let data = localStorage.getItem('products');
    if (data !== null) {
      this.products = JSON.parse(data);
    } else {
      this.products = [];
    }

    for (let item of this.products) {
      this.total_sold += item.solded;
      this.pieChartData.push(item.solded)
      this.pieChartLabels.push(item.name)
    }

    for (let item of this.products) {

      item.precOfSales = Math.round((item.solded / this.total_sold) * 100);

    }

    this.currentDate = new Date;
    this.day = this.currentDate.getDate();
    this.month = this.currentDate.getMonth() + 1;
    this.year = this.currentDate.getFullYear();
  }

  //ile dany miesiac ma dni
  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  };
}
