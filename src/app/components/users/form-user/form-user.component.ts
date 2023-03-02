import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Irole } from 'src/app/interfaces/irole';
import { IUser } from 'src/app/interfaces/user';
import { apiRoutes } from 'src/app/services/apiRoutes.service';
import { FormTeamComponent } from '../../teams/form-team/form-team.component';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit{

  formUser: FormGroup = {} as FormGroup
  user?: IUser
  responseMessage?: string
  roles: Irole[] = []
  roleDescrip?: string

  constructor(private api:apiRoutes, @Inject(MAT_DIALOG_DATA) 
    public userData: any, 
      private dialogRef: MatDialogRef<FormUserComponent>){}

  ngOnInit(): void {
    this.formBuilder()
    this.getRoles()
  }

  formBuilder(){
    this.formUser = new FormGroup({
      user: new FormControl(null, [
        Validators.required
      ]),
      email: new FormControl(null, [
        Validators.required
      ]),
      phone: new FormControl(null, [
        Validators.required
      ]),
      role_id: new FormControl(null, [
        Validators.required
      ]),
      status: new FormControl(null, [
        Validators.required
      ]),
      id: new FormControl(null, [
        Validators.required
      ])
    })
  }

  submitUser(){
    
    this.user = {
      user: this.formUser.get('user')?.value,
      status: this.formUser.get('status')?.value,
      email: this.formUser.get('email')?.value,
      phone: this.formUser.get('phone')?.value,
      id: this.formUser.get('role_id')?.value
    }

    console.log(this.user)

    if(this.userData.update == true){
      this.api.updateUser(this.user, this.userData.id).subscribe({
        next: (response) => console.log(response),
        error: (response) => {
          if (response.error && response.error.errors) {
            const errors = response.error.errors;
            for (const key of Object.keys(errors)) {
              const control = this.formUser.get(key);
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
    }
  }

  setData(){
    this.formUser.patchValue({
      user: this.userData.name,
      email: this.userData.email,
      status: this.userData.status,
      role_id: this.userData.role_id,
      phone: this.userData.phone,   
    })
  }

  getRoles(){
    this.api.readRoles().subscribe({
      next: (response) => {
        this.roles = response.data
      },
      error: (response) => console.log(response.error),
      complete: () => {
        if(this.userData.update == true){
          this.setData()
        }
        console.log('ok')
      }
    });
  }

}
