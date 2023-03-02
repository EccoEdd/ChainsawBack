import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { IUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ResetService } from 'src/app/services/reset.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent implements OnInit {
  formLogin: FormGroup = {} as FormGroup
  user?: IUser
  hide: boolean = true
  constructor(private authService:AuthService, private router: Router, private app: AppComponent){ }

  ngOnInit(): void {
   this.formBuilder()
  }

  formBuilder(): void{
    this.formLogin = new FormGroup({
      email: new FormControl( null, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50)
      ])
    })
  }
  getPasswordValidate(){
    return (
      this.formLogin.get('password')?.invalid && this.formLogin.get('password')?.touched
    );
  }
  login(){
    this.user = {
      email: this.formLogin.get('email')?.value,
      password: this.formLogin.get('password')?.value
    }
    this.authService.logIn(this.user).subscribe({
      next: (response) => localStorage.setItem('token', response.token),
      error: (response) => {
        if (response.error && response.error.errors) {
        const errors = response.error.errors;
        for (const key of Object.keys(errors)) {
          const control = this.formLogin.get(key);
          if (control) {
            control.setErrors({ apiError: errors[key] });
          }
        }
      }else if (response.error && response.error.message === "incorrect User or Password") {
        this.formLogin.setErrors({ apiError: response.error.message });
      }  else {
        console.log(response)
      }},
      complete: () => {
        this.app.ngOnInit()
        this.router.navigate(['demons'])
      }
    })
  }
}