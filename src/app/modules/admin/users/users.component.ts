import { Component, OnInit } from '@angular/core';

import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    console.info("UsersComponent ngOnInit()");
    this.usuarioService.getUsuarios().subscribe(
      (response) => {

        if (response.body !== null) {
          this.usuarios = response.body;
        } else {
          console.error('El cuerpo de la respuesta es nulo.');
        }

      },
      (error) => {
        Swal.fire('Mensaje: ', `${error.error.mensaje}`, 'warning')
        console.error("Error al obtener los usuarios: ", error);
      }
    );
  }


  public eliminarUsuario(usuario: Usuario): void {

    const SwalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    SwalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: `Estas seguro de eliminar al usuario ${usuario.email}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, Eliminiar',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario.idUsuario).subscribe(response => {

          this.usuarios = this.usuarios.filter(r => r != usuario)
          SwalWithBootstrapButtons.fire(
            'Eliminado!',
            `Usuario ${response.body?.email} eliminado con éxito`,
            'success'
          )
        })

      }
    })
  }

}
