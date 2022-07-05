import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HttpClientService } from '../service/http-client.service';
import { Product } from '../model/Product';
import { User } from '../model/user';

@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.css']
})

export class ProductpageComponent implements OnInit {
  products: Array<Product>;
  cartProducts: any;
  productID: number;
  product: Product;
  user: User;
  howMany: number;

  public status: string;
  flag: boolean;

  constructor(private route: ActivatedRoute, private httpClientService: HttpClientService, private router: Router) { }

  ngOnInit(): void {
    this.howMany = 1;

    this.route.queryParams
      .subscribe((params) => {
        this.productID = params.id;
      });

    this.product = new Product();
    this.user = new User();

    this.httpClientService.getOneItem(this.productID).subscribe(
      response => this.setItemToShow(response),
    );

    //odczytuje z localstorage cart
    let data = localStorage.getItem('cart');
    if (data !== null) {
      this.cartProducts = JSON.parse(data);
    } else {
      this.cartProducts = [];
    }
  }

  setItemToShow(response: Product): void {
    this.product = response;
    this.product.retrievedImage = 'data:image/jpeg;base64,' + this.product.picByte;
  }

  addToCart() {
    let cartData = [];
    let data = localStorage.getItem('cart');

    if (data !== null) {
      cartData = JSON.parse(data);
    }
    else {
      this.product.inCart = this.howMany;
      this.flag = true;
    }

    if (!this.product.inCart) this.product.inCart = 1;

    for (let item of cartData) {
      if (item.id == this.product.id) {
        item.inCart = item.inCart + this.howMany;
        this.flag = false;
        break;
      }
      this.flag = true;
    }

    if (this.flag == true) cartData.push(this.product);

    this.updateCartData(cartData);
    localStorage.setItem('cart', JSON.stringify(cartData));

    this.router.navigate(['cart']);
  }

  updateCartData(cartData) {
    this.cartProducts = cartData;
  }
}
