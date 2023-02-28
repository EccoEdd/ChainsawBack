import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICharacter } from 'src/app/interfaces/icharacter';
import { ITeam } from 'src/app/interfaces/iteam';
import { apiRoutes } from 'src/app/services/apiRoutes.service';
import { FormTeamComponent } from '../../teams/form-team/form-team.component';

@Component({
  selector: 'app-form-character',
  templateUrl: './form-character.component.html',
  styleUrls: ['./form-character.component.css']
})
export class FormCharacterComponent implements OnInit{
  formCharacter: FormGroup = {} as FormGroup
  character?: ICharacter
  responseMessage?: string;
  teams: ITeam[] = []
  teamName?: string

  constructor(private api:apiRoutes, @Inject(MAT_DIALOG_DATA) 
    public characterData: any, 
      private dialogRef: MatDialogRef<FormTeamComponent>){ }

  ngOnInit(): void {
    this.formBuilder()
    this.getTeams()
  }

  formBuilder(): void{
    this.formCharacter = new FormGroup({
      name: new FormControl(null, [
        Validators.required
      ]),
      l_name: new FormControl( null, [
        Validators.required,
      ]),
      team_id: new FormControl(null, [
        Validators.required
      ]),
      id: new FormControl(null, [
        Validators.required
      ]),
      age: new FormControl(null, [
        Validators.required
      ]),
      type: new FormControl(null, [
        Validators.required
      ]),
      alive: new FormControl(null, [
        Validators.required
      ]),

    })
  }

  submitCharacter(){
    this.character = {
      name: this.formCharacter.get('name')?.value,
      l_name: this.formCharacter.get('l_name')?.value,
      alive: this.formCharacter.get('alive')?.value,
      type: this.formCharacter.get('type')?.value,
      age: this.formCharacter.get('age')?.value,
      id: this.formCharacter.get('team_id')?.value
    }
    //console.log(this.character)
    //console.log(this.formCharacter.get('team_id')?.value)
    if(this.characterData.update == true){
      this.api.updateCharacters(this.character, this.characterData.id).subscribe({
        next: (response) => console.log(response),
        error: (response) => {
          if (response.error && response.error.errors) {
            const errors = response.error.errors;
            for (const key of Object.keys(errors)) {
              const control = this.formCharacter.get(key);
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
      this.api.createCharacter(this.character).subscribe({
        next: (response) => console.log(response),
        error: (response) => {
          if (response.error && response.error.errors) {
            const errors = response.error.errors;
            for (const key of Object.keys(errors)) {
              const control = this.formCharacter.get(key);
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
      console.log(this.character)
    }
    
    //console.log(this.team)
  }
  setData(){
    this.formCharacter.patchValue({
      name: this.characterData.name,
      l_name: this.characterData.l_name,
      type: this.characterData.type,
      alive: this.characterData.alive,
      age: this.characterData.age,
      team_id: this.characterData.team_id
    })
  }

  getTeams(){
    
    this.api.readTeams().subscribe({
      next: (response) => {
        this.teams = response.data
      },
      error: (response) => console.log(response.error),
      complete: () => {
        if(this.characterData.update == true){
          this.setData()
        }
        console.log('ok')
      }
    });
  }
}
