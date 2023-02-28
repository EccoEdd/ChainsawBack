import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user';
import { Enviromet } from 'src/enviroments/enviroment';
import { ICode } from '../interfaces/icode';
import { apiRoutes } from './apiRoutes.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private api: apiRoutes, private router: Router) { }

  logIn(user:IUser){
    return this.http.post<any>(`${Enviromet.url}user/logIn`, user)
  }

  logOut(){
    return this.http.delete<any>(`${Enviromet.url}user/logOut`)
  }

  signUp(user:IUser){
    return this.http.post<any>(`${Enviromet.url}user/register`, user)
  }

  codeSender(code: ICode){
    return this.http.post<any>(`${localStorage.getItem('protected_url')}`, code)
  }

  validTokenRole(){
    return this.http.get<any>(`${Enviromet.url}user/check`)
  }
  
}
