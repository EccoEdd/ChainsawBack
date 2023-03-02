import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { NomalGuard } from './guards/nomal.guard';
import { TokenGuard } from './guards/token.guard';

const routes: Routes = [
  {path: '', loadChildren: 
    () => import('./../app/components/auth/auth.module').then(m => m.AuthModule)},
  
  {path: 'branches', loadChildren: 
    () => import('./../app/components/branches/branches.module').then(m => m.BranchesModule), 
      canActivate: [AdminGuard]},

  {path:'teams', loadChildren: 
    () => import('./../app/components/teams/teams.module').then(m => m.TeamsModule),
      canActivate: [AdminGuard]},
  
  {path:'characters', loadChildren:
    () => import('./../app/components/characters/characters.module').then(m=> m.CharactersModule),
      canActivate: [TokenGuard]},
  
  {path:'demons', loadChildren:
    () => import('./../app/components/demons/demons.module').then(m=> m.DemonsModule),
      canActivate: [TokenGuard]},

  {path:'users', loadChildren:
    () => import('./../app/components/users/users.module').then(m=> m.UsersModule),
      canActivate: [AdminGuard]},
  
  {path: 'roles', loadChildren:
    () => import('./../app/components/role/role.module').then(m=> m.RoleModule),
      canActivate: [AdminGuard]},

  {path: 'void', loadChildren:
    () => import('./../app/components/void/void.module').then(m=> m.VoidModule),
      canActivate: [TokenGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
