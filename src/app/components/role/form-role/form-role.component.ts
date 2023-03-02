import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Irole } from 'src/app/interfaces/irole';
import { apiRoutes } from 'src/app/services/apiRoutes.service';

@Component({
  selector: 'app-form-role',
  templateUrl: './form-role.component.html',
  styleUrls: ['./form-role.component.css']
})

export class FormRoleComponent implements OnInit{
  formRole: FormGroup = {} as FormGroup
  role?: Irole
  responseMessage?: string;

  constructor(private api:apiRoutes, @Inject(MAT_DIALOG_DATA) 
    public roleData: any, 
      private dialogRef: MatDialogRef<FormRoleComponent>){ }

  ngOnInit(): void {
    this.formBuilder()
    this.setData()
  }

  formBuilder(): void{
    this.formRole = new FormGroup({
      id: new FormControl(null, [
        Validators.required
      ]),
      role: new FormControl( null, [
        Validators.required,
      ]),
      description: new FormControl(null, [
        Validators.required
      ])
    })
  }

  submitRole(){
    this.role = {
      role: this.formRole.get('role')?.value,
      description: this.formRole.get('description')?.value
    }

    if(this.roleData.update == true){
      this.api.updateRole(this.role, this.roleData.id).subscribe({
        next: (response) => console.log(response),
        error: (response) => {
          if (response.error && response.error.errors) {
            const errors = response.error.errors;
            for (const key of Object.keys(errors)) {
              const control = this.formRole.get(key);
              if (control) {
                control.setErrors({ apiError: errors[key] });
              }
            }
          }else {
            console.log(response)
          }
        },
        complete: () => {
          this.dialogRef.close()
        }
      })
    }else{
      this.api.createRol(this.role).subscribe({
        next: (response) => console.log(response),
        error: (response) => {
          if (response.error && response.error.errors) {
            const errors = response.error.errors;
            for (const key of Object.keys(errors)) {
              const control = this.formRole.get(key);
              if (control) {
                control.setErrors({ apiError: errors[key] });
              }
            }
          }else {
            console.log(response)
          }
        },
        complete: () => {
          console.log('Created')
          this.dialogRef.close()
        }
      })
      console.log(this.role)
    }
    
  }

  setData(){
    this.formRole.patchValue({
      role: this.roleData.role,
      description: this.roleData.description
    })
  }

}
