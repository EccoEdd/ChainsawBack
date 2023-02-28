import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IBranch } from 'src/app/interfaces/ibranch';
import { apiRoutes } from 'src/app/services/apiRoutes.service';
import { FormTeamComponent } from '../../teams/form-team/form-team.component';

@Component({
  selector: 'app-form-branch',
  templateUrl: './form-branch.component.html',
  styleUrls: ['./form-branch.component.css']
})
export class FormBranchComponent implements OnInit{
  formBranch: FormGroup = {} as FormGroup 
  branch?: IBranch
  responseMessage?: string;

  constructor(private api:apiRoutes, @Inject(MAT_DIALOG_DATA) 
    public branchData: any, 
      private dialogRef: MatDialogRef<FormTeamComponent>){ }

  ngOnInit(): void {
    this.formBuilder()
    this.setData()
  }

  formBuilder(): void{
    this.formBranch = new FormGroup({
      name: new FormControl(null, [
        Validators.required
      ]),
      location: new FormControl( null, [
        Validators.required,
      ]),
      id: new FormControl(null, [
        Validators.required
      ])
    })
  }

  submitBranch(){
    this.branch = {
      name: this.formBranch.get('name')?.value,
      location: this.formBranch.get('location')?.value
    }
    if(this.branchData.update == true){
      this.api.updateBranch(this.branch, this.branchData.id).subscribe({
        next: (response) => console.log(response),
        error: (response) => {
          if (response.error && response.error.errors) {
            const errors = response.error.errors;
            for (const key of Object.keys(errors)) {
              const control = this.formBranch.get(key);
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
      this.api.createBranch(this.branch).subscribe({
        next: (response) => console.log(response),
        error: (response) => {
          if (response.error && response.error.errors) {
            const errors = response.error.errors;
            for (const key of Object.keys(errors)) {
              const control = this.formBranch.get(key);
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
    }
  }

  setData(){
    this.formBranch.patchValue({
      name: this.branchData.name,
      location: this.branchData.location
    })
  }

}
