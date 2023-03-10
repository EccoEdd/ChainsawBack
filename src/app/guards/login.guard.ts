import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor( private authService: AuthService, private router: Router){  }
  role: string = ''

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        
      this.authService.validTokenRole().subscribe({
      next: (response) => {
        this.role = response.role
        if(this.role == 'a'){ 
          this.router.navigate(['branches'])
        } else if(this.role == 'u') {
          this.router.navigate(['demons'])
        } else {
          this.router.navigate(['logOut'])
        }
        return false
      },
        error: (response) => {
          localStorage.removeItem('token')
          return true
      }
    })
    return true
  }
}
