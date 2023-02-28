import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{
  role: string = 'f'

  constructor(private route: AuthService){}

  ngOnInit(): void {
    this.verify()
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
