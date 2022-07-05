import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { User } from '../model/user';
import { Role } from '../model/role';
import { HttpClientService } from '../service/http-client.service';
import { Product } from '../model/Product';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public email: string;
  public status: string;

  cartProducts: any;
  user: User;
  roles: Role[];
  role: string;

  constructor(public loginService: AuthenticationService, private service: HttpClientService) {
  }

  ngOnInit(): void {

    //from localstorage retrieve the cart item
    let data = localStorage.getItem('cart');
    //if this is not null convert it to JSON else initialize it as empty
    if (data !== null) {
      this.cartProducts = JSON.parse(data);
    } else {
      this.cartProducts = [];
    }

    this.user = new User();
    this.email = sessionStorage.getItem('username');
    this.service.getByEmail(this.email).subscribe(

      response => this.userStatus(response)
    );
  }

  adminAccess() {
    if (this.status == "ROLE_ADMIN") return true;
    else return false;
  }

  userStatus(response: User) {
    this.user = response;
    this.status = response.status;
    sessionStorage.setItem('role', this.status)
    sessionStorage.setItem('id', this.user.id.toString());
  }
}
