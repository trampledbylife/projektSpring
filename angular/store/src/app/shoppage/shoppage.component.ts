import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from '../service/http-client.service';
import { Product } from '../model/Product';

@Component({
  selector: 'app-shoppage',
  templateUrl: './shoppage.component.html',
  styleUrls: ['./shoppage.component.css']
})
export class ShoppageComponent implements OnInit {

  //$productID = new EventEmitter();
  products: Array<Product>;
  productsRecieved: Array<Product>;

  cartProducts: any;

  flag: boolean;
  category: String;

  constructor(private router: Router, private httpClientService: HttpClientService) { }

  ngOnInit() {
    this.category = "all";
    this.httpClientService.getProducts().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
    //from localstorage retrieve the cart item
    let data = localStorage.getItem('cart');
    //if this is not null convert it to JSON else initialize it as empty
    if (data !== null) {
      this.cartProducts = JSON.parse(data);
    } else {
      this.cartProducts = [];
    }
  }

  // zapytanie o liste produktów i przekonwertowanie zdjecia by było mozna je wyswietlic
  handleSuccessfulResponse(response) {
    this.products = new Array<Product>();
    this.productsRecieved = response;
    for (const product of this.productsRecieved) {

      const productwithRetrievedImageField = new Product();
      productwithRetrievedImageField.id = product.id;
      productwithRetrievedImageField.name = product.name;
      productwithRetrievedImageField.retrievedImage = 'data:image/jpeg;base64,' + product.picByte;
      productwithRetrievedImageField.description = product.description;
      productwithRetrievedImageField.price = product.price;
      productwithRetrievedImageField.quantity = product.quantity;
      productwithRetrievedImageField.picByte = product.picByte;
      productwithRetrievedImageField.solded = product.solded;
      productwithRetrievedImageField.category = product.category;
      this.products.push(productwithRetrievedImageField);
    }
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  addToCart(productId) {
    //retrieve product from products array using the product id

    let product = this.products.find(product => {
      return product.id === +productId;
    });

    let cartData = [];

    let data = localStorage.getItem('cart');

    if (data !== null) {
      cartData = JSON.parse(data);
    }
    else {
      product.inCart = 1;
      this.flag = true;
    }

    if (!product.inCart) product.inCart = 1;

    for (let item of cartData) {
      if (item.id == productId) {
        item.inCart = item.inCart + 1;
        this.flag = false;
        break;
      }

      this.flag = true;
    }

    if (this.flag == true) cartData.push(product);
    //updated the cartProducts
    this.updateCartData(cartData);
    //save the updated cart data in localstorage
    localStorage.setItem('cart', JSON.stringify(cartData));
  }

  updateCartData(cartData) {
    this.cartProducts = cartData;
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  emptyCart() {
    this.cartProducts = [];
    localStorage.clear();
  }

  //przekierowanie na strone produktu
  showItem(id: number) {
    this.router.navigate(['item'], { queryParams: { id } });
  }

  setCategory(str: String) {
    this.category = str;
  }

}