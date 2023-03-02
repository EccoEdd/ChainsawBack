import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IBranch } from 'src/app/interfaces/ibranch';
import { ITeam } from 'src/app/interfaces/iteam';
import { apiRoutes } from 'src/app/services/apiRoutes.service';

@Component({
  selector: 'app-form-team',
  templateUrl: './form-team.component.html',
  styleUrls: ['./form-team.component.css']
})
export class FormTeamComponent implements OnInit{
  formTeam: FormGroup = {} as FormGroup
  team?: ITeam
  responseMessage?: string
  branches: IBranch[] = []
  branchName?: string 
 
  constructor(private api:apiRoutes, @Inject(MAT_DIALOG_DATA) 
    public teamData: any, 
      private dialogRef: MatDialogRef<FormTeamComponent>){ }
  
   ngOnInit(): void {
    this.formBuilder()
    this.getBranches()
  }

  formBuilder(): void{
    this.formTeam = new FormGroup({
      name: new FormControl(null, [
        Validators.required
      ]),
      status: new FormControl( null, [
        Validators.required,
      ]),
      branch_id: new FormControl(null, [
        Validators.required
      ]),
      id: new FormControl(null, [
        Validators.required
      ])
    })
  }

  submitTeam(){
    this.team = {
      name: this.formTeam.get('name')?.value,
      status: this.formTeam.get('status')?.value,
      id: this.formTeam.get('branch_id')?.value
    }
    //console.log(this.team)
    //console.log(this.formTeam.get('branch_id')?.value)
    if(this.teamData.update == true){
      this.api.updateTeam(this.team, this.teamData.id).subscribe({
        next: (response) => console.log(response),
        error: (response) => {
          if (response.error && response.error.errors) {
            const errors = response.error.errors;
            for (const key of Object.keys(errors)) {
              const control = this.formTeam.get(key);
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
      this.api.createTeam(this.team).subscribe({
        next: (response) => console.log(response),
        error: (response) => {
          if (response.error && response.error.errors) {
            const errors = response.error.errors;
            for (const key of Object.keys(errors)) {
              const control = this.formTeam.get(key);
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
      console.log(this.team)
    }
    
    //console.log(this.team)
  }
  
  setData(){
    this.formTeam.patchValue({
      name: this.teamData.name,
      status: this.teamData.status,
      branch_id: this.teamData.brach_id
    })
  }

  

  getBranches(){
    this.api.readBranches().subscribe({
      next: (response) => {
        this.branches = response.data
      },
      error: (response) => console.log(response.error),
      complete: () => {
        if(this.teamData.update == true){
          this.setData()
        }
        console.log('ok')
      }
    });
  }
}
