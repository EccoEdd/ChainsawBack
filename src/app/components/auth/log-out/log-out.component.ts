import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent {
  constructor(private authService:AuthService, private router: Router){}
  
  logOut(){ 
    this.authService.logOut().subscribe()
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }
}
