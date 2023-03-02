import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor( private authService: AuthService, private router: Router){  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if(localStorage.getItem('token')){
        this.authService.validTokenRole().subscribe({
          next: (response) => {
            this.router.navigate(['branches']);
          },
          error: (error) => {
            if (error.status === 401) {
              return false;
            } else {
              return false;
            }
          },
          complete: () => {
            return true 
          }
        });
      }
      return true;

      /*
      //Consumo serv
      if(localStorage.getItem('token')){
        //here next the route navigate
        this.router.navigate(['branches'])
        return false;
      }
      else {
        return true;
      }
      */
  }
}
