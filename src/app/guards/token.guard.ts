import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenGuard implements CanActivate {
  constructor (private router: Router, private authService: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if(localStorage.getItem('token')){       
       
        this.authService.validTokenRole().subscribe({
          next: (response) => {
             
            return true
          },
          error: (error) => {
            if (error.status === 401) {
              this.router.navigate([''])
              return false
            }
            this.router.navigate([''])
            return false
          },
          complete: () => {
            return true 
          }
        })

      }
      else {

        this.router.navigate([''])
        return false

      }

      return true
  }
}
