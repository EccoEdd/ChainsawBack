import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor (private router: Router, private authService: AuthService) {}
  role: string = ''
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.authService.validTokenRole().subscribe({
        next: (response) => {
          this.role = response.role
          if(this.role != 'a'){ 
            this.router.navigate(['logOut'])
            return false
          } else {
            return true
          }
        },
          error: (response) => {
            localStorage.removeItem('token')
            this.router.navigate([''])
            return false
        }
      })
      return true
  }
  
}
