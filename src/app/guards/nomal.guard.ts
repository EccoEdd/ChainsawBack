import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NomalGuard implements CanActivate {
  constructor (private router: Router, private authService: AuthService) {}
  role: string = ''
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      this.authService.validTokenRole().subscribe({
        next: (response) => {
          this.role = response.role
          return true
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
