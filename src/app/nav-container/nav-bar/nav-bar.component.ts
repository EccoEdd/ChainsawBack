import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent  implements OnInit{
  role: string = 'f'
  url: string | null = 'nope'
  
  constructor(private route: AuthService){}
  
  ngOnInit(): void {
    this.verify()
  }

  verify(){
    console.log(localStorage.getItem('protected_url'))
    
    if(localStorage.getItem('protected_url'))
      this.url = localStorage.getItem('protected_url')
    
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
