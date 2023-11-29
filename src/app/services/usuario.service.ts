import { Injectable } from '@angular/core';
import {USUARIOS} from '../components/usuario/usuario.json';
import { Usuario } from '../models/usuario';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private urlEndPoint : string = 'http://localhost:8081/system/apiv1/user';
  constructor(private http : HttpClient) { }

  getUsuarios() : Observable<Usuario[]>{
    //return of(USUARIOS);
    return this.http.get<Usuario[]>(this.urlEndPoint);
  }
}