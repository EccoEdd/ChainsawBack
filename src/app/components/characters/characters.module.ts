import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharactersRoutingModule } from './characters-routing.module';
import { TableComponent } from './table/table.component';
import { MaterialModulesModule } from '../material-modules/material-modules.module';
import { FormCharacterComponent } from './form-character/form-character.component';

@NgModule({
  declarations: [
    TableComponent,
    FormCharacterComponent
  ],
  imports: [
    CommonModule,
    CharactersRoutingModule,
    MaterialModulesModule
  ]
})
export class CharactersModule { }
