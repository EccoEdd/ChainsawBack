import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICode } from 'src/app/interfaces/icode';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-code-sender',
  templateUrl: './code-sender.component.html',
  styleUrls: ['./code-sender.component.css']
})
export class CodeSenderComponent implements OnInit{
  
  constructor( private authService:AuthService ){ }
  formCode: FormGroup = {} as FormGroup
  code?: ICode
  responseMessage?: string;

  ngOnInit(): void {
    this.formBuilder()
  }
  
  formBuilder(): void{
    this.formCode = new FormGroup({
      code: new FormControl( null, [
        Validators.required
      ])
    })
  }

  sender(){
    
    this.code = {
      code: this.formCode.get('code')?.value
    }
    
    this.authService.codeSender(this.code).subscribe({
      next: (response) => [
        this.responseMessage = response.message
      ],
      error: (response) => {
        if (response.error && response.error.errors) {
          const errors = response.error.errors;
          for (const key of Object.keys(errors)) {
            const control = this.formCode.get(key);
            if (control) {
              control.setErrors({ apiError: errors[key] });
            }
          }
        } else if(response.error.status === 404){
          this.responseMessage = 'Times up!'
        }
         else {
          console.log(response)
        }
      },
      complete: () => {
        localStorage.removeItem('protected_url')
      }
    })
  }
}
