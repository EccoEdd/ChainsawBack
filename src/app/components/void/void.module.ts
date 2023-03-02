import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoidRoutingModule } from './void-routing.module';
import { VoidComponent } from './void/void.component';


@NgModule({
  declarations: [
    VoidComponent
  ],
  imports: [
    CommonModule,
    VoidRoutingModule
  ]
})
export class VoidModule { }
