import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LogInComponent } from './log-in/log-in.component';
import { SignUPComponent } from './sign-up/sign-up.component';
import { MaterialModulesModule } from '../material-modules/material-modules.module';
import { LogOutComponent } from './log-out/log-out.component';
import { CodeSenderComponent } from './code-sender/code-sender.component';

@NgModule({
  declarations: [
    LogInComponent,
    SignUPComponent,
    LogOutComponent,
    CodeSenderComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModulesModule
  ]
})
export class AuthModule { }
