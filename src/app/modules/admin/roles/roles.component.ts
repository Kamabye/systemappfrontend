
import { Component, OnInit } from '@angular/core';

import { RolService } from 'src/app/services/rol.service';
import { Rol } from 'src/app/models/rol';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html'
})
export class RolesComponent implements OnInit {

  roles: Rol[] = [];

  constructor(private rolService: RolService) { }

  ngOnInit(): void {
    console.info("RolesComponent ngOnInit");
    this.rolService.getRoles().subscribe(
      (response) => {

        if (response.body != null) {
          console.info('Avemus Datiux');
          this.roles = response.body;
        } else {
          console.error('El cuerpo de la respuesta es nulo.');
        }

      },
      (error) => {
        Swal.fire('Mensaje: ', `${error.error.mensaje}`, 'warning')
        console.error("Error al obtener los roles: ", error);
      }
    );
  }

  public eliminarRol(rol: Rol): void {

    const SwalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    SwalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: `Estas seguro de eliminar al rol ${rol.rol}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, Eliminiar',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        console.info(rol);
        this.rolService.eliminarRol(rol.idRol).subscribe({
          next: data => {

            this.roles = this.roles.filter(r => r !== rol)
            SwalWithBootstrapButtons.fire(
              'Eliminado!',
              `Rol ${data.body?.rol} eliminado con éxito`,
              'success'
            )
          },
          error: err => {
            Swal.fire({
              title: "¡Algo pasó!",
              text: `Error: ${err.error.error}`,
              icon: "error"
            });
            console.error("Error: ", err.error.error);
          },
          complete() {
            console.info("Complete eliminar Rol");
          }
        }
        )

      }
    })
  }

}
