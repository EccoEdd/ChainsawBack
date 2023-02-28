import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamsRoutingModule } from './teams-routing.module';
import { TableComponent } from './table/table.component';
import { MaterialModulesModule } from '../material-modules/material-modules.module';
import { FormTeamComponent } from './form-team/form-team.component';

@NgModule({
  declarations: [
    TableComponent,
    FormTeamComponent
  ],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    MaterialModulesModule
  ]
})
export class TeamsModule { }
