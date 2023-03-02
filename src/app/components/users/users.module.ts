import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { TableComponent } from './table/table.component';
import { MaterialModulesModule } from '../material-modules/material-modules.module';
import { FormUserComponent } from './form-user/form-user.component';


@NgModule({
  declarations: [
    TableComponent,
    FormUserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModulesModule
  ]
})
export class UsersModule { }
