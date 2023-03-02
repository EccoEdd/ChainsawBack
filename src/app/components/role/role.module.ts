import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { MaterialModulesModule } from '../material-modules/material-modules.module';
import { TableComponent } from './table/table.component';
import { FormRoleComponent } from './form-role/form-role.component';


@NgModule({
  declarations: [
    TableComponent,
    FormRoleComponent
  ],
  imports: [
    CommonModule,
    RoleRoutingModule,
    MaterialModulesModule
  ]
})
export class RoleModule { }
