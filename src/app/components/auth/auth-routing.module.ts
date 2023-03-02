import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodeGuard } from 'src/app/guards/code.guard';
import { LoginGuard } from 'src/app/guards/login.guard';
import { TokenGuard } from 'src/app/guards/token.guard';
import { CodeSenderComponent } from './code-sender/code-sender.component';
import { LogInComponent } from './log-in/log-in.component';
import { LogOutComponent } from './log-out/log-out.component';
import { SignUPComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {path:'', component: LogInComponent, canActivate: [LoginGuard]},
  {path:'signUp', component:SignUPComponent, canActivate: [LoginGuard]},
  {path:'codeSender', component:CodeSenderComponent, canActivate: [LoginGuard, CodeGuard]},
  {path:'logOut', component:LogOutComponent, canActivate: [TokenGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthRoutingModule { }
