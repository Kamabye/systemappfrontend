import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { tap, finalize } from 'rxjs/operators';

import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlEndPointUser: string = `${environment.apiBaseURL}/user`;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  private httpHeadersOctetStream = new HttpHeaders({ 'Content-Type': 'application/octet-stream' });
  private httpHeadersMultipart = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<HttpResponse<Usuario[]>> {
    //return of(USUARIOS);
    return this.http.get<Usuario[]>(this.urlEndPointUser, { observe: 'response' });
  }

  eliminarUsuario(idUsuario: number): Observable<HttpResponse<Usuario>> {
    return this.http.delete<Usuario>(`${this.urlEndPointUser}/${idUsuario}`, { observe: 'response' });
  }

  crearUsuario(usuario: Usuario): Observable<HttpResponse<Usuario>> {
    return this.http.post<Usuario>(this.urlEndPointUser, usuario, { headers: this.httpHeaders, observe: 'response' });
  }

  crearUsuarioFormData(formData: FormData): Observable<HttpResponse<Usuario>> {
    return this.http.post<Usuario>(this.urlEndPointUser, formData, { observe: 'response' });
  }

  obtenerUsuario(idUsuario: number): Observable<HttpResponse<Usuario>> {
    return this.http.get<Usuario>(`${this.urlEndPointUser}/${idUsuario}`, { observe: 'response' });
  }

  actualizarUsuario(usuario: Usuario): Observable<HttpResponse<Usuario>> {
    return this.http.put<Usuario>(`${this.urlEndPointUser}/${usuario.idUsuario}`, usuario, { headers: this.httpHeaders, observe: 'response' });
  }

  actualizarUsuarioFormData(formData: FormData): Observable<HttpResponse<Usuario>> {
    return this.http.put<Usuario>(`${this.urlEndPointUser}`, formData, { observe: 'response' });
  }

}