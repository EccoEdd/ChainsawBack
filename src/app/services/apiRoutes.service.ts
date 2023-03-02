import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enviromet } from 'src/enviroments/enviroment';
import { IBranch } from '../interfaces/ibranch';
import { ICharacter } from '../interfaces/icharacter';
import { IDemon } from '../interfaces/idemon';
import { Irole } from '../interfaces/irole';
import { ITeam } from '../interfaces/iteam';
import { IUser } from '../interfaces/user';

@Injectable({
    providedIn: 'root'
  })

export class apiRoutes{
    constructor(private http: HttpClient) {
    }

    //Branch Crud
    createBranch(branch: IBranch){
      return this.http.post<any>(`${Enviromet.url}chainsaw/branches/create`, branch)
    }
    readBranches(){
      return this.http.get<any>(`${Enviromet.url}chainsaw/branches/read`)
    }
    updateBranch(branch: IBranch, id: number){
      return this.http.put<any>(`${Enviromet.url}chainsaw/branches/update/${id}`, branch)
    }
    deleteBranch(id: number){
      return this.http.delete<any>(`${Enviromet.url}chainsaw/branches/delete/${id}`)
    }

    //Team Crud
    createTeam(team: ITeam){
      return this.http.post<any>(`${Enviromet.url}chainsaw/teams/create`, team)
    }
    readTeams(){
      return this.http.get<any>(`${Enviromet.url}chainsaw/teams/read`)
    }
    updateTeam(team: ITeam, id: number){
      return this.http.put<any>(`${Enviromet.url}chainsaw/teams/update/${id}`, team)
    }
    deleteTeam(id: number){
      return this.http.delete<any>(`${Enviromet.url}chainsaw/teams/delete/${id}`)
    }

    //Character Crud
    createCharacter(character: ICharacter){
      return this.http.post<any>(`${Enviromet.url}chainsaw/characters/create`, character)
    }
    readCharacters(){
      return this.http.get<any>(`${Enviromet.url}chainsaw/characters/read`)
    }
    updateCharacters(character: ICharacter, id: number){
      return this.http.put<any>(`${Enviromet.url}chainsaw/characters/update/${id}`, character)
    }
    deleteCharacters(id: number){
      return this.http.delete<any>(`${Enviromet.url}chainsaw/characters/delete/${id}`)
    }

    //Demon Crud
    createDemon(demon: IDemon){
      return this.http.post<any>(`${Enviromet.url}chainsaw/demons/create`, demon)
    }
    readDemon(){
      return this.http.get<any>(`${Enviromet.url}chainsaw/demons/read`)
    }
    updateDemon(demon: IDemon, id: number){
      return this.http.put<any>(`${Enviromet.url}chainsaw/demons/update/${id}`, demon)
    }
    deleteDemon(id: number){
      return this.http.delete<any>(`${Enviromet.url}chainsaw/demons/delete/${id}`)
    }

    //Users
    readUsers(){
      return this.http.get<any>(`${Enviromet.url}user/get`)
    }
    updateUser(user: IUser, id: number){
      return this.http.put<any>(`${Enviromet.url}user/update/${id}`, user)
    }
    deleteUser(id: number){
      return this.http.delete<any>(`${Enviromet.url}user/delete/${id}`)
    }

    //Roles
    createRol(role: Irole){
      return this.http.post<any>(`${Enviromet.url}roles/create`, role)
    }

    readRoles(){
      return this.http.get<any>(`${Enviromet.url}roles/get`)
    }

    updateRole(role: Irole, id: number){
      return this.http.put<any>(`${Enviromet.url}roles/update/${id}`, role)
    }

    deleteRole(id: number){
      return this.http.delete<any>(`${Enviromet.url}roles/delete/${id}`)
    }
}