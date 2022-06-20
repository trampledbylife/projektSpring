import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService, User } from './authentication.service';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate{

  
  public status: string;


  constructor(private router: Router,
    private authService: AuthenticationService, private service: HttpClientService) { }

    ngOnInit(): void {}


    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, ) {
      if (this.authService.isUserLoggedIn())
      {
        this.status = sessionStorage.getItem('role');

        if(this.status=="ROLE_ADMIN") return true;

      }
        
  
      this.router.navigate(['']);
      return false;
  
    }

}
