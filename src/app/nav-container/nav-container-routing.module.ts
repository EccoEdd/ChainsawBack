import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TokenGuard } from '../guards/token.guard';

const routes: Routes = [
  {path: '', loadChildren: 
    () => import('./../../app/components/auth/auth.module').then(m => m.AuthModule)},
  
  {path: 'branches', loadChildren: 
    () => import('./../../app/components/branches/branches.module').then(m => m.BranchesModule), 
      canActivate: [TokenGuard]},

  {path:'teams', loadChildren: 
    () => import('./../../app/components/teams/teams.module').then(m => m.TeamsModule),
      canActivate: [TokenGuard]},
  
  {path:'characters', loadChildren:
    () => import('./../../app/components/characters/characters.module').then(m=> m.CharactersModule),
      canActivate: [TokenGuard]},
  
  {path:'demons', loadChildren:
    () => import('./../../app/components/demons/demons.module').then(m=> m.DemonsModule),
      canActivate: [TokenGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavContainerRoutingModule { }
