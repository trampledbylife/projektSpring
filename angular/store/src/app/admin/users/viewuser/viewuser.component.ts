import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/model/user';
import { HttpClientService } from 'src/app/service/http-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.css']
})
export class ViewuserComponent implements OnInit {

  @Input()
  user: User
  

  @Output()
  userDeletedEvent = new EventEmitter();


  role: string;
  
  constructor(private httpClientService: HttpClientService,
    private router: Router) { }

  ngOnInit() {
  }

  deleteUser() {
    this.httpClientService.deleteUser(this.user.id).subscribe(
      (user) => {
        this.userDeletedEvent.emit();
        this.router.navigate(['admin', 'users']);
      }
    );

  }

  setAdminUser() {
    this.user.status = "ROLE_ADMIN";
    this.httpClientService.setAdminRights(this.user).subscribe();
    this.router.navigate(['admin', 'users']);
  }

}
