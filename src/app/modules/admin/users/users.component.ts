import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/interfaces/page';

import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  usuarios: Usuario[] = [];

  page: Page<Usuario> | undefined;

  currentPage = 0;
  pageSize = 10;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    console.info("UsersComponent ngOnInit()");
    this.usuarioService.getUsuariosPage(this.currentPage, this.pageSize).subscribe({
      next: data => {

        if (data) {
          this.page = data.body!;
          this.usuarios = this.page?.content ?? [];
          console.log('Se encontraron usuarios');
        } else {
          Swal.fire('Sin datos', '', 'warning')
          console.info(`no se encontraron datos de usuarios ${data}`);
          this.usuarios = [];
        }

      },
      error: err => {
        Swal.fire('Mensaje: ', `${err.error.mensaje}`, 'warning')
        console.error("Error al obtener los usuarios: ", err);
      },
      complete: () => {
        console.log('Usuarios complete');
      }
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
