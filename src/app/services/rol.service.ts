import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
//import {ROLES} from '../json/roles.json';
import { Rol } from '../models/rol';


@Injectable({
  providedIn: 'root'
})

export class RolService {

  private urlEndPoint: string = 'http://localhost:8081/system/apiv1/rol';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });


  constructor(private http: HttpClient) { }

  getRoles(): Observable<HttpResponse<Rol[]>> {
    //return of(ROLES);
    return this.http.get<Rol[]>(`${this.urlEndPoint}`, { observe: 'response' });
  }

  crearRol(rol: Rol): Observable<HttpResponse<Rol>> {
    return this.http.post<Rol>(this.urlEndPoint, rol, { headers: this.httpHeaders, observe: 'response' });
  }

  obtenerRol(idRol: number): Observable<HttpResponse<Rol>> {
    return this.http.get<Rol>(`${this.urlEndPoint}/${idRol}`, { observe: 'response' });
  }

  actualizarRol(rol: Rol): Observable<HttpResponse<Rol>> {
    return this.http.put<Rol>(`${this.urlEndPoint}/${rol.id}`, rol, { headers: this.httpHeaders, observe: 'response' });
  }

  eliminarRol(idRol: number): Observable<HttpResponse<Rol>> {
    return this.http.delete<Rol>(`${this.urlEndPoint}/${idRol}`, { observe: 'response' });
  }
}