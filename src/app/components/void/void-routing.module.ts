import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VoidComponent } from './void/void.component';

const routes: Routes = [
  {path:'', component:VoidComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoidRoutingModule { }
