import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
})
export class UsuarioComponent implements OnInit {

  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.getUsuarios().subscribe(
      (response) => {

        if (response.body !== null) {
          this.usuarios = response.body;
        } else {
          console.error('El cuerpo de la respuesta es nulo.');
        }

      },
      (error) => {
        swal.fire('Mensaje: ', `${error.error.mensaje}`, 'warning')
        console.error("Error al obtener los usuarios: ", error);
      }
    );
  }


  public eliminarUsuario(usuario: Usuario): void {

    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: `Estas seguro de eliminar al usuario ${usuario.email}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, Eliminiar',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario.id).subscribe(response => {

          this.usuarios = this.usuarios.filter(r => r !== usuario)
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            `Usuario ${response.body?.email} eliminado con éxito`,
            'success'
          )
        })

      }
    })
  }

}
