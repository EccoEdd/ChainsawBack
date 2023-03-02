import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent {
  constructor(private authService:AuthService, private router: Router, private app: AppComponent){}
  
  logOut(){ 
    this.authService.logOut().subscribe()
    localStorage.removeItem('token')
    this.router.navigate([''])
    this.app.role = 'Hey'
  }
}
