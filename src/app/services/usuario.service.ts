import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlEndPoint: string = 'http://localhost:8081/system/apiv1/user';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  private httpHeadersOctetStream = new HttpHeaders({ 'Content-Type': 'application/octet-stream' });
  private httpHeadersMultipart = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<HttpResponse<Usuario[]>> {
    //return of(USUARIOS);
    return this.http.get<Usuario[]>(this.urlEndPoint, { observe: 'response' });
  }

  eliminarUsuario(idUsuario: number): Observable<HttpResponse<Usuario>> {
    return this.http.delete<Usuario>(`${this.urlEndPoint}/${idUsuario}`, { observe: 'response' });
  }

  crearUsuario(usuario: Usuario): Observable<HttpResponse<Usuario>> {
    return this.http.post<Usuario>(this.urlEndPoint, usuario, { headers: this.httpHeaders, observe: 'response' });
  }

  crearUsuarioFormData(formData: FormData): Observable<HttpResponse<Usuario>> {
    return this.http.post<Usuario>(this.urlEndPoint, formData, { observe: 'response' });
  }

  obtenerUsuario(idUsuario: number): Observable<HttpResponse<Usuario>> {
    return this.http.get<Usuario>(`${this.urlEndPoint}/${idUsuario}`, { observe: 'response' });
  }

  actualizarUsuario(usuario: Usuario): Observable<HttpResponse<Usuario>> {
    return this.http.put<Usuario>(`${this.urlEndPoint}/${usuario.id}`, usuario, { headers: this.httpHeaders, observe: 'response' });
  }

  actualizarUsuarioFormData(formData: FormData): Observable<HttpResponse<Usuario>> {
    return this.http.put<Usuario>(`${this.urlEndPoint}`, formData, { observe: 'response' });
  }

}