import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../model/user';
import { HttpClientService } from '../service/http-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  @Input()
  user: User

  error = false

  password: string;
 
 constructor(private httpClientService: HttpClientService,
    private router: Router) { }

  ngOnInit() {
    this.user = new User();
  }

  addUser() {

    if(this.validate(this.user.email, this.user.password, this.password)=="OK") 
    {
      this.httpClientService.registerUser(this.user).subscribe(
        (user) => {
        
          this.router.navigate(['shop']);
          this.error = false
        },
        error => {
          this.error = true
        }
      );
    }
  
  }

  validate(email, password1, password2)
  {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    if(email==null || password1==null || password2==null) return "Please complete all fields";
    if(!EMAIL_REGEXP.test(this.user.email)) return "Please provide a valid email";
    if(this.password.length<5) return "Passwords is to short minimum length is 5";
    if(password2!=password1) return "Passwords don't match";
    return "OK";
  }
}
