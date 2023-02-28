import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUPComponent implements OnInit{
  formSignUp: FormGroup = {} as FormGroup
  user?: IUser
  responseMessage?: string;

  constructor(private authService:AuthService){}

  ngOnInit(): void {
   this.formBuilder()
  }

  formBuilder(): void{
    this.formSignUp = new FormGroup({
      user: new FormControl(null, [
        Validators.required
      ]),
      email: new FormControl( null, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50)
      ]),
      phone: new FormControl(null, [
        Validators.required
      ])
    })
  }
  
  signUp(){
    this.user = {
      user: this.formSignUp.get('user')?.value,
      email: this.formSignUp.get('email')?.value,
      password: this.formSignUp.get('password')?.value,
      phone: this.formSignUp.get('phone')?.value
    }
    this.authService.signUp(this.user).subscribe({
      next: (response) => [
        this.responseMessage = response.message,
        localStorage.setItem('protected_url', response.url)
      ],
      error: (response) => {
        if (response.error && response.error.errors) {
          const errors = response.error.errors;
          for (const key of Object.keys(errors)) {
            const control = this.formSignUp.get(key);
            if (control) {
              control.setErrors({ apiError: errors[key] });
            }
          }
        }else if (response.error && response.error.message === "incorrect User or Password") {
          this.formSignUp.setErrors({ apiError: response.error.message });
        }  else {
          console.log(response)
        }
      },
      complete: () => {console.log('ok')}
    })
    console.log(this.user)
  }
}
