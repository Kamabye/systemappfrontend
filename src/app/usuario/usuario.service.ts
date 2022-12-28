import { Injectable } from '@angular/core';
import {USUARIOS} from './usuario.json';
import { Usuario } from './usuario';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { }

  getUsuarios() : Observable<Usuario[]>{
    return of(USUARIOS);
  }
}