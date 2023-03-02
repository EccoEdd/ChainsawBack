import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavContainerRoutingModule } from './nav-container-routing.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';


@NgModule({
  declarations: [
    NavBarComponent
  ],
  imports: [
    CommonModule,
    NavContainerRoutingModule
  ]
})
export class NavContainerModule { }
