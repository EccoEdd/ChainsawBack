import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDemon } from 'src/app/interfaces/idemon';
import { apiRoutes } from 'src/app/services/apiRoutes.service';
import { FormTeamComponent } from '../../teams/form-team/form-team.component';

@Component({
  selector: 'app-form-demon',
  templateUrl: './form-demon.component.html',
  styleUrls: ['./form-demon.component.css']
})
export class FormDemonComponent implements OnInit{
  formDemon: FormGroup = {} as FormGroup 
  demon?: IDemon
  responseMessage?: string;

  constructor(private api:apiRoutes, @Inject(MAT_DIALOG_DATA) 
    public demonData: any, 
      private dialogRef: MatDialogRef<FormTeamComponent>){ }

  ngOnInit(): void {
    this.formBuilder()
    this.setData()
  }

  formBuilder(): void{
    this.formDemon = new FormGroup({
      name: new FormControl(null, [
        Validators.required
      ]),
      category: new FormControl( null, [
        Validators.required,
      ]),
      id: new FormControl(null, [
        Validators.required
      ])
    })
  }

  submitDemon(){
    this.demon = {
      name: this.formDemon.get('name')?.value,
      category: this.formDemon.get('category')?.value
    }
    if(this.demonData.update == true){
      this.api.updateDemon(this.demon, this.demonData.id).subscribe({
        next: (response) => console.log(response),
        error: (response) => {
          if (response.error && response.error.errors) {
            const errors = response.error.errors;
            for (const key of Object.keys(errors)) {
              const control = this.formDemon.get(key);
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
      this.api.createDemon(this.demon).subscribe({
        next: (response) => console.log(response),
        error: (response) => {
          if (response.error && response.error.errors) {
            const errors = response.error.errors;
            for (const key of Object.keys(errors)) {
              const control = this.formDemon.get(key);
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
      console.log(this.demon)
    }
  }
  
  setData(){
    this.formDemon.patchValue({
      name: this.demonData.name,
      category: this.demonData.category
    })
  }
}
