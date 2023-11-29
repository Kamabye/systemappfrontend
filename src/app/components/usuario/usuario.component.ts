import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
})
export class UsuarioComponent implements OnInit {

  usuarios: Usuario[] = [];

constructor(private usuarioService : UsuarioService){}

ngOnInit() {
  this.usuarioService.getUsuarios().subscribe(
    usuarios => this.usuarios = usuarios
  );
}
}
