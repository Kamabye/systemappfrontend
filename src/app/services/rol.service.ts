import { Injectable } from '@angular/core';
import {ROLES} from '../components/rol/roles.json';
import { Rol } from '../models/rol';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private urlEndPoint : string = 'http://localhost:8081/system/apiv1/rol';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});


  constructor(private http : HttpClient) { }

  getRoles() : Observable<Rol[]>{
    //return of(ROLES);
    return this.http.get<Rol[]>(this.urlEndPoint);
  }

  crearRol(rol : Rol) : Observable<Rol>{
    return this.http.post<Rol>(this.urlEndPoint, rol, {headers:this.httpHeaders});
  }

  obtenerRol(idRol : number): Observable<Rol>{
    return this.http.get<Rol>(`${this.urlEndPoint}/${idRol}`);
  }

  actualizarRol(rol : Rol) : Observable<Rol>{
    return this.http.put<Rol>(`${this.urlEndPoint}/${rol.id}`, rol, {headers:this.httpHeaders});
  }

  eliminarRol(idRol : number) : Observable<Rol>{
    return this.http.delete<Rol>(`${this.urlEndPoint}/${idRol}`, {headers:this.httpHeaders});
  }
}