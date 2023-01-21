import { Injectable } from '@angular/core';
import {ROLES} from './roles.json';
import { Rol } from './rol';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private urlEndPoint : string = 'http://localhost:8080/api/roles';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});


  constructor(private http : HttpClient) { }

  getRoles() : Observable<Rol[]>{
    //return of(ROLES);
    return this.http.get<Rol[]>(this.urlEndPoint);
  }

  crearRol(rol : Rol) : Observable<Rol>{
    return this.http.post<Rol>(this.urlEndPoint, rol, {headers:this.httpHeaders});
  }
}