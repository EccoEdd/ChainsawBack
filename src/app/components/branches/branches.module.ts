import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchesRoutingModule } from './branches-routing.module';

import { MaterialModulesModule } from '../material-modules/material-modules.module';
import { TableComponent } from './table/table.component';
import { FormBranchComponent } from './form-branch/form-branch.component';


@NgModule({
  declarations: [
    TableComponent,
    FormBranchComponent
  ],
  imports: [
    CommonModule,
    BranchesRoutingModule,
    MaterialModulesModule
  ]
})

export class BranchesModule { }
