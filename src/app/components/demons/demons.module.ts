import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemonsRoutingModule } from './demons-routing.module';
import { TableComponent } from './table/table.component';
import { MaterialModulesModule } from '../material-modules/material-modules.module';
import { FormDemonComponent } from './form-demon/form-demon.component';


@NgModule({
  declarations: [
    TableComponent,
    FormDemonComponent
  ],
  imports: [
    CommonModule,
    DemonsRoutingModule,
    MaterialModulesModule
  ]
})
export class DemonsModule { }
