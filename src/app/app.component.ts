import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{

  role: string = 'Hey'
  url: string | null = 'nope'
    
  constructor(private route: AuthService, private router: Router, private authService: AuthService){}

  ngOnInit(): void {
    this.verify()
    this.url = localStorage.getItem('protected_url')
    console.log('I\'m here')
  }

  verify(){
    this.route.validTokenRole().subscribe({
      next: (response) => {
        this.role = response.role
      },
      error: () =>{
      
      },
      complete: () => {
        
      }
    })
  }

  title = 'Chainsaw Man';
}
