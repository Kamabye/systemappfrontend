import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
//import {ROLES} from '../json/roles.json';
import { Rol } from '../models/rol';

import { tap, finalize } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class RolService {

  isProduction = environment.production;

  private urlEndPointRol: string = `${environment.apiBaseURL}/rol`;

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });


  constructor(private http: HttpClient) { }

  getRoles(): Observable<HttpResponse<Rol[]>> {

    return this.http.get<Rol[]>(`${this.urlEndPointRol}`, { observe: 'response' });
  }

  crearRol(rol: Rol): Observable<HttpResponse<Rol>> {
    return this.http.post<Rol>(this.urlEndPointRol, rol, { headers: this.httpHeaders, observe: 'response' });
  }

  obtenerRol(idRol: number): Observable<HttpResponse<Rol>> {
    return this.http.get<Rol>(`${this.urlEndPointRol}/${idRol}`, { observe: 'response' });
  }

  actualizarRol(rol: Rol): Observable<HttpResponse<Rol>> {
    return this.http.put<Rol>(`${this.urlEndPointRol}/${rol.id}`, rol, { headers: this.httpHeaders, observe: 'response' });
  }

  eliminarRol(idRol: number): Observable<HttpResponse<Rol>> {
    return this.http.delete<Rol>(`${this.urlEndPointRol}/${idRol}`, { observe: 'response' });
  }
}