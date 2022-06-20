import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { HttpClientService } from '../service/http-client.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  user: User;
  
  constructor(private service: HttpClientService) { }

  ngOnInit(): void {

    this.user = new User();
    this.service. getByEmail(sessionStorage.getItem('username')).subscribe(

      response => this.user = response
    );
  }

  
}
